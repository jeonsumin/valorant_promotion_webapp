import { createContext, ReactNode, useContext, useState } from 'react';
import { ModalDialog } from 'components/Dialogs';
import { AlertDialog } from 'components/Dialogs/AlertDialog';

type ModalOptions = {
  title?: string;
  body?: ReactNode;
  isLogo?: boolean;
  onClick?: () => void;
};

type AlertOptions = {
  title?: string;
  message: string;
  isCancel?: boolean;
  onConfirm?: () => void;
};

type ContextType = {
  showModal: (option: ModalOptions) => void;
  showAlert: (option: AlertOptions) => void;
  modalClose: () => void;
  alertClose: () => void;
  allClear: () => void;
};

const ModalContext = createContext<ContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalOption, setModalOption] = useState<ModalOptions | null>(null);
  const [alertOption, setAlertOption] = useState<AlertOptions | null>(null);

  const showModal = (option: ModalOptions) => {
    document.getElementById('root')?.classList.add("base");

    setModalOption({ ...option });
  };

  const showAlert = (option: AlertOptions) => {
    setAlertOption({ ...option });
  };

  const modalClose = (func?: () => void) => {
    modalOption?.onClick?.();
    setModalOption(null);
  };
  const alertClose = () => setAlertOption(null);

  const allClear = () => {
    setModalOption(null);
    setAlertOption(null);
  };
  return (
    <ModalContext.Provider
      value={{ showModal, showAlert, modalClose, alertClose, allClear }}
    >
      {children}

      {modalOption && (
        <ModalDialog
          title={modalOption.title}
          body={modalOption.body}
          isLogo={modalOption.isLogo}
          closeModal={modalClose}
        />
      )}
      {alertOption && (
        <>
          <AlertDialog
            message={alertOption.message}
            isCancel={alertOption.isCancel}
            onConfirm={() => {
              alertOption.onConfirm?.();
              alertClose();
            }}
            alertClose={alertClose}
          />
        </>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
