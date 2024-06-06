import React, { useState, useRef } from 'react';
import Student from './Student';
import ReactToPrint from 'react-to-print';
import PrintComponent from './PrintComponent';
import '../index.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [grade, setGrade] = useState('');

  const nameInputRef = useRef();
  const surnameInputRef = useRef();
  const gradeInputRef = useRef();
  const printComponentRef = useRef();

  const handleKeyDown = (e, nextInputRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextInputRef.current.focus();
    }
  };

  const addStudent = () => {
    if (name && surname && grade) {
      const newStudent = { name, surname, grade: parseFloat(grade) };
      setStudents([...students, newStudent]);
      setName('');
      setSurname('');
      setGrade('');
      nameInputRef.current.focus();
    }
  };

  const deleteAllStudents = () => {
    setStudents([]);
  };

  const deleteStudent = (index) => {
    const newStudents = students.filter((_, i) => i !== index);
    setStudents(newStudents);
  };

  const calculateAverage = () => {
    if (students.length === 0) return 0;
    const totalGrades = students.reduce((total, student) => total + student.grade, 0);
    return (totalGrades / students.length).toFixed(2);
  };

  const sortStudents = (criteria) => {
    const sortedStudents = [...students].sort((a, b) => {
      if (criteria === 'name') return a.name.localeCompare(b.name);
      if (criteria === 'surname') return a.surname.localeCompare(b.surname);
      if (criteria === 'grade') return a.grade - b.grade;
      return 0;
    });
    setStudents(sortedStudents);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h1>Student Management</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="Name"
            value={name}
            ref={nameInputRef}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, surnameInputRef)}
          />
          <input
            type="text"
            placeholder="Surname"
            value={surname}
            ref={surnameInputRef}
            onChange={(e) => setSurname(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, gradeInputRef)}
          />
          <input
            type="text"
            placeholder="Grade"
            value={grade}
            ref={gradeInputRef}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/, '');
              setGrade(value);
            }}
            pattern="[0-9]*"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addStudent();
              }
            }}
          />
          <button onClick={addStudent}>Add Student</button>
        </div>
        <div className="button-group">
          <button onClick={deleteAllStudents}>Delete All Students</button>
          <button className="sort" onClick={() => sortStudents('name')}>Sort by Name</button>
          <button className="sort" onClick={() => sortStudents('surname')}>Sort by Surname</button>
          <button className="sort" onClick={() => sortStudents('grade')}>Sort by Grade</button>
        </div>
        <ReactToPrint
          trigger={() => <button className="print">Print</button>}
          content={() => printComponentRef.current}
        />
      </div>
      <div className="main-content">
        <div className="student-list">
          {students.map((student, index) => (
            <Student key={index} student={student} index={index} deleteStudent={deleteStudent} />
          ))}
        </div>
        <div className="average-grade">Average Grade: {calculateAverage()}</div>
      </div>
      <div style={{ display: 'none' }}>
        <PrintComponent ref={printComponentRef} students={students} />
      </div>
    </div>
  );
};

export default StudentList;
