import React, { useState } from 'react';

const DocumentTable = ({ documents, onUpdateMetadata }) => {
  const [editedMetadata, setEditedMetadata] = useState({});

  const handleEditMetadata = (index, newValue) => {
    setEditedMetadata({ ...editedMetadata, [index]: newValue });
  };

  const handleSaveMetadata = (index) => {
    if (editedMetadata[index] !== undefined) {
      onUpdateMetadata(index, editedMetadata[index]);
      setEditedMetadata({ ...editedMetadata, [index]: undefined });
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Document Name</th>
          <th>Metadata</th>
          <th>Update Metadata</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((document, index) => (
          <tr key={index}>
            <td>{document.name}</td>
            <td>
              {editedMetadata[index] !== undefined ? (
                <input
                  type="text"
                  value={editedMetadata[index]}
                  onChange={(e) => handleEditMetadata(index, e.target.value)}
                />
              ) : (
                document.metadata
              )}
            </td>
            <td>
              {editedMetadata[index] !== undefined ? (
                <button onClick={() => handleSaveMetadata(index)}>Save</button>
              ) : (
                <button onClick={() => handleEditMetadata(index, document.metadata)}>
                  Edit
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DocumentTable;
