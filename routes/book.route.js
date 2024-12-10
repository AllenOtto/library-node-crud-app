const express = require("express");
const router = express.Router();
const {
        getBook,
        addBook,
        updateBook,
        deleteBook } = require("../controllers/book.controller.js");

// router.get("/", getBooks);

router.get("/:id", getBook);

router.post("/addbook", addBook);

router.put("/updateBook/:id", updateBook);

router.delete("/deleteBook/:id", deleteBook);

module.exports = router;