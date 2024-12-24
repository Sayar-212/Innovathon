# algo.py
import sqlite3
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
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
    time_slots = ["9:00-10:00", "10:00-11:00", "11:00-12:00", "1:00-2:00", "2:00-3:00", "3:00-4:00", "4:00-5:00"]
    sections = ['Section A', 'Section B', 'Section C']
    
    timetable = defaultdict(lambda: defaultdict(lambda: defaultdict(str)))
    venue_schedule = defaultdict(lambda: defaultdict(lambda: defaultdict(str)))
    
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
        
        # Randomize days and time slots for variety
        available_slots = [(day, slot) for day in days for slot in time_slots]
        random.shuffle(available_slots)
        
        for course_name, required_hours in section_courses[section]:
            faculty_name = faculty_lookup[(section, course_name)]
            assigned_hours = 0
            
            for day, time_slot in available_slots:
                if assigned_hours >= required_hours:
                    break
                    
                # Check if slot is available for this section
                if not timetable[section][day][time_slot]:
                    # Find available venue
                    available_venue = None
                    for venue_name, in venues:
                        if not venue_schedule[day][time_slot][venue_name]:
                            available_venue = venue_name
                            break
                    
                    if available_venue:
                        # Assign the class
                        timetable[section][day][time_slot] = (
                            f"{course_name}\n{faculty_name}\n{available_venue}"
                        )
                        venue_schedule[day][time_slot][available_venue] = True
                        assigned_hours += 1

    return timetable

def export_timetable_to_pdf(timetable):
    """Exports the generated timetable to a PDF."""
    pdf = SimpleDocTemplate("generated_timetable.pdf", pagesize=letter)
    elements = []
    styles = getSampleStyleSheet()

    elements.append(Paragraph("Generated Timetable", styles['Title']))
    elements.append(Spacer(1, 12))

    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    time_slots = ["9:00-10:00", "10:00-11:00", "11:00-12:00", "1:00-2:00", "2:00-3:00", "3:00-4:00", "4:00-5:00"]

    for section in sorted(timetable.keys()):
        elements.append(Paragraph(f"Timetable for {section}", styles['Heading2']))
        elements.append(Spacer(1, 12))

        table_data = [["Day/Time"] + time_slots]
        
        for day in days:
            row = [day]
            for slot in time_slots:
                cell_content = timetable[section][day][slot]  # Fixed: Using slot instead of time_slots
                row.append(cell_content if cell_content else "")
            table_data.append(row)

        table = Table(table_data, repeatRows=1)
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.lightblue),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 8),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('WORDWRAP', (0, 0), (-1, -1), True),
        ]))
        
        elements.append(table)
        elements.append(Spacer(1, 20))

    pdf.build(elements)
    print("Timetable exported successfully as 'generated_timetable.pdf'.")

def main():
    timetable = generate_timetable()
    export_timetable_to_pdf(timetable)

if __name__ == "__main__":
    main()