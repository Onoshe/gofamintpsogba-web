//Generated by Chat GPT
import React, { useState } from 'react';

const DragAndDropFileUpload = () => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(e.dataTransfer.files)]);
      e.dataTransfer.clearData();
    }
  };

  const handleFiles = (e) => {
    const selectedFiles = e.target.files;
    setFiles((prevFiles) => [...prevFiles, ...Array.from(selectedFiles)]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div
        className={`relative flex flex-col items-center justify-center w-full max-w-lg p-6 border-2 border-dashed rounded-lg ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          multiple
          onChange={handleFiles}
        />
        <label
          htmlFor="fileUpload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16l4-4m0 0l4 4m-4-4v12M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-500">
            Drag and drop your files here or click to browse
          </p>
        </label>
      </div>
      <ul className="mt-4 w-full max-w-lg">
        {files.map((file, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-2 text-sm text-gray-700 bg-white border rounded-md"
          >
            <span>{file.name}</span>
            <span className="text-gray-400">{(file.size / 1024).toFixed(2)} KB</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DragAndDropFileUpload;
