const db = require("./db");

const sql = `
    SELECT id, name, email, password
    FROM admins
    WHERE email = ?
`;

db.query(sql, ["admin@quizly.com"], (error, results) => {

    if (error) {

        console.log("Database error:");
        console.log(error);

        return;

    }

    console.log("Admin records found:");
    console.log(results);

    db.end();

});