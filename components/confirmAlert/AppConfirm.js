'use client'
import React, { useState } from "react";



import {ConfirmModal} from "./ConfirmModal";


export default function AppConfirm() {
  const [value, setValue] = useState("important note");

  const handleSubmit = () => {
    console.log(123);
    setValue("deleted");
  };
  const handleSubmit2 = () => {
    console.log(12345);
    setValue("deleted2");
  };

  return (
    <div className="">
      <ConfirmModal
        title="Confirm"
        description="Are you sure?"
        callbackFunction={handleSubmit}
      >
        {confirm => (
          <div className="flex flex-col gap-2">
            {value}
            <button type="btn btn-info" onClick={confirm(handleSubmit)}>
              Delete
            </button>
            <button type="btn" onClick={confirm(handleSubmit2)}>
              Delete2
            </button>
          </div>
        )}
      </ConfirmModal>
    </div>
  );
}

