import { taskReducer, initialState } from '../taskReducer';
import { Task, TaskAction, State } from '../../actions';

describe('taskReducer', () => {
  test('returns initial state when given undefined state', () => {
    const action = {} as TaskAction;
    const state = taskReducer(undefined as unknown as State, action);
    expect(state).toEqual(initialState);
  });

  test('handles ADD_TASK action', () => {
    const newTask: Task = { id: '1', title: 'New Task', completed: false };
    const action: TaskAction = { type: 'ADD_TASK', payload: newTask };
    const state = taskReducer(initialState, action);
    expect(state.tasks).toHaveLength(1);
    expect(state.tasks[0]).toEqual(newTask);
  });

  test('handles UPDATE_TASK action', () => {
    const existingTask: Task = { id: '1', title: 'Existing Task', completed: false };
    const updatedTask: Task = { id: '1', title: 'Updated Task', completed: true };
    const stateWithTask: State = { tasks: [existingTask] };
    const action: TaskAction = { type: 'UPDATE_TASK', payload: updatedTask };
    const state = taskReducer(stateWithTask, action);
    expect(state.tasks[0]).toEqual(updatedTask);
  });

  test('handles DELETE_TASK action', () => {
    const task1: Task = { id: '1', title: 'Task 1', completed: false };
    const task2: Task = { id: '2', title: 'Task 2', completed: true };
    const stateWithTasks: State = { tasks: [task1, task2] };
    const action: TaskAction = { type: 'DELETE_TASK', payload: '1' };
    const state = taskReducer(stateWithTasks, action);
    expect(state.tasks).toHaveLength(1);
    expect(state.tasks[0]).toEqual(task2);
  });

  test('handles TOGGLE_TASK_COMPLETED action', () => {
    const task: Task = { id: '1', title: 'Task', completed: false };
    const stateWithTask: State = { tasks: [task] };
    const action: TaskAction = { type: 'TOGGLE_TASK_COMPLETED', payload: '1' };
    const state = taskReducer(stateWithTask, action);
    expect(state.tasks[0].completed).toBe(true);
  });

  test('returns current state for unknown action types', () => {
    const task: Task = { id: '1', title: 'Task', completed: false };
    const stateWithTask: State = { tasks: [task] };
    const action = { type: 'UNKNOWN_ACTION', payload: null };
    const state = taskReducer(stateWithTask, action as unknown as TaskAction);
    expect(state).toEqual(stateWithTask);
  });
});