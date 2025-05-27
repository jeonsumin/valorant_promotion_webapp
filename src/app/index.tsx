import ReactDOM from 'react-dom/client';
import 'assets/css/color_custom.css';
import 'assets/css/commons.css';
import 'assets/css/component.css';
import 'assets/css/ui.css';
import { Provider } from 'react-redux';
import { store } from 'store';
import { AppRouter } from './AppRoute/AppRouter';
import { ModalProvider } from 'hoc/Context/ModalContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Provider store={store}>
    <ModalProvider>
      <AppRouter />
    </ModalProvider>
  </Provider>
);
