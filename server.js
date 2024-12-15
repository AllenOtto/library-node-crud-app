require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bookRoute = require("./routes/book.route.js");
const Book = require("./models/book.model.js");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploadsHere");
    },

    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.originalname + "-" + uniqueSuffix);
    },
});

const upload = multer({ storage });

const app = express();

// *** Middleware *** //

app.set("view engine", "ejs");
app.use(express.static('public'));
// Enables our API to read data from req.body (i.e. from the user/frontend/browser)
app.use(bodyParser.json());
// Enables express to read JSON data
app.use(express.json());
// Enables express to read form data
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

// *** Routes *** //
app.use("/api/books", bookRoute);

// Environment variables
dbUser = process.env.DB_USER;
dbPwd = process.env.DB_PWD;

// Database connection
mongoose.connect(`mongodb+srv://${dbUser}:${dbPwd}@cluster0.jov96of.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => {
    console.log("Database connected successfully");
 
    // Run server on designated port
    app.listen(3000, () => {
        console.log("Server running");
    });
})
.catch(() => {
    console.log("Database connection failed");
});

// Landing page API
app.get("/", async (req, res) => {
    try {
        const results = await Book.find({});

        if(!results) {
            return res.status(404).json("Sorry. No books in store at the moment.");
        }

        res.render("home", { allBooks: results });

    } catch(error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/upload", upload.single("book-upload"), (req, res) => {
    res.json(req.file);
});

// app.get("/api/books", );

// app.get("/api/books/:id", );

// app.post("/api/books/addBook", );

// app.put("/api/books/updateBook/:id", );

// app.delete("/api/books/deleteBook/:id", );