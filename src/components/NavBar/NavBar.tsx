import cl from './NavBar.module.scss';
import { Input } from '@/components/UI/Input';
import { useInput } from '@/hooks/useInput.ts';
import { Button } from '@/components/UI/Button';
import { BiPlus } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import {
  addFilter,
  createTodo,
  removeFilter,
} from '@/store/reducers/todosSlice.ts';
import { FormEvent } from 'react';
import { TodoType } from '@/types/TodoType.ts';
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';

const filterFields: Array<keyof TodoType> = ['isCompleted'];

export const NavBar = () => {
  const [newTodoInput, onNewTodoInput, setNewTodoInput] = useInput('');
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.todosSliceReducer);

  const addTodo = (e: FormEvent) => {
    e.preventDefault();

    dispatch(createTodo(newTodoInput));
    setNewTodoInput('');
  };

  const updateFilter = (field: keyof TodoType) => {
    if (filters.includes(field)) {
      dispatch(removeFilter(field));
    } else {
      dispatch(addFilter(field));
    }
  };

  return (
    <div className={cl.navBar}>
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
      <div className={cl.navBarFilters}>
        {filterFields.map((field, i) => (
          <div key={i} className={cl.filterContainer}>
            <Button icon onClick={() => updateFilter(field)}>
              {filters.includes(field) ? <FaRegCheckCircle /> : <FaRegCircle />}
            </Button>
            <span>{field}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
