import React, { useState } from 'react';
import { Task } from '../actions';

interface TaskItemProps {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdateTask, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Update the task with new values
    onUpdateTask({
      ...task,
      title: editTitle,
      description: editDescription,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Revert changes
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  return (
    <li className="task-container">
      {isEditing ? (
        <form onSubmit={handleSave} className="w-full">
          <div className="mb-2">
            <label className="form-label" htmlFor={`edit-title-${task.id}`}>Title</label>
            <input
              id={`edit-title-${task.id}`}
              type="text"
              className="input-field"
              placeholder="Task Title"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label className="form-label" htmlFor={`edit-desc-${task.id}`}>Description</label>
            <textarea
              id={`edit-desc-${task.id}`}
              className="input-field"
              placeholder="Task Description"
              value={editDescription}
              onChange={e => setEditDescription(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button type="submit" className="btn btn-green text-sm">
              Save
            </button>
            <button type="button" className="btn btn-red text-sm" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between w-full">
          <div>
            <h3 className={task.completed ? 'task-title-completed' : 'task-title'}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-gray-700">{task.description}</p>
            )}
          </div>
          <div className="space-x-2">
            <button
              data-testid="complete-button"
              onClick={() => onToggleComplete(task.id)}
              className="btn btn-green text-sm"
            >
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-yellow text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="btn btn-red text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem; 