// EReferralDocuments.js
import React, { useState, useEffect } from 'react';

const Child2 = ({ onChange }) => {
  const [attachments, setAttachments] = useState([]);
  const [fileInfo, setFileInfo] = useState({}); // Combine file notes and descriptions

  useEffect(() => {
    onChange(attachments, fileInfo);
  }, [attachments, fileInfo, onChange]);

  const handleFileUpload = (e) => {
    const newFiles = e.target.files;
    if (newFiles.length > 0) {
      const newAttachments = Array.from(newFiles);
      setAttachments(newAttachments);
      const initialFileInfo = {};
      newAttachments.forEach((file) => {
        initialFileInfo[file.name] = {
          notes: '',
          description: '',
        };
      });
      setFileInfo(initialFileInfo);
    }
  };

  const handleFileInfoChange = (e, fileName, field) => {
    const { value } = e.target;
    setFileInfo((prevFileInfo) => ({
      ...prevFileInfo,
      [fileName]: {
        ...prevFileInfo[fileName],
        [field]: value,
      },
    }));
  };

  return (
    <div>
      <h2>EReferral Documents</h2>
      <input type="file" multiple onChange={handleFileUpload} />
      {attachments.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Notes</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {attachments.map((file) => (
              <tr key={file.name}>
                <td>{file.name}</td>
                <td>
                  <input
                    type="text"
                    value={fileInfo[file.name].notes || ''}
                    onChange={(e) => handleFileInfoChange(e, file.name, 'notes')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={fileInfo[file.name].description || ''}
                    onChange={(e) =>
                      handleFileInfoChange(e, file.name, 'description')
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Child2;
