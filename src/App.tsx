import { Provider } from 'react-redux';
import { store } from '@/store';
import { NavBar } from '@/components/NavBar';
import { Todos } from '@/components/Todos';

export const App = () => {
  return (
    <Provider store={store}>
      <NavBar />
      <Todos />
    </Provider>
  );
};
