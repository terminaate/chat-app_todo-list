import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import cl from './Todos.module.scss';
import { FC } from 'react';
import { TodoType } from '@/types/TodoType.ts';
import { FaRegCheckCircle, FaRegCircle, FaRegTrashAlt } from 'react-icons/fa';
import { deleteTodo, toggleCompleteTodo } from '@/store/reducers/todosSlice.ts';

const Todo: FC<TodoType> = ({ content, isCompleted, id }) => {
  const dispatch = useAppDispatch();

  const onCompleteButtonClick = () => {
    dispatch(toggleCompleteTodo(id));
  };

  const onDeleteButtonClick = () => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className={cl.todoContainer}>
      <h4 data-completed={isCompleted} className={cl.todoContent}>
        {content}
      </h4>
      <div className={cl.todoActionsContainer}>
        <button onClick={onDeleteButtonClick} className={cl.todoIconButton}>
          <FaRegTrashAlt />
        </button>
        <button onClick={onCompleteButtonClick} className={cl.todoIconButton}>
          {isCompleted ? <FaRegCheckCircle /> : <FaRegCircle />}
        </button>
      </div>
    </div>
  );
};

export const Todos = () => {
  const todos = useAppSelector((state) => state.todosSliceReducer);

  return (
    <div className={cl.todosContainer}>
      {todos.map((o) => (
        <Todo key={o.id} {...o} />
      ))}
    </div>
  );
};
