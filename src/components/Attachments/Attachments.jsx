// EReferralDocuments.js
import React, { useState, useEffect } from 'react';
import AttachmentsData from '../../Models/AttachmentsData';
import './Attachments.css';

const Attachments = ({ onChange }) => {
  const [attachments, setAttachments] = useState([]);
  const [fileInfo, setFileInfo] = useState(new AttachmentsData);

  useEffect(() => {
    onChange(attachments, fileInfo);
  }, [attachments, fileInfo, onChange]);

  const handleFileUpload = (e) => {
    const newFiles = e.target.files;
    if (newFiles.length > 0 && newFiles.length <= 10) {
      const newAttachments = Array.from(newFiles);
      setAttachments(newAttachments);
      const initialFileInfo = {};
      newAttachments.forEach((file) => {
        initialFileInfo[file.name] = new AttachmentsData;
      });
      setFileInfo(initialFileInfo);
    }
    else
    {
      alert("Only upto 10 documents allowed to attach.")
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
    <div className='form-container'>
      <h4>EReferral Documents</h4>
      <input type="file" multiple onChange={handleFileUpload} />
      {attachments.length > 0 && (<div>
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
                  <textarea
                      value={fileInfo[file.name].Notes || ''}
                      onChange={(e) =>
                        handleFileInfoChange(e, file.name, 'Notes')
                      }
                      rows="4"
                    />
                </td>
                <td>
                  <textarea
                      value={fileInfo[file.name].DocDescription || ''}
                      onChange={(e) =>
                        handleFileInfoChange(e, file.name, 'DocDescription')
                      }
                      rows="4"
                    />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default Attachments;
