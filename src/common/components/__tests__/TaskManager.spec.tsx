import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskManager } from '../TaskManager';

describe('TaskManager', () => {
  test('renders without tasks', () => {
    render(<TaskManager />);
    expect(screen.getByText('No tasks available.')).toBeInTheDocument();
  });

  test('adds a new task', () => {
    render(<TaskManager />);
    const input = screen.getByPlaceholderText('Task Title');
    const addButton = screen.getByText('Add Task');

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  test('updates a task', () => {
    render(<TaskManager />);
    const input = screen.getByPlaceholderText('Task Title');
    const addButton = screen.getByText('Add Task');

    fireEvent.change(input, { target: { value: 'Old Task' } });
    fireEvent.click(addButton);

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    const editInput = screen.getByDisplayValue('Old Task');
    fireEvent.change(editInput, { target: { value: 'Updated Task' } });
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(screen.getByText('Updated Task')).toBeInTheDocument();
    expect(screen.queryByText('Old Task')).not.toBeInTheDocument();
  });

  test('deletes a task', () => {
    render(<TaskManager />);
    const input = screen.getByPlaceholderText('Task Title');
    const addButton = screen.getByText('Add Task');

    fireEvent.change(input, { target: { value: 'Task to Delete' } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Task to Delete')).not.toBeInTheDocument();
  });

  test('toggles task completion', () => {
    render(<TaskManager />);
    const input = screen.getByPlaceholderText('Task Title');
    const addButton = screen.getByText('Add Task');

    fireEvent.change(input, { target: { value: 'Toggle Task' } });
    fireEvent.click(addButton);

    const checkbox = screen.getByTestId('complete-button');
    fireEvent.click(checkbox);

    expect(screen.getByText('Toggle Task')).toHaveClass('task-title-completed');
  });
});