import { useState, useEffect, useRef } from "react";
import Result from "./Result";
import "./Quiz.css";

function Quiz({
    questions,
    subject,
    userId,
    onDashboard,
    quizDuration
}) {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [answers, setAnswers] = useState({});
    const [markedQuestions, setMarkedQuestions] = useState({});

    // ==========================================
    // ADMIN CONTROLLED QUIZ DURATION
    // ==========================================

    const durationInSeconds =
        Number(quizDuration) * 60;

    const [timeLeft, setTimeLeft] =
        useState(durationInSeconds);

    const [quizSubmitted, setQuizSubmitted] =
        useState(false);

    const submissionStarted =
        useRef(false);

    // Anti-copy violation counter
    const antiCopyViolations =
        useRef(0);

    // Fullscreen states
    const [fullscreenWarnings, setFullscreenWarnings] =
        useState(0);

    const [showFullscreenWarning, setShowFullscreenWarning] =
        useState(false);

    const question =
        questions[currentQuestion];


    // ==========================================
    // SUBJECT THEME
    // ==========================================

    const getSubjectDetails = () => {

        const value = subject.toLowerCase();

        if (value.includes("java")) {
            return {
                icon: "☕",
                shortName: "Java",
                theme: "theme-java",
                description:
                    "Core Java & Object-Oriented Programming"
            };
        }

        if (
            value.includes("data") ||
            value.includes("algorithm") ||
            value.includes("dsa")
        ) {
            return {
                icon: "🧩",
                shortName: "DSA",
                theme: "theme-dsa",
                description:
                    "Data Structures & Algorithms"
            };
        }

        if (
            value.includes("dbms") ||
            value.includes("database")
        ) {
            return {
                icon: "🗄️",
                shortName: "DBMS",
                theme: "theme-dbms",
                description:
                    "Database Management Systems"
            };
        }

        if (
            value.includes("operating") ||
            value === "os"
        ) {
            return {
                icon: "⚙️",
                shortName: "OS",
                theme: "theme-os",
                description:
                    "Operating Systems"
            };
        }

        if (
            value.includes("network") ||
            value === "cn"
        ) {
            return {
                icon: "🌐",
                shortName: "CN",
                theme: "theme-cn",
                description:
                    "Computer Networks"
            };
        }

        return {
            icon: "📚",
            shortName: subject,
            theme: "theme-default",
            description:
                "Online Assessment"
        };
    };

    const subjectDetails =
        getSubjectDetails();


    // ==========================================
    // ENTER FULLSCREEN
    // ==========================================

    const enterFullscreen = async () => {

        try {

            if (!document.fullscreenElement) {

                await document.documentElement.requestFullscreen();

            }

        } catch (error) {

            console.log(
                "Fullscreen request failed:",
                error
            );

        }

    };


    // ==========================================
    // SUBMIT QUIZ
    // ==========================================

    const submitQuiz = async () => {

        if (submissionStarted.current) {
            return;
        }

        submissionStarted.current = true;

        try {

            if (document.fullscreenElement) {

                await document.exitFullscreen();

            }

        } catch (error) {

            console.log(
                "Unable to exit fullscreen:",
                error
            );

        }

        await saveQuizResult();

        setQuizSubmitted(true);

    };


    // ==========================================
    // TIMER
    // ==========================================

    useEffect(() => {

        if (quizSubmitted) {
            return;
        }

        if (timeLeft <= 0) {

            submitQuiz();

            return;

        }

        const timer =
            setInterval(() => {

                setTimeLeft(
                    (previousTime) => {

                        if (previousTime <= 1) {
                            return 0;
                        }

                        return previousTime - 1;

                    }
                );

            }, 1000);

        return () =>
            clearInterval(timer);

    }, [timeLeft, quizSubmitted]);


    // ==========================================
    // FULLSCREEN DETECTION
    // ==========================================

    useEffect(() => {

        const handleFullscreenChange = () => {

            if (
                !document.fullscreenElement &&
                !quizSubmitted
            ) {

                setFullscreenWarnings(
                    (previousWarnings) => {

                        const newWarningCount =
                            previousWarnings + 1;

                        if (newWarningCount <= 3) {

                            setShowFullscreenWarning(true);

                        } else {

                            setShowFullscreenWarning(false);

                            submitQuiz();

                        }

                        return newWarningCount;

                    }
                );

            }

            else if (document.fullscreenElement) {

                setShowFullscreenWarning(false);

            }

        };

        document.addEventListener(
            "fullscreenchange",
            handleFullscreenChange
        );

        return () => {

            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );

        };

    }, [quizSubmitted]);


    // ==========================================
    // ENTER FULLSCREEN WHEN QUIZ STARTS
    // ==========================================

    useEffect(() => {

        if (!quizSubmitted) {

            enterFullscreen();

        }

    }, []);


    // ==========================================
    // ANTI COPY / PASTE PROTECTION
    // ==========================================

    useEffect(() => {

        if (quizSubmitted) {
            return;
        }

        const registerViolation = () => {

            antiCopyViolations.current += 1;

            const violationCount =
                antiCopyViolations.current;

            console.log(
                `Exam violation ${violationCount}`
            );

            if (violationCount > 2) {

                console.log(
                    "Too many exam violations. Quiz will be submitted."
                );

                submitQuiz();

                return;

            }

            alert(
                `⚠️ Exam Warning ${violationCount} of 2\n\n` +
                `Copying, pasting, cutting, right-clicking, ` +
                `or dragging text is not allowed during the examination.\n\n` +
                `One more violation will automatically submit your quiz.`
            );

        };


        const handleKeyDown = (event) => {

            if (
                event.ctrlKey &&
                (
                    event.key.toLowerCase() === "c" ||
                    event.key.toLowerCase() === "v" ||
                    event.key.toLowerCase() === "x"
                )
            ) {

                event.preventDefault();

                registerViolation();

            }

        };


        const handleContextMenu = (event) => {

            event.preventDefault();

            registerViolation();

        };


        const handleCopy = (event) => {

            event.preventDefault();

            registerViolation();

        };


        const handlePaste = (event) => {

            event.preventDefault();

            registerViolation();

        };


        const handleCut = (event) => {

            event.preventDefault();

            registerViolation();

        };


        const handleDragStart = (event) => {

            event.preventDefault();

            registerViolation();

        };


        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        document.addEventListener(
            "contextmenu",
            handleContextMenu
        );

        document.addEventListener(
            "copy",
            handleCopy
        );

        document.addEventListener(
            "paste",
            handlePaste
        );

        document.addEventListener(
            "cut",
            handleCut
        );

        document.addEventListener(
            "dragstart",
            handleDragStart
        );


        return () => {

            document.removeEventListener(
                "keydown",
                handleKeyDown
            );

            document.removeEventListener(
                "contextmenu",
                handleContextMenu
            );

            document.removeEventListener(
                "copy",
                handleCopy
            );

            document.removeEventListener(
                "paste",
                handlePaste
            );

            document.removeEventListener(
                "cut",
                handleCut
            );

            document.removeEventListener(
                "dragstart",
                handleDragStart
            );

        };

    }, [quizSubmitted]);


    // ==========================================
    // TIME
    // ==========================================

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;

    const formattedTime =
        `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;


    // ==========================================
    // TIMER STATUS
    // ==========================================

    const timerClass =
        timeLeft <= 30
            ? "timer danger"
            : timeLeft <= 60
                ? "timer warning"
                : "timer";


    // ==========================================
    // PROGRESS
    // ==========================================

    const progress =
        ((currentQuestion + 1) /
            questions.length) * 100;


    // ==========================================
    // ANSWERED COUNT
    // ==========================================

    const answeredCount =
        Object.keys(answers).length;

    const unansweredCount =
        questions.length - answeredCount;


    // ==========================================
    // MARKED COUNT
    // ==========================================

    const markedCount =
        Object.values(markedQuestions)
            .filter(Boolean)
            .length;


    // ==========================================
    // SELECT ANSWER
    // ==========================================

    const handleAnswer = (answer) => {

        setSelectedAnswer(answer);

        setAnswers(
            (previousAnswers) => ({

                ...previousAnswers,

                [currentQuestion]:
                    answer

            })
        );

    };


    // ==========================================
    // GO TO QUESTION
    // ==========================================

    const goToQuestion = (index) => {

        setCurrentQuestion(index);

        setSelectedAnswer(
            answers[index] || ""
        );

    };


    // ==========================================
    // NEXT QUESTION
    // ==========================================

    const handleNext = () => {

        if (
            currentQuestion <
            questions.length - 1
        ) {

            const nextQuestion =
                currentQuestion + 1;

            setCurrentQuestion(
                nextQuestion
            );

            setSelectedAnswer(
                answers[nextQuestion] || ""
            );

        }

        else {

            submitQuiz();

        }

    };


    // ==========================================
    // PREVIOUS QUESTION
    // ==========================================

    const handlePrevious = () => {

        if (currentQuestion > 0) {

            const previousQuestion =
                currentQuestion - 1;

            setCurrentQuestion(
                previousQuestion
            );

            setSelectedAnswer(
                answers[previousQuestion] || ""
            );

        }

    };


    // ==========================================
    // MARK FOR REVIEW
    // ==========================================

    const toggleMarkForReview = () => {

        setMarkedQuestions(
            (previousMarks) => ({

                ...previousMarks,

                [currentQuestion]:
                    !previousMarks[currentQuestion]

            })
        );

    };


    // ==========================================
    // CALCULATE SCORE
    // ==========================================

    const calculateScore = () => {

        let score = 0;

        questions.forEach(
            (question, index) => {

                const selected =
                    answers[index];

                const correctAnswer =
                    question.answer;

                if (
                    !selected ||
                    !correctAnswer
                ) {
                    return;
                }

                const selectedText =
                    String(selected)
                        .trim()
                        .toLowerCase();

                const correctText =
                    String(correctAnswer)
                        .trim()
                        .toLowerCase();

                const optionIndex =
                    [
                        "a",
                        "b",
                        "c",
                        "d"
                    ].indexOf(correctText);

                if (optionIndex !== -1) {

                    const correctOption =
                        String(
                            question.options[
                                optionIndex
                            ]
                        )
                            .trim()
                            .toLowerCase();

                    if (
                        selectedText ===
                        correctOption
                    ) {
                        score++;
                    }

                }

                else if (
                    selectedText ===
                    correctText
                ) {

                    score++;

                }

            }
        );

        return score;

    };


    // ==========================================
    // CALCULATE UNANSWERED
    // ==========================================

    const calculateUnanswered = () => {

        let unanswered = 0;

        questions.forEach(
            (question, index) => {

                if (!answers[index]) {

                    unanswered++;

                }

            }
        );

        return unanswered;

    };


    // ==========================================
    // SAVE QUIZ RESULT
    // ==========================================

    const saveQuizResult = async () => {

        const score =
            calculateScore();

        const percentage =
            Math.round(
                (score / questions.length) *
                100
            );

        try {

            const response =
                await fetch(
                    "http://localhost:5000/quiz-result",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            userId:
                                userId,

                            subject:
                                subject,

                            score:
                                score,

                            totalQuestions:
                                questions.length,

                            percentage:
                                percentage

                        })
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {

                console.log(
                    "Failed to save result:",
                    data.message
                );

                return;

            }

            console.log(
                "Quiz result saved successfully!"
            );

        } catch (error) {

            console.log(
                "Error saving quiz result:",
                error
            );

        }

    };


    // ==========================================
    // RETURN TO FULLSCREEN
    // ==========================================

    const handleReturnToFullscreen =
        async () => {

            try {

                await document
                    .documentElement
                    .requestFullscreen();

                setShowFullscreenWarning(false);

            } catch (error) {

                console.log(
                    "Unable to enter fullscreen:",
                    error
                );

            }

        };


    // ==========================================
    // RESULT PAGE
    // ==========================================

    if (quizSubmitted) {

        const score =
            calculateScore();

        const unanswered =
            calculateUnanswered();

        const wrongAnswers =
            questions.length -
            score -
            unanswered;

        return (

            <Result

                score={score}

                totalQuestions={
                    questions.length
                }

                wrongAnswers={
                    wrongAnswers
                }

                unanswered={
                    unanswered
                }

                answers={
                    answers
                }

                questions={
                    questions
                }

                onDashboard={
                    onDashboard
                }

                onRetry={() => {

                    setCurrentQuestion(0);

                    setSelectedAnswer("");

                    setAnswers({});

                    setMarkedQuestions({});

                    // ==================================
                    // RESET TO ADMIN CONFIGURED TIME
                    // ==================================

                    setTimeLeft(
                        durationInSeconds
                    );

                    setFullscreenWarnings(0);

                    setShowFullscreenWarning(false);

                    setQuizSubmitted(false);

                    submissionStarted.current =
                        false;

                    antiCopyViolations.current =
                        0;

                    setTimeout(() => {

                        enterFullscreen();

                    }, 100);

                }}

            />

        );

    }


    // ==========================================
    // QUIZ PAGE
    // ==========================================

    return (

        <div
            className={`quiz-page ${subjectDetails.theme}`}
        >

            <div className="quiz-wrapper">


                {/* ================================= */}
                {/* TOP HEADER */}
                {/* ================================= */}

                <div className="quiz-top-header">

                    <div className="subject-info">

                        <div className="subject-icon">

                            {subjectDetails.icon}

                        </div>

                        <div>

                            <div className="subject-label">

                                QUIZLY ASSESSMENT

                            </div>

                            <h1 className="quiz-title">

                                {subjectDetails.shortName} Quiz

                            </h1>

                            <p className="subject-description">

                                {subjectDetails.description}

                            </p>

                        </div>

                    </div>


                    {/* TIMER */}

                    <div className={timerClass}>

                        <span className="timer-icon">
                            ⏱
                        </span>

                        <div>

                            <span className="timer-label">
                                TIME LEFT
                            </span>

                            <strong>
                                {formattedTime}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* LOW TIME WARNING */}
                {/* ================================= */}

                {timeLeft <= 60 && (

                    <div className="time-warning">

                        ⚠️ Only{" "}

                        <strong>
                            {formattedTime}
                        </strong>

                        {" "}remaining! Please complete
                        your answers.

                    </div>

                )}


                {/* ================================= */}
                {/* MAIN CONTENT */}
                {/* ================================= */}

                <div className="quiz-layout">


                    {/* ================================= */}
                    {/* LEFT SIDE */}
                    {/* ================================= */}

                    <main className="quiz-main">


                        {/* PROGRESS CARD */}

                        <div className="progress-card">

                            <div className="progress-top">

                                <div>

                                    <span className="progress-label">
                                        Question Progress
                                    </span>

                                    <strong>

                                        {currentQuestion + 1}
                                        {" / "}
                                        {questions.length}

                                    </strong>

                                </div>


                                <div className="progress-stats">

                                    <span className="stat answered">
                                        ✓ {answeredCount} Answered
                                    </span>

                                    <span className="stat unanswered">
                                        ○ {unansweredCount} Unanswered
                                    </span>

                                    <span className="stat marked">
                                        🔖 {markedCount} Review
                                    </span>

                                </div>

                            </div>


                            <div className="progress-container">

                                <div
                                    className="progress-bar"

                                    style={{
                                        width:
                                            `${progress}%`
                                    }}

                                ></div>

                            </div>

                        </div>


                        {/* QUESTION CARD */}

                        <div className="question-card">


                            <div className="question-card-header">

                                <span className="question-badge">

                                    Question {currentQuestion + 1}

                                </span>


                                {markedQuestions[
                                    currentQuestion
                                ] && (

                                    <span className="review-badge">

                                        🔖 Marked for Review

                                    </span>

                                )}

                            </div>


                            <h2 className="question-text">

                                {question.question}

                            </h2>


                            {/* OPTIONS */}

                            <div className="options-container">

                                {question.options.map(
                                    (option, index) => {

                                        const optionLetter =
                                            String.fromCharCode(
                                                65 + index
                                            );

                                        const isSelected =
                                            selectedAnswer ===
                                            option;


                                        return (

                                            <label
                                                key={option}

                                                className={
                                                    `option ${
                                                        isSelected
                                                            ? "selected"
                                                            : ""
                                                    }`
                                                }
                                            >

                                                <input
                                                    type="radio"

                                                    name={
                                                        `question-${currentQuestion}`
                                                    }

                                                    value={option}

                                                    checked={
                                                        isSelected
                                                    }

                                                    onChange={() =>
                                                        handleAnswer(
                                                            option
                                                        )
                                                    }
                                                />


                                                <span className="option-letter">

                                                    {optionLetter}

                                                </span>


                                                <span className="option-text">

                                                    {option}

                                                </span>


                                                {isSelected && (

                                                    <span className="selected-check">

                                                        ✓

                                                    </span>

                                                )}

                                            </label>

                                        );

                                    }
                                )}

                            </div>


                            {/* NAVIGATION */}

                            <div className="navigation-buttons">


                                <button
                                    type="button"
                                    className="previous-button"
                                    onClick={
                                        handlePrevious
                                    }
                                    disabled={
                                        currentQuestion === 0
                                    }
                                >

                                    ← Previous

                                </button>


                                <button
                                    type="button"

                                    className={
                                        `review-button ${
                                            markedQuestions[
                                                currentQuestion
                                            ]
                                                ? "review-active"
                                                : ""
                                        }`
                                    }

                                    onClick={
                                        toggleMarkForReview
                                    }
                                >

                                    🔖{" "}

                                    {
                                        markedQuestions[
                                            currentQuestion
                                        ]
                                            ? "Unmark Review"
                                            : "Mark for Review"
                                    }

                                </button>


                                <button
                                    type="button"

                                    className="next-button"

                                    onClick={
                                        handleNext
                                    }
                                >

                                    {
                                        currentQuestion ===
                                        questions.length - 1

                                            ? "Submit Quiz ✓"

                                            : "Next Question →"
                                    }

                                </button>

                            </div>

                        </div>


                        {/* QUICK TIP */}

                        <div className="quiz-tip">

                            <span className="tip-icon">
                                💡
                            </span>

                            <div>

                                <strong>
                                    Quick Tip
                                </strong>

                                <p>

                                    You can mark questions for review
                                    and return to them using the
                                    question navigator.

                                </p>

                            </div>

                        </div>

                    </main>


                    {/* ================================= */}
                    {/* RIGHT QUESTION NAVIGATOR */}
                    {/* ================================= */}

                    <aside className="question-navigator">

                        <div className="navigator-header">

                            <div>

                                <h3>
                                    Question Navigator
                                </h3>

                                <p>
                                    Jump to any question
                                </p>

                            </div>

                            <span className="navigator-count">

                                {answeredCount}/
                                {questions.length}

                            </span>

                        </div>


                        <div className="navigator-grid">

                            {questions.map(
                                (_, index) => {

                                    const isAnswered =
                                        !!answers[index];

                                    const isMarked =
                                        !!markedQuestions[
                                            index
                                        ];

                                    const isCurrent =
                                        currentQuestion ===
                                        index;


                                    return (

                                        <button
                                            type="button"

                                            key={index}

                                            className={`
                                                navigator-button
                                                ${
                                                    isCurrent
                                                        ? "current"
                                                        : ""
                                                }
                                                ${
                                                    isAnswered
                                                        ? "answered"
                                                        : ""
                                                }
                                                ${
                                                    isMarked
                                                        ? "marked"
                                                        : ""
                                                }
                                            `}

                                            onClick={() =>
                                                goToQuestion(
                                                    index
                                                )
                                            }
                                        >

                                            {index + 1}

                                            {isMarked && (

                                                <span className="navigator-mark">

                                                    🔖

                                                </span>

                                            )}

                                        </button>

                                    );

                                }
                            )}

                        </div>


                        {/* LEGEND */}

                        <div className="navigator-legend">

                            <div>
                                <span className="legend-dot current-dot"></span>
                                Current
                            </div>

                            <div>
                                <span className="legend-dot answered-dot"></span>
                                Answered
                            </div>

                            <div>
                                <span className="legend-dot unanswered-dot"></span>
                                Unanswered
                            </div>

                            <div>
                                <span className="legend-dot marked-dot"></span>
                                Review
                            </div>

                        </div>


                        {/* SUMMARY */}

                        <div className="navigator-summary">

                            <div className="summary-item">

                                <span>
                                    Answered
                                </span>

                                <strong>
                                    {answeredCount}
                                </strong>

                            </div>


                            <div className="summary-item">

                                <span>
                                    Unanswered
                                </span>

                                <strong>
                                    {unansweredCount}
                                </strong>

                            </div>


                            <div className="summary-item">

                                <span>
                                    Marked
                                </span>

                                <strong>
                                    {markedCount}
                                </strong>

                            </div>

                        </div>

                    </aside>

                </div>

            </div>


            {/* ================================= */}
            {/* FULLSCREEN WARNING */}
            {/* ================================= */}

            {showFullscreenWarning && (

                <div className="fullscreen-warning-overlay">

                    <div className="fullscreen-warning">

                        <div className="warning-icon">
                            ⚠️
                        </div>

                        <h2>
                            Fullscreen Required
                        </h2>

                        <p>
                            You have exited fullscreen mode.
                        </p>

                        <p>

                            Warning{" "}

                            <strong>
                                {fullscreenWarnings}
                            </strong>

                            {" "}of 3

                        </p>


                        {fullscreenWarnings === 3 ? (

                            <p className="last-warning">

                                ⚠️ This is your final warning.
                                Exiting fullscreen again will
                                automatically submit the quiz.

                            </p>

                        ) : (

                            <p>

                                Please return to fullscreen
                                to continue your quiz.

                            </p>

                        )}


                        <button
                            type="button"
                            className="fullscreen-button"
                            onClick={
                                handleReturnToFullscreen
                            }
                        >

                            Return to Fullscreen

                        </button>

                    </div>

                </div>

            )}

        </div>

    );

}

export default Quiz;