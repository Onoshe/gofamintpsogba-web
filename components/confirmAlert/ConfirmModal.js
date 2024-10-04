'use client'
import React, { useState } from "react";

export const ConfirmModal = ({ children, description }) => {
  const [open, setOpen] = useState(false);
  const [callback, setCallback] = useState(null);

  const show = callback => event => {
    event.preventDefault();
    setOpen(true);
    event = {
      ...event,
      target: { ...event.target, value: event.target.value }
    }
    setCallback({
      run: () =>
        callback(event)
    });
  };

  const hide = () => {
    setCallback(null);
    setOpen(false);
  };

  const confirm = (dt) => {
    console.log("confirm", dt);
    callback.run();
    hide();
  };

  return (
    <>
      {children(show)}
      {open && (
        <div className="p-3 bg-slate-200 shadow-md flex flex-col gap-3 w-fit">
          <p>{description}</p>
          <button onClick={hide}>Cancel</button>
          <button onClick={confirm}>Delete</button>
        </div>
      )}
    </>
  );
};
export default ConfirmModal;
