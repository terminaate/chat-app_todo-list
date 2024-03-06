import { configureStore } from '@reduxjs/toolkit';
import { todosSliceReducer } from '@/store/reducers/todosSlice.ts';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    todosSliceReducer,
  },
});
