import ReactDOM from 'react-dom/client';
import 'assets/css/color_custom.css';
import 'assets/css/commons.css';
import 'assets/css/component.css';
import 'assets/css/ui.css';
import { AppRouter } from './AppRoute/AppRouter';
import { ModalProvider } from 'hoc/Context/ModalContext';
import { SocketProvider } from 'hoc/Context/SocketContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <ModalProvider>
    <SocketProvider>
      <AppRouter />
    </SocketProvider>
  </ModalProvider>
);
