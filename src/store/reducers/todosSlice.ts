import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoType } from '@/types/TodoType.ts';
import { generateId } from '@/utis/generateId.ts';

export type TodosState = TodoType[];

const storageTodos = JSON.parse(localStorage.getItem('todos') ?? '{}');

export const initialState: TodosState = localStorage.getItem('todos')
  ? storageTodos
  : [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    createTodo(state, action: PayloadAction<string>) {
      const newTodo: TodoType = {
        content: action.payload,
        isCompleted: false,
        id: generateId(),
      };

      state.unshift(newTodo);
    },

    toggleCompleteTodo(state, action: PayloadAction<string>) {
      const candidate = state.findIndex((o) => o.id === action.payload);
      if (candidate < 0) {
        return;
      }

      state[candidate].isCompleted = !state[candidate].isCompleted;
    },

    deleteTodo(state, action: PayloadAction<string>) {
      const candidate = state.findIndex((o) => o.id === action.payload);
      if (candidate < 0) {
        return;
      }

      state.splice(candidate, 1);
    },
  },
});

export const { createTodo, deleteTodo, toggleCompleteTodo } =
  todosSlice.actions;

export const todosSliceReducer = todosSlice.reducer;
