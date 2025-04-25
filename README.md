# 📘 Attendance Tracker

A responsive web application that helps students track their attendance in multiple subjects, ensuring they meet their target percentages. Built with the MERN stack and styled using Chakra UI.

---

## 🚀 Features

- ✅ User Registration & Login  
- 🔐 JWT-based Authentication  
- 🧾 Add/Edit/Delete Subjects  
- 📅 Set Start and End Dates  
- 🎯 Set Target Attendance Percentage  
- 📊 Track Missed and Attended Classes  
- 📱 Responsive Design (Mobile & Desktop)  

---

## 🛠️ Tech Stack

**Frontend**:  
- React + TypeScript
- Tailwind 
- Vite  
- Chakra UI  
- Axios  
- React Router DOM  

**Backend**:  
- Node.js  
- Express.js  
- MongoDB (Atlas)  
- Mongoose  
- JWT Authentication  
- CORS & dotenv  

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone git@github.com:uk-2149/attendance-tracker.git
cd attendance-tracker
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a .env file in backend/:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Run the backend:

```bash
node server.js
```

### 3. Setup the Frontend

```bash
cd ../frontend
npm install
```

Create a .env file inside frontend/:

```bash
VITE_BACKEND_URL=http://localhost:5000
```

Run the frontend:

```bash
npm run dev
```

---

## 🎯 Future Improvements

- Dark mode toggle
- Email verification
- Reminders for low attendance
- App version
