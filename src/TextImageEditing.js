import React from 'react';
import ReactQuill from 'react-quill'; // Import ReactQuill
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const TextImageEditing = ({ content, setEditedContent }) => {
  const handleTextChange = (html) => {
    setEditedContent({ ...content, htmlContent: html });
  };

  return (
    <div className="text-image-editing">
      <ReactQuill
        theme="snow"
        value={content.htmlContent}
        onChange={handleTextChange}
      />
    </div>
  );
};

export default TextImageEditing;
