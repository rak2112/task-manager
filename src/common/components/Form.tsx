import React, { useState } from 'react';
import { Task } from '../actions';

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  initialTask?: Task;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialTask }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(
    initialTask?.description || ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '') return;

    onSubmit({
      id: initialTask?.id || Date.now().toString(),
      title,
      description,
      completed: initialTask?.completed || false,
    });
    setTitle('');
    setDescription('');
  };

  return (
    <div className="app-form">
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
                <label className="form-label" htmlFor='task-title'>Title</label>
                <input
                    id='task-title'
                    type="text"
                    className="input-field"
                    placeholder="Task Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="mb-2">
                <label className="form-label" htmlFor='task-description'>Description</label>
                <textarea
                    id='task-description'
                    className="input-field"
                    placeholder="Task Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                {initialTask ? 'Update' : 'Add'} Task
            </button>
        </form>
    </div>
  );
};
