import './styles/completed.scss'
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
    setEditedTaskDescription, }) => {
    return (
        <div className="completed">
            <div className='checkbox'>
            <ul>
                {tasks
                    .filter((task) => task.completed)
                    .map((task) => (
                    <li 
                        style={{ textDecoration: task.checked ? 'line-through' : 'none' }}
                        key={task.id}>
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
export default Completed