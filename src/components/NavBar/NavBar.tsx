import cl from './NavBar.module.scss';
import { Input } from '@/components/UI/Input';
import { useInput } from '@/hooks/useInput.ts';
import { Button } from '@/components/UI/Button';
import { BiPlus } from 'react-icons/bi';
import { useAppDispatch } from '@/store/hooks.ts';
import { createTodo } from '@/store/reducers/todosSlice.ts';
import { FormEvent } from 'react';

export const NavBar = () => {
  const [newTodoInput, onNewTodoInput, setNewTodoInput] = useInput('');
  const dispatch = useAppDispatch();

  const addTodo = (e: FormEvent) => {
    e.preventDefault();

    dispatch(createTodo(newTodoInput));
    setNewTodoInput('');
  };

  return (
    <form onSubmit={addTodo} className={cl.navBarContainer}>
      <Input
        placeholder={'Todo content...'}
        value={newTodoInput}
        onChange={onNewTodoInput}
      />
      <Button type={'submit'}>
        <BiPlus />
      </Button>
    </form>
  );
};
