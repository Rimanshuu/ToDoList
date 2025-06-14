
import { useEffect, useState } from 'react';
import axios from 'axios';

function TaskList({refresh}) {
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editStatus, setEditStatus] = useState('');

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tasks/')
            .then(response => setTasks(response.data))
            .catch(error =>
                console.error('Error fetching tasks: ', error))
    }, [refresh]);

    const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`)
        .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
        })
        .catch(error => {
        console.error('Error deleting task:', error);
        });
    };

    const handleUpdateTask = (id) => {
        axios.put(`http://127.0.0.1:8000/api/tasks/${id}/`, {
            title: editTitle,
            description: editDescription,
            status: editStatus
        })
        .then(() => {
            setEditingTaskId(null);
            setTasks(tasks.map(t => t.id === id ? {
            ...t,
            title: editTitle,
            description: editDescription,
            status: editStatus
            } : t));
        })
        .catch(error => {
            console.error("Error updating task:", error);
        });
    };

    const handleEditClick = (task) => {
        setEditingTaskId(task.id);
        setEditTitle(task.title);
        setEditDescription(task.description || '');
        setEditStatus(task.status || 'Pending');
    };




    return (
        <div>
            <h2>My Tasks</h2>
            <div className="task-list">
                {tasks.map(task => (
                    <div key={task.id} className="task">
                    {editingTaskId === task.id ? (
                        <>
                        <div className="task-details">
                            <input
                            type="text"
                            value={editTitle}
                            onChange={e => setEditTitle(e.target.value)}
                            />
                            <textarea
                            value={editDescription}
                            onChange={e => setEditDescription(e.target.value)}
                            />
                            <select
                            value={editStatus}
                            onChange={e => setEditStatus(e.target.value)}
                            >
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Done</option>
                            </select>
                        </div>
                        <div className="button-group">
                            <button onClick={() => handleUpdateTask(task.id)}>Save</button>
                            <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                            <button onClick={() => handleDelete(task.id)}>🗑️</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="task-details">
                            <strong>{task.title}</strong> – {task.status}
                        </div>
                        <div className="button-group">
                            <button onClick={() => handleEditClick(task)}>Edit</button>
                            <button onClick={() => handleDelete(task.id)}>🗑️</button>
                        </div>
                    </>
                )}
                </div>
            ))}
            </div>
        </div>
        );

} 
    
export default TaskList;

