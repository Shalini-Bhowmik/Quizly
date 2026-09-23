
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {
    res.send("Quizly Backend is Running!");
});


// ==========================================
// STUDENT REGISTER
// ==========================================

app.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please fill all fields."
        });
    }

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users (full_name, email, password)
            VALUES (?, ?, ?)
        `;

        db.query(
            sql,
            [name, email, hashedPassword],
            (error, result) => {

                if (error) {

                    console.log("Registration error:", error);

                    if (error.code === "ER_DUP_ENTRY") {
                        return res.status(400).json({
                            message: "Email already registered."
                        });
                    }

                    return res.status(500).json({
                        message: "Registration failed."
                    });
                }

                return res.status(201).json({
                    message: "Registration successful!",
                    user: {
                        id: result.insertId,
                        name: name,
                        email: email
                    }
                });
            }
        );

    } catch (error) {

        console.log("Registration server error:", error);

        return res.status(500).json({
            message: "Server error."
        });
    }
});


// ==========================================
// STUDENT LOGIN
// ==========================================

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please enter email and password."
        });
    }

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (error, results) => {

        if (error) {

            console.log("Login database error:", error);

            return res.status(500).json({
                message: "Database error."
            });
        }

        if (results.length === 0) {

            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const user = results[0];

        console.log("User from database:", user);

        try {

            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!passwordMatch) {

                return res.status(401).json({
                    message: "Invalid email or password."
                });
            }

            return res.status(200).json({
                message: "Login successful!",
                user: {
                    id: user.id,
                    name: user.full_name,
                    email: user.email
                }
            });

        } catch (error) {

            console.log("Password comparison error:", error);

            return res.status(500).json({
                message: "Server error."
            });
        }
    });
});


// ==========================================
// ADMIN LOGIN
// ==========================================

app.post("/admin/login", (req, res) => {

    const { email, password } = req.body;

    console.log("");
    console.log("================================");
    console.log("ADMIN LOGIN REQUEST");
    console.log("Email received:", email);
    console.log("================================");

    if (!email || !password) {

        return res.status(400).json({
            message: "Please enter admin email and password."
        });
    }

    const sql = "SELECT * FROM admins WHERE email = ?";

    db.query(sql, [email], async (error, results) => {

        if (error) {

            console.log("Admin database error:", error);

            return res.status(500).json({
                message: "Database error."
            });
        }

        console.log("Admin records found:", results.length);

        if (results.length === 0) {

            return res.status(401).json({
                message: "Invalid admin email or password."
            });
        }

        const admin = results[0];

        console.log("Admin found:", admin.email);

        try {

            const passwordMatch = await bcrypt.compare(
                password,
                admin.password
            );

            console.log("Password match:", passwordMatch);

            if (!passwordMatch) {

                return res.status(401).json({
                    message: "Invalid admin email or password."
                });
            }

            console.log("Admin login successful!");

            return res.status(200).json({
                message: "Admin login successful!",
                admin: {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                }
            });

        } catch (error) {

            console.log("Admin password error:", error);

            return res.status(500).json({
                message: "Server error."
            });
        }
    });
});


// ==========================================
// SAVE QUIZ RESULT
// ==========================================

app.post("/quiz-result", (req, res) => {

    const {
        userId,
        subject,
        score,
        totalQuestions,
        percentage
    } = req.body;

    if (
        !userId ||
        !subject ||
        score === undefined ||
        !totalQuestions ||
        percentage === undefined
    ) {
        return res.status(400).json({
            message: "Missing quiz result information."
        });
    }

    const sql = `
        INSERT INTO quiz_attempts
        (
            user_id,
            subject,
            score,
            total_questions,
            percentage
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            userId,
            subject,
            score,
            totalQuestions,
            percentage
        ],
        (error, result) => {

            if (error) {

                console.log("Quiz result error:", error);

                return res.status(500).json({
                    message: "Failed to save quiz result."
                });
            }

            console.log(
                "Quiz result saved successfully:",
                result.insertId
            );

            return res.status(201).json({
                message: "Quiz result saved successfully!",
                attemptId: result.insertId
            });
        }
    );
});


// ==========================================
// STUDENT DASHBOARD
// ==========================================

