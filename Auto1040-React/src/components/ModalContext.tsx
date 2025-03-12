import React, { createContext, useState, ReactNode } from 'react';

interface ModalContextProps {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  openRegister: () => void;
  closeRegister: () => void;
}

export const ModalContext = createContext<ModalContextProps>({
  isLoginOpen: false,
  isRegisterOpen: false,
  openLogin: () => {},
  closeLogin: () => {},
  openRegister: () => {},
  closeRegister: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);
  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);

  return (
    <ModalContext.Provider value={{ isLoginOpen, isRegisterOpen, openLogin, closeLogin, openRegister, closeRegister }}>
      {children}
    </ModalContext.Provider>
  );
};