import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [currentId] = useState("7MA101");
  const [filename] = useState("module 2");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFileData, setUploadedFileData] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSize = 5 * 1024 * 1024; 

    if (selectedFile && selectedFile.size > maxSize) {
      alert('File size exceeds 5 MB. Please select a smaller file.');
      setFile(null);
      e.target.value = ''; 
    } else {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('currentId', currentId);
    formData.append('filename', filename);

    setIsLoading(true);

    try {
      const response = await fetch('https://cse-open-source.vercel.app/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadedFileData(result);
        alert('File uploaded successfully');
      } else {
        alert(`File upload failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>File Upload Form</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="file" onChange={handleFileChange} required />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {uploadedFileData && (
        <div>
          <h2>Uploaded File Info:</h2>
          <p>Current ID: {uploadedFileData.currentId}</p>
          <p>File Name: {uploadedFileData.fileName}</p>
          <p>Data Vector: {uploadedFileData.dataVector.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
