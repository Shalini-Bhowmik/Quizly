
import { useEffect, useState } from 'react';
import './AdminDashboard.css';

function AdminResults({ onDashboard }) {

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {

    fetch('http://localhost:5000/admin/results')

      .then(response => {

        if (!response.ok) {
          throw new Error('Failed to fetch results.');
        }

        return response.json();
      })

      .then(data => {

        setResults(
          Array.isArray(data)
            ? data
            : []
        );

        setLoading(false);

      })

      .catch(error => {

        console.error(
          'Admin results error:',
          error
        );

        setErrorMessage(
          error.message || 'Failed to load results.'
        );

        setLoading(false);

      });

  }, []);


  return (

    <div className="admin-dashboard">

      <main className="admin-main admin-results-main">

        {/* ==========================================
            TOP BAR
        ========================================== */}

        <header className="admin-topbar">

          <div>

            <p className="admin-top-label">
              QUIZLY ADMINISTRATION
            </p>

            <h1>
              Results
            </h1>

          </div>

        </header>


        {/* ==========================================
            RESULTS SECTION
        ========================================== */}

        <section className="admin-section admin-results-section">

          <div className="admin-section-heading">

            <div>

              <p className="section-label">
                STUDENT PERFORMANCE
              </p>

              <h2>
                Quiz Results
              </h2>

              <p>
                View and monitor all student quiz attempts.
              </p>

            </div>

          </div>


          {/* ==========================================
              BACK BUTTON
          ========================================== */}

          <button
            className="admin-results-back"
            onClick={onDashboard}
          >
            ← Back to Dashboard
          </button>


          {/* ==========================================
              LOADING
          ========================================== */}

          {loading && (

            <div className="admin-results-message">
              <div className="results-message-icon">
                ⏳
              </div>

              <h3>
                Loading Results
              </h3>

              <p>
                Please wait while we fetch the quiz results.
              </p>
            </div>

          )}


          {/* ==========================================
              ERROR
          ========================================== */}

          {!loading && errorMessage && (

            <div className="admin-results-error">

              <span>
                ⚠️
              </span>

              <div>

                <strong>
                  Unable to load results
                </strong>

                <p>
                  {errorMessage}
                </p>

              </div>

            </div>

          )}


          {/* ==========================================
              NO RESULTS
          ========================================== */}

          {!loading &&
            !errorMessage &&
            results.length === 0 && (

              <div className="admin-results-message">

                <div className="results-message-icon">
                  📊
                </div>

                <h3>
                  No Quiz Results Yet
                </h3>

                <p>
                  Student quiz attempts will appear here.
                </p>

              </div>

            )}


          {/* ==========================================
              RESULTS TABLE
          ========================================== */}

          {!loading &&
            !errorMessage &&
            results.length > 0 && (

              <div className="admin-results-card">

                <div className="admin-results-card-header">

                  <div>

                    <h3>
                      All Quiz Attempts
                    </h3>

                    <p>
                      {results.length}{' '}
                      {results.length === 1
                        ? 'attempt'
                        : 'attempts'}{' '}
                      recorded
                    </p>

                  </div>

                  <div className="results-count">
                    {results.length}
                  </div>

                </div>


                <div className="admin-results-table-wrapper">

                  <table className="admin-results-table">

                    <thead>

                      <tr>

                        <th className="result-number">
                          #
                        </th>

                        <th>
                          Student
                        </th>

                        <th>
                          Email
                        </th>

                        <th>
                          Subject
                        </th>

                        <th className="result-score">
                          Score
                        </th>

                        <th className="result-percentage">
                          Percentage
                        </th>

                        <th>
                          Date & Time
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {results.map((result, index) => (

                        <tr key={result.id}>

                          <td className="result-number">
                            {index + 1}
                          </td>


                          <td>

                            <div className="result-student">

                              <div className="result-avatar">
                                {result.student_name
                                  ? result.student_name
                                      .charAt(0)
                                      .toUpperCase()
                                  : 'S'}
                              </div>

                              <span>
                                {result.student_name}
                              </span>

                            </div>

                          </td>


                          <td className="result-email">
                            {result.student_email}
                          </td>


                          <td>

                            <span className="result-subject">
                              {result.subject}
                            </span>

                          </td>


                          <td className="result-score">

                            <strong>
                              {result.score}
                            </strong>

                            <span>
                              {' / '}
                              {result.total_questions}
                            </span>

                          </td>


                          <td className="result-percentage">

                            <span className="percentage-badge">
                              {Number(
                                result.percentage
                              ).toFixed(2)}
                              %
                            </span>

                          </td>


                          <td className="result-date">

                            {new Date(
                              result.attempted_at
                            ).toLocaleString()}

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

            )}

        </section>

      </main>

    </div>

  );
}

export default AdminResults;

