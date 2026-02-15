import { useEffect, useState } from "react";
import "./App.css";

function App() {
  /* ===============================
     STATE SECTION
  =============================== */

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [studentForm, setStudentForm] = useState({
    name: "",
    age: "",
    courseId: ""
  });
  const [courseForm, setCourseForm] = useState({
    name: "",
    duration: ""
  });

  /* ===============================
     FETCH FUNCTIONS
  =============================== */

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:3000/students");
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:3000/courses");
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  /* ===============================
     ADD FUNCTIONS
  =============================== */

  const addCourse = async () => {
    if (!courseForm.name || !courseForm.duration) {
      alert("Fill all course fields");
      return;
    }

    try {
      await fetch("http://localhost:3000/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseForm)
      });
      setCourseForm({ name: "", duration: "" });
      fetchCourses();
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const addStudent = async () => {
    if (!studentForm.name || !studentForm.age || !studentForm.courseId) {
      alert("Fill all student fields");
      return;
    }

    try {
      await fetch("http://localhost:3000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: studentForm.name,
          age: Number(studentForm.age),
          courseId: Number(studentForm.courseId)
        })
      });
      setStudentForm({ name: "", age: "", courseId: "" });
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  /* ===============================
     UI SECTION
  =============================== */
  return (
    <div className="container">
      <h1>Student Management System</h1>
      
      <div className="content-wrapper">
        {/* COURSE SECTION */}
        <div className="section course-section">
          <h2>Add Course</h2>
          <div className="form-group">
            <input
              className="input-field"
              placeholder="Course Name"
              value={courseForm.name}
              onChange={(e) =>
                setCourseForm({ ...courseForm, name: e.target.value })
              }
            />
            <input
              className="input-field"
              placeholder="Duration (e.g., 3 months)"
              value={courseForm.duration}
              onChange={(e) =>
                setCourseForm({ ...courseForm, duration: e.target.value })
              }
            />
            <button className="btn btn-primary" onClick={addCourse}>
              Add Course
            </button>
          </div>

          <h3>Courses List</h3>
          <div className="list-container">
            {courses.length === 0 ? (
              <p className="empty-message">No courses yet</p>
            ) : (
              courses.map((course) => (
                <div key={course.id} className="list-item course-item">
                  <span className="item-name">{course.name}</span>
                  <span className="item-detail">{course.duration}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* STUDENT SECTION */}
        <div className="section student-section">
          <h2>Add Student</h2>
          <div className="form-group">
            <input
              className="input-field"
              placeholder="Student Name"
              value={studentForm.name}
              onChange={(e) =>
                setStudentForm({ ...studentForm, name: e.target.value })
              }
            />
            <input
              className="input-field"
              type="number"
              placeholder="Age"
              value={studentForm.age}
              onChange={(e) =>
                setStudentForm({ ...studentForm, age: e.target.value })
              }
            />
            <select
              className="input-field select-field"
              value={studentForm.courseId}
              onChange={(e) =>
                setStudentForm({ ...studentForm, courseId: e.target.value })
              }
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            <button className="btn btn-primary" onClick={addStudent}>
              Add Student
            </button>
          </div>

          <h3>Students List</h3>
          <div className="list-container">
            {students.length === 0 ? (
              <p className="empty-message">No students yet</p>
            ) : (
              students.map((student) => (
                <div key={student.id} className="list-item student-item">
                  <div className="item-info">
                    <span className="item-name">{student.name}</span>
                    <span className="item-detail">Age: {student.age}</span>
                  </div>
                  <span className="item-course">Course ID: {student.courseId}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


