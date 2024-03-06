import { TodoType } from '@/types/TodoType.ts';
import { FC, FormEvent, useState } from 'react';
import { useInput } from '@/hooks/useInput.ts';
import { useAppDispatch } from '@/store/hooks.ts';
import {
  deleteTodo,
  editTodo,
  toggleCompleteTodo,
} from '@/store/reducers/todosSlice.ts';
import cl from '@/components/Todos/Todos.module.scss';
import { Input } from '@/components/UI/Input';
import { Button } from '@/components/UI/Button';
import {
  FaRegCheckCircle,
  FaRegCircle,
  FaRegEdit,
  FaRegTrashAlt,
} from 'react-icons/fa';

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

export const Todo: FC<TodoType> = (todo) => {
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
