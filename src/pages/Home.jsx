import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const token = localStorage.getItem('token');

  const fetchTasks = async () => {
    const { data } = await axios.get('/api/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTask) return;

    const { data } = await axios.post(
      '/api/tasks',
      { title: newTask },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTasks([...tasks, data]);
    setNewTask('');
  };

  const handleToggle = async (id, currentStatus) => {
    const { data } = await axios.put(
      `/api/tasks/${id}`,
      { completed: !currentStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTasks(tasks.map((t) => (t._id === id ? data : t)));
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(tasks.filter((t) => t._id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/auth';
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <button onClick={logout} className="text-red-600 font-semibold">
          Logout
        </button>
      </div>
      <form onSubmit={handleAdd} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow border p-2 rounded"
        />
        <button className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">
          Add
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex justify-between items-center border-b py-2"
          >
            <span
              onClick={() => handleToggle(task._id, task.completed)}
              className={`flex-1 cursor-pointer ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {task.title}
            </span>
            <button
              onClick={() => handleDelete(task._id)}
              className="text-red-500 font-bold ml-4"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