app.get("/dashboard/:userId", (req, res) => {

    const userId = req.params.userId;

    const statsSql = `
        SELECT
            COUNT(*) AS quizzesAttempted,
            COALESCE(AVG(percentage), 0) AS averageScore
        FROM quiz_attempts
        WHERE user_id = ?
    `;

    const recentSql = `
        SELECT
            id,
            subject,
            score,
            total_questions,
            percentage,
            attempted_at
        FROM quiz_attempts
        WHERE user_id = ?
        ORDER BY attempted_at DESC
        LIMIT 5
    `;

    db.query(statsSql, [userId], (statsError, statsResults) => {

        if (statsError) {

            console.log("Dashboard stats error:", statsError);

            return res.status(500).json({
                message: "Failed to fetch dashboard statistics."
            });
        }

        db.query(recentSql, [userId], (recentError, recentResults) => {

            if (recentError) {

                console.log(
                    "Dashboard attempts error:",
                    recentError
                );

                return res.status(500).json({
                    message: "Failed to fetch recent attempts."
                });
            }

            return res.status(200).json({
                stats: {
                    quizzesAttempted:
                        statsResults[0].quizzesAttempted,

                    averageScore:
                        Number(
                            Number(
                                statsResults[0].averageScore
                            ).toFixed(2)
                        )
                },

                recentAttempts: recentResults
            });
        });
    });
});


// ==========================================
// ALL ATTEMPTS
// ==========================================

app.get("/attempts/:userId", (req, res) => {

    const userId = req.params.userId;

    const sql = `
        SELECT
            id,
            subject,
            score,
            total_questions,
            percentage,
            attempted_at
        FROM quiz_attempts
        WHERE user_id = ?
        ORDER BY attempted_at DESC
    `;

    db.query(sql, [userId], (error, results) => {

        if (error) {

            console.log("Attempts error:", error);

            return res.status(500).json({
                message: "Failed to fetch quiz attempts."
            });
        }

        return res.status(200).json(results);
    });
});


// ==========================================
// ADMIN DASHBOARD STATISTICS
// ==========================================

app.get("/admin/stats", (req, res) => {

    const subjectsSql = `
        SELECT COUNT(*) AS totalSubjects
        FROM subjects
        WHERE status = 'active'
    `;

    const questionsSql = `
        SELECT COUNT(*) AS totalQuestions
        FROM questions
    `;

    const attemptsSql = `
        SELECT
            COUNT(*) AS totalAttempts,
            COALESCE(AVG(percentage), 0) AS averageScore
        FROM quiz_attempts
    `;

    db.query(subjectsSql, (subjectsError, subjectsResult) => {

        if (subjectsError) {

            console.log(
                "Admin subjects stats error:",
                subjectsError
            );

            return res.status(500).json({
                message: "Failed to fetch subject statistics."
            });
        }

        db.query(
            questionsSql,
            (questionsError, questionsResult) => {

                if (questionsError) {

                    console.log(
                        "Admin questions stats error:",
                        questionsError
                    );

                    return res.status(500).json({
                        message:
                            "Failed to fetch question statistics."
                    });
                }

                db.query(
                    attemptsSql,
                    (attemptsError, attemptsResult) => {

                        if (attemptsError) {

                            console.log(
                                "Admin attempts stats error:",
                                attemptsError
                            );

                            return res.status(500).json({
                                message:
                                    "Failed to fetch attempt statistics."
                            });
                        }

                        return res.status(200).json({
                            stats: {
                                subjects:
                                    subjectsResult[0].totalSubjects,

                                questions:
                                    questionsResult[0].totalQuestions,

                                attempts:
                                    attemptsResult[0].totalAttempts,

                                averageScore:
                                    Number(
                                        Number(
                                            attemptsResult[0]
                                                .averageScore
                                        ).toFixed(2)
                                    )
                            }
                        });

                    }
                );

            }
        );

    });

});


// ==========================================
// ADMIN - MANAGE SUBJECTS
// ==========================================


// GET ALL SUBJECTS
// =============================
// ADMIN - GET ALL SUBJECTS
// =============================

