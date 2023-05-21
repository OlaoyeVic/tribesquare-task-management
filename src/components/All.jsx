import { useEffect, useState } from 'react'
import './styles/all.scss'

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
        setEditedTaskDescription
    } = props
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [newTaskDescription, setNewTaskDescription] = useState('')
  
    useEffect(() => {
      // Load tasks from local storage on component mount
      const storedTasks = localStorage.getItem('tasks')
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks))
      }
    }, [])
  
    useEffect(() => {
      // Save tasks to local storage whenever tasks state changes
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])
  
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
        <div className="all">
            <div className="input">
                <form>
                    <input 
                        type="text" 
                        placeholder="Title"
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
                                <form>
                                    <input
                                    type="text"
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
                                    <button onClick={() => cancelEditTask(task.id)}>Cancel</button>
                                </form>
                                ) : (
                                <div className="task-content">
                                    <h1>{task.title}</h1>
                                    <p>{task.description}</p>
                                    <button
                                        className='btn'
                                        onClick={() => startEditTask(task.id, task.title, task.description)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className='btn'
                                        onClick={() => deleteTask(task.id)}
                                    >
                                        Delete
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