import React from 'react';

const PrintComponent = React.forwardRef((props, ref) => {
  const currentDate = new Date().toLocaleDateString();
  let i = 1;
  return (
    <div ref={ref} className="print-container">
      <h1>Student Grades</h1>
      
      {props.students.map((student, index) => (
        
        <div key={index} className="print-student">
          <span>{`${i++}. ${student.name} ${student.surname} (Grade: ${student.grade})`}</span>
        </div>
      ))}
      <h3 id="printDate">{currentDate}</h3>
    </div>
  );
});

export default PrintComponent;
