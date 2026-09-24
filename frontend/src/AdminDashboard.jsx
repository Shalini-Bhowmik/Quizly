
import { useEffect, useState } from 'react';
import './AdminDashboard.css';

function AdminDashboard({
  admin,
  onLogout,
  onSubjects,
  onQuestions,
  onResults
}) {

  const [stats, setStats] = useState({
    subjects: 0,
    questions: 0,
    attempts: 0,
    averageScore: 0
  });

  const [subjects, setSubjects] = useState([]);

  const [showAddSubject, setShowAddSubject] = useState(false);

  const [newSubject, setNewSubject] = useState({
    name: '',
    description: '',
    category: '',
    icon: '📚',
    questionCount: 15,
    quizDuration: 5
  });


  // ==========================================
  // LOAD ADMIN STATISTICS
  // ==========================================

  const loadStats = () => {

    fetch('https://quizly-s4ns.onrender.com/admin/stats')

      .then(response => response.json())

      .then(data => {

        if (data.stats) {

          setStats({
            subjects: Number(data.stats.subjects) || 0,
            questions: Number(data.stats.questions) || 0,
            attempts: Number(data.stats.attempts) || 0,
            averageScore:
              Number(data.stats.averageScore) || 0
          });

        }

      })

      .catch(error => {

        console.error(
          'Failed to load admin statistics:',
          error
        );

      });

  };


  // ==========================================
  // LOAD SUBJECTS
  // ==========================================

  const loadSubjects = () => {

    fetch('https://quizly-s4ns.onrender.com/admin/subjects')

      .then(response => response.json())

      .then(data => {

        setSubjects(
          Array.isArray(data)
            ? data
            : []
        );

      })

      .catch(error => {

        console.error(
          'Failed to load subjects:',
          error
        );

      });

  };


  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {

    loadStats();
    loadSubjects();

  }, []);


  // ==========================================
  // ADD SUBJECT
  // ==========================================

  const handleAddSubject = (event) => {

    event.preventDefault();

    if (!newSubject.name.trim()) {

      alert('Please enter subject name.');

      return;
    }


    const subjectData = {

      name: newSubject.name.trim(),

      description:
        newSubject.description.trim(),

      category:
        newSubject.category.trim(),

      icon:
        newSubject.icon,

      questionCount:
        Number(newSubject.questionCount),

      quizDuration:
        Number(newSubject.quizDuration)

    };


    fetch('https://quizly-s4ns.onrender.com/admin/subjects', {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(subjectData)

    })

      .then(response => response.json())

      .then(data => {

        if (!data.message) {

          alert('Subject added successfully!');

          setShowAddSubject(false);

          setNewSubject({
            name: '',
            description: '',
            category: '',
            icon: '📚',
            questionCount: 15,
            quizDuration: 5
          });

          loadSubjects();
          loadStats();

        } else {

          alert(data.message);

        }

      })

      .catch(error => {

        console.error(
          'Add subject error:',
          error
        );

        alert(
          'Failed to add subject.'
        );

      });

  };


  // ==========================================
  // TOGGLE SUBJECT STATUS
  // ==========================================

  const handleToggleStatus = (subject) => {

    const newStatus =
      subject.status === 'active'
        ? 'inactive'
        : 'active';


    fetch(
      `https://quizly-s4ns.onrender.com/admin/subjects/${subject.id}`,
      {

        method: 'PUT',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({

          name: subject.name,

          description:
            subject.description,

          category:
            subject.category,

          icon:
            subject.icon,

          status:
            newStatus,

          questionCount:
            Number(subject.question_count),

          quizDuration:
            Number(subject.quiz_duration)

        })

      }
    )

      .then(response => response.json())

      .then(data => {

        if (data.message) {

          alert(data.message);

        }

        loadSubjects();
        loadStats();

      })

      .catch(error => {

        console.error(
          'Status update error:',
          error
        );

        alert(
          'Failed to update subject status.'
        );

      });

  };


  // ==========================================
  // UPDATE QUESTION COUNT / DURATION
  // ==========================================

  const handleSubjectSettingChange = (
    subject,
    field,
    value
  ) => {

    const updatedSubject = {

      name:
        subject.name,

      description:
        subject.description,

      category:
        subject.category,

      icon:
        subject.icon,

      status:
        subject.status,

      questionCount:
        field === 'questionCount'
          ? Number(value)
          : Number(subject.question_count),

      quizDuration:
        field === 'quizDuration'
          ? Number(value)
          : Number(subject.quiz_duration)

    };


    fetch(
      `https://quizly-s4ns.onrender.com/admin/subjects/${subject.id}`,
      {

        method: 'PUT',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(
          updatedSubject
        )

      }
    )

      .then(response => response.json())

      .then(data => {

        if (data.message) {

          alert(data.message);

        }

        loadSubjects();
        loadStats();

      })

      .catch(error => {

        console.error(
          'Subject settings update error:',
          error
        );

        alert(
          'Failed to update subject settings.'
        );

      });

  };


  return (

    <div className="admin-dashboard">


      {/* ==========================================
          SIDEBAR
      ========================================== */}

      <aside className="admin-sidebar">


        <div className="admin-logo">

          <div className="admin-logo-icon">
            📝
          </div>

          <div>

            <h2>
              Quizly
            </h2>

            <span>
              ADMIN PANEL
            </span>

          </div>

        </div>


        {/* NAVIGATION */}

        <nav className="admin-nav">


          <button
            className="admin-nav-item active"
          >
            <span>📊</span>
            Dashboard
          </button>


          <button
            className="admin-nav-item"
            onClick={onSubjects}
          >
            <span>📚</span>
            Manage Subjects
          </button>


          <button
            className="admin-nav-item"
            onClick={onQuestions}
          >
            <span>❓</span>
            Manage Questions
          </button>


          {/* ======================================
              RESULTS BUTTON
          ====================================== */}

          <button
            className="admin-nav-item"
            onClick={onResults}
          >
            <span>📈</span>
            Results
          </button>


        </nav>


        {/* ADMIN INFO */}

        <div className="admin-sidebar-bottom">

          <div className="admin-user">

            <div className="admin-avatar">
              {admin?.name
                ? admin.name.charAt(0).toUpperCase()
                : 'A'}
            </div>

            <div>

              <strong>
                {admin?.name || 'Administrator'}
              </strong>

              <span>
                Administrator
              </span>

            </div>

          </div>


          <button
            className="admin-logout"
            onClick={onLogout}
          >
            🚪 Logout
          </button>

        </div>


      </aside>


      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <main className="admin-main">


        {/* TOP BAR */}

        <header className="admin-topbar">

          <div>

            <p className="admin-top-label">
              QUIZLY ADMINISTRATION
            </p>

            <h1>
              Dashboard
            </h1>

          </div>


          <div className="admin-welcome">

            <span>
              Welcome,
            </span>

            <strong>
              {admin?.name || 'Administrator'}
            </strong>

          </div>

        </header>


        {/* ==========================================
            STATISTICS
        ========================================== */}

        <section className="admin-stats">


          <div className="admin-stat-card">

            <div className="stat-icon">
              📚
            </div>

            <div>

              <p>
                Active Subjects
              </p>

              <h2>
                {stats.subjects}
              </h2>

            </div>

          </div>


          <div className="admin-stat-card">

            <div className="stat-icon">
              ❓
            </div>

            <div>

              <p>
                Total Questions
              </p>

              <h2>
                {stats.questions}
              </h2>

            </div>

          </div>


          <div className="admin-stat-card">

            <div className="stat-icon">
              👥
            </div>

            <div>

              <p>
                Quiz Attempts
              </p>

              <h2>
                {stats.attempts}
              </h2>

            </div>

          </div>


          <div className="admin-stat-card">

            <div className="stat-icon">
              📈
            </div>

            <div>

              <p>
                Average Score
              </p>

              <h2>
                {stats.averageScore}%
              </h2>

            </div>

          </div>


        </section>


        {/* ==========================================
            QUICK ACTIONS
        ========================================== */}

        <section className="admin-section">


          <div className="admin-section-heading">

            <div>

              <p className="section-label">
                QUICK ACTIONS
              </p>

              <h2>
                Manage Quizly
              </h2>

              <p>
                Manage subjects, questions and
                monitor student performance.
              </p>

            </div>

          </div>


          <div className="admin-actions">


            {/* MANAGE SUBJECTS */}

            <button
              className="admin-action-card"
              onClick={onSubjects}
            >

              <div className="action-icon">
                📚
              </div>

              <div>

                <h3>
                  Manage Subjects
                </h3>

                <p>
                  Add, edit and manage quiz subjects
                </p>

              </div>

              <span className="action-arrow">
                →
              </span>

            </button>


            {/* MANAGE QUESTIONS */}

            <button
              className="admin-action-card"
              onClick={onQuestions}
            >

              <div className="action-icon">
                ❓
              </div>

              <div>

                <h3>
                  Manage Questions
                </h3>

                <p>
                  Add and manage quiz questions
                </p>

              </div>

              <span className="action-arrow">
                →
              </span>

            </button>


            {/* ======================================
                VIEW RESULTS
            ====================================== */}

            <button
              className="admin-action-card"
              onClick={onResults}
            >

              <div className="action-icon">
                📊
              </div>

              <div>

                <h3>
                  View Results
                </h3>

                <p>
                  Monitor student performance
                </p>

              </div>

              <span className="action-arrow">
                →
              </span>

            </button>


          </div>


        </section>


        {/* ==========================================
            SUBJECT SETTINGS
        ========================================== */}

        <section className="admin-section">


          <div className="admin-section-heading">

            <div>

              <p className="section-label">
                SUBJECT SETTINGS
              </p>

              <h2>
                Quiz Configuration
              </h2>

              <p>
                Set the number of questions and
                time limit for each subject.
              </p>

            </div>


            <button
              className="admin-add-button"
              onClick={() =>
                setShowAddSubject(
                  !showAddSubject
                )
              }
            >
              + Add Subject
            </button>

          </div>


          {/* ==========================================
              ADD SUBJECT FORM
          ========================================== */}

          {showAddSubject && (

            <form
              className="admin-add-form"
              onSubmit={handleAddSubject}
            >


              <div className="form-group">

                <label>
                  Subject Name
                </label>

                <input
                  type="text"
                  value={newSubject.name}
                  onChange={(event) =>
                    setNewSubject({
                      ...newSubject,
                      name: event.target.value
                    })
                  }
                  placeholder="Enter subject name"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Description
                </label>

                <input
                  type="text"
                  value={
                    newSubject.description
                  }
                  onChange={(event) =>
                    setNewSubject({
                      ...newSubject,
                      description:
                        event.target.value
                    })
                  }
                  placeholder="Enter description"
                />

              </div>


              <div className="form-group">

                <label>
                  Category
                </label>

                <input
                  type="text"
                  value={
                    newSubject.category
                  }
                  onChange={(event) =>
                    setNewSubject({
                      ...newSubject,
                      category:
                        event.target.value
                    })
                  }
                  placeholder="Enter category"
                />

              </div>


              <div className="form-group">

                <label>
                  Icon
                </label>

                <input
                  type="text"
                  value={newSubject.icon}
                  onChange={(event) =>
                    setNewSubject({
                      ...newSubject,
                      icon: event.target.value
                    })
                  }
                  placeholder="📚"
                />

              </div>


              <div className="form-group">

                <label>
                  Number of Questions
                </label>

                <input
                  type="number"
                  min="1"
                  value={
                    newSubject.questionCount
                  }
                  onChange={(event) =>
                    setNewSubject({
                      ...newSubject,
                      questionCount:
                        event.target.value
                    })
                  }
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Quiz Duration (Minutes)
                </label>

                <input
                  type="number"
                  min="1"
                  value={
                    newSubject.quizDuration
                  }
                  onChange={(event) =>
                    setNewSubject({
                      ...newSubject,
                      quizDuration:
                        event.target.value
                    })
                  }
                  required
                />

              </div>


              <div className="form-actions">

                <button
                  type="submit"
                  className="admin-save-button"
                >
                  Save Subject
                </button>


                <button
                  type="button"
                  className="admin-cancel-button"
                  onClick={() =>
                    setShowAddSubject(false)
                  }
                >
                  Cancel
                </button>

              </div>


            </form>

          )}


          {/* ==========================================
              SUBJECT LIST
          ========================================== */}

          <div className="admin-subject-list">


            {subjects.length === 0 ? (

              <div className="empty-state">

                No subjects found.

              </div>

            ) : (

              subjects.map(subject => (

                <div
                  className="admin-subject-row"
                  key={subject.id}
                >


                  <div className="subject-info">


                    <div className="subject-icon">
                      {subject.icon || '📚'}
                    </div>


                    <div>

                      <h3>
                        {subject.name}
                      </h3>

                      <p>
                        {subject.description}
                      </p>

                    </div>


                  </div>


                  <div className="subject-settings">


                    <div className="setting-item">

                      <label>
                        Questions
                      </label>

                      <input
                        type="number"
                        min="1"
                        value={
                          subject.question_count
                        }
                        onChange={(event) =>
                          handleSubjectSettingChange(
                            subject,
                            'questionCount',
                            event.target.value
                          )
                        }
                      />

                    </div>


                    <div className="setting-item">

                      <label>
                        Duration
                      </label>

                      <input
                        type="number"
                        min="1"
                        value={
                          subject.quiz_duration
                        }
                        onChange={(event) =>
                          handleSubjectSettingChange(
                            subject,
                            'quizDuration',
                            event.target.value
                          )
                        }
                      />

                      <span>
                        min
                      </span>

                    </div>


                    <button
                      className={
                        subject.status === 'active'
                          ? 'status-active'
                          : 'status-inactive'
                      }
                      onClick={() =>
                        handleToggleStatus(subject)
                      }
                    >

                      {subject.status === 'active'
                        ? 'Active'
                        : 'Inactive'}

                    </button>


                  </div>


                </div>

              ))

            )}


          </div>


        </section>


      </main>

    </div>

  );
}

export default AdminDashboard;

