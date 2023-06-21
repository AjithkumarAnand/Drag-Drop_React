import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const updatedFiles = [
        ...uploadedFiles,
        ...acceptedFiles.map((file) => ({
          name: file.name,
          size: file.size,
          path: URL.createObjectURL(file), // Generate a temporary URL for the file
        })),
      ];
      setUploadedFiles(updatedFiles);
    },
    [uploadedFiles]
  );

  const handleDownload = (path) => {
    // Create a temporary <a> element to trigger the download
    const link = document.createElement("a");
    link.href = path;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  // const handleEdit = (index) => {
  //   // Perform your desired edit action here
  //   console.log("Edit file at index", index);
  // };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
  });

  return (
    <div className="file-uploader">
      <h2>Drag and Drop File Uploader</h2>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag and drop a file here, or click to select a file</p>
        )}
      </div>
      <div className="file-list">
        {uploadedFiles.map((file, index) => (
          <div key={index} className="file-item">
            <div className="file-info">
              <div className="file-name">{file.name}</div>
              <div className="file-size">{file.size} bytes</div>
            </div>
            <div className="file-actions">
              <button onClick={() => handleDownload(file.path)}>
                Download
              </button>
              <button onClick={() => handleDelete(index)}>Delete</button>
              {/* <button onClick={() => handleEdit(index)}>Edit</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
