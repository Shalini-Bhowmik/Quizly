const bcrypt = require("bcryptjs");

const password = "admin123";

const hash = "$2b$10$LL4OhhucOBQnrKImGrpfF.A62ikpB/4ue2XvyTyk18U.g4ljgTkwe";

bcrypt.compare(password, hash)
    .then(result => {
        console.log("Password match:", result);
    })
    .catch(error => {
        console.log("Error:", error);
    });