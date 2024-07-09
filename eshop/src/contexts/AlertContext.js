import React, { createContext, useState } from 'react';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const closeAlert = () => {
    setAlertVisible(false);
    setAlertMessage('');
  };

  return (
    <AlertContext.Provider value={{ alertVisible, alertMessage, showAlert, closeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
