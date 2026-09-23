
import { useState } from "react";
import "./Result.css";

function Result({
    score,
    totalQuestions,
    wrongAnswers,
    unanswered,
    answers,
    questions,
    onRetry,
    onDashboard
}) {

    const [showReview, setShowReview] = useState(false);

    const percentage = Math.round(
        (score / totalQuestions) * 100
    );

    // ==========================================
    // CHECK WHETHER ANSWER IS CORRECT
    // ==========================================

    const checkAnswer = (question, userAnswer) => {

        if (!userAnswer || !question.answer) {
            return false;
        }

        const selectedText = String(userAnswer)
            .trim()
            .toLowerCase();

        const correctText = String(question.answer)
            .trim()
            .toLowerCase();

        // If database stores A, B, C or D
        const optionIndex =
            ["a", "b", "c", "d"].indexOf(correctText);

        if (optionIndex !== -1) {

            const correctOption =
                String(question.options[optionIndex])
                    .trim()
                    .toLowerCase();

            return selectedText === correctOption;
        }

        // If database stores the complete answer text
        return selectedText === correctText;
    };

    return (
        <div className="result-page">

            <div className="result-card">

                {!showReview ? (

                    <>
                        <div className="result-icon">
                            🎉
                        </div>

                        <h1>
                            Quiz Completed!
                        </h1>

                        <p className="result-subtitle">
                            Great job! Here is your quiz result.
                        </p>

                        <div className="score-circle">

                            <div className="score-number">
                                {score} / {totalQuestions}
                            </div>

                            <div className="score-percentage">
                                {percentage}%
                            </div>

                        </div>

                        <div className="result-stats">

                            <div className="result-stat">
                                <strong>
                                    ✓ {score}
                                </strong>

                                <span>
                                    Correct
                                </span>
                            </div>

                            <div className="result-stat">
                                <strong>
                                    ✗ {wrongAnswers}
                                </strong>

                                <span>
                                    Wrong
                                </span>
                            </div>

                            <div className="result-stat">
                                <strong>
                                    — {unanswered}
                                </strong>

                                <span>
                                    Unanswered
                                </span>
                            </div>

                        </div>

                        <p>
                            Total Questions:{" "}
                            <strong>{totalQuestions}</strong>
                        </p>

                        <button
                            className="review-button"
                            onClick={() => setShowReview(true)}
                        >
                            Review Answers
                        </button>

                        <button
                            className="retry-button"
                            onClick={onRetry}
                        >
                            Try Again
                        </button>

                        <button
                            className="dashboard-button"
                            onClick={onDashboard}
                        >
                            ← Back to Dashboard
                        </button>

                    </>

                ) : (

                    <>
                        <h1>
                            Review Answers
                        </h1>

                        <p className="result-subtitle">
                            Check your answers and compare them with the correct answers.
                        </p>

                        <div className="review-container">

                            {questions.map((question, index) => {

                                const userAnswer = answers[index];

                                const isUnanswered =
                                    !userAnswer;

                                const isCorrect =
                                    checkAnswer(
                                        question,
                                        userAnswer
                                    );

                                return (

                                    <div
                                        className={`review-question ${
                                            isCorrect
                                                ? "correct-question"
                                                : isUnanswered
                                                ? "unanswered-question"
                                                : "wrong-question"
                                        }`}
                                        key={question.id || index}
                                    >

                                        <h3>
                                            {index + 1}. {question.question}
                                        </h3>

                                        <p>
                                            <strong>Your Answer:</strong>{" "}
                                            {userAnswer || "Not answered"}
                                        </p>

                                        <p>
                                            <strong>Correct Answer:</strong>{" "}

                                            {(() => {

                                                const correctText =
                                                    String(question.answer)
                                                        .trim();

                                                const optionIndex =
                                                    ["a", "b", "c", "d"]
                                                        .indexOf(
                                                            correctText.toLowerCase()
                                                        );

                                                if (optionIndex !== -1) {

                                                    return question.options[
                                                        optionIndex
                                                    ];

                                                }

                                                return question.answer;

                                            })()}

                                        </p>

                                        <div className="answer-status">

                                            {isCorrect
                                                ? "✓ Correct"
                                                : isUnanswered
                                                ? "— Unanswered"
                                                : "✗ Wrong"}

                                        </div>

                                    </div>

                                );

                            })}

                        </div>

                        <button
                            className="back-button"
                            onClick={() => setShowReview(false)}
                        >
                            ← Back to Result
                        </button>

                        <button
                            className="dashboard-button"
                            onClick={onDashboard}
                        >
                            ← Back to Dashboard
                        </button>

                    </>

                )}

            </div>

        </div>
    );
}

export default Result;
