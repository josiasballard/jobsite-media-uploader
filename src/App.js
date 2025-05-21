// App.js
import React from 'react';
import UploadForm from './UploadForm';
import './App.css'; // Ensure styles are applied

function App() {
  console.log("App loaded successfully");

  return (
    <div className="App">
      <div className="logo-placeholder">Logo</div>
      <h1>AES Media Uploader</h1>
      <UploadForm />
    </div>
  );
}

export default App;
