"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaCheck } from "react-icons/fa";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState(""); // Added description state
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch tasks from API using Axios
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getTasks`); 
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Add or update task
  const handleSubmit = async () => {
    if (!task.trim()) return;

    const newTask = { title: task, description, priority, dueDate };
    try {
      if (editId) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/updateTask`, { id: editId, ...newTask });
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/addTask`, newTask);
      }
      setTask("");
      setDescription(""); // Clear description on submit
      setPriority("Low");
      setDueDate("");
      setEditId(null);
      refreshTasks();
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  // Delete a task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/deleteTask`, { data: { id } });
      refreshTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Mark task as completed or uncompleted
  const handleComplete = async (id, completed) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/toggleTaskCompletion`, { id, completed: !completed });
      refreshTasks();
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  // Fetch updated tasks
  const refreshTasks = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getTasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error refreshing tasks:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white/80 backdrop-blur-md shadow-xl rounded-lg border border-gray-200 mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📝 Task Manager</h1>

      {/* Input Field & Button */}
      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter your task title..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <textarea
          placeholder="Enter task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <div className="flex gap-4">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-transform transform hover:scale-105"
          >
            <FaPlus /> {editId ? "Update" : "Add"}
          </button>
        </div>
      </div>

      {/* Task List */}
      <ul className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map(({ id, title, description, completed, priority, dueDate }) => (
            <li key={id} className="flex justify-between items-start bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex flex-col gap-2">
                <span className={`font-medium ${completed ? "line-through text-gray-500" : ""}`}>
                  {title}
                </span>
                <span className={`text-${priority === "High" ? "red" : priority === "Medium" ? "yellow" : "green"}-500 ml-2`}>
                  {priority} Priority
                </span>
                {dueDate && (
                  <span className="text-sm text-gray-500 ml-2">{dueDate}</span>
                )}
                <p className="text-gray-600">{description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setTask(title);
                    setDescription(description); // Set description for editing
                    setEditId(id);
                  }}
                  className="text-yellow-500 hover:text-yellow-600 transition"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(id)}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <FaTrash size={18} />
                </button>
                <button
                  onClick={() => handleComplete(id, completed)}
                  className={`text-${completed ? "green" : "blue"}-500 hover:text-${completed ? "green" : "blue"}-600 transition`}
                >
                  {completed ? "Undo" : "Complete"}
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks added yet. Start by adding one! 🚀</p>
        )}
      </ul>
    </div>
  );
}
