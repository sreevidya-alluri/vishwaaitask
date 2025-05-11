import React, { useState, useEffect } from 'react';
import './TaskForm.css';

const TaskForm = ({ onClose, onSubmit, existingTask }) => {
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    Status: 'pending',
    DueDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (existingTask) {
      // Ensure DueDate is properly formatted for date input
      const formattedTask = {
        ...existingTask,
        DueDate: existingTask.DueDate ? existingTask.DueDate.split('T')[0] : ''
      };
      setFormData(formattedTask);
    }
  }, [existingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    const method = existingTask ? 'PUT' : 'POST';
    const url = existingTask
      ? `http://localhost:5000/tasks/${existingTask.ID}`
      : 'http://localhost:5000/tasks';

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      onSubmit(data.task);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to save task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form align-all">
      <h3>{existingTask ? 'Edit Task' : 'Add New Task'}</h3>
      
      {error && <div className="error-message">{error}</div>}
      
      <input 
        name="Title" 
        placeholder="Title" 
        value={formData.Title || ''} 
        onChange={handleChange} 
        required 
      />
      
      <textarea 
        name="Description" 
        placeholder="Description" 
        value={formData.Description || ''} 
        onChange={handleChange} 
      />
      
      <select name="Status" value={formData.Status || 'pending'} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Done</option>
      </select>
      
      <input 
        type="date" 
        name="DueDate" 
        value={formData.DueDate || ''} 
        onChange={handleChange} 
      />
      
      <div className="form-buttons">
        <button type="button" onClick={onClose}>Cancel</button>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : existingTask ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;