app.get("/admin/subjects", (req, res) => {

    const sql = `
        SELECT
            s.id,
            s.name,
            s.description,
            s.category,
            s.icon,
            s.status,
            s.created_at,
            s.question_count,
            s.quiz_duration,
            COUNT(q.id) AS available_questions
        FROM subjects s
        LEFT JOIN questions q
            ON s.id = q.subject_id
        GROUP BY
            s.id,
            s.name,
            s.description,
            s.category,
            s.icon,
            s.status,
            s.created_at,
            s.question_count,
            s.quiz_duration
        ORDER BY s.id ASC
    `;

    db.query(sql, (error, results) => {

        if (error) {

            console.log(
                "Fetch subjects error:",
                error
            );

            return res.status(500).json({
                message: "Failed to fetch subjects."
            });
        }

        return res.status(200).json(results);
    });

});

// ADD SUBJECT
// =============================
// ADMIN - ADD SUBJECT
// =============================

app.post("/admin/subjects", (req, res) => {

    const {
        name,
        description,
        category,
        icon,
        status,
        question_count,
        quiz_duration
    } = req.body;


    // ==========================================
    // VALIDATION
    // ==========================================

    if (
        !name ||
        !description ||
        !category ||
        !icon ||
        !status ||
        question_count === undefined ||
        quiz_duration === undefined
    ) {

        return res.status(400).json({
            message: "Please fill all subject fields and quiz settings."
        });

    }


    const questionCount =
        Number(question_count);

    const quizDuration =
        Number(quiz_duration);


    if (
        !Number.isInteger(questionCount) ||
        questionCount <= 0
    ) {

        return res.status(400).json({
            message: "Question count must be a positive whole number."
        });

    }


    if (
        !Number.isInteger(quizDuration) ||
        quizDuration <= 0
    ) {

        return res.status(400).json({
            message: "Quiz duration must be a positive whole number."
        });

    }


    // ==========================================
    // INSERT SUBJECT
    // ==========================================

    const sql = `
        INSERT INTO subjects
        (
            name,
            description,
            category,
            icon,
            status,
            question_count,
            quiz_duration
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;


    db.query(
        sql,
        [
            name,
            description,
            category,
            icon,
            status,
            questionCount,
            quizDuration
        ],
        (error, result) => {

            if (error) {

                console.log(
                    "Add subject error:",
                    error
                );


                if (error.code === "ER_DUP_ENTRY") {

                    return res.status(400).json({
                        message: "This subject already exists."
                    });

                }


                return res.status(500).json({
                    message: "Failed to add subject."
                });

            }


            return res.status(201).json({
                message: "Subject added successfully!",
                subjectId: result.insertId
            });

        }
    );

});


// UPDATE SUBJECT
// =============================
// ADMIN - UPDATE SUBJECT
// =============================

app.put("/admin/subjects/:id", (req, res) => {

    const subjectId = req.params.id;


    const {
        name,
        description,
        category,
        icon,
        status,
        question_count,
        quiz_duration
    } = req.body;


    // ==========================================
    // VALIDATION
    // ==========================================

    if (
        !name ||
        !description ||
        !category ||
        !icon ||
        !status ||
        question_count === undefined ||
        quiz_duration === undefined
    ) {

        return res.status(400).json({
            message: "Please fill all subject fields and quiz settings."
        });

    }


    const questionCount =
        Number(question_count);

    const quizDuration =
        Number(quiz_duration);


    if (
        !Number.isInteger(questionCount) ||
        questionCount <= 0
    ) {

        return res.status(400).json({
            message: "Question count must be a positive whole number."
        });

    }


    if (
        !Number.isInteger(quizDuration) ||
        quizDuration <= 0
    ) {

        return res.status(400).json({
            message: "Quiz duration must be a positive whole number."
        });

    }


    // ==========================================
    // UPDATE SUBJECT
    // ==========================================

    const sql = `
        UPDATE subjects
        SET
            name = ?,
            description = ?,
            category = ?,
            icon = ?,
            status = ?,
            question_count = ?,
            quiz_duration = ?
        WHERE id = ?
    `;


    db.query(
        sql,
        [
            name,
            description,
            category,
            icon,
            status,
            questionCount,
            quizDuration,
            subjectId
        ],
        (error, result) => {

            if (error) {

                console.log(
                    "Update subject error:",
                    error
                );


                if (error.code === "ER_DUP_ENTRY") {

                    return res.status(400).json({
                        message:
                            "Another subject already has this name."
                    });

                }


                return res.status(500).json({
                    message:
                        "Failed to update subject."
                });

            }


            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message:
                        "Subject not found."
                });

            }


            return res.status(200).json({
                message:
                    "Subject updated successfully!"
            });

        }
    );

});

// DELETE SUBJECT
app.delete("/admin/subjects/:id", (req, res) => {

    const subjectId = req.params.id;

    const sql = `
        DELETE FROM subjects
        WHERE id = ?
    `;

    db.query(
        sql,
        [subjectId],
        (error, result) => {

            if (error) {

                console.log("Delete subject error:", error);

                return res.status(500).json({
                    message: "Failed to delete subject."
                });
            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Subject not found."
                });
            }

            return res.status(200).json({
                message: "Subject deleted successfully!"
            });
        }
    );
});


// ==========================================
// STUDENT - GET QUESTIONS BY SUBJECT
// ==========================================

// ==========================================
// STUDENT - GET QUESTIONS BY SUBJECT
// ==========================================

// ==========================================
// GET QUESTIONS FOR STUDENT QUIZ
// ==========================================

app.get("/questions/:subject", (req, res) => {

    const subjectName = req.params.subject;

    const subjectSql = `
        SELECT
            id,
            question_count
        FROM subjects
        WHERE name = ?
          AND status = 'active'
    `;

    db.query(
        subjectSql,
        [subjectName],
        (subjectError, subjectResults) => {

            if (subjectError) {

                console.error(
                    "Subject fetch error:",
                    subjectError
                );

                return res.status(500).json({
                    message: "Failed to load subject."
                });

            }

            if (subjectResults.length === 0) {

                return res.status(404).json({
                    message: "Subject not found."
                });

            }

            const subjectId =
                subjectResults[0].id;

            const questionCount =
                Number(
                    subjectResults[0].question_count
                );

            if (questionCount <= 0) {

                return res.status(200).json([]);

            }

            const questionSql = `
                SELECT
                    question,
                    option_a,
                    option_b,
                    option_c,
                    option_d,
                    correct_answer
                FROM questions
                WHERE subject_id = ?
                ORDER BY RAND()
                LIMIT ${questionCount}
            `;

            db.query(
                questionSql,
                [subjectId],
                (questionError, results) => {

                    if (questionError) {

                        console.error(
                            "Question fetch error:",
                            questionError
                        );

                        return res.status(500).json({
                            message:
                                "Failed to load questions."
                        });

                    }

                    const questions =
                        results.map((item) => ({

                            question:
                                item.question,

                            options: [
                                item.option_a,
                                item.option_b,
                                item.option_c,
                                item.option_d
                            ],

                            answer:
                                item.correct_answer

                        }));

                    return res.status(200).json(
                        questions
                    );

                }
            );

        }
    );

});


// ==========================================
// ADMIN - MANAGE QUESTIONS
// ==========================================


// GET ALL QUESTIONS
app.get("/admin/questions", (req, res) => {

    const sql = `
        SELECT
            q.id,
            q.subject_id,
            s.name AS subject_name,
            q.question,
            q.option_a,
            q.option_b,
            q.option_c,
            q.option_d,
            q.correct_answer,
            q.created_at
        FROM questions q
        INNER JOIN subjects s
            ON q.subject_id = s.id
        ORDER BY q.id DESC
    `;

    db.query(sql, (error, results) => {

        if (error) {

            console.log("Fetch questions error:", error);

            return res.status(500).json({
                message: "Failed to fetch questions."
            });
        }

        return res.status(200).json(results);
    });
});


// ADD QUESTION
app.post("/admin/questions", (req, res) => {

    const {
        subject_id,
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer
    } = req.body;

    if (
        !subject_id ||
        !question ||
        !option_a ||
        !option_b ||
        !option_c ||
        !option_d ||
        !correct_answer
    ) {
        return res.status(400).json({
            message: "Please fill all question fields."
        });
    }

    const sql = `
        INSERT INTO questions
        (
            subject_id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_answer
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            subject_id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_answer
        ],
        (error, result) => {

            if (error) {

                console.log("Add question error:", error);

                return res.status(500).json({
                    message: "Failed to add question."
                });
            }

            return res.status(201).json({
                message: "Question added successfully!",
                questionId: result.insertId
            });
        }
    );
});


