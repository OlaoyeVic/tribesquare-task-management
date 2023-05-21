import { useEffect, useState } from 'react';
import './styles/tabs.scss'
import All from './All'
import Active from './Active'
import Completed from './Completed';

const Tabs = () => {
    const [activeIndex, setActiveIndex] = useState(1)
    const [tasks, setTasks] = useState([])
    const [editTaskId, setEditTaskId] = useState(null)
    const [editedTaskTitle, setEditedTaskTitle] = useState('');
    const [editedTaskDescription, setEditedTaskDescription] = useState('')


    const handleClick = (index) => setActiveIndex(index)
    const checkActive = (index, className) => activeIndex === index ? className : ""

    const addTask = (newTask) => {
        setTasks([...tasks, newTask])
        localStorage.setItem('tasks', JSON.stringify(updatedItems))
      }
    
      const toggleTaskStatus = (taskId) => {
        const updatedTasks = tasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              completed: !task.completed,
            }
          }
          return task
        })
        setTasks(updatedTasks)
        localStorage.setItem('tasks', JSON.stringify(updatedItems))
      }
    
    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId)
        setTasks(updatedTasks)
    }
    
    const startEditTask = (taskId, taskTitle, taskDescription) => {
        setEditTaskId(taskId)
        setEditedTaskTitle(taskTitle)
        setEditedTaskDescription(taskDescription)
    }
    
    const saveEditedTask = (taskId, editedTaskTitle, editedTaskDescription) => {
        const updatedTasks = tasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              title: editedTaskTitle,
              description: editedTaskDescription,
            }
          }
          return task
        })
        setTasks(updatedTasks)
        setEditTaskId(null)
        setEditedTaskTitle('')
        setEditedTaskDescription('')
    }
    
    const cancelEditTask = (taskId) => {
        setEditTaskId(null)
    }
    
    const deleteAllCompletedTasks = () => {
        const updatedTasks = tasks.filter((task) => !task.completed)
        setTasks(updatedTasks)
    }

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks')
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks))
        }
      }, [])
    
      // Save tasks to localStorage when they change
      useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    return (
        <>
            <div className="tabs">
                <button
                    className={`tab ${checkActive(1, "active")}`}
                    onClick={
                        () => handleClick(1)

                    }
                >
                    All
                </button>
                <button
                    className={`tab ${checkActive(2, "active")}`}
                    onClick={() => handleClick(2)}
                >
                    Active
                </button>
                <button
                    className={`tab ${checkActive(3, "active")}`}
                    onClick={() => handleClick(3)}
                >
                    Completed
                </button>
            </div>
            <div className="panels">
              <div className={`panel ${checkActive(1, "active")}`}>
              <All
                tasks={tasks}
                setTasks={setTasks}
                addTask={addTask}
                toggleTaskStatus={toggleTaskStatus}
                deleteTask={deleteTask}
                startEditTask={startEditTask}
                saveEditedTask={saveEditedTask}
                cancelEditTask={cancelEditTask}
                editTaskId={editTaskId}
                editedTaskTitle={editedTaskTitle}
                editedTaskDescription={editedTaskDescription}
                setEditTaskId={setEditTaskId}
                setEditedTaskTitle={setEditedTaskTitle}
                setEditedTaskDescription={setEditedTaskDescription}
              />
              </div>
              <div className={`panel ${checkActive(2, "active")}`}>
                <Active
                    tasks={tasks}
                    toggleTaskStatus={toggleTaskStatus}
                    deleteTask={deleteTask}
                    startEditTask={startEditTask}
                    saveEditedTask={saveEditedTask}
                    cancelEditTask={cancelEditTask}
                    editTaskId={editTaskId}
                    editedTaskTitle={editedTaskTitle}
                    editedTaskDescription={editedTaskDescription}
                    setEditTaskId={setEditTaskId}
                    setEditedTaskTitle={setEditedTaskTitle}
                    setEditedTaskDescription={setEditedTaskDescription}
                />
              </div>
              <div className={`panel ${checkActive(3, "active")}`}>
                <Completed
                    tasks={tasks}
                    setTasks={setTasks}
                    toggleTaskStatus={toggleTaskStatus}
                    deleteTask={deleteTask}
                    startEditTask={startEditTask}
                    saveEditedTask={saveEditedTask}
                    cancelEditTask={cancelEditTask}
                    editTaskId={editTaskId}
                    editedTaskTitle={editedTaskTitle}
                    editedTaskDescription={editedTaskDescription}
                    setEditTaskId={setEditTaskId}
                    setEditedTaskTitle={setEditedTaskTitle}
                    setEditedTaskDescription={setEditedTaskDescription}
                    deleteAllCompletedTasks={deleteAllCompletedTasks}
                />
              </div>
            </div>
        </>
    )
}
export default Tabs