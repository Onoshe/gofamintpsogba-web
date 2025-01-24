'use client'
import React, {useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { quillFormats, quillModules } from './quillModules';
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });



const QuillEditorApp = ({ handleEditorChange, setPlainContent, setPlainFmtContent, content,}) => {
  const quillRef = useRef(null); 
  const isEmpty =  content === "<p><br></p>" || !content;

  const handleEditor = (content, delta, source, editor)=>{
    const text = editor.getText(); // Extract plain text
    //const textArr = text.split("\n");
    const textFmt = text.replace(/\n/g, "|");
    handleEditorChange(content);
    setPlainContent(text);
    setPlainFmtContent(textFmt);
  }

  return (
      <QuillEditor
          ref={quillRef}
          value={content}
          onChange={handleEditor}
          modules={quillModules}
          formats={quillFormats}
          className="w-[95%] max-w-[750px] bg-white  mx-3 h-[300px]"
          placeholder='Compose an epic...'
        />
  )
}

export default QuillEditorApp;