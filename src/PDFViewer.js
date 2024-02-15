import React from 'react';

const PDFViewer = ({ file }) => {
  const fileUrl = URL.createObjectURL(file);
  const fileType = file.type;

  return (
    <div className="pdf-viewer">
      <h2>{fileType === 'application/pdf' ? 'PDF Viewer' : 'PPT Viewer'}</h2>
      <p>File Name: {file.name}</p>
      {fileType === 'application/pdf' ? (
        <embed src={fileUrl} width="100%" height="500px" />
      ) : (
        <object data={fileUrl} type="application/vnd.ms-powerpoint" width="100%" height="500px">
          <p>Unable to display PPT file.</p>
        </object>
      )}
    </div>
  );
};

export default PDFViewer;
