# 📧 SendEmail Tool

**SendEmail Tool** is a simple web-based utility that allows users to send emails via a backend powered by Node.js and Nodemailer. It features a clean HTML/CSS/JS frontend and a lightweight Express backend.

---

## 🚀 Overview

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express, Nodemailer
- Designed for learning and demonstration purposes
- Works locally or with any backend hosting

---

## 📁 Project Structure

SendEmail-Tool/ ├── backend/            # Node.js backend server with Express + Nodemailer │   ├── server.js │   └── package.json ├── frontend/           # Web interface (HTML, CSS, JS) │   ├── index.html │   ├── style.css │   └── script.js └── README.md

---

## 🛠 Setup Instructions
bash```
git clone https://github.com/Ahmed-Hussein793/SendEmail-Tool
```
### Backend

1. Navigate to the backend folder:

   
```
   cd backend
```
2. Install dependencies:
```
npm install
```

3. Start the server:
```
node server.js
```
The server will run on http://localhost:3000

Frontend

Open frontend/index.html directly in your browser.
Make sure the JavaScript (script.js) points to the correct backend URL (e.g., http://localhost:3000).

## ✉️ How It Works

1. User fills in name, email, recipient, and message


2. The frontend sends a POST request to /send-email


3. Backend uses Nodemailer to send the email


4. A success or error response is returned and shown to the user

## 📌 Notes

You can integrate this tool with your own SMTP credentials (Gmail, Outlook, etc.)

Make sure to configure proper security and validation if you use this in production

## 👤 Author

Ahmed Hussein
