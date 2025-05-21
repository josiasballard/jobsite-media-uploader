// App.js

import React from 'react';
import UploadForm from './UploadForm';
import './App.css'; // Ensure styles are applied

function App() {
  console.log("App loaded successfully");

  return (
    <div className="App">
      <div className="logo-placeholder">
        <img src="/aes-logo.png" alt="AES Logo" className="logo-img" />
      </div>
      <h1>Media Uploader</h1>
      <UploadForm />
    </div>
  );
}

export default App;
