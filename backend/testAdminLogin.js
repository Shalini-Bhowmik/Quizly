const db = require("./db");
const bcrypt = require("bcrypt");

const email = "admin@quizly.com";
const password = "admin123";

const sql = "SELECT * FROM admins WHERE email = ?";

db.query(sql, [email], async (error, results) => {

    if (error) {
        console.log("Database error:");
        console.log(error);
        return;
    }

    if (results.length === 0) {
        console.log("❌ Admin not found");
        db.end();
        return;
    }

    const admin = results[0];

    console.log("Admin found:");
    console.log("ID:", admin.id);
    console.log("Name:", admin.name);
    console.log("Email:", admin.email);

    const passwordMatch = await bcrypt.compare(
        password,
        admin.password
    );

    console.log("Password match:", passwordMatch);

    db.end();
});