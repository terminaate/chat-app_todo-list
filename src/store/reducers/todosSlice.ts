import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoType } from '@/types/TodoType.ts';
import { generateId } from '@/utis/generateId.ts';

export type TodosState = {
  todos: TodoType[];
  filters: Array<keyof TodoType>;
};

const storageTodos = JSON.parse(localStorage.getItem('todos') ?? '{}');

const initialTodos = localStorage.getItem('todos') ? storageTodos : [];

export const initialState: TodosState = {
  todos: initialTodos,
  filters: [],
};

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

      state.todos.unshift(newTodo);
    },

    toggleCompleteTodo(state, action: PayloadAction<string>) {
      const candidate = state.todos.findIndex((o) => o.id === action.payload);
      if (candidate < 0) {
        return;
      }

      const currentTodo = state.todos[candidate];

      currentTodo.isCompleted = !currentTodo.isCompleted;
    },

    deleteTodo(state, action: PayloadAction<string>) {
      const candidate = state.todos.findIndex((o) => o.id === action.payload);
      if (candidate < 0) {
        return;
      }

      state.todos.splice(candidate, 1);
    },

    addFilter(state, action: PayloadAction<keyof TodoType>) {
      state.filters = [...state.filters, action.payload];
    },

    removeFilter(state, action: PayloadAction<keyof TodoType>) {
      const candidate = state.filters.indexOf(action.payload);
      if (candidate < 0) {
        return;
      }

      state.filters.splice(candidate, 1);
    },
  },
});

export const {
  addFilter,
  removeFilter,
  createTodo,
  deleteTodo,
  toggleCompleteTodo,
} = todosSlice.actions;

export const todosSliceReducer = todosSlice.reducer;
