import React, { useEffect, useState } from 'react'

const Alert = ({ title, message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (title || message) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 10000);
    }
  }, [title, message]);

  return (
    <div
      className={`${
        isVisible ? 'animate-slideIn' : 'animate-slideOut'
      } bg-white absolute top-[90px] right-0 px-9 z-50 py-6 shadow-lg`}
    >
      <div>{title}</div>
      <div>{message}</div>
    </div>
  );
};

export default Alert