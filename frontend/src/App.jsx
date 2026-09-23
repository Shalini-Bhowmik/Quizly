
import { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import ManageSubjects from './ManageSubjects';
import ManageQuestions from './ManageQuestions';
import AdminResults from './AdminResults';
import './App.css';

function App() {

  const [currentPage, setCurrentPage] = useState('home');

  const [studentName, setStudentName] = useState('');

  const [currentUser, setCurrentUser] = useState(null);

  const [currentAdmin, setCurrentAdmin] = useState(null);


  // =====================================
  // STUDENT REGISTER
  // =====================================

  const handleRegister = (user) => {

    console.log("Registered user:", user);

    setCurrentUser(user);

    setStudentName(
      user?.name || 'Student'
    );

    setCurrentPage('dashboard');
  };


  // =====================================
  // STUDENT LOGIN
  // =====================================

  const handleLogin = (user) => {

    console.log("Logged in user:", user);

    setCurrentUser(user);

    setStudentName(
      user?.name || 'Student'
    );

    setCurrentPage('dashboard');
  };


  // =====================================
  // STUDENT LOGOUT
  // =====================================

  const handleLogout = () => {

    setStudentName('');

    setCurrentUser(null);

    setCurrentPage('home');
  };


  // =====================================
  // ADMIN LOGIN
  // =====================================

  const handleAdminLogin = (admin) => {

    console.log("Admin logged in:", admin);

    setCurrentAdmin(admin);

    setCurrentPage('admin-dashboard');
  };


  // =====================================
  // ADMIN LOGOUT
  // =====================================

  const handleAdminLogout = () => {

    setCurrentAdmin(null);

    setCurrentPage('home');
  };


  // =====================================
  // STUDENT LOGIN PAGE
  // =====================================

  if (currentPage === 'login') {

    return (
      <Login
        onLogin={handleLogin}
        onRegister={handleRegister}
        onHome={() =>
          setCurrentPage('home')
        }
      />
    );
  }


  // =====================================
  // STUDENT DASHBOARD
  // =====================================

  if (currentPage === 'dashboard') {

    return (
      <Dashboard
        studentName={studentName || 'Student'}
        userId={currentUser?.id}
        onLogout={handleLogout}
        onHome={() =>
          setCurrentPage('home')
        }
      />
    );
  }


  // =====================================
  // ADMIN LOGIN
  // =====================================

  if (currentPage === 'admin-login') {

    return (
      <AdminLogin
        onAdminLogin={handleAdminLogin}
        onHome={() =>
          setCurrentPage('home')
        }
      />
    );
  }


  // =====================================
  // MANAGE SUBJECTS
  // =====================================

  if (currentPage === 'manage-subjects') {

    return (
      <ManageSubjects
        onDashboard={() =>
          setCurrentPage('admin-dashboard')
        }
      />
    );
  }


  // =====================================
  // MANAGE QUESTIONS
  // =====================================

  if (currentPage === 'manage-questions') {

    return (
      <ManageQuestions
        onDashboard={() =>
          setCurrentPage('admin-dashboard')
        }
      />
    );
  }


  // =====================================
  // ADMIN RESULTS
  // =====================================

  if (currentPage === 'admin-results') {

    return (
      <AdminResults
        onDashboard={() =>
          setCurrentPage('admin-dashboard')
        }
      />
    );
  }


  // =====================================
  // ADMIN DASHBOARD
  // =====================================

  if (currentPage === 'admin-dashboard') {

    return (
      <AdminDashboard
        admin={currentAdmin}
        onLogout={handleAdminLogout}

        onSubjects={() =>
          setCurrentPage('manage-subjects')
        }

        onQuestions={() =>
          setCurrentPage('manage-questions')
        }

        onResults={() =>
          setCurrentPage('admin-results')
        }
      />
    );
  }


  // =====================================
  // QUIZLY HOMEPAGE
  // =====================================

  return (

    <div className="app">

      <nav className="navbar">

        <div
          className="logo"
          onClick={() =>
            setCurrentPage('home')
          }
        >
          Quiz<span>ly</span>
        </div>


        <div className="nav-links">


          <button
            className="nav-link active"
            onClick={() =>
              setCurrentPage('home')
            }
          >
            Home
          </button>


          <button
            className="nav-link"
            onClick={() =>
              document
                .getElementById('subjects')
                ?.scrollIntoView({
                  behavior: 'smooth'
                })
            }
          >
            Subjects
          </button>


          <button
            className="nav-link"
            onClick={() =>
              document
                .getElementById('about')
                ?.scrollIntoView({
                  behavior: 'smooth'
                })
            }
          >
            About
          </button>


          <button
            className="login-nav-button"
            onClick={() =>
              setCurrentPage('login')
            }
          >
            Login
          </button>


        </div>

      </nav>


      {/* =====================================
          HERO
      ===================================== */}

      <section className="hero-section">

        <div className="hero-text">

          <p className="tagline">
            LEARN • PRACTICE • IMPROVE
          </p>


          <h1>
            Test Your Knowledge.
            <br />
            <span>
              Improve Your Skills.
            </span>
          </h1>


          <p className="description">
            Challenge yourself with interactive quizzes,
            track your performance, and improve your
            technical skills — one quiz at a time.
          </p>


          <div className="hero-trust">

            <span>
              ✓ Technical Subjects
            </span>

            <span>
              ✓ MCQ Questions
            </span>

            <span>
              ✓ Track Your Progress
            </span>

          </div>

        </div>


        <div className="hero-visual">


          <div className="floating-card floating-card-one">

            <span>
              🎯
            </span>

            <div>

              <strong>
                Practice
              </strong>

              <small>
                Every day
              </small>

            </div>

          </div>


          <div className="main-hero-card">

            <div className="hero-card-top">

              <span>
                QUIZLY
              </span>

              <span>
                ✦
              </span>

            </div>


            <div className="quiz-icon">
              ?
            </div>


            <h2>
              Ready to Challenge Yourself?
            </h2>


            <p>
              Choose a subject, take a quiz,
              and see how much you know.
            </p>


            <div className="mini-stats">

              <div>

                <strong>
                  Learn
                </strong>

                <span>
                  Subjects
                </span>

              </div>


              <div>

                <strong>
                  Improve
                </strong>

                <span>
                  yourself
                </span>

              </div>


              <div>

                <strong>
                  Achieve
                </strong>

                <span>
                  Perfectionism
                </span>

              </div>

            </div>

          </div>


          <div className="floating-card floating-card-two">

            <span>
              🌱
            </span>

            <div>

              <strong>
                Keep Growing
              </strong>

              <small>
                Improve your score
              </small>

            </div>

          </div>


        </div>

      </section>


      {/* =====================================
          SUBJECTS
      ===================================== */}

      <section
        className="subjects-section"
        id="subjects"
      >

        <p className="section-label">
          EXPLORE SUBJECTS
        </p>


        <h2>
          Learn. Practice. Improve.
        </h2>


        <p className="subjects-description">
          Test your knowledge across the core subjects
          every Computer Science student needs.
        </p>


        <div className="subject-container">


          <div className="subject-card peach">

            <div className="subject-icon">
              ☕
            </div>

            <span className="subject-tag">
              CORE
            </span>

            <h3>
              Java
            </h3>

            <p>
              Core Java, OOP, collections and
              programming concepts.
            </p>

            <span className="subject-arrow">
              Explore →
            </span>

          </div>


          <div className="subject-card green">

            <div className="subject-icon">
              🧩
            </div>

            <span className="subject-tag">
              LOGIC
            </span>

            <h3>
              Data Structures & Algorithms
            </h3>

            <p>
              Arrays, trees, graphs, sorting and
              algorithmic thinking.
            </p>

            <span className="subject-arrow">
              Explore →
            </span>

          </div>


          <div className="subject-card yellow">

            <div className="subject-icon">
              🗄️
            </div>

            <span className="subject-tag">
              DATA
            </span>

            <h3>
              DBMS
            </h3>

            <p>
              SQL, normalization, transactions and
              database concepts.
            </p>

            <span className="subject-arrow">
              Explore →
            </span>

          </div>


          <div className="subject-card lavender">

            <div className="subject-icon">
              💻
            </div>

            <span className="subject-tag">
              SYSTEM
            </span>

            <h3>
              Operating Systems
            </h3>

            <p>
              Processes, memory, scheduling and
              operating system concepts.
            </p>

            <span className="subject-arrow">
              Explore →
            </span>

          </div>


          <div className="subject-card pink">

            <div className="subject-icon">
              🌐
            </div>

            <span className="subject-tag">
              NETWORK
            </span>

            <h3>
              Computer Networks
            </h3>

            <p>
              TCP/IP, protocols, networking and
              security basics.
            </p>

            <span className="subject-arrow">
              Explore →
            </span>

          </div>


        </div>

      </section>


      {/* =====================================
          ABOUT
      ===================================== */}

      <section
        className="about-section"
        id="about"
      >

        <div className="about-content">

          <div className="about-label">
            ABOUT QUIZLY
          </div>


          <h2>
            Your Personal Space
            <br />
            to <span>Learn & Grow.</span>
          </h2>


          <p>
            Quizly is an online quiz and assessment
            platform designed to help students practice
            important Computer Science concepts in an
            engaging way.
          </p>


          <p>
            Take quizzes, track your attempts, review
            your performance, and continuously improve
            your technical knowledge.
          </p>


          <div className="about-points">


            <div>

              <span>
                ✓
              </span>

              Practice technical subjects

            </div>


            <div>

              <span>
                ✓
              </span>

              Track your quiz performance

            </div>


            <div>

              <span>
                ✓
              </span>

              Improve with consistent practice

            </div>


          </div>

        </div>


        <div className="about-card">

          <div className="about-card-icon">
            💡
          </div>


          <h3>
            Small Steps.
            <br />
            Big Progress.
          </h3>


          <p>
            Every question you answer is another
            step toward mastering your skills.
          </p>


          <div className="about-decoration">
            🌿 ✦ ☕
          </div>

        </div>


      </section>


      {/* =====================================
          CTA
      ===================================== */}

      <section className="cta-section">

        <div>

          <p>
            READY TO BEGIN?
          </p>


          <h2>
            Put Your Knowledge
            <br />
            to the Test.
          </h2>

        </div>


        <button
          onClick={() =>
            setCurrentPage('login')
          }
        >
          Start Your Quiz →
        </button>

      </section>


      {/* =====================================
          FOOTER
      ===================================== */}

      <footer className="footer">

        <div className="footer-logo">
          Q
        </div>


        <div>

          <strong>
            Quizly
          </strong>

          <p>
            Learn • Practice • Improve
          </p>

        </div>


        <span>
          © 2026 Quizly. All rights reserved. ❤️
        </span>


        <button
          className="admin-footer-button"
          onClick={() =>
            setCurrentPage('admin-login')
          }
        >
          🔐 Admin
        </button>


      </footer>


    </div>

  );
}

export default App;
