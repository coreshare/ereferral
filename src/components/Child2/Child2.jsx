// EReferralDocuments.js
import React, { useState, useEffect } from 'react';
import AttachmentsData from '../../Models/AttachmentsData';

const Child2 = ({ onChange }) => {
  const [attachments, setAttachments] = useState([]);
  const [fileInfo, setFileInfo] = useState(new AttachmentsData); // Combine file notes and descriptions

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
        initialFileInfo[file.name] = new AttachmentsData;
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
              <th>Detail Class</th>
              <th>Detail Type</th>
              <th>Notes</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {attachments.map((file) => (
              <tr key={file.name}>
                <td>{file.name}</td>
                <td>
                  <select
                        value={fileInfo[file.name]?.DetailClass || ''}
                        onChange={(e) => handleFileInfoChange(e, file.name, 'DetailClass')}>
                        <option value=""></option>
                        <option value="Referral inc IPT">Referral inc IPT</option>
                        <option value="Medical">Medical</option>
                    </select>

                </td>
                <td>
                  <select
                        value={fileInfo[file.name]?.DetailType || ''}
                        onChange={(e) => handleFileInfoChange(e, file.name, 'DetailType')}>
                        <option value=""></option>
                        <option value="Histology">Histology</option>
                        <option value="Referral Letter">Referral Letter</option>
                        <option value="CT">CT</option>
                        <option value="IPT">IPT</option>
                    </select>
                </td>
                <td>
                  <input
                    type="text"
                    value={fileInfo[file.name].Notes || ''}
                    onChange={(e) => handleFileInfoChange(e, file.name, 'Notes')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={fileInfo[file.name].Description || ''}
                    onChange={(e) =>
                      handleFileInfoChange(e, file.name, 'Description')
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
