import React from 'react';

// Student component to display individual student information
const Student = ({ student, index, deleteStudent }) => {
  return (
    <div className="student-item">
      <div className="student-info">
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Surname:</strong> {student.surname}</p>
        <p><strong>Grade:</strong> {student.grade}</p>
      </div>
      <button className="delete-button" onClick={() => deleteStudent(index)}>Delete</button>
    </div>
  );
};

export default Student;
