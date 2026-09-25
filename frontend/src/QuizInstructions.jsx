
import { useState, useEffect } from 'react';
import Quiz from './components/Quiz';

import './QuizInstructions.css';


function QuizInstructions({
  subject,
  userId,
  onDashboard
}) {

  const [startQuiz, setStartQuiz] = useState(false);

  // ==========================================
  // QUIZ DATA
  // ==========================================

  const [questions, setQuestions] = useState([]);

  const [questionCount, setQuestionCount] =
    useState(0);

  const [quizDuration, setQuizDuration] =
    useState(0);

  const [loadingQuestions, setLoadingQuestions] =
    useState(false);

  const [questionError, setQuestionError] =
    useState('');


  // ==========================================
  // FETCH QUIZ CONFIGURATION + QUESTIONS
  // ==========================================

  useEffect(() => {

    setLoadingQuestions(true);
    setQuestionError('');

    setQuestions([]);
    setQuestionCount(0);
    setQuizDuration(0);


    // ------------------------------------------
    // FIRST: GET ADMIN QUIZ CONFIGURATION
    // ------------------------------------------

    fetch(
   
  `https://quizly-s4ns.onrender.com/quiz-config/${encodeURIComponent(subject)}`

    )
      .then((response) => {

        if (!response.ok) {

          throw new Error(
            'Failed to load quiz configuration'
          );

        }

        return response.json();

      })
      .then((config) => {

        console.log(
          'Quiz configuration:',
          config
        );


        const configuredCount =
          Number(config.questionCount) || 0;

        const duration =
          Number(config.quizDuration) || 0;


        setQuestionCount(
          configuredCount
        );

        setQuizDuration(
          duration
        );


        // --------------------------------------
        // SECOND: GET QUESTIONS
        // --------------------------------------

        return fetch(
          `https://quizly-s4ns.onrender.com/questions/${encodeURIComponent(subject)}`
        );

      })
      .then((response) => {

        if (!response.ok) {

          throw new Error(
            'Failed to fetch questions'
          );

        }

        return response.json();

      })
      .then((data) => {

        console.log(
          'Questions received:',
          data
        );


        if (!Array.isArray(data)) {

          throw new Error(
            'Invalid question data received'
          );

        }


        setQuestions(data);


        // Actual number received
        setQuestionCount(
          data.length
        );


        setLoadingQuestions(false);

      })
      .catch((error) => {

        console.error(
          'Quiz loading error:',
          error
        );

        setQuestionError(
          'Unable to load quiz information.'
        );

        setLoadingQuestions(false);

      });

  }, [subject]);


  // ==========================================
  // SUBJECT DETAILS
  // ==========================================

  const subjectDetails = {

    Java: {
      icon: '☕',
      category: 'PROGRAMMING',
      description:
        'Test your knowledge of Java programming, OOP, collections, and core concepts.',
      tip:
        'Think about concepts carefully and choose the most accurate answer.',
      theme: 'java-theme'
    },

    DSA: {
      icon: '🧩',
      category: 'PROBLEM SOLVING',
      description:
        'Challenge yourself with arrays, algorithms, sorting, trees, graphs, and data structures.',
      tip:
        'Analyze the problem step by step before selecting your answer.',
      theme: 'dsa-theme'
    },

    DBMS: {
      icon: '🗄️',
      category: 'DATABASE',
      description:
        'Explore SQL, normalization, transactions, keys, and database management concepts.',
      tip:
        'Pay attention to the definitions and conditions in each question.',
      theme: 'dbms-theme'
    },

    'Operating Systems': {
      icon: '💻',
      category: 'SYSTEM CONCEPTS',
      description:
        'Test your understanding of processes, memory management, scheduling, and operating systems.',
      tip:
        'Recall the purpose and behavior of each operating system concept.',
      theme: 'os-theme'
    },

    'Computer Networks': {
      icon: '🌐',
      category: 'NETWORKING',
      description:
        'Practice networking concepts including protocols, TCP/IP, layers, and communication.',
      tip:
        'Compare the functions of protocols and networking layers carefully.',
      theme: 'cn-theme'
    }

  };


  // ==========================================
  // DEFAULT DETAILS FOR ADMIN SUBJECTS
  // ==========================================

  const details =
    subjectDetails[subject] || {

      icon: '📝',

      category: 'ASSESSMENT',

      description:
        'Test your knowledge and improve your skills.',

      tip:
        'Read every question carefully before selecting an answer.',

      theme: 'java-theme'

    };


  // ==========================================
  // START QUIZ
  // ==========================================

  if (startQuiz) {

    if (loadingQuestions) {

      return (
        <div className="quiz-loading">
          Loading questions...
        </div>
      );

    }


    if (questionError) {

      return (
        <div className="quiz-loading">
          {questionError}
        </div>
      );

    }


    if (
      !questions ||
      questions.length === 0
    ) {

      return (
        <div className="quiz-loading">
          No questions available for this subject.
        </div>
      );

    }


    return (

      <Quiz

        questions={questions}

        subject={subject}

        userId={userId}

        onDashboard={onDashboard}

        quizDuration={quizDuration}

      />

    );

  }


  // ==========================================
  // INSTRUCTIONS PAGE
  // ==========================================

  return (

    <div
      className={`quiz-instructions-page ${details.theme}`}
    >

      {/* BACK BUTTON */}

      <button
        className="instructions-back-button"
        onClick={onDashboard}
      >
        ← Back to Dashboard
      </button>


      {/* HERO */}

      <div className="instructions-hero">

        <div className="instructions-hero-icon">
          {details.icon}
        </div>

        <div className="instructions-category">
          {details.category}
        </div>

        <h1>
          {subject}
        </h1>

        <p>
          {details.description}
        </p>

      </div>


      {/* INFORMATION CARDS */}

      <div className="quiz-info-grid">


        {/* QUESTIONS */}

        <div className="quiz-info-card">

          <div className="quiz-info-icon">
            📝
          </div>

          <div>

            <h3>
              {questionCount} Questions
            </h3>

            <p>
              Test your knowledge
            </p>

          </div>

        </div>


        {/* DURATION */}

        <div className="quiz-info-card">

          <div className="quiz-info-icon">
            ⏱️
          </div>

          <div>

            <h3>
              {quizDuration} Minutes
            </h3>

            <p>
              Manage your time wisely
            </p>

          </div>

        </div>


        {/* MCQ */}

        <div className="quiz-info-card">

          <div className="quiz-info-icon">
            🎯
          </div>

          <div>

            <h3>
              MCQ
            </h3>

            <p>
              Choose the correct answer
            </p>

          </div>

        </div>


        {/* CORRECT ANSWER */}

        <div className="quiz-info-card">

          <div className="quiz-info-icon">
            ✅
          </div>

          <div>

            <h3>
              1 Correct Answer
            </h3>

            <p>
              Only one option is correct
            </p>

          </div>

        </div>

      </div>


      {/* INSTRUCTIONS */}

      <div className="instructions-section">

        <div className="instructions-card">

          <div className="instructions-title">

            <span className="instructions-title-icon">
              📋
            </span>

            <h2>
              Instructions
            </h2>

          </div>


          <div className="instruction-list">


            <div className="instruction-item">

              <span className="instruction-number">
                1
              </span>

              <p>
                Read each question carefully before selecting your answer.
              </p>

            </div>


            <div className="instruction-item">

              <span className="instruction-number">
                2
              </span>

              <p>
                You will have{' '}
                <strong>
                  {quizDuration} minutes
                </strong>
                {' '}to complete all{' '}
                <strong>
                  {questionCount} questions
                </strong>.
              </p>

            </div>


            <div className="instruction-item">

              <span className="instruction-number">
                3
              </span>

              <p>
                You can move between questions using the Previous and Next buttons.
              </p>

            </div>


            <div className="instruction-item">

              <span className="instruction-number">
                4
              </span>

              <p>
                You can review your answers before submitting the quiz.
              </p>

            </div>


            <div className="instruction-item">

              <span className="instruction-number">
                5
              </span>

              <p>
                Once submitted, your score and performance will be displayed.
              </p>

            </div>

          </div>

        </div>


        {/* QUICK TIP */}

        <div className="quick-tip-card">

          <div className="quick-tip-icon">
            💡
          </div>

          <div>

            <h3>
              Quick Tip
            </h3>

            <p>
              {details.tip}
            </p>

          </div>

        </div>

      </div>


      {/* READY SECTION */}

      <div className="ready-card">

        <div className="ready-content">

          <div className="ready-icon">
            🚀
          </div>

          <div>

            <h2>
              Ready to begin?
            </h2>

            <p>
              Take a deep breath and give it your best!
            </p>

          </div>

        </div>


        <div className="ready-buttons">

          <button
            className="start-quiz-button"
            onClick={() =>
              setStartQuiz(true)
            }
          >
            Start Quiz →
          </button>


          <button
            className="cancel-quiz-button"
            onClick={onDashboard}
          >
            Cancel
          </button>

        </div>

      </div>


      {/* BOTTOM MESSAGE */}

      <div className="instructions-bottom-message">

        <span>
          🔒
        </span>

        Your quiz progress is securely handled.

      </div>

    </div>

  );

}


export default QuizInstructions;

