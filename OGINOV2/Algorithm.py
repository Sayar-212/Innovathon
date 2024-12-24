import sqlite3
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, KeepTogether, PageBreak
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from collections import defaultdict
import random

DB_PATH = './timetable.db'

def fetch_data():
    """Fetches data from the database."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Fetch Courses with sections
    cursor.execute("SELECT name, hours_week, section FROM Courses")
    courses = cursor.fetchall()

    # Fetch Faculty with assigned courses and sections
    cursor.execute("SELECT name, course_name, section FROM Faculty")
    faculty = cursor.fetchall()

    # Fetch Venues
    cursor.execute("SELECT name FROM Venues")
    venues = cursor.fetchall()

    conn.close()
    return courses, faculty, venues

def generate_timetable():
    """Generates timetables based on constraints."""
    courses, faculty, venues = fetch_data()
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    time_slots = [
        "9:00-10:00", "10:00-11:00", "11:00-12:00",
        "12:00-1:00",  # Break period
        "1:00-2:00", "2:00-3:00", "3:00-4:00", "4:00-5:00"
    ]
    sections = ['Section A', 'Section B', 'Section C']
    
    timetable = defaultdict(lambda: defaultdict(lambda: defaultdict(str)))
    venue_schedule = defaultdict(lambda: defaultdict(lambda: defaultdict(str)))
    faculty_schedule = defaultdict(lambda: defaultdict(lambda: defaultdict(str)))
    
    # Add break to all sections for all days
    for section in sections:
        for day in days:
            timetable[section][day]["12:00-1:00"] = "BREAK"
            
    # Add break to all faculty schedules
    for faculty_name, _, _ in faculty:
        for day in days:
            faculty_schedule[faculty_name][day]["12:00-1:00"] = "BREAK"
    
    # Group courses by section
    section_courses = defaultdict(list)
    for course_name, hours, section in courses:
        section_courses[section].append((course_name, hours))
    
    # Create faculty lookup by section and course
    faculty_lookup = {}
    for faculty_name, course_name, section in faculty:
        faculty_lookup[(section, course_name)] = faculty_name

    # Schedule classes for each section
    for section in sections:
        section_assignments = defaultdict(int)  # Track assigned hours for each course
        
        # Create available slots excluding break time
        available_slots = [(day, slot) for day in days for slot in time_slots 
                         if slot != "12:00-1:00"]
        random.shuffle(available_slots)
        
        for course_name, required_hours in section_courses[section]:
            faculty_name = faculty_lookup[(section, course_name)]
            assigned_hours = 0
            
            for day, time_slot in available_slots:
                if assigned_hours >= required_hours:
                    break
                    
                # Check if slot is available for this section and faculty
                if not timetable[section][day][time_slot] and not faculty_schedule[faculty_name][day][time_slot]:
                    # Find available venue
                    available_venue = None
                    for venue_name, in venues:
                        if not venue_schedule[day][time_slot][venue_name]:
                            available_venue = venue_name
                            break
                    
                    if available_venue:
                        # Assign the class
                        class_info = f"{course_name}\n{faculty_name}\n{available_venue}"
                        timetable[section][day][time_slot] = class_info
                        venue_schedule[day][time_slot][available_venue] = True
                        faculty_schedule[faculty_name][day][time_slot] = f"{course_name}\n{section}\n{available_venue}"
                        assigned_hours += 1

    return timetable, faculty_schedule

def export_timetable_to_pdf(timetable):
    """Exports the generated timetable to a PDF with one section per page."""
    pdf = SimpleDocTemplate("generated_timetable.pdf", pagesize=letter)
    elements = []
    styles = getSampleStyleSheet()

    # Create custom style for bold text
    bold_style = ParagraphStyle(
        'BoldStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        alignment=TA_CENTER
    )

    # Create title style with bottom margin
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Title'],
        spaceBefore=30,
        spaceAfter=30,
        keepWithNext=True
    )

    elements.append(Paragraph("Generated Timetable", title_style))

    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    time_slots = [
        "9:00-10:00", "10:00-11:00", "11:00-12:00",
        "12:00-1:00",  # Break period
        "1:00-2:00", "2:00-3:00", "3:00-4:00", "4:00-5:00"
    ]

    for i, section in enumerate(sorted(timetable.keys())):
        # Add page break before each section except the first one
        if i > 0:
            elements.append(PageBreak())
        
        # Section heading with more space
        section_heading = Paragraph(f"Timetable for {section}", styles['Heading1'])
        elements.append(section_heading)
        elements.append(Spacer(1, 20))

        # Convert all header text to bold paragraphs
        header_row = [Paragraph("Day/Time", bold_style)] + [Paragraph(slot, bold_style) for slot in time_slots]
        table_data = [header_row]
        
        for day in days:
            row = [Paragraph(day, bold_style)]
            for slot in time_slots:
                cell_content = timetable[section][day][slot]
                if cell_content:
                    if cell_content == "BREAK":
                        row.append(Paragraph("<b>BREAK</b>", bold_style))
                    else:
                        # Make all text bold
                        formatted_content = "<br/>".join(f"<b>{line}</b>" for line in cell_content.split('\n'))
                        row.append(Paragraph(formatted_content, bold_style))
                else:
                    row.append("")
            table_data.append(row)

        # Calculate table width and height
        available_width = letter[0] - 40  # Page width minus margins
        available_height = letter[1] - 120  # Page height minus margins and header
        col_widths = [available_width / (len(time_slots) + 1)] * (len(time_slots) + 1)
        
        table = Table(table_data, colWidths=col_widths, repeatRows=1)
        table.setStyle(TableStyle([
            # Header styling
            ('BACKGROUND', (0, 0), (-1, 0), colors.lightblue),  # Header row
            ('BACKGROUND', (0, 0), (0, -1), colors.lightblue),  # First column
            ('BACKGROUND', (0, 0), (0, 0), colors.HexColor('#87CEFA')),  # Day/Time cell different color
            
            # Text styling
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            
            # Grid styling
            ('GRID', (0, 0), (-1, -1), 1.0, colors.black),  # Increased border width
            ('INNERGRID', (0, 0), (-1, -1), 0.75, colors.grey),  # Slightly thinner inner grid
            
            # Break period styling
            ('BACKGROUND', (4, 0), (4, -1), colors.lightyellow),
            
            # Cell padding
            ('TOPPADDING', (0, 0), (-1, -1), 5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
            ('LEFTPADDING', (0, 0), (-1, -1), 3),
            ('RIGHTPADDING', (0, 0), (-1, -1), 3),
        ]))
        
        # Wrap table in KeepTogether to prevent splitting across pages
        elements.append(KeepTogether([table]))

    pdf.build(elements)
    print("Timetable exported successfully as 'generated_timetable.pdf'.")

def export_faculty_schedule_to_pdf(faculty_schedule):
    """Exports faculty schedules to a PDF."""
    pdf = SimpleDocTemplate("faculty_schedule.pdf", pagesize=letter)
    elements = []
    styles = getSampleStyleSheet()

    # Create custom style for bold text
    bold_style = ParagraphStyle(
        'BoldStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        alignment=TA_CENTER
    )

    elements.append(Paragraph("Faculty Schedules", styles['Title']))
    elements.append(Spacer(1, 12))

    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    time_slots = [
        "9:00-10:00", "10:00-11:00", "11:00-12:00",
        "12:00-1:00",  # Break period
        "1:00-2:00", "2:00-3:00", "3:00-4:00", "4:00-5:00"
    ]

    for faculty, schedule in faculty_schedule.items():
        faculty_elements = []
        faculty_elements.append(Paragraph(f"Schedule for {faculty}", styles['Heading2']))
        
        # Convert all header text to bold paragraphs
        header_row = [Paragraph("Day/Time", bold_style)] + [Paragraph(slot, bold_style) for slot in time_slots]
        table_data = [header_row]
        
        for day in days:
            row = [Paragraph(day, bold_style)]
            for slot in time_slots:
                cell_content = schedule[day].get(slot, "")
                if cell_content:
                    if cell_content == "BREAK":
                        row.append(Paragraph("<b>BREAK</b>", bold_style))
                    else:
                        # Make all text bold
                        formatted_content = "<br/>".join(f"<b>{line}</b>" for line in cell_content.split('\n'))
                        row.append(Paragraph(formatted_content, bold_style))
                else:
                    row.append("")
            table_data.append(row)

        table = Table(table_data, repeatRows=1)
        table.setStyle(TableStyle([
            # Header styling
            ('BACKGROUND', (0, 0), (-1, 0), colors.lightblue),  # Header row
            ('BACKGROUND', (0, 0), (0, -1), colors.lightblue),  # First column
            ('BACKGROUND', (0, 0), (0, 0), colors.HexColor('#87CEFA')),  # Day/Time cell different color
            
            # Text styling
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            
            # Grid styling
            ('GRID', (0, 0), (-1, -1), 1.0, colors.black),  # Increased border width
            ('INNERGRID', (0, 0), (-1, -1), 0.75, colors.grey),  # Slightly thinner inner grid
            
            # Break period styling
            ('BACKGROUND', (4, 0), (4, -1), colors.lightyellow),
            
            # Cell padding
            ('TOPPADDING', (0, 0), (-1, -1), 5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
            ('LEFTPADDING', (0, 0), (-1, -1), 3),
            ('RIGHTPADDING', (0, 0), (-1, -1), 3),
        ]))

        faculty_elements.append(table)
        elements.append(KeepTogether(faculty_elements))
        elements.append(Spacer(1, 12))

    pdf.build(elements)
    print("Faculty schedules exported successfully as 'faculty_schedule.pdf'.")

def main():
    timetable, faculty_schedule = generate_timetable()
    export_timetable_to_pdf(timetable)
    export_faculty_schedule_to_pdf(faculty_schedule)

if __name__ == "__main__":
    main()