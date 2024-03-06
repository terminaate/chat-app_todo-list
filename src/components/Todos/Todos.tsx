import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import cl from './Todos.module.scss';
import { FC, FormEvent, useState } from 'react';
import { TodoType } from '@/types/TodoType.ts';
import {
  FaRegCheckCircle,
  FaRegCircle,
  FaRegEdit,
  FaRegTrashAlt,
} from 'react-icons/fa';
import {
  deleteTodo,
  editTodo,
  toggleCompleteTodo,
} from '@/store/reducers/todosSlice.ts';
import { Button } from '@/components/UI/Button';
import { useInput } from '@/hooks/useInput.ts';
import { Input } from '@/components/UI/Input';

type EditTodoProps = TodoType & {
  cancel: () => void;
};

const EditTodo: FC<EditTodoProps> = ({ cancel, content, id }) => {
  const [contentInput, onContentInputChange] = useInput(content);
  const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(editTodo({ id, content: contentInput }));
    cancel();
  };

  return (
    <form onSubmit={onSubmit} className={cl.todoContainer}>
      <Input
        value={contentInput}
        onChange={onContentInputChange}
        placeholder={'content'}
      />
      <div className={cl.todoActionsContainer}>
        <Button type={'reset'} icon onClick={cancel}>
          <FaRegEdit />
        </Button>
      </div>
    </form>
  );
};

const Todo: FC<TodoType> = (todo) => {
  const { content, isCompleted, id } = todo;

  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const onCompleteButtonClick = () => {
    dispatch(toggleCompleteTodo(id));
  };

  const onDeleteButtonClick = () => {
    dispatch(deleteTodo(id));
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return <EditTodo cancel={cancelEdit} {...todo} />;
  }

  return (
    <div className={cl.todoContainer}>
      <h4 data-completed={isCompleted} className={cl.todoContent}>
        {content}
      </h4>
      <div className={cl.todoActionsContainer}>
        <Button icon onClick={() => setIsEditing(true)}>
          <FaRegEdit />
        </Button>
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
    // TODO: maybe simplify this
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
