import React from 'react'

export default ({ users, deleteUser,togglePrivileges }) => {
    return users.length 
    ? 
    users.map(user => (
        <div key={user.id}>
            <h3>{user.username} ==> {user.privileges}</h3>
            {
                !user.role && user.promotion &&
                <p>{user.promotion.name} | {user.promotion.season}</p>
            }
            {
                user.exercises && user.exercises &&
                user.exercises.map(exercise => <p key={exercise.id}>{exercise.title} | {exercise.state}</p>)
            }
            <p>{user.email}</p>
            <div>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
                <button onClick={() => togglePrivileges(user.id)}>Change privileges</button>
            </div>
        </div>
    ))
    :
    "No users yet..."
}