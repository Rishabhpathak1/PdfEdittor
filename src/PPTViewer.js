// App.js
import React, { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import PDFViewer from './PDFViewer';
import PPTViewer from './PPTViewer';
import TextImageEditing from './TextImageEditing';
import SaveChanges from './SaveChanges';

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(null);

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setEditMode(true);
    setEditedContent(null);
  };

  const handleSaveChanges = () => {
    // Save the edited content
    alert('Changes saved successfully!');
    setEditMode(false);
  };

  return (
    <div className="App">
      <h1>Welcome to My Website</h1>
      {!uploadedFile && <FileUpload onFileUpload={handleFileUpload} />}
      {uploadedFile && (
        <div className="sidebar">
          {uploadedFile.type === 'application/pdf' ? (
            <PDFViewer file={uploadedFile} editMode={editMode} setEditedContent={setEditedContent} />
          ) : (
            <PPTViewer file={uploadedFile} editMode={editMode} setEditedContent={setEditedContent} />
          )}
          {editMode && <TextImageEditing content={editedContent} setEditedContent={setEditedContent} />}
          <SaveChanges onSaveChanges={handleSaveChanges} />
        </div>
      )}
    </div>
  );
}

export default App;
