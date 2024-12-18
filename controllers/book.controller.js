const Book = require("../models/book.model.js");

// Controller to retrieve a book
const getBook = async (req, res) => {
    const { id } = req.params;
    
    try {
        const book = await Book.findById(id);

        // Check
        if(!book) {
            return res.status(404).json({ message: "No such book in stock" });
        }

        res.status(200).json(book);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller to create a book
const addBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(200).redirect("/");
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller to update a book
const updateBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findByIdAndUpdate(id, req.body);
        
        // Check
        if(!book) {
            return res.status(404).json({ message: "No such book in stock" });
        }

        const updatedBook = await Book.findById(id);
        res.status(200).redirect("/");

    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller to delete a book
const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByIdAndDelete(id);
        
        // Check
        if(!book) {
            return res.status(404).json({ message: "No such book in stock" });
        }

        res.status(200).json(`Book deleted successfully`);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

// Export controllers to our routes page
module.exports = {
    getBook, addBook, updateBook, deleteBook
};