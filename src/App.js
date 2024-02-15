import React, { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import TextImageEditing from './TextImageEditing';
import SaveChanges from './SaveChanges';
import PDFViewer from './PDFViewer';

const App = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState({ htmlContent: '' });
  const [changesApplied, setChangesApplied] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setIsHomePage(false);
    setEditedContent({ htmlContent: '' }); // Clear any existing edited content
    setChangesApplied(false); // Reset changes applied status
  };

  const handleSaveChanges = () => {
    alert('Changes saved successfully!');
    setEditMode(false);
    setChangesApplied(true); // Set changes applied status to true
  };

  const handleDownload = () => {
    // Implement logic to download the edited file
    alert('File downloaded!');
  };

  const handleBackToHome = () => {
    setIsHomePage(true);
    setUploadedFile(null);
    setEditedContent({ htmlContent: '' });
    setChangesApplied(false); // Reset changes applied status
  };

  return (
    <div className="App">
      {isHomePage && (
        <>
          <h1>Welcome to My Website</h1>
          <FileUpload onFileUpload={handleFileUpload} />
        </>
      )}
      {!isHomePage && uploadedFile && (
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
            </>
          )}
          {changesApplied && ( // Render download button only if changes have been applied
            <div className="download-button">
              <button onClick={handleDownload}>Download</button>
            </div>
          )}
        </div>
      )}
      {!isHomePage && uploadedFile && !editMode && (
        <div className="sidebar">
          <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default App;
