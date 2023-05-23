import { useEffect, useState } from 'react'
import './styles/active.scss'
import edit from '../assets/edit.svg'
import deleteImg from '../assets/delete.png'
import cancel from '../assets/cancel.png'

const Active = (props) => {
    const {
        tasks,
        toggleTaskStatus,
        deleteTask,
        startEditTask,
        saveEditedTask,
        cancelEditTask,
        editTaskId,
        editedTaskTitle,
        editedTaskDescription,
        setEditTaskId,
        setEditedTaskTitle,
        setEditedTaskDescription,
    } = props

  return (
    <div className="active">
      <div className="checkbox">
        <ul>
          {tasks
            .filter((task) => !task.completed)
            .map((task) => (
              <li 
                key={task.id}
                style={{ textDecoration: task.checked ? 'line-through' : 'none' }}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskStatus(task.id)}
                />
                {editTaskId === task.id ? (
                  <form className='edit'>
                    <input
                      type="text"
                      maxLength={24}
                      value={editedTaskTitle}
                      onChange={(event) => setEditedTaskTitle(event.target.value)}
                    />
                    <textarea
                      placeholder="Details"
                      rows="3"
                      value={editedTaskDescription}
                      onChange={(event) => setEditedTaskDescription(event.target.value)}
                    />
                    <button onClick={() => saveEditedTask(task.id, editedTaskTitle, editedTaskDescription)}>
                      Save
                    </button>
                    <button onClick={() => cancelEditTask(task.id)}>
                        <img src={cancel} alt='cancel' />
                    </button>
                  </form>
                ) : (
                  <div className="task-content">
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                    <button
                        className='btn'
                        onClick={() => startEditTask(task.id, task.title, task.description)}
                    >
                        <img src={edit} alt='edit' />
                    </button>
                    <button
                        className='btn'
                        onClick={() => deleteTask(task.id)}
                    >
                        <img src={deleteImg} alt='delete' style={{ width: '20px', height: '20px'}} />
                    </button>
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Active;
