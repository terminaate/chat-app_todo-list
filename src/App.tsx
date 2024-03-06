import { NavBar } from '@/components/NavBar';
import { Todos } from '@/components/Todos';
import { useAppSelector } from '@/store/hooks.ts';
import { useEffect } from 'react';

export const App = () => {
  const todos = useAppSelector((state) => state.todosSliceReducer);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <NavBar />
      <Todos />
    </>
  );
};
