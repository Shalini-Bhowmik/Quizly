
import { useState, useEffect } from 'react';
import QuizInstructions from './QuizInstructions';
import MyAttempts from './MyAttempts';
import './Dashboard.css';

function Dashboard({
  studentName = 'Student',
  userId,
  onLogout
}) {

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showAttempts, setShowAttempts] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const [subjects, setSubjects] = useState([]);

  const [dashboardData, setDashboardData] = useState({
    statistics: {
      totalAttempts: 0,
      averagePercentage: 0
    },
    recentAttempts: []
  });


  // =================================
  // FETCH DASHBOARD DATA
  // =================================

  useEffect(() => {

    console.log('Dashboard userId:', userId);

    if (!userId) {
      console.warn('Dashboard: No userId received.');
      setLoading(false);
      return;
    }

    fetch(`https://quizly-s4ns.onrender.com/dashboard/${userId}`)
      .then((response) => {

        if (!response.ok) {
          throw new Error(
            `Dashboard API error: ${response.status}`
          );
        }

        return response.json();
      })
      .then((data) => {

        console.log('Dashboard API data:', data);

        setDashboardData({
          statistics: {
            totalAttempts:
              Number(data?.stats?.quizzesAttempted) || 0,

            averagePercentage:
              Number(data?.stats?.averageScore) || 0
          },

          recentAttempts:
            Array.isArray(data?.recentAttempts)
              ? data.recentAttempts
              : []
        });

        setLoading(false);
      })
      .catch((error) => {

        console.error(
          'Dashboard API error:',
          error
        );

        setDashboardData({
          statistics: {
            totalAttempts: 0,
            averagePercentage: 0
          },
          recentAttempts: []
        });

        setLoading(false);
      });

  }, [userId]);


  // =================================
  // FETCH SUBJECTS FROM DATABASE
  // =================================

  useEffect(() => {

    fetch('https://quizly-s4ns.onrender.com/admin/subjects')
      .then((response) => {

        if (!response.ok) {
          throw new Error(
            `Subjects API error: ${response.status}`
          );
        }

        return response.json();
      })
      .then((data) => {

        console.log(
          'Subjects from database:',
          data
        );

        if (!Array.isArray(data)) {
          setSubjects([]);
          return;
        }

        const colors = [
          'peach',
          'green',
          'yellow',
          'lavender',
          'pink'
        ];

        const formattedSubjects = data
          .filter(
            (subject) =>
              subject.status === 'active'
          )
          .map((subject, index) => {

            return {
              name: subject.name,

              icon:
                subject.icon || '📝',

              description:
                subject.description ||
                'Test your knowledge and improve your skills.',

              color:
                colors[index % colors.length],

              label:
                subject.category ||
                'ASSESSMENT',

              questionCount:
                Number(subject.question_count) || 0
            };

          });

        setSubjects(formattedSubjects);
      })
      .catch((error) => {

        console.error(
          'Subjects API error:',
          error
        );

        setSubjects([]);
      });

  }, []);


  // =================================
  // MY ATTEMPTS
  // =================================

  if (showAttempts) {

    return (
      <MyAttempts
        userId={userId}
        onDashboard={() =>
          setShowAttempts(false)
        }
      />
    );

  }


  // =================================
  // QUIZ INSTRUCTIONS
  // =================================

  if (selectedSubject) {

    return (
      <QuizInstructions
        subject={selectedSubject}
        userId={userId}
        onDashboard={() =>
          setSelectedSubject(null)
        }
      />
    );

  }


  // =================================
  // FIRST NAME
  // =================================

  const safeStudentName =
    studentName || 'Student';

  const firstName =
    safeStudentName
      .trim()
      .split(/\s+/)[0] || 'Student';


  // =================================
  // SEARCH
  // =================================

  const filteredSubjects =
    subjects.filter((subject) => {

      const search =
        searchTerm
          .toLowerCase()
          .trim();

      if (search === '') {
        return true;
      }

      return (
        subject.name
          .toLowerCase()
          .includes(search)

        ||

        subject.description
          .toLowerCase()
          .includes(search)

        ||

        subject.label
          .toLowerCase()
          .includes(search)
      );

    });


  // =================================
  // DASHBOARD
  // =================================

  return (

    <div className="dashboard-page">

      {/* TOPBAR */}

      <header className="dashboard-topbar">

        <div className="topbar-right">

          {/* NOTIFICATIONS */}

          <div className="notification-wrapper">

            <button
              className="notification-button"
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
            >
              🔔
              <span className="notification-dot"></span>
            </button>

            {showNotifications && (

              <div className="notification-panel">

                <div className="notification-panel-header">

                  <div>

                    <h3>
                      Notifications
                    </h3>

                    <p>
                      Stay updated with your progress
                    </p>

                  </div>

                  <button
                    className="notification-close"
                    onClick={() =>
                      setShowNotifications(false)
                    }
                  >
                    ×
                  </button>

                </div>


                <div className="notification-item">

                  <div className="notification-icon orange">
                    🎯
                  </div>

                  <div>

                    <strong>
                      Keep practicing!
                    </strong>

                    <p>
                      Complete more quizzes to improve
                      your average score.
                    </p>

                  </div>

                </div>


                <div className="notification-item">

                  <div className="notification-icon green">
                    🌱
                  </div>

                  <div>

                    <strong>
                      Every quiz counts
                    </strong>

                    <p>
                      Regular practice helps you build
                      stronger technical skills.
                    </p>

                  </div>

                </div>


                <div className="notification-item">

                  <div className="notification-icon purple">
                    📚
                  </div>

                  <div>

                    <strong>
                      {subjects.length} subjects available
                    </strong>

                    <p>
                      {subjects.length > 0
                        ? `Explore ${subjects
                            .map(
                              (subject) =>
                                subject.name
                            )
                            .join(', ')}.`
                        : 'Explore the available quiz subjects.'}
                    </p>

                  </div>

                </div>

              </div>

            )}

          </div>


          <div className="topbar-divider"></div>


          {/* PROFILE */}

          <div className="topbar-profile">

            <div className="topbar-avatar">
              {safeStudentName
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="topbar-profile-text">

              <span>
                Hello,
              </span>

              <strong>
                {firstName}
              </strong>

            </div>

            <span className="profile-arrow">
              ⌄
            </span>

          </div>


          {/* LOGOUT */}

          <button
            className="topbar-logout"
            onClick={onLogout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* CONTENT */}

      <main className="dashboard-content">

        {/* WELCOME + PROGRESS */}

        <section className="top-dashboard-grid">

          <div className="welcome-banner">

            <div className="welcome-content">

              <p className="welcome-label">
                STUDENT DASHBOARD
              </p>

              <h1>
                Welcome back,
                <br />
                {firstName}! 👋
              </h1>

              <p className="welcome-description">
                Ready to test your knowledge and
                improve your skills?
              </p>

              <div className="welcome-pills">

                <span className="pill-practice">
                  🎯 Practice
                </span>

                <span className="pill-learn">
                  📖 Learn
                </span>

                <span className="pill-grow">
                  🌿 Grow
                </span>

              </div>

            </div>


            <div className="welcome-illustration">

              <div className="illustration-sun">
                💡
              </div>

              <div className="illustration-person">
                👩‍💻
              </div>

              <div className="illustration-books">
                📚
              </div>

              <span className="illustration-star star-one">
                ✦
              </span>

              <span className="illustration-star star-two">
                ♡
              </span>

              <span className="illustration-text">
                Better
                <br />
                every day
              </span>

            </div>

          </div>


          {/* PROGRESS */}

          <div className="progress-card">

            <div className="progress-card-heading">

              <span className="progress-heading-icon">
                📈
              </span>

              <h2>
                Your Progress
              </h2>

            </div>

            <div className="progress-inner">

              <div className="progress-ring">

                <div className="progress-ring-inner">

                  {dashboardData.statistics.averagePercentage || 0}%

                </div>

              </div>


              <div className="progress-details">

                <span>
                  Average Score
                </span>

                <h2>
                  {dashboardData.statistics.averagePercentage || 0}%
                </h2>

                <p>
                  Keep going! 🌱
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* STATISTICS */}

        <section className="stats-container">

          <div className="stat-card stat-peach">

            <div className="stat-card-icon">
              📋
            </div>

            <div>

              <h2>
                {dashboardData.statistics.totalAttempts || 0}
              </h2>

              <p>
                Quizzes Attempted
              </p>

            </div>

            <span className="stat-arrow">
              →
            </span>

          </div>


          <div className="stat-card stat-green">

            <div className="stat-card-icon">
              🎯
            </div>

            <div>

              <h2>
                {dashboardData.statistics.averagePercentage || 0}%
              </h2>

              <p>
                Average Score
              </p>

            </div>

            <span className="stat-arrow">
              →
            </span>

          </div>


          <div className="stat-card stat-lavender">

            <div className="stat-card-icon">
              🏆
            </div>

            <div>

              <h2>
                {subjects.length}
              </h2>

              <p>
                Subjects Available
              </p>

            </div>

            <span className="stat-arrow">
              →
            </span>

          </div>

        </section>


        {/* LOWER GRID */}

        <section className="lower-dashboard-grid">

          {/* SUBJECTS */}

          <div className="subjects-panel">

            <div className="section-heading">

              <div>

                <p className="section-label">
                  EXPLORE
                </p>

                <h2>
                  📖 Choose a Subject
                </h2>

                <p>
                  Select a subject to start your quiz journey.
                </p>

              </div>

              <span className="subject-badge">
                {subjects.length} Subjects
              </span>

            </div>


            <div className="dashboard-subject-grid">

              {filteredSubjects.length === 0 ? (

                <div className="no-search-results">

                  <div className="no-search-icon">
                    🔎
                  </div>

                  <h3>
                    No subjects found
                  </h3>

                  <p>
                    Try searching for a subject.
                  </p>

                </div>

              ) : (

                filteredSubjects.map(
                  (subject) => (

                    <div
                      className={`dashboard-subject-card ${subject.color}`}
                      key={subject.name}
                    >

                      <div className="subject-card-header">

                        <div className="dashboard-subject-icon">
                          {subject.icon}
                        </div>

                        <span className="subject-label">
                          {subject.label}
                        </span>

                      </div>


                      <h3>
                        {subject.name}
                      </h3>


                      <p>
                        {subject.description}
                      </p>


                      <div className="subject-question-count">
                        📝 {subject.questionCount} Questions
                      </div>


                      <button
                        className="subject-start-button"
                        onClick={() =>
                          setSelectedSubject(
                            subject.name
                          )
                        }
                      >
                        Start Quiz →
                      </button>

                    </div>

                  )
                )

              )}

            </div>

          </div>


          {/* RIGHT COLUMN */}

          <div className="right-dashboard-column">

            {/* MOTIVATION */}

            <div className="motivation-card">

              <div className="motivation-icon">
                🏆
              </div>

              <div>

                <h3>
                  Keep Going!
                </h3>

                <p>
                  Every quiz brings you
                  one step closer to your goal.
                </p>

              </div>

              <span className="motivation-star">
                ✦
              </span>

            </div>


            {/* RECENT ATTEMPTS */}

            <div className="recent-card">

              <div className="recent-heading">

                <h2>
                  🕘 Recent Attempts
                </h2>

                <button
                  className="recent-view-all"
                  onClick={() =>
                    setShowAttempts(true)
                  }
                >
                  View All →
                </button>

              </div>


              {loading ? (

                <div className="recent-empty">

                  <div className="recent-empty-icon">
                    ⏳
                  </div>

                  <h3>
                    Loading attempts...
                  </h3>

                </div>

              ) : dashboardData.recentAttempts.length === 0 ? (

                <div className="recent-empty">

                  <div className="recent-empty-icon">
                    📝
                  </div>

                  <h3>
                    No quiz attempts yet
                  </h3>

                  <p>
                    Complete your first quiz and
                    your results will appear here.
                  </p>

                  <div className="recent-arrow">
                    →
                  </div>

                </div>

              ) : (

                <div className="recent-attempts-list">

                  {dashboardData.recentAttempts.map(
                    (attempt, index) => (

                      <div
                        className="recent-attempt-item"
                        key={
                          attempt.id || index
                        }
                      >

                        <div className="recent-attempt-icon">
                          📝
                        </div>

                        <div className="recent-attempt-info">

                          <h3>
                            {attempt.subject || 'Quiz'}
                          </h3>

                        </div>

                      </div>

                    )
                  )}

                </div>

              )}

            </div>


            {/* ENCOURAGEMENT */}

            <div className="encouragement-card">

              <span>
                🌿
              </span>

              <p>
                You got this!
              </p>

              <span>
                ❤️
              </span>

            </div>

          </div>

        </section>

      </main>


      {/* FOOTER */}

      <footer className="dashboard-footer">

        <div className="footer-brand">

          <div className="footer-logo">
            Q
          </div>

          <strong>
            Quizly
          </strong>

          <span>
            Learn • Practice • Improve
          </span>

        </div>


        <p>
          © 2026 Quizly. All rights reserved. ❤️
        </p>

      </footer>

    </div>

  );
}

export default Dashboard;

