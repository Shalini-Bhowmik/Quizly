
import { useEffect, useState } from "react";
import "./ManageQuestions.css";

function ManageQuestions({ onDashboard }) {
    const [subjects, setSubjects] = useState([]);
    const [questions, setQuestions] = useState([]);

    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);

    const [selectedSubject, setSelectedSubject] = useState("all");

    const [formData, setFormData] = useState({
        subject_id: "",
        question: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_answer: ""
    });

    const API_URL = "http://localhost:5000";

    // Fetch subjects and questions
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            const subjectsResponse = await fetch(
                `${API_URL}/admin/subjects`
            );

            const questionsResponse = await fetch(
                `${API_URL}/admin/questions`
            );

            if (!subjectsResponse.ok || !questionsResponse.ok) {
                throw new Error("Failed to fetch data");
            }

            const subjectsData = await subjectsResponse.json();
            const questionsData = await questionsResponse.json();

            setSubjects(subjectsData);
            setQuestions(questionsData);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Unable to load subjects or questions.");
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            subject_id: "",
            question: "",
            option_a: "",
            option_b: "",
            option_c: "",
            option_d: "",
            correct_answer: ""
        });

        setEditingQuestion(null);
        setShowForm(false);
    };

    // Open Add Question form
    const handleAddButton = () => {
        setEditingQuestion(null);

        setFormData({
            subject_id: "",
            question: "",
            option_a: "",
            option_b: "",
            option_c: "",
            option_d: "",
            correct_answer: ""
        });

        setShowForm(true);
    };

    // Add or update question
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.subject_id ||
            !formData.question.trim() ||
            !formData.option_a.trim() ||
            !formData.option_b.trim() ||
            !formData.option_c.trim() ||
            !formData.option_d.trim() ||
            !formData.correct_answer
        ) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const url = editingQuestion
                ? `${API_URL}/admin/questions/${editingQuestion.id}`
                : `${API_URL}/admin/questions`;

            const method = editingQuestion ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    subject_id: Number(formData.subject_id),
                    question: formData.question.trim(),
                    option_a: formData.option_a.trim(),
                    option_b: formData.option_b.trim(),
                    option_c: formData.option_c.trim(),
                    option_d: formData.option_d.trim(),
                    correct_answer: formData.correct_answer
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Unable to save question."
                );
            }

            alert(
                editingQuestion
                    ? "Question updated successfully!"
                    : "Question added successfully!"
            );

            resetForm();
            fetchData();
        } catch (error) {
            console.error("Error saving question:", error);
            alert(error.message || "Something went wrong.");
        }
    };

    // Edit question
    const handleEditQuestion = (question) => {
        setEditingQuestion(question);

        setFormData({
            subject_id: String(question.subject_id),
            question: question.question || "",
            option_a: question.option_a || "",
            option_b: question.option_b || "",
            option_c: question.option_c || "",
            option_d: question.option_d || "",
            correct_answer: question.correct_answer || ""
        });

        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Delete question
    const handleDeleteQuestion = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this question?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/admin/questions/${id}`,
                {
                    method: "DELETE"
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Unable to delete question."
                );
            }

            alert("Question deleted successfully!");

            if (editingQuestion && editingQuestion.id === id) {
                resetForm();
            }

            fetchData();
        } catch (error) {
            console.error("Error deleting question:", error);
            alert(error.message || "Something went wrong.");
        }
    };

    // Filter questions by selected subject
    const filteredQuestions =
        selectedSubject === "all"
            ? questions
            : questions.filter(
                  (question) =>
                      String(question.subject_id) ===
                      String(selectedSubject)
              );

    return (
        <div className="manage-questions-page">

            {/* Top Navigation */}
            <div className="questions-topbar">

                <div className="questions-brand">
                    <div className="questions-brand-icon">
                        Q
                    </div>

                    <div>
                        <h2>Quizly</h2>
                        <p>Admin Panel</p>
                    </div>
                </div>

                <button
                    className="back-dashboard-button"
                    onClick={onDashboard}
                >
                    ← Dashboard
                </button>

            </div>

            {/* Page Header */}
            <div className="questions-page-header">

                <div>
                    <p className="page-label">
                        QUESTION MANAGEMENT
                    </p>

                    <h1>Manage Questions</h1>

                    <p>
                        Create, edit, delete, and organize questions
                        for your quiz subjects.
                    </p>
                </div>

                <button
                    className="add-question-button"
                    onClick={handleAddButton}
                >
                    + Add Question
                </button>

            </div>

            {/* Summary Cards */}
            <div className="question-summary-container">

                <div className="question-summary-card">
                    <div className="summary-icon purple">
                        📝
                    </div>

                    <div>
                        <p>Total Questions</p>
                        <h2>{questions.length}</h2>
                    </div>
                </div>

                <div className="question-summary-card">
                    <div className="summary-icon blue">
                        📚
                    </div>

                    <div>
                        <p>Total Subjects</p>
                        <h2>{subjects.length}</h2>
                    </div>
                </div>

                <div className="question-summary-card">
                    <div className="summary-icon green">
                        🔍
                    </div>

                    <div>
                        <p>Displayed Questions</p>
                        <h2>{filteredQuestions.length}</h2>
                    </div>
                </div>

            </div>

            {/* Add/Edit Form */}
            {showForm && (
                <div className="question-form-section">

                    <div className="form-section-header">

                        <div>
                            <h2>
                                {editingQuestion
                                    ? "Edit Question"
                                    : "Add New Question"}
                            </h2>

                            <p>
                                Enter the question and its answer options.
                            </p>
                        </div>

                        <button
                            className="close-form-button"
                            onClick={resetForm}
                        >
                            ✕
                        </button>

                    </div>

                    <form
                        className="question-form"
                        onSubmit={handleSubmit}
                    >

                        {/* Subject */}
                        <div className="form-group">

                            <label htmlFor="subject_id">
                                Select Subject
                            </label>

                            <select
                                id="subject_id"
                                name="subject_id"
                                value={formData.subject_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select a subject
                                </option>

                                {subjects.map((subject) => (
                                    <option
                                        key={subject.id}
                                        value={subject.id}
                                    >
                                        {subject.icon
                                            ? `${subject.icon} `
                                            : ""}
                                        {subject.name}
                                    </option>
                                ))}
                            </select>

                        </div>

                        {/* Question */}
                        <div className="form-group">

                            <label htmlFor="question">
                                Question
                            </label>

                            <textarea
                                id="question"
                                name="question"
                                placeholder="Enter your question"
                                value={formData.question}
                                onChange={handleChange}
                                rows="4"
                                required
                            />

                        </div>

                        {/* Options */}
                        <div className="options-heading">
                            <h3>Answer Options</h3>
                            <p>
                                Enter four options and select the
                                correct answer.
                            </p>
                        </div>

                        <div className="options-grid">

                            <div className="form-group">

                                <label htmlFor="option_a">
                                    Option A
                                </label>

                                <input
                                    type="text"
                                    id="option_a"
                                    name="option_a"
                                    placeholder="Enter option A"
                                    value={formData.option_a}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label htmlFor="option_b">
                                    Option B
                                </label>

                                <input
                                    type="text"
                                    id="option_b"
                                    name="option_b"
                                    placeholder="Enter option B"
                                    value={formData.option_b}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label htmlFor="option_c">
                                    Option C
                                </label>

                                <input
                                    type="text"
                                    id="option_c"
                                    name="option_c"
                                    placeholder="Enter option C"
                                    value={formData.option_c}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label htmlFor="option_d">
                                    Option D
                                </label>

                                <input
                                    type="text"
                                    id="option_d"
                                    name="option_d"
                                    placeholder="Enter option D"
                                    value={formData.option_d}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        {/* Correct Answer */}
                        <div className="form-group">

                            <label htmlFor="correct_answer">
                                Correct Answer
                            </label>

                            <select
                                id="correct_answer"
                                name="correct_answer"
                                value={formData.correct_answer}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select correct answer
                                </option>

                                <option value="A">
                                    Option A
                                </option>

                                <option value="B">
                                    Option B
                                </option>

                                <option value="C">
                                    Option C
                                </option>

                                <option value="D">
                                    Option D
                                </option>
                            </select>

                        </div>

                        {/* Form Buttons */}
                        <div className="form-buttons">

                            <button
                                type="submit"
                                className="save-question-button"
                            >
                                {editingQuestion
                                    ? "Update Question"
                                    : "Save Question"}
                            </button>

                            <button
                                type="button"
                                className="cancel-question-button"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>
            )}

            {/* Question List */}
            <div className="questions-list-section">

                <div className="questions-list-header">

                    <div>
                        <h2>Question Bank</h2>

                        <p>
                            View and manage questions by subject.
                        </p>
                    </div>

                    {/* Subject Filter */}
                    <select
                        className="subject-filter"
                        value={selectedSubject}
                        onChange={(e) =>
                            setSelectedSubject(e.target.value)
                        }
                    >
                        <option value="all">
                            All Subjects
                        </option>

                        {subjects.map((subject) => (
                            <option
                                key={subject.id}
                                value={subject.id}
                            >
                                {subject.icon
                                    ? `${subject.icon} `
                                    : ""}
                                {subject.name}
                            </option>
                        ))}
                    </select>

                </div>

                {loading ? (
                    <div className="questions-message">
                        Loading questions...
                    </div>
                ) : filteredQuestions.length === 0 ? (
                    <div className="questions-message">
                        No questions found for this subject.
                    </div>
                ) : (
                    <div className="questions-list">

                        {filteredQuestions.map((question, index) => (

                            <div
                                className="question-card"
                                key={question.id}
                            >

                                <div className="question-card-top">

                                    <div className="question-number">
                                        Q{index + 1}
                                    </div>

                                    <span className="question-subject">
                                        {question.subject_name}
                                    </span>

                                </div>

                                <h3 className="question-text">
                                    {question.question}
                                </h3>

                                <div className="question-options">

                                    <div className="question-option">
                                        <span>A</span>
                                        <p>{question.option_a}</p>
                                    </div>

                                    <div className="question-option">
                                        <span>B</span>
                                        <p>{question.option_b}</p>
                                    </div>

                                    <div className="question-option">
                                        <span>C</span>
                                        <p>{question.option_c}</p>
                                    </div>

                                    <div className="question-option">
                                        <span>D</span>
                                        <p>{question.option_d}</p>
                                    </div>

                                </div>

                                <div className="question-card-bottom">

                                    <div className="correct-answer">
                                        Correct Answer:{" "}
                                        <strong>
                                            {question.correct_answer}
                                        </strong>
                                    </div>

                                    <div className="question-actions">

                                        <button
                                            className="edit-question-button"
                                            onClick={() =>
                                                handleEditQuestion(question)
                                            }
                                        >
                                            ✏️ Edit
                                        </button>

                                        <button
                                            className="delete-question-button"
                                            onClick={() =>
                                                handleDeleteQuestion(
                                                    question.id
                                                )
                                            }
                                        >
                                            🗑️ Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default ManageQuestions;