import { useState } from 'react'
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm'
import './App.css';


function App() {

  const [refresh, setRefresh] = useState(false);

  const handleTaskAdded = () => setRefresh(!refresh);


  return (
    <div className="container">
      <h1>To-Do App</h1>
      <AddTaskForm onTaskAdded={handleTaskAdded} />
      <TaskList refresh={refresh} />
    </div>
  );
}

export default App;
