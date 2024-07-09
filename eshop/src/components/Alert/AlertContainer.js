import React, { useContext } from 'react';
import { AlertContext } from '../../contexts/AlertContext';
import Alert from './Alert';

const AlertContainer = () => {
  const { alertVisible, alertMessage, closeAlert } = useContext(AlertContext);

  return (
    alertVisible && <Alert message={alertMessage} onClose={closeAlert} />
  );
};

export default AlertContainer;
