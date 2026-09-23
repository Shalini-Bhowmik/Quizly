const db = require("./db");

const questionSets = {

    "Operating Systems": [

        [
            "What is an operating system?",
            "System software that manages computer resources",
            "A programming language",
            "A database",
            "An antivirus program",
            "System software that manages computer resources"
        ],

        [
            "Which of the following is an example of an operating system?",
            "MySQL",
            "Windows",
            "Java",
            "HTML",
            "Windows"
        ],

        [
            "Which component of an operating system manages processes?",
            "Process Scheduler",
            "Compiler",
            "File Manager",
            "Text Editor",
            "Process Scheduler"
        ],

        [
            "What is a process?",
            "A program in execution",
            "A stored file",
            "A hardware device",
            "A programming language",
            "A program in execution"
        ],

        [
            "Which scheduling algorithm executes processes in the order they arrive?",
            "Round Robin",
            "FCFS",
            "Shortest Job First",
            "Priority Scheduling",
            "FCFS"
        ],

        [
            "Which scheduling algorithm assigns a fixed time interval to each process?",
            "FCFS",
            "Round Robin",
            "Priority Scheduling",
            "SJF",
            "Round Robin"
        ],

        [
            "What is a thread?",
            "A lightweight unit of a process",
            "A type of memory",
            "A storage device",
            "A programming language",
            "A lightweight unit of a process"
        ],

        [
            "Which memory management technique uses fixed-size blocks called pages?",
            "Segmentation",
            "Paging",
            "Compaction",
            "Swapping",
            "Paging"
        ],

        [
            "What is virtual memory?",
            "Memory stored only in CPU registers",
            "A technique that uses disk space as an extension of RAM",
            "A type of cache memory",
            "A physical memory chip",
            "A technique that uses disk space as an extension of RAM"
        ],

        [
            "Which of the following is required for a deadlock to occur?",
            "Mutual exclusion",
            "Compilation",
            "Paging",
            "Multithreading only",
            "Mutual exclusion"
        ],

        [
            "Which condition means a process is waiting indefinitely for a resource held by another process?",
            "Deadlock",
            "Paging",
            "Fragmentation",
            "Scheduling",
            "Deadlock"
        ],

        [
            "Which of the following is a file management operation?",
            "Creating a file",
            "Increasing CPU speed",
            "Changing monitor resolution",
            "Increasing RAM physically",
            "Creating a file"
        ],

        [
            "What is context switching?",
            "Changing from one process to another",
            "Changing the operating system",
            "Changing a file name",
            "Changing the CPU hardware",
            "Changing from one process to another"
        ],

        [
            "Which memory is closest to the CPU?",
            "Hard Disk",
            "RAM",
            "Cache",
            "USB Drive",
            "Cache"
        ],

        [
            "Which of the following is NOT an operating system?",
            "Linux",
            "Windows",
            "Android",
            "MySQL",
            "MySQL"
        ]
    ],


    "DSA": [

        [
            "What is the time complexity of accessing an element in an array using its index?",
            "O(1)",
            "O(n)",
            "O(log n)",
            "O(n²)",
            "O(1)"
        ],

        [
            "Which data structure follows LIFO?",
            "Queue",
            "Stack",
            "Linked List",
            "Array",
            "Stack"
        ],

        [
            "Which data structure follows FIFO?",
            "Stack",
            "Queue",
            "Tree",
            "Graph",
            "Queue"
        ],

        [
            "What is the worst-case time complexity of linear search?",
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n log n)",
            "O(n)"
        ],

        [
            "Which sorting algorithm has average time complexity O(n log n)?",
            "Bubble Sort",
            "Selection Sort",
            "Merge Sort",
            "Linear Search",
            "Merge Sort"
        ],

        [
            "Which data structure is commonly used to implement recursion?",
            "Queue",
            "Stack",
            "Graph",
            "Heap",
            "Stack"
        ],

        [
            "How many maximum children can a node in a binary tree have?",
            "1",
            "2",
            "3",
            "4",
            "2"
        ],

        [
            "Which BST traversal gives sorted order?",
            "Preorder",
            "Postorder",
            "Inorder",
            "Level Order",
            "Inorder"
        ],

        [
            "Which data structure is used in BFS?",
            "Stack",
            "Queue",
            "Heap",
            "Array",
            "Queue"
        ],

        [
            "Which data structure is commonly used in DFS?",
            "Queue",
            "Stack",
            "HashMap",
            "Linked List",
            "Stack"
        ],

        [
            "What is the average search complexity of HashMap?",
            "O(n)",
            "O(log n)",
            "O(1)",
            "O(n²)",
            "O(1)"
        ],

        [
            "Which data structure is best suited to implement a priority queue?",
            "Stack",
            "Heap",
            "Array",
            "Linked List",
            "Heap"
        ],

        [
            "What is the worst-case time complexity of Quick Sort?",
            "O(n)",
            "O(log n)",
            "O(n log n)",
            "O(n²)",
            "O(n²)"
        ],

        [
            "Which of the following is a linear data structure?",
            "Tree",
            "Graph",
            "Array",
            "Binary Search Tree",
            "Array"
        ],

        [
            "What is the time complexity of binary search on a sorted array?",
            "O(n)",
            "O(n²)",
            "O(log n)",
            "O(1)",
            "O(log n)"
        ]
    ],


    "DBMS": [

        [
            "What does DBMS stand for?",
            "Database Management System",
            "Data Backup Management System",
            "Database Monitoring System",
            "Data Management Service",
            "Database Management System"
        ],

        [
            "Which SQL command is used to retrieve data?",
            "GET",
            "SELECT",
            "FETCH",
            "RETRIEVE",
            "SELECT"
        ],

        [
            "Which SQL command is used to insert a new record?",
            "ADD",
            "INSERT",
            "CREATE",
            "UPDATE",
            "INSERT"
        ],

        [
            "Which key uniquely identifies each record?",
            "Foreign",
            "Candidate",
            "Primary",
            "Composite",
            "Primary"
        ],

        [
            "Which key establishes a relationship between two tables?",
            "Primary",
            "Foreign",
            "Super",
            "Alternate",
            "Foreign"
        ],

        [
            "Which SQL command is used to modify existing records?",
            "CHANGE",
            "MODIFY",
            "UPDATE",
            "ALTER",
            "UPDATE"
        ],

        [
            "Which SQL command is used to remove records?",
            "REMOVE",
            "DELETE",
            "DROP",
            "CLEAR",
            "DELETE"
        ],

        [
            "Which normal form removes repeating groups and ensures atomic values?",
            "1NF",
            "2NF",
            "3NF",
            "BCNF",
            "1NF"
        ],

        [
            "Which SQL clause filters rows based on a condition?",
            "ORDER BY",
            "GROUP BY",
            "WHERE",
            "HAVING",
            "WHERE"
        ],

        [
            "Which SQL clause is used to sort results?",
            "SORT BY",
            "ORDER BY",
            "GROUP BY",
            "ARRANGE BY",
            "ORDER BY"
        ],

        [
            "Which JOIN returns only matching records from both tables?",
            "LEFT",
            "RIGHT",
            "FULL",
            "INNER",
            "INNER"
        ],

        [
            "What is the full form of SQL?",
            "Structured Query Language",
            "Simple Query Language",
            "System Query Language",
            "Structured Question Language",
            "Structured Query Language"
        ],

        [
            "Which command removes an entire table?",
            "DELETE",
            "REMOVE",
            "DROP",
            "CLEAR",
            "DROP"
        ],

        [
            "Which ACID property ensures a transaction is treated as a single unit?",
            "Consistency",
            "Isolation",
            "Durability",
            "Atomicity",
            "Atomicity"
        ],

        [
            "Which database object improves the speed of data retrieval?",
            "Trigger",
            "Index",
            "View",
            "Cursor",
            "Index"
        ]
    ],


    "Computer Networks": [

        [
            "What is the full form of LAN?",
            "Local Area Network",
            "Large Area Network",
            "Long Area Network",
            "Linked Area Network",
            "Local Area Network"
        ],

        [
            "Which device connects different networks?",
            "Switch",
            "Router",
            "Hub",
            "Repeater",
            "Router"
        ],

        [
            "Which protocol is used to transfer web pages?",
            "FTP",
            "HTTP",
            "SMTP",
            "DNS",
            "HTTP"
        ],

        [
            "What is the full form of IP?",
            "Internet Protocol",
            "Internet Program",
            "Internal Protocol",
            "Internet Process",
            "Internet Protocol"
        ],

        [
            "Which protocol translates domain names into IP addresses?",
            "HTTP",
            "FTP",
            "DNS",
            "SMTP",
            "DNS"
        ],

        [
            "Which protocol is mainly used for sending emails?",
            "SMTP",
            "HTTP",
            "FTP",
            "DNS",
            "SMTP"
        ],

        [
            "Which protocol is used for transferring files between computers?",
            "FTP",
            "HTTP",
            "SMTP",
            "ARP",
            "FTP"
        ],

        [
            "Which OSI layer is responsible for routing?",
            "Physical",
            "Data Link",
            "Network",
            "Application",
            "Network"
        ],

        [
            "How many layers are there in the OSI model?",
            "5",
            "6",
            "7",
            "8",
            "7"
        ],

        [
            "Which device mainly operates at the Data Link layer?",
            "Router",
            "Switch",
            "Repeater",
            "Modem",
            "Switch"
        ],

        [
            "Which protocol is reliable and connection-oriented?",
            "UDP",
            "IP",
            "TCP",
            "ICMP",
            "TCP"
        ],

        [
            "Which protocol is connectionless?",
            "TCP",
            "UDP",
            "HTTP",
            "FTP",
            "UDP"
        ],

        [
            "What is the main purpose of a MAC address?",
            "Identify a device on a local network",
            "Identify a website",
            "Store files",
            "Encrypt data",
            "Identify a device on a local network"
        ],

        [
            "Which topology connects all devices to a central device?",
            "Bus",
            "Ring",
            "Star",
            "Mesh",
            "Star"
        ],

        [
            "What is the full form of WAN?",
            "Wide Area Network",
            "Wireless Area Network",
            "Web Area Network",
            "World Access Network",
            "Wide Area Network"
        ]
    ]
};


