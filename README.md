# 🎯 Quizly – Online Quiz & Assessment System

> **Quizly** is a full-stack online quiz and assessment platform that allows students to participate in subject-based quizzes and enables administrators to manage subjects, questions, quiz duration, and assessments through a database-driven system.

🌐 **Live Demo:** https://quizly-beige.vercel.app/



## ✨ Features

### 👨‍🎓 Student Features

* 🔐 Student Registration & Login
* 📚 Subject-based quizzes
* 📝 Multiple-choice questions
* ⏱️ Configurable quiz duration
* 📊 Automatic score calculation
* 📋 Quiz result and performance tracking
* 🕒 Recent quiz attempts
* 📖 Complete quiz attempt history
* 🔄 Retry quizzes
* 🖥️ Responsive and user-friendly interface

### 👨‍💼 Admin Features

* 🔐 Admin authentication
* 📚 Manage quiz subjects
* ❓ Add and manage questions
* ⏱️ Configure quiz duration
* 📊 Manage database-driven assessments
* 🗂️ Organize questions according to subjects



## 🛠️ Tech Stack

### Frontend

* ⚛️ React.js
* ⚡ Vite
* 🎨 CSS
* 🧭 React Router

### Backend

* 🟢 Node.js
* 🚂 Express.js
* 🔗 REST APIs

### Database

* 🐬 MySQL
* ☁️ Aiven MySQL

### Deployment

* ▲ Vercel – Frontend
* 🚀 Render – Backend
* ☁️ Aiven – Database



## 🏗️ System Architecture


                    ┌──────────────────────┐
                    │      Student         │
                    │      / Admin         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React + Vite       │
                    │     Frontend         │
                    │      Vercel          │
                    └──────────┬───────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Node.js + Express   │
                    │      Backend         │
                    │       Render         │
                    └──────────┬───────────┘
                               │
                         MySQL Queries
                               │
                               ▼
                    ┌──────────────────────┐
                    │      MySQL           │
                    │       Aiven          │
                    └──────────────────────┘

## 📚 Available Quiz Subjects

Quizly supports multiple subject-based assessments, including:

| Subject              | Focus                             |
| -------------------- | --------------------------------- |
| ☕ Java               | Java programming and OOP concepts |
| 🧩 DSA               | Data structures and algorithms    |
| 🗄️ DBMS             | Database management concepts      |
| ⚙️ Operating Systems | OS concepts and fundamentals      |
| 🌐 Computer Networks | Networking concepts and protocols |

Additional subjects can be added through the admin functionality.



## 🔑 Main Workflow

Student Registration
        ↓
      Login
        ↓
     Dashboard
        ↓
  Select Subject
        ↓
    Start Quiz
        ↓
 Answer Questions
        ↓
    Submit Quiz
        ↓
 Calculate Score
        ↓
  View Result
        ↓
  Save Attempt
        ↓
 View Quiz History


## 📊 Database

Quizly uses a MySQL database to store application and assessment data.

The database manages information such as:

* Users
* Administrators
* Subjects
* Questions
* Quiz attempts
* Scores and assessment records

The application communicates with the database through the Node.js/Express backend.



## 📁 Project Structure

Quizly/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── ...
│
└── README.md


## 🌐 Deployment

Quizly is deployed using a three-tier architecture:


Frontend  →  Vercel
Backend   →  Render
Database  →  Aiven MySQL




## 📸 Screenshots

Add screenshots of your application here to showcase the UI.

### 🏠 Dashboard

```text
Add your dashboard screenshot here
```

### 📝 Quiz Interface

```text
Add your quiz screenshot here
```

### 📊 Results

```text
Add your result screenshot here
```

### 👨‍💼 Admin Panel

```text
Add your admin panel screenshot here


## 💡 Key Highlights

* Full-stack web application
* Database-driven quiz system
* Role-based student and admin functionality
* Dynamic subject and question management
* Configurable quiz duration
* Automatic assessment and scoring
* Persistent quiz attempt history
* REST API based backend
* Cloud deployment with separate frontend, backend, and database services



## 🔮 Future Enhancements

* 📈 Advanced student performance analytics
* 🏆 Leaderboards
* 📊 Admin analytics dashboard
* 📄 Downloadable result reports
* 🔔 Notifications
* 🎯 Difficulty-based question selection
* 🤖 AI-assisted question generation



## 👩‍💻 Developer

**Shalini Bhowmik**

B.Tech – Computer Science & Engineering


⭐ If you find this project useful, consider giving the repository a star!
