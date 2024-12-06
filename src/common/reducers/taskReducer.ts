import { State, TaskAction } from '../actions';

export const initialState: State = {
  tasks: [],
};

export const taskReducer = (state: State = initialState, {type, payload}: TaskAction): State => {
  switch (type) {
    case 'ADD_TASK':
      return { tasks: [...state.tasks, payload] };
    case 'UPDATE_TASK':
      return {
        tasks: state.tasks.map(task =>
          task.id === payload.id ? payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        tasks: state.tasks.filter(task => task.id !== payload),
      };
    case 'TOGGLE_TASK_COMPLETED':
      return {
        tasks: state.tasks.map(task =>
          task.id === payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    default:
      return state;
  }
}