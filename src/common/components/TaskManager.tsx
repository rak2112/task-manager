import React, { useReducer, useState } from 'react';
import { taskReducer, initialState } from '../reducers/taskReducer';
import { TaskList } from './TaskList';
import { TaskForm } from './Form';
import { Task } from '../actions';
import '../../styles/taskManager.css';

export const TaskManager: React.FC = () => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const addTask = (task: Task) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  };

  const updateTask = (task: Task) => {
    dispatch({ type: 'UPDATE_TASK', payload: task });
    setTaskToEdit(null);
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const toggleTaskCompleted = (id: string) => {
    dispatch({ type: 'TOGGLE_TASK_COMPLETED', payload: id });
  };

  return (
    <div className="app-container">
    <h1 className="app-heading">Task Manager</h1>
    <div className="app-content">
      <TaskForm
        onSubmit={taskToEdit ? updateTask : addTask}
        initialTask={taskToEdit || undefined}
      />
      <TaskList
        tasks={state.tasks}
        onUpdateTask={updateTask}
        onDelete={deleteTask}
        onToggleComplete={toggleTaskCompleted}
      />
    </div>
  </div>
  );
};
