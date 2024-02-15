import React from 'react';

const SaveChanges = ({ onSaveChanges }) => {
  return (
    <div className="save-changes">
      <button onClick={onSaveChanges}>Apply Changes</button>
    </div>
  );
};

export default SaveChanges;
