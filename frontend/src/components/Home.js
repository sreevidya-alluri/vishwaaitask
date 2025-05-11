import React, { useEffect, useState } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faSignOutAlt, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import TaskForm from './TaskForm';

const Home = ({ onLogout }) => {
  const [taskItems, setTaskItems] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const openForm = (task = null) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  const fetchAllItems = async () => {
    try {
      const res = await fetch("http://localhost:5000/tasks");
      const data = await res.json();
      setTaskItems(data.task);
      setFilteredTasks(data.task);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchAllItems();
  }, []);

  useEffect(() => {
    let result = [...taskItems];
    if (searchTerm) {
      result = result.filter(task => 
        task.Title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (task.Description && task.Description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
   
    if (statusFilter !== 'all') {
      result = result.filter(task => task.Status === statusFilter);
    }
    
    setFilteredTasks(result);
  }, [searchTerm, statusFilter, taskItems]);

  const handleSubmit = (updatedTask) => {
    if (taskToEdit) {
   
      setTaskItems((prev) => 
        prev.map((task) => task.ID === updatedTask.ID ? updatedTask : task)
      );
    } else {
    
      setTaskItems((prev) => [...prev, updatedTask]);
    }
    closeForm();
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await fetch(`http://localhost:5000/tasks/${taskId}`, {
          method: "DELETE",
        });
        
        setTaskItems((prev) => prev.filter(task => task.ID !== taskId));
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h2>All Tasks</h2>
        <div>
          <FontAwesomeIcon 
            icon={faPlus} 
            onClick={() => openForm()} 
            title="Add Task" 
            className="icon-btn" 
          />
          <FontAwesomeIcon 
            icon={faFilter} 
            onClick={toggleFilters} 
            title="Filter Tasks" 
            className={`icon-btn ${showFilters ? 'active' : ''}`} 
          />
          <FontAwesomeIcon 
            icon={faSignOutAlt} 
            onClick={onLogout} 
            title="Logout" 
            className="icon-btn" 
          />
        </div>
      </div>
      
      {showFilters && (
        <div className="filter-container">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="status-filter">
            <label>Status:</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Done</option>
            </select>
          </div>
          
          <button onClick={clearFilters} className="clear-filter-btn">
            Clear Filters
          </button>
        </div>
      )}

      {showForm && (
        <div className="modal-overlay" onClick={closeForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeForm}>×</button>
            <TaskForm 
              existingTask={taskToEdit} 
              onClose={closeForm} 
              onSubmit={handleSubmit} 
            />
          </div>
        </div>
      )}

      {filteredTasks.length === 0 ? (
        <p className="no-tasks">
          {taskItems.length === 0 ? "No tasks found." : "No tasks match your search criteria."}
        </p>
      ) : (
        <div className="task-list">
          {filteredTasks.map((task) => (
            <div key={task.ID} className="task-card">
              <div className="task-icons">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="icon-btn"
                  onClick={() => openForm(task)} 
                  title="Edit Task"
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="icon-btn"
                  onClick={() => handleDelete(task.ID)}
                  title="Delete Task"
                />
              </div>
              <h3 className="task-title">{task.Title}</h3>
              <p className="task-description">{task.Description}</p>
              <p className="task-status">Status: {
                task.Status === 'pending' ? 'Pending' :
                task.Status === 'in-progress' ? 'In Progress' :
                task.Status === 'completed' ? 'Done' : task.Status
              }</p>
              {task.DueDate && <p className="task-due-date">Due: {task.DueDate}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
