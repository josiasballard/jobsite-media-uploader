import React, { useState } from 'react';
import { storage } from './firebase';
import { ref, uploadBytesResumable } from 'firebase/storage';

const MAX_FILES = 8;

const UploadForm = () => {
  const [files, setFiles] = useState([]);
  const [jobId, setJobId] = useState('');
  const [desc, setDesc] = useState('');
  const [userName, setUserName] = useState('');
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [message, setMessage] = useState('');
  const [previewFile, setPreviewFile] = useState(null);

  const handleFilesChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles((prev) => {
      const merged = [...prev, ...selected].slice(0, MAX_FILES);
      return merged;
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setMessage('');

    if (!files.length || !jobId) {
      alert('Please select at least one file and enter a Job ID.');
      return;
    }

    let total = files.length;
    let current = 1;

    files.forEach((file, index) => {
      const path = `uploads/${jobId}/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, path);

      const metadata = {
        customMetadata: {
          jobId,
          description: desc || '',
          uploader: userName || '',
        },
      };

      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      setUploadingIndex({ current, total });

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.error('❌ Upload error:', error);
          setMessage('One or more uploads failed.');
        },
        () => {
          if (index === total - 1) {
            setMessage('✅ All uploads complete!');
            setFiles([]);
            setJobId('');
            setDesc('');
            setUserName('');
            setUploadingIndex(null);
          } else {
            setUploadingIndex({ current: current + 1, total });
            current += 1;
          }
        }
      );
    });
  };

  return (
    <>
      <form className="upload-form" onSubmit={handleUpload}>
        <h2>Upload Jobsite Media</h2>

        <input
          type="text"
          placeholder="Enter Job ID"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          required
        />

        <textarea
          placeholder="Description (optional)"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <input
          type="text"
          placeholder="Your Name (optional)"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFilesChange}
        />
        <p className="file-count">{files.length} of {MAX_FILES} files selected</p>

        <div className="previews">
          {files.map((file, idx) => {
            const url = URL.createObjectURL(file);
            return (
              <div
                key={idx}
                className="preview-box"
                onClick={() => setPreviewFile({ file, url })}
              >
                {file.type.startsWith('image') ? (
                  <img src={url} alt="preview" className="preview" />
                ) : (
                  <video src={url} className="preview" />
                )}
              </div>
            );
          })}
        </div>

        <div className="upload-btn-container">
          <button type="submit">Upload</button>
        </div>

        {uploadingIndex && (
          <p>Uploading {uploadingIndex.current} of {uploadingIndex.total}</p>
        )}

        {message && <p className="message">{message}</p>}
      </form>

      {previewFile && (
        <div className="modal" onClick={() => setPreviewFile(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setPreviewFile(null)}>✕</button>
            {previewFile.file.type.startsWith('image') ? (
              <img src={previewFile.url} alt="full" className="modal-media" />
            ) : (
              <video src={previewFile.url} controls className="modal-media" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UploadForm;
