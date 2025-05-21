import React, { useState } from 'react';
import { storage } from './firebase';
import { ref, uploadBytesResumable } from 'firebase/storage';

const MAX_FILES = 8;

const UploadForm = () => {
  const [files, setFiles] = useState([]);
  const [jobId, setJobId] = useState('');
  const [desc, setDesc] = useState('');
  const [progressList, setProgressList] = useState([]);
  const [message, setMessage] = useState('');
  const [previewFile, setPreviewFile] = useState(null);

  const handleFilesChange = (e) => {
    const selected = Array.from(e.target.files).slice(0, MAX_FILES);
    setFiles(selected);
    setProgressList(Array(selected.length).fill(0));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setMessage('');

    if (!files.length || !jobId) {
      alert('Please select at least one file and enter a Job ID.');
      return;
    }

    files.forEach((file, index) => {
      const path = `uploads/${jobId}/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressList((prev) => {
            const updated = [...prev];
            updated[index] = pct.toFixed(0);
            return updated;
          });
        },
        (error) => {
          console.error('❌ Upload error:', error);
          setMessage('One or more uploads failed.');
        },
        () => {
          if (index === files.length - 1) {
            setMessage('✅ All uploads complete!');
            setFiles([]);
            setJobId('');
            setDesc('');
            setProgressList([]);
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
          placeholder="Job ID"
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
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFilesChange}
        />

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

        <button type="submit">Upload</button>

        {progressList.map((p, i) => (
          <p key={i}>File {i + 1}: {p}%</p>
        ))}

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
