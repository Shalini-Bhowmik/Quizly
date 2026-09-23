import { useEffect, useState } from 'react';
import './ManageSubjects.css';

function ManageSubjects({ onDashboard }) {

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    icon: '📚',
    status: 'active',
    question_count: '',
    quiz_duration: ''
  });


  // =========================
  // FETCH SUBJECTS
  // =========================

  const fetchSubjects = () => {

    setLoading(true);

    fetch('http://localhost:5000/admin/subjects')
      .then(response => response.json())
      .then(data => {

        console.log("Subjects:", data);

        setSubjects(data);
        setLoading(false);

      })
      .catch(error => {

        console.error("Subjects error:", error);
        setLoading(false);

      });
  };


  useEffect(() => {
    fetchSubjects();
  }, []);


  // =========================
  // FORM INPUT
  // =========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  // =========================
  // OPEN ADD FORM
  // =========================

  const handleAddClick = () => {

    setEditingSubject(null);

    setFormData({
      name: '',
      description: '',
      category: '',
      icon: '📚',
      status: 'active',
      question_count: '',
      quiz_duration: ''
    });

    setShowForm(true);
  };


  // =========================
  // OPEN EDIT FORM
  // =========================

  const handleEditClick = (subject) => {

    setEditingSubject(subject);

    setFormData({
      name: subject.name,
      description: subject.description || '',
      category: subject.category || '',
      icon: subject.icon || '📚',
      status: subject.status,
      question_count: subject.question_count || '',
      quiz_duration: subject.quiz_duration || ''
    });

    setShowForm(true);
  };


  // =========================
  // SAVE SUBJECT
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // ==========================================
    // VALIDATE QUIZ SETTINGS
    // ==========================================

    const questionCount =
      Number(formData.question_count);

    const quizDuration =
      Number(formData.quiz_duration);


    if (
      !Number.isInteger(questionCount) ||
      questionCount <= 0
    ) {

      alert('Please enter a valid number of questions.');

      return;
    }


    if (
      !Number.isInteger(quizDuration) ||
      quizDuration <= 0
    ) {

      alert('Please enter a valid quiz duration.');

      return;
    }


    // ==========================================
    // PREPARE DATA
    // ==========================================

    const dataToSend = {
      ...formData,
      question_count: questionCount,
      quiz_duration: quizDuration
    };


    const url = editingSubject
      ? `http://localhost:5000/admin/subjects/${editingSubject.id}`
      : 'http://localhost:5000/admin/subjects';

    const method = editingSubject
      ? 'PUT'
      : 'POST';


    try {

      const response = await fetch(url, {

        method: method,

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(dataToSend)

      });


      const data = await response.json();


      if (!response.ok) {

        alert(
          data.message ||
          'Something went wrong.'
        );

        return;
      }


      alert(data.message);

      setShowForm(false);
      setEditingSubject(null);

      fetchSubjects();


    } catch (error) {

      console.error(
        "Save subject error:",
        error
      );

      alert(
        'Unable to connect to server.'
      );

    }

  };


  // =========================
  // DELETE SUBJECT
  // =========================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this subject?'
    );

    if (!confirmDelete) {
      return;
    }


    try {

      const response = await fetch(
        `http://localhost:5000/admin/subjects/${id}`,
        {
          method: 'DELETE'
        }
      );


      const data = await response.json();


      if (!response.ok) {

        alert(
          data.message ||
          'Failed to delete subject.'
        );

        return;
      }


      alert(data.message);

      fetchSubjects();


    } catch (error) {

      console.error(
        "Delete subject error:",
        error
      );

      alert(
        'Unable to connect to server.'
      );

    }

  };


  return (

    <div className="manage-subjects-page">


      {/* HEADER */}

      <header className="subjects-page-header">

        <div>

          <p className="subjects-label">
            QUIZLY ADMINISTRATION
          </p>

          <h1>
            Manage Subjects
          </h1>

          <p>
            Add, edit and manage the subjects
            available on Quizly.
          </p>

        </div>


        <button
          className="subjects-dashboard-button"
          onClick={onDashboard}
        >
          ← Dashboard
        </button>

      </header>


      {/* CONTENT */}

      <main className="subjects-content">


        <div className="subjects-title-row">

          <div>

            <h2>
              All Subjects
            </h2>

            <p>
              {subjects.length} subjects available
            </p>

          </div>


          <button
            className="add-subject-button"
            onClick={handleAddClick}
          >
            + Add Subject
          </button>

        </div>


        {/* FORM */}

        {showForm && (

          <div className="subject-form-card">


            <div className="form-card-header">

              <div>

                <h2>
                  {editingSubject
                    ? 'Edit Subject'
                    : 'Add New Subject'}
                </h2>

                <p>
                  Enter the subject information
                  and quiz settings below.
                </p>

              </div>


              <button
                className="close-form-button"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>

            </div>


            <form onSubmit={handleSubmit}>


              <div className="subject-form-grid">


                {/* SUBJECT NAME */}

                <div className="subject-form-group">

                  <label>
                    Subject Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Example: Java"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* CATEGORY */}

                <div className="subject-form-group">

                  <label>
                    Category
                  </label>

                  <input
                    type="text"
                    name="category"
                    placeholder="Example: Programming"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* ICON */}

                <div className="subject-form-group">

                  <label>
                    Icon
                  </label>

                  <input
                    type="text"
                    name="icon"
                    placeholder="☕"
                    value={formData.icon}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* STATUS */}

                <div className="subject-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >

                    <option value="active">
                      Active
                    </option>

                    <option value="inactive">
                      Inactive
                    </option>

                  </select>

                </div>


                {/* QUESTION COUNT */}

                <div className="subject-form-group">

                  <label>
                    📝 Questions in Quiz
                  </label>

                  <input
                    type="number"
                    name="question_count"
                    min="1"
                    placeholder="Example: 10"
                    value={formData.question_count}
                    onChange={handleChange}
                    required
                  />

                  <small>
                    Number of questions students
                    will receive.
                  </small>

                </div>


                {/* QUIZ DURATION */}

                <div className="subject-form-group">

                  <label>
                    ⏱️ Quiz Duration (minutes)
                  </label>

                  <input
                    type="number"
                    name="quiz_duration"
                    min="1"
                    placeholder="Example: 20"
                    value={formData.quiz_duration}
                    onChange={handleChange}
                    required
                  />

                  <small>
                    Time allowed for the quiz.
                  </small>

                </div>


                {/* DESCRIPTION */}

                <div className="subject-form-group full-width">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    placeholder="Enter subject description..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              <div className="subject-form-actions">


                <button
                  type="button"
                  className="cancel-subject-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="save-subject-button"
                >
                  {editingSubject
                    ? 'Save Changes'
                    : 'Add Subject'}
                </button>


              </div>

            </form>

          </div>

        )}


        {/* SUBJECT LIST */}

        {loading ? (

          <div className="subjects-loading">
            ⏳ Loading subjects...
          </div>

        ) : (

          <div className="subjects-list">


            {subjects.map((subject) => (

              <div
                className="subject-admin-card"
                key={subject.id}
              >


                <div className="subject-admin-icon">
                  {subject.icon}
                </div>


                <div className="subject-admin-info">

                  <h3>
                    {subject.name}
                  </h3>

                  <p>
                    {subject.description}
                  </p>

                  <span>
                    {subject.category}
                  </span>

                </div>


                {/* QUIZ SETTINGS */}

                <div className="subject-quiz-settings">

                  <div>
                    <strong>
                      {subject.available_questions ?? 0}
                    </strong>

                    <span>
                      Available
                    </span>
                  </div>


                  <div>
                    <strong>
                      {subject.question_count}
                    </strong>

                    <span>
                      In Quiz
                    </span>
                  </div>


                  <div>
                    <strong>
                      {subject.quiz_duration}
                    </strong>

                    <span>
                      Minutes
                    </span>
                  </div>

                </div>


                {/* STATUS */}

                <div className="subject-status">

                  <span
                    className={
                      subject.status === 'active'
                        ? 'status-active'
                        : 'status-inactive'
                    }
                  >

                    {subject.status === 'active'
                      ? '● Active'
                      : '● Inactive'}

                  </span>

                </div>


                {/* ACTIONS */}

                <div className="subject-actions">

                  <button
                    className="edit-subject-button"
                    onClick={() =>
                      handleEditClick(subject)
                    }
                  >
                    ✏️ Edit
                  </button>


                  <button
                    className="delete-subject-button"
                    onClick={() =>
                      handleDelete(subject.id)
                    }
                  >
                    🗑️ Delete
                  </button>

                </div>


              </div>

            ))}

          </div>

        )}

      </main>

    </div>

  );

}

export default ManageSubjects;