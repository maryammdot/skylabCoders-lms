import React from 'react'

export default ({ students }) => {
    return students.length
    ? 
    students.map(student => (
        <div key={student.id}>
            <h3>{student.username}</h3>
            <small>{student.email}</small>
        </div>
    ))
    :
    "No students yet..."
}