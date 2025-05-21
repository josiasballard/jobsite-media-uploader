// UploadForm.js

import React, { useState } from 'react';
import { storage } from './firebase';
import { ref, uploadBytesResumable } from 'firebase/storage';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [jobId, setJobId] = useState('');
  const [desc, setDesc] = useState('');
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  const handleUpload = (e) => {
    e.preventDefault();
    setMessage('');

    if (!file || !jobId) {
      alert("Please select a file and enter a Job ID.");
      return;
    }

    const path = `uploads/${jobId}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, path);
    console.log("📁 Uploading:", file.name, "to", path);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(pct.toFixed(0));
      },
      (error) => {
        console.error("❌ Upload error:", error);
        setMessage("Upload failed. Please try again.");
      },
      () => {
        console.log("✅ Upload complete");
        setMessage("Upload successful!");
        setFile(null);
        setJobId('');
        setDesc('');
        setProgress(0);
      }
    );
  };

  return (
    <form className="upload-form" onSubmit={handleUpload}>
      <h2>Upload Jobsite Photo</h2>
      
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
        onChange={(e) => setFile(e.target.files[0])}
        accept="image/*,video/*"
        required
      />

      <button type="submit">Upload</button>

      {progress > 0 && <p>Uploading: {progress}%</p>}
      {message && <p className="message">{message}</p>}
    </form>
  );
};

export default UploadForm;
