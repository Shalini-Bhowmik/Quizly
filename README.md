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


### 🏠 Dashboard

<img width="1401" height="907" alt="Screenshot 2026-10-01 113430" src="https://github.com/user-attachments/assets/777b22d5-a8b4-40e5-9cb8-7cf2a730e073" />

<img width="1397" height="896" alt="Screenshot 2026-10-01 113516" src="https://github.com/user-attachments/assets/4a68c486-abb7-41da-828b-599f4c814441" />



### 📝 Quiz Interface


<img width="1401" height="902" alt="Screenshot 2026-10-01 113633" src="https://github.com/user-attachments/assets/3cd54f02-90d1-402d-afdd-7c027c3f01cf" />

<img width="1388" height="887" alt="Screenshot 2026-10-01 113702" src="https://github.com/user-attachments/assets/c301847d-ec44-42d5-bba5-89a6574bdf27" />

<img width="1912" height="1072" alt="Screenshot 2026-10-01 113801" src="https://github.com/user-attachments/assets/360dbbea-e438-45a9-9ab3-9feb8360dad2" />

<img width="1895" height="896" alt="Screenshot 2026-10-01 113835" src="https://github.com/user-attachments/assets/bc1cd780-6357-4a77-ad64-409494e07469" />

<img width="1880" height="902" alt="Screenshot 2026-10-01 113854" src="https://github.com/user-attachments/assets/83f73fd1-4f69-4cbd-b330-2adbf32bc656" />



### 📊 Results

<img width="600" height="857" alt="image" src="https://github.com/user-attachments/assets/09b64ce7-129e-4ca1-893a-edf6e9ddfb31" />

<img width="592" height="907" alt="image" src="https://github.com/user-attachments/assets/f5bdada9-600f-4717-9048-43928f749988" />



### 👨‍💼 Admin Panel

<img width="1917" height="900" alt="image" src="https://github.com/user-attachments/assets/e0d4b082-2aae-4777-b9a5-e0dcc263b441" />

MANAGE SUBJECTS:

<img width="1370" height="902" alt="image" src="https://github.com/user-attachments/assets/286d284a-2569-4f92-b377-c26168801bdd" />

<img width="1367" height="892" alt="image" src="https://github.com/user-attachments/assets/067f4617-0cbe-4b95-9b14-e72930dceeb7" />

MANAGE QUESTIONS:

<img width="1901" height="910" alt="image" src="https://github.com/user-attachments/assets/912a9054-84d5-49c3-9e96-1fd8511f6d74" />










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
