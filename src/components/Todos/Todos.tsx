import { useAppSelector } from '@/store/hooks.ts';
import cl from './Todos.module.scss';
import { Todo } from './Todo';

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
