require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bookRoute = require("./routes/book.route.js");

const app = express();

// *** Middleware *** //

// Enables our API to read data from req.body (i.e. from the user/frontend/browser)
app.use(bodyParser.json());
// Enables express to read JSON data
app.use(express.json());
// Enables express to read form data
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// *** Routes *** //
app.use("/api/books", bookRoute);

// Environment variables
dbUser = process.env.DB_USER;
dbPwd = process.env.DB_PWD;
port = process.env.PORT;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPwd}@cluster0.jov96of.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => {
    console.log("Database connected successfully");

    // Run server on designated port
    app.listen(port || 5000, () => {
        console.log("Server running");
    });
})
.catch(() => {
    console.log("Database connection failed");
});

// app.get("/api/books", );

// app.get("/api/books/:id", );

// app.post("/api/books/addBook", );

// app.put("/api/books/updateBook/:id", );

// app.delete("/api/books/deleteBook/:id", );