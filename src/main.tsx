import { createRoot } from 'react-dom/client';
import { App } from '@/App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from '@/store';

const rootNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(rootNode);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
