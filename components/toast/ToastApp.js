'use client'
import React, { useState, useEffect } from "react";

// Single Toast Component
const Toast = ({ message, type = "info", duration = 3000, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [pauseTimer, setPauseTimer] = useState(false);

  // Auto-close logic with hover pause
  useEffect(() => {
    let timer;
    if (!pauseTimer) {
      timer = setTimeout(() => {
        handleClose();
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [pauseTimer, duration]);

  // Close handler
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300); // Matches the exit animation duration
  };

  // Tailwind styles for toast types
  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-yellow-500 text-black",
  };

  /*
  {`flex items-center justify-between px-4 py-2 rounded shadow-lg 
        transition-transform duration-300 ease-in-out ${
        isExiting ? "translate-x-full opacity-0" : "translate-x-0"
      } ${typeStyles[type]}`}

  */
  return (
    <div
      className={`flex items-center justify-between px-4 py-2 rounded shadow-lg 
        bg-green-500 text-white`}
      onMouseEnter={() => setPauseTimer(true)}
      onMouseLeave={() => setPauseTimer(false)}
    >
      <p>Hello there, this is a message {isExiting? '1' : '0'}</p>
      <span className="hidden">{message}</span>
      <button
        onClick={handleClose}
        className="ml-4 text-white hover:text-gray-200"
      >
        &times;
      </button>
    </div>
  );
};

// Toast Container to manage all toasts
const ToastApp = () => {
  const [toasts, setToasts] = useState([]);

  // Add a toast
  const addToast = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  // Remove a toast
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Expose the toast trigger globally for simplicity
  window.showToast = (message, type, duration) => addToast(message, type, duration);

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastApp;
