// FileUpload.js
import React, { useRef, useState } from 'react';

const FileUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type === 'application/vnd.ms-powerpoint') {
        onFileUpload(file);
        setErrorMessage('');
      } else {
        setErrorMessage('Please upload a PDF or PPT file.');
      }
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button onClick={handleUploadButtonClick}>Upload File</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default FileUpload;