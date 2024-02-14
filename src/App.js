import React, { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import TextImageEditing from './TextImageEditing';
import SaveChanges from './SaveChanges';
import PDFViewer from './PDFViewer'; // Import PDFViewer component

const App = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(null);
  const [isHomePage, setIsHomePage] = useState(true); // State to track if user is on home page

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setIsHomePage(false); // After file upload, user is no longer on home page
    // Additional logic for parsing and processing the file content
    // For demonstration purposes, we'll set initial edited content
    setEditedContent({
      textContent: 'Editable text content',
      imageSrc: '/path/to/image',
      imagePosition: { left: 0, top: 0, width: 100, height: 100 }, // Initial position and size
    });
  };

  const handleSaveChanges = () => {
    // Implement logic to save changes
    alert('Changes saved successfully!');
    setEditMode(false);
  };

  const handleBackToHome = () => {
    setIsHomePage(true); // Set user back to home page
    setUploadedFile(null); // Clear uploaded file
    setEditedContent(null); // Clear edited content
  };

  return (
    <div className="App">
      {isHomePage && ( // Display home page content
        <>
          <h1>Welcome to My Website</h1>
          <FileUpload onFileUpload={handleFileUpload} />
        </>
      )}
      {!isHomePage && uploadedFile && ( // Display file and editing options
        <div className="sidebar">
          <button onClick={handleBackToHome}>Back</button>
          {uploadedFile.type === 'application/pdf' ? (
            <PDFViewer file={uploadedFile} />
          ) : (
            <PDFViewer file={uploadedFile} />
          )}
          {editMode && (
            <>
              <TextImageEditing content={editedContent} setEditedContent={setEditedContent} />
              <SaveChanges onSaveChanges={handleSaveChanges} />
              <div className='update-content'>
                <button>Update Content</button>
              </div>
            </>
          )}
          {editMode && (
            <div className="download-button">
              <button>Download</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
