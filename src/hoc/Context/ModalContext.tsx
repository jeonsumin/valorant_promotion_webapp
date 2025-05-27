import { createContext, ReactNode, useContext, useState } from 'react';
import { ModalDialog } from 'components/Dialogs';
import { AlertDialog } from 'components/Dialogs/AlertDialog';

type ModalContextType = {
  title: string;
  body: ReactNode;
  isLogo: boolean;
  isCancel: boolean;
  onConfirm: () => void;
};

type ContextType = {
  showModal: (option: ModalContextType) => void;
  showAlert: (option: ModalContextType) => void;
  modalClose: () => void;
  alertClose: () => void;
};

const ModalContext = createContext<ContextType | undefined >(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalOption, setModalOption] = useState<ModalContextType | null>(null);
  const [alertOption, setAlertOption] = useState<ModalContextType | null>(null);

  const showModal = (option: ModalContextType) => {
    setModalOption({ ...option });
  };

  const showAlert = (option: ModalContextType) => {
    setAlertOption({ ...option });
  };

  const modalClose = () => setModalOption(null);
  const alertClose = () => setAlertOption(null);
  return (
    <ModalContext.Provider
      value={{ showModal, showAlert, modalClose, alertClose }}
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
            message={alertOption.title}
            isCancel={alertOption.isCancel}
            onConfirm={alertOption.onConfirm}
            alertClose={alertClose}
          />
        </>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};