// ==========================================
// DATABASE QUERY HELPER
// ==========================================

function query(sql, params = []) {

    return new Promise((resolve, reject) => {

        db.query(
            sql,
            params,
            (error, results) => {

                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }

            }
        );

    });

}


// ==========================================
// IMPORT QUESTIONS
// ==========================================

async function importQuestions() {

    console.log("");
    console.log("========================================");
    console.log("QUIZLY - IMPORT PREVIOUS QUESTIONS");
    console.log("========================================");

    let totalImported = 0;
    let totalSkipped = 0;

    try {

        for (const subjectName of Object.keys(questionSets)) {

            console.log("");
            console.log("----------------------------------------");
            console.log("Subject:", subjectName);
            console.log("----------------------------------------");

            // Find subject ID
            const subjects = await query(
                "SELECT id FROM subjects WHERE name = ? LIMIT 1",
                [subjectName]
            );

            if (subjects.length === 0) {

                console.log(
                    "❌ Subject not found:",
                    subjectName
                );

                continue;
            }

            const subjectId = subjects[0].id;

            console.log(
                "Subject ID:",
                subjectId
            );

            let imported = 0;
            let skipped = 0;

            const questions = questionSets[subjectName];

            for (const item of questions) {

                const [
                    question,
                    optionA,
                    optionB,
                    optionC,
                    optionD,
                    correctAnswer
                ] = item;


                // Check whether this question already exists
                const existing = await query(
                    `
                    SELECT id
                    FROM questions
                    WHERE subject_id = ?
                    AND question = ?
                    LIMIT 1
                    `,
                    [
                        subjectId,
                        question
                    ]
                );


                if (existing.length > 0) {

                    console.log(
                        "⏭️ Already exists:",
                        question
                    );

                    skipped++;
                    totalSkipped++;

                    continue;
                }


                // Insert question
                await query(
                    `
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
                    `,
                    [
                        subjectId,
                        question,
                        optionA,
                        optionB,
                        optionC,
                        optionD,
                        correctAnswer
                    ]
                );


                console.log(
                    "✅ Imported:",
                    question
                );

                imported++;
                totalImported++;
            }


            console.log("");
            console.log(
                `Imported for ${subjectName}: ${imported}`
            );

            console.log(
                `Skipped for ${subjectName}: ${skipped}`
            );
        }


        console.log("");
        console.log("========================================");
        console.log("IMPORT COMPLETED");
        console.log("========================================");

        console.log(
            "Total imported:",
            totalImported
        );

        console.log(
            "Total skipped:",
            totalSkipped
        );

        console.log("========================================");
        console.log("");


        db.end();

    } catch (error) {

        console.log("");
        console.log("❌ IMPORT FAILED");
        console.log(error);
        console.log("");

        db.end();
    }
}


importQuestions();