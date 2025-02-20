import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import toast from "react-hot-toast";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.uid) {
      axios.get(`http://localhost:5000/tasks/${user.uid}`)
        .then(res => setTasks(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  // Move Task Function
  const moveTask = (taskId, newStatus) => {
    axios.patch(`http://localhost:5000/tasks/${taskId}`, { status: newStatus })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          setTasks(tasks.map(task => 
            task._id === taskId ? { ...task, status: newStatus } : task
          ));
          toast.success(`Moved to ${newStatus}`);
        }
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to move task.");
      });
  };

  // Add Task Function
  const addTask = () => {
    const title = prompt("Enter task title:");
    if (!title || title.length > 50) {
      toast.error("Title is required and must be less than 50 characters.");
      return;
    }
    const description = prompt("Enter task description (optional):");
    const newTask = {
      title,
      description,
      status: "To-Do",
      userId: user.uid
    };
    axios.post(`http://localhost:5000/tasks`, newTask)
      .then(res => {
        setTasks([...tasks, res.data]);
        toast.success("Task Added!");
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to add task.");
      });
  };

  // Delete Task Function
  const deleteTask = (taskId) => {
    axios.delete(`http://localhost:5000/tasks/${taskId}`)
      .then(res => {
        if (res.data.deletedCount > 0) {
          setTasks(tasks.filter(task => task._id !== taskId));
          toast.success("Task Deleted!");
        }
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to delete task.");
      });
  };

  // Edit Task Function
  const editTask = (taskId) => {
    const title = prompt("Edit task title:");
    const description = prompt("Edit task description (optional):");
    
    if (!title || title.length > 50) {
      toast.error("Title is required and must be less than 50 characters.");
      return;
    }
    
    // Use PATCH if you're partially updating the task
    axios.patch(`http://localhost:5000/tasks/${taskId}`, { title, description })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          setTasks(tasks.map(task => 
            task._id === taskId ? { ...task, title, description } : task
          ));
          toast.success("Task Updated!");
        }
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to update task.");
      });
  };
  

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6">📌 Task Board</h2>

        {user ? (
          <>
            <button 
              onClick={addTask} 
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
            >
              ➕ Add Task
            </button>

            <div className="grid md:grid-cols-3 gap-6">
              <TaskColumn title="To-Do" color="blue" tasks={tasks} status="To-Do" moveTask={moveTask} deleteTask={deleteTask} editTask={editTask} />
              <TaskColumn title="In Progress" color="yellow" tasks={tasks} status="In Progress" moveTask={moveTask} deleteTask={deleteTask} editTask={editTask} />
              <TaskColumn title="Done" color="green" tasks={tasks} status="Done" moveTask={moveTask} deleteTask={deleteTask} editTask={editTask} />
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 mt-6">Please log in to see your tasks.</p>
        )}
      </div>
    </DndProvider>
  );
};

// Task Column Component
const TaskColumn = ({ title, color, tasks, status, moveTask, deleteTask, editTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div 
      ref={drop} 
      className={`p-4 rounded-lg shadow-md ${isOver ? "bg-gray-300" : "bg-gray-100"}`}
    >
      <h3 className={`text-xl font-semibold text-${color}-600 mb-3`}>{title}</h3>
      {tasks.filter(task => task.status === status).length > 0 ? (
        tasks.filter(task => task.status === status).map(task => (
          <TaskCard key={task._id} task={task} deleteTask={deleteTask} editTask={editTask} />
        ))
      ) : (
        <p className="text-gray-500">No tasks</p>
      )}
    </div>
  );
};

// Task Card Component
const TaskCard = ({ task, deleteTask, editTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div 
      ref={drag} 
      className={`border p-3 rounded-md mb-2 shadow ${isDragging ? "bg-gray-200" : "bg-white"}`}
    >
      <h4 className="font-bold">{task.title}</h4>
      {task.description && <p>{task.description}</p>}
      <div className="flex justify-between mt-2">
        <button onClick={() => editTask(task._id)} className="text-blue-500 hover:underline">Edit</button>
        <button onClick={() => deleteTask(task._id)} className="text-red-500 hover:underline">Delete</button>
      </div>
    </div>
  );
};

export default TaskBoard;