// UPDATE QUESTION
app.put("/admin/questions/:id", (req, res) => {

    const questionId = req.params.id;

    const {
        subject_id,
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer
    } = req.body;

    if (
        !subject_id ||
        !question ||
        !option_a ||
        !option_b ||
        !option_c ||
        !option_d ||
        !correct_answer
    ) {
        return res.status(400).json({
            message: "Please fill all question fields."
        });
    }

    const sql = `
        UPDATE questions
        SET
            subject_id = ?,
            question = ?,
            option_a = ?,
            option_b = ?,
            option_c = ?,
            option_d = ?,
            correct_answer = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            subject_id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_answer,
            questionId
        ],
        (error, result) => {

            if (error) {

                console.log("Update question error:", error);

                return res.status(500).json({
                    message: "Failed to update question."
                });
            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Question not found."
                });
            }

            return res.status(200).json({
                message: "Question updated successfully!"
            });
        }
    );
});


// DELETE QUESTION
app.delete("/admin/questions/:id", (req, res) => {

    const questionId = req.params.id;

    const sql = `
        DELETE FROM questions
        WHERE id = ?
    `;

    db.query(
        sql,
        [questionId],
        (error, result) => {

            if (error) {

                console.log("Delete question error:", error);

                return res.status(500).json({
                    message: "Failed to delete question."
                });
            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Question not found."
                });
            }

            return res.status(200).json({
                message: "Question deleted successfully!"
            });
        }
    );
});

// ==========================================
// GET QUIZ CONFIGURATION FOR STUDENT
// ==========================================

app.get("/quiz-config/:subject", (req, res) => {

    const subjectName = req.params.subject;

    const sql = `
        SELECT
            s.id,
            s.name,
            s.question_count,
            s.quiz_duration,
            COUNT(q.id) AS available_questions
        FROM subjects s
        LEFT JOIN questions q
            ON s.id = q.subject_id
        WHERE s.name = ?
          AND s.status = 'active'
        GROUP BY
            s.id,
            s.name,
            s.question_count,
            s.quiz_duration
    `;

    db.query(sql, [subjectName], (error, results) => {

        if (error) {

            console.error(
                "Quiz config error:",
                error
            );

            return res.status(500).json({
                message: "Failed to load quiz configuration."
            });

        }

        if (results.length === 0) {

            return res.status(404).json({
                message: "Subject not found."
            });

        }

        const configuredQuestionCount =
            Number(results[0].question_count);

        const availableQuestions =
            Number(results[0].available_questions);

        const actualQuestionCount =
            Math.min(
                configuredQuestionCount,
                availableQuestions
            );

        return res.status(200).json({

            subject:
                results[0].name,

            questionCount:
                actualQuestionCount,

            configuredQuestionCount:
                configuredQuestionCount,

            quizDuration:
                Number(results[0].quiz_duration),

            availableQuestions:
                availableQuestions

        });

    });

});

// ==========================================
// ADMIN - GET ALL QUIZ RESULTS
// ==========================================

app.get("/admin/results", (req, res) => {

    const sql = `
        SELECT
            qa.id,
            qa.user_id,
            u.full_name AS student_name,
            u.email AS student_email,
            qa.subject,
            qa.score,
            qa.total_questions,
            qa.percentage,
            qa.attempted_at
        FROM quiz_attempts qa
        INNER JOIN users u
            ON qa.user_id = u.id
        ORDER BY qa.attempted_at DESC
    `;

    db.query(sql, (error, results) => {

        if (error) {

            console.log(
                "Admin results error:",
                error
            );

            return res.status(500).json({
                message: "Failed to fetch quiz results."
            });
        }

        return res.status(200).json(results);
    });

});


// ==========================================
// START SERVER
// ==========================================

const PORT = 5000;

app.listen(PORT, () => {

    console.log("");
    console.log("================================");
    console.log("Quizly Backend running on port 5000");
    console.log("================================");
});
