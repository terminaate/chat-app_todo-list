import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import cl from './Todos.module.scss';
import { FC } from 'react';
import { TodoType } from '@/types/TodoType.ts';
import { FaRegCheckCircle, FaRegCircle, FaRegTrashAlt } from 'react-icons/fa';
import { deleteTodo, toggleCompleteTodo } from '@/store/reducers/todosSlice.ts';
import { Button } from '@/components/UI/Button';

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
        <Button icon onClick={onDeleteButtonClick}>
          <FaRegTrashAlt />
        </Button>
        <Button icon onClick={onCompleteButtonClick}>
          {isCompleted ? <FaRegCheckCircle /> : <FaRegCircle />}
        </Button>
      </div>
    </div>
  );
};

export const Todos = () => {
  const { todos, filters: filtersFields } = useAppSelector(
    (state) => state.todosSliceReducer,
  );

  const filteredTodos = todos.filter((todo) => {
    for (const field of filtersFields) {
      if (!todo[field]) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className={cl.todosContainer}>
      {filteredTodos.map((o) => (
        <Todo key={o.id} {...o} />
      ))}
    </div>
  );
};
