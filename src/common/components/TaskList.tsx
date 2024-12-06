import React from 'react';
import { Task } from '../actions';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onUpdateTask,
  onDelete,
  onToggleComplete,
}) => {

  return (
    <div className="app-task-list">
    {tasks.length === 0 ? (
      <p className="text-gray-500">No tasks available.</p>
    ) : (
      <ul className="space-y-4">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdateTask={onUpdateTask}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </ul>
    )}
  </div>
  );
};

export default TaskList;