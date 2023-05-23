import { useEffect, useState } from 'react'
import './styles/all.scss'
import edit from '../assets/edit.svg'
import deleteImg from '../assets/delete.png'
import cancel from '../assets/cancel.png'

const All = (props) => {
    const {
        tasks, 
        setTasks, 
        addTask, 
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
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [newTaskDescription, setNewTaskDescription] = useState('')
  
    const handleAddTask = (event) => {
      event.preventDefault();
      if (newTaskTitle) {
        const newTask = {
          id: Date.now(),
          title: newTaskTitle,
          description: newTaskDescription,
          completed: false,
        };
        addTask(newTask)
        setNewTaskTitle('')
        setNewTaskDescription('')
      }
    }
    

    return (
        <div className='all'>
            <div className="input">
                <form>
                    <input 
                        type="text" 
                        placeholder="Title"
                        maxLength={24}
                        value={newTaskTitle}
                        onChange={(event) => setNewTaskTitle(event.target.value)}
                    />
                    <textarea
                        name="content"
                        placeholder="Details"
                        rows="3"
                        value={newTaskDescription}
                        onChange={(event) => setNewTaskDescription(event.target.value)}
                    />
                    <button 
                        type='submit' 
                        onClick={handleAddTask}
                    >
                        Add
                    </button>
                </form>
            </div>
            <div className='checkbox'>
                <ul>
                    {tasks.map((task) => (
                        <li 
                            key={task.id}
                            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
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
    )
}
export default All