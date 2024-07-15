import React, { useEffect, useState } from 'react'

const Alert = ({ title, message }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hiddenAlert, sethiddenAlert] = useState(false);

  useEffect(() => {
    if (title || message) {
      setIsVisible(true);

      
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
  }, [title, message]);
  useEffect(() => {
    sethiddenAlert(true);
    setTimeout(() => {
      sethiddenAlert(false);
    }, 3200);
  },[title, message])

  return (
    <div
      className={`${
        isVisible ? 'animate-slideIn ' : 'animate-slideOut '
      } bg-white absolute top-[90px] ${hiddenAlert ? 'block' : 'hidden'} right-0 px-9 z-50 py-6 shadow-lg`}
    >
      <div>{title}</div>
      <div>{message}</div>
    </div>
  );
};

export default Alert