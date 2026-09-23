const fs = require("fs");
const path = require("path");
const db = require("./db");

// ==========================================
// IMPORT JAVA QUESTIONS FROM JSON
// ==========================================

// Change this path if your JSON is located somewhere else.
const jsonPath = path.join(
    __dirname,
    "../frontend/src/data/javaQuestions.json"
);

console.log("Reading Java questions...");


// ==========================================
// CHECK JSON FILE
// ==========================================

if (!fs.existsSync(jsonPath)) {

    console.log("❌ Java questions JSON file not found!");

    console.log("Expected location:");
    console.log(jsonPath);

    process.exit(1);
}


// ==========================================
// READ JSON
// ==========================================

let questions;

try {

    const jsonData = fs.readFileSync(
        jsonPath,
        "utf8"
    );

    questions = JSON.parse(jsonData);

} catch (error) {

    console.log("❌ Failed to read Java JSON file.");
    console.log(error.message);

    process.exit(1);
}


// ==========================================
// CHECK JSON FORMAT
// ==========================================

if (!Array.isArray(questions)) {

    console.log("❌ Java JSON must contain an array of questions.");

    process.exit(1);
}

console.log(
    `✅ ${questions.length} Java questions found in JSON.`
);


// ==========================================
// FIND JAVA SUBJECT
// ==========================================

const subjectSql = `
    SELECT id
    FROM subjects
    WHERE name = 'Java'
    LIMIT 1
`;

db.query(subjectSql, (error, results) => {

    if (error) {

        console.log("❌ Failed to find Java subject.");
        console.log(error.message);

        process.exit(1);
    }


    if (results.length === 0) {

        console.log("❌ Java subject does not exist in the database.");

        process.exit(1);
    }


    const javaSubjectId = results[0].id;

    console.log(
        `✅ Java subject found. ID: ${javaSubjectId}`
    );


    // ==========================================
    // CHECK EXISTING QUESTIONS
    // ==========================================

    const checkSql = `
        SELECT COUNT(*) AS count
        FROM questions
        WHERE subject_id = ?
    `;

    db.query(
        checkSql,
        [javaSubjectId],
        (checkError, countResults) => {

            if (checkError) {

                console.log(
                    "❌ Failed to check existing questions."
                );

                console.log(checkError.message);

                process.exit(1);
            }


            const existingCount =
                countResults[0].count;


            console.log(
                `Existing Java questions in MySQL: ${existingCount}`
            );


            // ==========================================
            // PREVENT DUPLICATE IMPORT
            // ==========================================

            if (existingCount > 0) {

                console.log("");
                console.log(
                    "⚠️ Java questions already exist in MySQL."
                );

                console.log(
                    "No questions were imported to prevent duplicates."
                );

                console.log("");
                console.log(
                    "If you want to replace them, delete the existing"
                );

                console.log(
                    "Java questions first and run this importer again."
                );

                process.exit(0);
            }


            // ==========================================
            // INSERT QUESTIONS
            // ==========================================

            const insertSql = `
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


            let imported = 0;


            function importNext(index) {

                // ======================================
                // ALL QUESTIONS IMPORTED
                // ======================================

                if (index >= questions.length) {

                    console.log("");
                    console.log(
                        "========================================"
                    );

                    console.log(
                        "🎉 Java questions imported successfully!"
                    );

                    console.log(
                        `Total imported: ${imported}`
                    );

                    console.log(
                        "========================================"
                    );

                    db.end();

                    return;
                }


                const item = questions[index];


                // ======================================
                // VALIDATE QUESTION
                // ======================================

                if (
                    !item.question ||
                    !Array.isArray(item.options) ||
                    item.options.length !== 4 ||
                    !item.answer
                ) {

                    console.log(
                        `⚠️ Skipping invalid question ${index + 1}`
                    );

                    importNext(index + 1);

                    return;
                }


                db.query(
                    insertSql,
                    [
                        javaSubjectId,
                        item.question,
                        item.options[0],
                        item.options[1],
                        item.options[2],
                        item.options[3],
                        item.answer
                    ],
                    (insertError) => {

                        if (insertError) {

                            console.log(
                                `❌ Failed to import question ${index + 1}`
                            );

                            console.log(
                                insertError.message
                            );

                            importNext(index + 1);

                            return;
                        }


                        imported++;


                        console.log(
                            `✅ Imported question ${imported}/${questions.length}`
                        );


                        importNext(index + 1);
                    }
                );
            }


            // Start importing
            importNext(0);

        }
    );

});