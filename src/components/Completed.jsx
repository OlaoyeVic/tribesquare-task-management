import './styles/completed.scss'
import edit from '../assets/edit.svg'
import deleteImg from '../assets/delete.png'
import cancel from '../assets/cancel.png'

const Completed = ({ 
    tasks, 
    deleteAllCompletedTasks, 
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
    }) => {
    const completedTasks = tasks.filter((task) => task.completed)
    console.log(completedTasks)

    return (
        <div className="completed">
            <div className='checkbox'>
                <div className='delete-all'>
                    {completedTasks.length > 0 && (
                        <button
                            type='submit'
                            onClick={deleteAllCompletedTasks}
                        >
                            Delete All
                        </button>
                    )}
                </div>
                <ul>
                    {tasks
                        .filter((task) => task.completed)
                        .map((task) => (
                        <li 
                            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                            key={task.id}>
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
                                onChange={(e) => setEditedTaskTitle(e.target.value)}
                                />
                                <textarea
                                placeholder="Details"
                                rows="3"
                                value={editedTaskDescription}
                                onChange={(e) => setEditedTaskDescription(e.target.value)}
                                />
                                <button onClick={() => saveEditedTask(task.id, editedTaskTitle, editedTaskDescription)}>
                                Save
                                </button>
                                <button onClick={() => cancelEditTask(task.id)}>
                                    <img src={cancel} alt='canel' />
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
export default Completed