import { useState } from 'react';
import axios from 'axios';

function AddTaskForm ({onTaskAdded}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus ] = useState('Pending');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/api/tasks/', {
            title, 
            description,
            status,
        })
        .then(response => {
            setTitle('');
            setDescription('');
            setStatus('Pending');
            onTaskAdded();
        })
        .catch(error => {
            console.error('Error adding task: ', error)
        });
    };

    return (
        <form onSubmit = {handleSubmit}>
            <h3> Add New Task</h3>
            <input
                type = 'text'
                placeholder = 'Title'
                value = {title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            <br />
            <textarea
                placeholder =  "Description"
                value = {description}
                onChange={e => setDescription(e.target.value)}
            />
             <br />
            <select value={status} onChange={e => setStatus(e.target.value)}>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Done</option>
            </select>
            <br />
            <button type="submit">Add Task</button>
        </form>
    );
}

export default AddTaskForm;