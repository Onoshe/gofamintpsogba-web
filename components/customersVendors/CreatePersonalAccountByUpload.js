import React from 'react'
import DragAndDropFileInput from '../forms/DargAndDropFileInput'

const CreatePersonalAccountByUpload = ({file, setFile, handleUpload, getFileExtension, infoMsg, setInfoMsg, handleCancel, 
  isDragging, isDropped, setIsDragging, setIsDropped, selected, fileFormats, maxSize, classNameCont}) => {

  
  return (
    <div className={classNameCont}>
      <DragAndDropFileInput
            file={file}
            setFile={setFile}
            handleUpload={handleUpload}
            getFileExtension={getFileExtension}
            infoMsg={infoMsg}
            setInfoMsg={setInfoMsg}
            handleCancel={handleCancel}
            isDragging={isDragging}
            isDropped={isDropped}
            setIsDragging={setIsDragging}
            setIsDropped={setIsDropped}
            selected={selected}
            fileFormats={fileFormats}
            maxSize={maxSize}
        />
    </div>
  )
}

export default CreatePersonalAccountByUpload