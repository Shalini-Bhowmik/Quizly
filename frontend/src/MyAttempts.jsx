
import { useEffect, useState } from 'react';
import './MyAttempts.css';

function MyAttempts({ userId, onDashboard }) {

  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');

  useEffect(() => {

    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/attempts/${userId}`)

      .then(response => response.json())

      .then(data => {

        console.log("All attempts:", data);

        setAttempts(data);
        setLoading(false);

      })

      .catch(error => {

        console.error("Attempts API error:", error);

        setLoading(false);

      });

  }, [userId]);


  // Filter attempts based on search and subject
  const filteredAttempts = attempts.filter((attempt) => {

    const matchesSearch = attempt.subject
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim());

    const matchesSubject =
      selectedSubject === 'All' ||
      attempt.subject === selectedSubject;

    return matchesSearch && matchesSubject;

  });


  return (

    <div className="attempts-page">


      {/* HEADER */}

      <div className="attempts-header">

        <div>

          <p className="attempts-label">
            QUIZLY
          </p>

          <h1>
            My Attempts
          </h1>

          <p>
            View all your completed quizzes and scores.
          </p>

        </div>


        <button
          className="attempts-dashboard-button"
          onClick={onDashboard}
        >
          ← Dashboard
        </button>

      </div>



      {/* MAIN CONTENT */}

      <div className="attempts-content">


        {/* TITLE */}

        <div className="attempts-title-row">

          <div>

            <h2>
              Your Quiz History
            </h2>

            <p>
              All your quiz attempts are displayed here.
            </p>

          </div>


          <div className="attempt-count">

            {filteredAttempts.length}

            <span>
              Showing
            </span>

          </div>

        </div>



        {/* SEARCH AND FILTER */}

        <div className="attempts-filters">


          {/* SEARCH */}

          <div className="attempts-search-box">

            <span>
              🔍
            </span>

            <input
              type="text"
              placeholder="Search by subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (

              <button
                className="attempts-search-clear"
                onClick={() => setSearchTerm('')}
              >
                ×
              </button>

            )}

          </div>



          {/* SUBJECT FILTER */}

          <div className="attempts-subject-filter">

            <label htmlFor="subjectFilter">
              Subject:
            </label>

            <select
              id="subjectFilter"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >

              <option value="All">
                All Subjects
              </option>

              <option value="Java">
                Java
              </option>

              <option value="DSA">
                DSA
              </option>

              <option value="DBMS">
                DBMS
              </option>

              <option value="Operating Systems">
                Operating Systems
              </option>

              <option value="Computer Networks">
                Computer Networks
              </option>

            </select>

          </div>


        </div>



        {/* LOADING */}

        {loading && (

          <div className="attempts-empty">

            <div className="attempts-empty-icon">
              ⏳
            </div>

            <h3>
              Loading your attempts...
            </h3>

          </div>

        )}



        {/* NO ATTEMPTS */}

        {!loading && attempts.length === 0 && (

          <div className="attempts-empty">

            <div className="attempts-empty-icon">
              📝
            </div>

            <h3>
              No quiz attempts yet
            </h3>

            <p>
              Complete a quiz and your result will appear here.
            </p>

          </div>

        )}



        {/* NO MATCHING RESULTS */}

        {!loading &&
          attempts.length > 0 &&
          filteredAttempts.length === 0 && (

            <div className="attempts-empty">

              <div className="attempts-empty-icon">
                🔎
              </div>

              <h3>
                No matching attempts
              </h3>

              <p>
                Try searching for another subject or change the filter.
              </p>

              <button
                className="clear-filters-button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSubject('All');
                }}
              >
                Clear Filters
              </button>

            </div>

          )}



        {/* ATTEMPTS TABLE */}

        {!loading && filteredAttempts.length > 0 && (

          <div className="attempts-list">


            {/* TABLE HEADER */}

            <div className="attempts-table-header">

              <span>
                SUBJECT
              </span>

              <span>
                SCORE
              </span>

              <span>
                PERCENTAGE
              </span>

              <span>
                DATE & TIME
              </span>

            </div>



            {/* ATTEMPT ROWS */}

            {filteredAttempts.map((attempt) => (

              <div
                className="attempt-row"
                key={attempt.id}
              >


                {/* SUBJECT */}

                <div className="attempt-subject">

                  <div className="attempt-subject-icon">

                    {attempt.subject === 'Java'
                      ? '☕'
                      : attempt.subject === 'DSA'
                      ? '🧩'
                      : attempt.subject === 'DBMS'
                      ? '🗄️'
                      : attempt.subject === 'Operating Systems'
                      ? '💻'
                      : '🌐'
                    }

                  </div>


                  <div>

                    <strong>
                      {attempt.subject}
                    </strong>

                    <span>
                      {attempt.total_questions} Questions
                    </span>

                  </div>

                </div>



                {/* SCORE */}

                <div className="attempt-score">

                  <strong>
                    {attempt.score}
                  </strong>

                  <span>
                    / {attempt.total_questions}
                  </span>

                </div>



                {/* PERCENTAGE */}

                <div className="attempt-percentage">

                  <strong>
                    {attempt.percentage}%
                  </strong>

                </div>



                {/* DATE */}

                <div className="attempt-date">

                  {new Date(
                    attempt.attempted_at
                  ).toLocaleString()}

                </div>


              </div>

            ))}


          </div>

        )}



        {/* BOTTOM BUTTON */}

        <div className="attempts-bottom">

          <button
            className="attempts-back-button"
            onClick={onDashboard}
          >
            ← Back to Dashboard
          </button>

        </div>


      </div>


    </div>

  );

}

export default MyAttempts;