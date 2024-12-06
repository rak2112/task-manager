export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
  }
  
  export type State = {
    tasks: Task[];
  };

  export const ADD_TASK = 'ADD_TASK';
  export const UPDATE_TASK = 'UPDATE_TASK';
  export const DELETE_TASK = 'DELETE_TASK';
  export const TOGGLE_TASK_COMPLETED = 'TOGGLE_TASK_COMPLETED'; 
  
  export type TaskAction =
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'UPDATE_TASK'; payload: Task }
    | { type: 'DELETE_TASK'; payload: string }
    | { type: 'TOGGLE_TASK_COMPLETED'; payload: string };