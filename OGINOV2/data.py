import tkinter as tk
from tkinter import ttk, messagebox
import sqlite3


class TimetableManager:
    def __init__(self, root):
        self.root = root
        self.root.title("Timetable Manager")
        self.root.geometry("800x600")
        
        # Initialize database
        self.init_database()
        
        # Create main notebook for tabs
        self.notebook = ttk.Notebook(root)
        self.notebook.pack(expand=True, fill='both', padx=10, pady=5)
        
        # Create tabs
        self.courses_tab = ttk.Frame(self.notebook)
        self.faculty_tab = ttk.Frame(self.notebook)
        self.venues_tab = ttk.Frame(self.notebook)
        
        self.notebook.add(self.courses_tab, text='Courses')
        self.notebook.add(self.faculty_tab, text='Faculty')
        self.notebook.add(self.venues_tab, text='Venues')
        
        # Initialize tabs
        self.setup_courses_tab()
        self.setup_faculty_tab()
        self.setup_venues_tab()
        
        # Add generate button at bottom
        self.generate_btn = ttk.Button(
            root, 
            text="Generate Timetable",
            command=self.generate_timetable
        )
        self.generate_btn.pack(pady=10)

    def init_database(self):
        """Initialize SQLite database."""
        self.conn = sqlite3.connect('timetable_extension.db')
        self.cursor = self.conn.cursor()
        
        # Create tables with composite primary key and case-insensitive matching
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS courses (
            id INTEGER NOT NULL,
            name TEXT NOT NULL COLLATE NOCASE,
            hours_week INTEGER NOT NULL,
            section TEXT NOT NULL,
            PRIMARY KEY (name,section)
        )
        ''')
        
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS faculty (
            id INTEGER NOT NULL,
            name TEXT NOT NULL COLLATE NOCASE,
            course_name TEXT NOT NULL COLLATE NOCASE,
            section TEXT NOT NULL,
            PRIMARY KEY (name,section)
        )
        ''')
        
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS venues (
            id INTEGER NOT NULL,
            name TEXT NOT NULL COLLATE NOCASE,
            PRIMARY KEY (id, name)
        )
        ''')
        
        self.conn.commit()

    def setup_courses_tab(self):
        """Setup the courses tab interface."""
        # Input frame
        input_frame = ttk.LabelFrame(self.courses_tab, text="Add Course", padding=10)
        input_frame.pack(fill='x', padx=5, pady=5)
        
        # Course name
        ttk.Label(input_frame, text="Course Name:").grid(row=0, column=0, padx=5, pady=5)
        self.course_name = ttk.Entry(input_frame)
        self.course_name.grid(row=0, column=1, padx=5, pady=5)
        
        # Hours per week
        ttk.Label(input_frame, text="Hours/Week:").grid(row=0, column=2, padx=5, pady=5)
        self.course_hours = ttk.Entry(input_frame)
        self.course_hours.grid(row=0, column=3, padx=5, pady=5)
        
        # Section
        ttk.Label(input_frame, text="Section:").grid(row=0, column=4, padx=5, pady=5)
        self.course_section = ttk.Combobox(input_frame, values=['Section A', 'Section B', 'Section C'])
        self.course_section.grid(row=0, column=5, padx=5, pady=5)
        self.course_section.set('Section A')
        
        # Add button
        ttk.Button(
            input_frame, 
            text="Add Course",
            command=self.add_course
        ).grid(row=0, column=6, padx=5, pady=5)
        
        # Treeview for displaying courses
        self.courses_tree = ttk.Treeview(
            self.courses_tab, 
            columns=('ID', 'Name', 'Hours', 'Section'),
            show='headings'
        )
        
        self.courses_tree.heading('ID', text='ID')
        self.courses_tree.heading('Name', text='Name')
        self.courses_tree.heading('Hours', text='Hours/Week')
        self.courses_tree.heading('Section', text='Section')
        
        self.courses_tree.pack(fill='both', expand=True, padx=5, pady=5)
        
        # Delete button
        ttk.Button(
            self.courses_tab,
            text="Delete Selected",
            command=lambda: self.delete_item('courses')
        ).pack(pady=5)
        
        # Load existing courses
        self.load_courses()

    def setup_faculty_tab(self):
        """Setup the faculty tab interface."""
        # Input frame
        input_frame = ttk.LabelFrame(self.faculty_tab, text="Add Faculty", padding=10)
        input_frame.pack(fill='x', padx=5, pady=5)
        
        # Faculty name
        ttk.Label(input_frame, text="Name:").grid(row=0, column=0, padx=5, pady=5)
        self.faculty_name = ttk.Entry(input_frame)
        self.faculty_name.grid(row=0, column=1, padx=5, pady=5)
        
        # Course name
        ttk.Label(input_frame, text="Course:").grid(row=0, column=2, padx=5, pady=5)
        self.faculty_course = ttk.Entry(input_frame)
        self.faculty_course.grid(row=0, column=3, padx=5, pady=5)
        
        # Section
        ttk.Label(input_frame, text="Section:").grid(row=0, column=4, padx=5, pady=5)
        self.faculty_section = ttk.Combobox(input_frame, values=['Section A', 'Section B', 'Section C'])
        self.faculty_section.grid(row=0, column=5, padx=5, pady=5)
        self.faculty_section.set('Section A')
        
        # Add button
        ttk.Button(
            input_frame,
            text="Add Faculty",
            command=self.add_faculty
        ).grid(row=0, column=6, padx=5, pady=5)
        
        # Treeview for displaying faculty
        self.faculty_tree = ttk.Treeview(
            self.faculty_tab,
            columns=('ID', 'Name', 'Course', 'Section'),
            show='headings'
        )
        
        self.faculty_tree.heading('ID', text='ID')
        self.faculty_tree.heading('Name', text='Name')
        self.faculty_tree.heading('Course', text='Course')
        self.faculty_tree.heading('Section', text='Section')
        
        self.faculty_tree.pack(fill='both', expand=True, padx=5, pady=5)
        
        # Delete button
        ttk.Button(
            self.faculty_tab,
            text="Delete Selected",
            command=lambda: self.delete_item('faculty')
        ).pack(pady=5)
        
        # Load existing faculty
        self.load_faculty()

    def setup_venues_tab(self):
        """Setup the venues tab interface."""
        # Input frame
        input_frame = ttk.LabelFrame(self.venues_tab, text="Add Venue", padding=10)
        input_frame.pack(fill='x', padx=5, pady=5)
        
        # Venue name
        ttk.Label(input_frame, text="Venue Name:").grid(row=0, column=0, padx=5, pady=5)
        self.venue_name = ttk.Entry(input_frame)
        self.venue_name.grid(row=0, column=1, padx=5, pady=5)
        
        # Add button
        ttk.Button(
            input_frame,
            text="Add Venue",
            command=self.add_venue
        ).grid(row=0, column=2, padx=5, pady=5)
        
        # Treeview for displaying venues
        self.venues_tree = ttk.Treeview(
            self.venues_tab,
            columns=('ID', 'Name'),
            show='headings'
        )
        
        self.venues_tree.heading('ID', text='ID')
        self.venues_tree.heading('Name', text='Name')
        
        self.venues_tree.pack(fill='both', expand=True, padx=5, pady=5)
        
        # Delete button
        ttk.Button(
            self.venues_tab,
            text="Delete Selected",
            command=lambda: self.delete_item('venues')
        ).pack(pady=5)
        
        # Load existing venues
        self.load_venues()

    def add_course(self):
    
        name = self.course_name.get().strip()
        hours = self.course_hours.get()
        section = self.course_section.get()
        
        if name and hours and section:
            try:
                self.cursor.execute(
                    "SELECT COUNT(*) FROM courses WHERE name=? AND section=?",
                    (name, section)
                )
                if self.cursor.fetchone()[0] > 0:
                    messagebox.showwarning("Duplicate Entry", "This course and section combination already exists.")
                    return
                
                self.cursor.execute(
                    "INSERT INTO courses (id, name, hours_week, section) VALUES (?, ?, ?, ?)",
                    (None, name, hours, section)
                )
                self.conn.commit()
                self.load_courses()
                self.clear_inputs('course')
                messagebox.showinfo("Success", "Course added successfully!")
            except Exception as e:
                messagebox.showerror("Error", f"Failed to add course: {str(e)}")
        else:
            messagebox.showwarning("Warning", "Please fill all fields!")


    def add_faculty(self):
        """Add a faculty member to the database."""
        name = self.faculty_name.get().strip()
        course = self.faculty_course.get().strip()
        section = self.faculty_section.get()
        
        if name and course and section:
            try:
                self.cursor.execute(
                    "SELECT COUNT(*) FROM faculty WHERE name=? AND section=?",
                    (name, section)
                )
                if self.cursor.fetchone()[0] > 0:
                    messagebox.showwarning("Duplicate Entry", "This faculty and section combination already exists.")
                    return
                
                self.cursor.execute(
                    "INSERT INTO faculty (id, name, course_name, section) VALUES (?, ?, ?, ?)",
                    (None, name, course, section)
                )
                self.conn.commit()
                self.load_faculty()
                self.clear_inputs('faculty')
                messagebox.showinfo("Success", "Faculty added successfully!")
            except Exception as e:
                messagebox.showerror("Error", f"Failed to add faculty: {str(e)}")
        else:
            messagebox.showwarning("Warning", "Please fill all fields!")


    def add_venue(self):
        """Add a venue to the database."""
        name = self.venue_name.get().strip()
        
        if name:
            try:
                self.cursor.execute(
                    "INSERT OR IGNORE INTO venues (id, name) VALUES (?, ?)",
                    (None, name)
                )
                self.conn.commit()
                self.load_venues()
                self.clear_inputs('venue')
                messagebox.showinfo("Success", "Venue added successfully!")
            except Exception as e:
                messagebox.showerror("Error", f"Failed to add venue: {str(e)}")
        else:
            messagebox.showwarning("Warning", "Please enter a venue name!")

    def load_courses(self):
        """Load courses from database into treeview."""
        for item in self.courses_tree.get_children():
            self.courses_tree.delete(item)
        
        self.cursor.execute("SELECT * FROM courses")
        for row in self.cursor.fetchall():
            self.courses_tree.insert('', 'end', values=row)

    def load_faculty(self):
        """Load faculty from database into treeview."""
        for item in self.faculty_tree.get_children():
            self.faculty_tree.delete(item)
        
        self.cursor.execute("SELECT * FROM faculty")
        for row in self.cursor.fetchall():
            self.faculty_tree.insert('', 'end', values=row)

    def load_venues(self):
        """Load venues from database into treeview."""
        for item in self.venues_tree.get_children():
            self.venues_tree.delete(item)
        
        self.cursor.execute("SELECT * FROM venues")
        for row in self.cursor.fetchall():
            self.venues_tree.insert('', 'end', values=row)

    def delete_item(self, item_type):
        """Delete selected item from database."""
        tree = getattr(self, f'{item_type}_tree')
        selected = tree.selection()
        
        if not selected:
            messagebox.showwarning("Warning", "Please select an item to delete!")
            return
            
        if messagebox.askyesno("Confirm", "Are you sure you want to delete the selected item?"):
            for item in selected:
                item_id = tree.item(item)['values'][0]
                item_name = tree.item(item)['values'][1]
                self.cursor.execute(f"DELETE FROM {item_type} WHERE id=? AND name=?", (item_id, item_name))
            
            self.conn.commit()
            getattr(self, f'load_{item_type}')()
            messagebox.showinfo("Success", "Item(s) deleted successfully!")

    def clear_inputs(self, input_type):
        """Clear input fields."""
        if input_type == 'course':
            self.course_name.delete(0, 'end')
            self.course_hours.delete(0, 'end')
            self.course_section.set('Section A')
        elif input_type == 'faculty':
            self.faculty_name.delete(0, 'end')
            self.faculty_course.delete(0, 'end')
            self.faculty_section.set('Section A')
        elif input_type == 'venue':
            self.venue_name.delete(0, 'end')

    def generate_timetable(self):
        """Generate timetable from current data."""
        try:
            # Export current data
            self.cursor.execute("SELECT * FROM courses")
            courses = self.cursor.fetchall()
            
            self.cursor.execute("SELECT * FROM faculty")
            faculty = self.cursor.fetchall()
            
            self.cursor.execute("SELECT * FROM venues")
            venues = self.cursor.fetchall()
            
            if not (courses and faculty and venues):
                messagebox.showwarning(
                    "Incomplete Data",
                    "You need at least one course, one faculty, and one venue to generate a timetable."
                )
                return
            
            messagebox.showinfo("Generated", "Timetable generation is not implemented yet.")
        except Exception as e:
            messagebox.showerror("Error", f"Failed to generate timetable: {str(e)}")


if __name__ == "__main__":
    root = tk.Tk()
    app = TimetableManager(root)
    root.mainloop()
