import React from 'react';
import { render, screen } from '@testing-library/react';
import { TaskList } from '../TaskList';
import { Task } from '../../actions';

describe('TaskList', () => {
  const mockOnUpdateTask = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnToggleComplete = jest.fn();

  test('renders "No tasks available." when tasks array is empty', () => {
    render(
      <TaskList
        tasks={[]}
        onUpdateTask={mockOnUpdateTask}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />
    );
    expect(screen.getByText('No tasks available.')).toBeInTheDocument();
  });

  test('renders a list of TaskItem components when tasks are provided', () => {
    const tasks: Task[] = [
      { id: '1', title: 'Task 1', completed: false, description: 'Description 1' },
      { id: '2', title: 'Task 2', completed: true, description: 'Description 2' },
    ];

    render(
      <TaskList
        tasks={tasks}
        onUpdateTask={mockOnUpdateTask}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />
    );

    expect(screen.queryByText('No tasks available.')).not.toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});