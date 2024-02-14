import React, { useState } from 'react';
import './App.css'; // Import CSS for styling

const TextImageEditing = ({ content, setEditedContent }) => {
  // State for the text content
  const [textContent, setTextContent] = useState(content?.textContent || '');

  // Handle text content change
  const handleTextChange = (e) => {
    setTextContent(e.target.innerHTML);
    setEditedContent({ ...content, textContent: e.target.innerHTML });
  };

  // Handle formatting buttons
  const applyBold = () => {
    document.execCommand('bold', false, null);
  };

  const applyItalic = () => {
    document.execCommand('italic', false, null);
  };

  const applyUnderline = () => {
    document.execCommand('underline', false, null);
  };

  const applyFontFamily = (font) => {
    document.execCommand('fontName', false, font);
  };

  // Handle image insertion
  const handleImageInsertion = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageHtml = `<img src="${event.target.result}" alt="Inserted Image"/>`;
        document.execCommand('insertHTML', false, imageHtml);
        setEditedContent({ ...content, textContent: e.target.innerHTML });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="text-image-editing">
      <div className="formatting-buttons">
        <button onClick={applyBold}>Bold</button>
        <button onClick={applyItalic}>Italic</button>
        <button onClick={applyUnderline}>Underline</button>
        <button onClick={() => applyFontFamily('Arial')}>Arial</button>
        <button onClick={() => applyFontFamily('Times New Roman')}>Times New Roman</button>
        {/* Add more font family options as needed */}
        <input type="file" accept="image/*" onChange={handleImageInsertion} />
      </div>
      <div
        className="text-area"
        contentEditable
        dangerouslySetInnerHTML={{ __html: textContent }} // Set initial HTML content
        onBlur={handleTextChange} // Handle content change on blur
      />
    </div>
  );
};

export default TextImageEditing;
