
import React from "react";
import ToastApp from "./ToastApp";


function ToastAppUsage() {
  return (
    <div>
      <ToastApp />

      <div className="p-8">
        <h1 className="text-xl font-bold mb-4">Custom Toast Example</h1>
        <button
          onClick={() => window.showToast("Success message!", "success")}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Show Success Toast
        </button>
        <button
          onClick={() => window.showToast("Error occurred!", "error")}
          className="bg-red-500 text-white px-4 py-2 rounded mr-2"
        >
          Show Error Toast
        </button>
        <button
          onClick={() => window.showToast("Info message!", "info")}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Show Info Toast
        </button>
        <button
          onClick={() => window.showToast("Warning message!", "warning")}
          className="bg-yellow-500 text-black px-4 py-2 rounded"
        >
          Show Warning Toast
        </button>
      </div>
    </div>
  );
}

export default ToastAppUsage;
