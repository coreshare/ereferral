import React, { useState } from "react";

const UploadManagement = () => {
  const [attachments, setAttachments] = useState([]);
  const [metadata, setMetadata] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 0) {
      const newAttachments = Array.from(selectedFiles);
      setAttachments((prevAttachments) => [...prevAttachments, ...newAttachments]);
      setMetadata((prevMetadata) =>
        newAttachments.map((file) => ({
          notes: "",
          category: "",
        }))
      );
    }
  };

  const handleMetadataChange = (index, field, value) => {
    const newMetadata = [...metadata];
    newMetadata[index][field] = value;
    setMetadata(newMetadata);
  };

  return (
    <div>
      <div className="attachment-control">
        <label htmlFor="file">Attachments:</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleFileChange}
          required
          multiple
        />
      </div>
      {attachments.length > 0 && (
        <table className="file-metadata-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Notes</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {attachments.map((file, index) => (
              <tr key={index}>
                <td>{file.name}</td>
                <td>
                  <input
                    type="text"
                    value={metadata[index].notes}
                    onChange={(e) =>
                      handleMetadataChange(index, "notes", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={metadata[index].category}
                    onChange={(e) =>
                      handleMetadataChange(index, "category", e.target.value)
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

export default UploadManagement;
