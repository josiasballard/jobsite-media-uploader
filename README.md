# 📷 AES Jobsite Media Uploader

A lightweight and mobile-friendly React web app designed to let field employees quickly upload jobsite media—photos and videos—directly to Firebase Storage. Files are grouped under unique Job IDs, with optional metadata for descriptions and uploader names.

🔗 **Live Site:** [https://aes-media-uploader.web.app/](https://aes-media-uploader.web.app/)

---

## 🚧 Why I Built This

We needed a simple, fast way for crew members and subcontractors to submit jobsite media without logging in or navigating complex systems. This tool lets anyone with the link submit files in seconds—with backend organization and metadata tagging handled automatically.

---

## ✨ Features

- Upload up to 8 media files (image/video)
- Live previews with zoom-on-click
- Responsive layout optimized for mobile use
- Metadata: Optional description and uploader name
- Clean upload progress tracking (`Uploading 1 of 5`, etc.)
- Post-submission success confirmation
- All files saved in Firebase under organized `uploads/{jobId}/` paths
- File metadata stored (name, description, uploader)

---

## 🛠 Tech Stack

- **Frontend:** React (Create React App), Tailored CSS
- **Backend:** Firebase Storage
- **Hosting:** Firebase Hosting
- **Security:** Firebase App Check with reCAPTCHA v3

---

## 📂 Folder Structure

├── public/

│ └── AES Logo (primary).png

├── src/

│ ├── App.js

│ ├── App.css

│ ├── UploadForm.js

│ └── firebase.js


---

## 🚀 Deployment

Deployed using Firebase CLI:

```bash
npm run build
firebase deploy
