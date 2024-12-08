const mongoose = require("mongoose")

const BookSchema = mongoose.Schema(
    {
        "title": {
            type: String,
            required: [true, "Please enter book title"]
        },

        "author": {
            type: String,
            required: true
        },

        "isbn": {
            type: String,
            required: false
        },

        "image": {
            type: String,
            required: false
        }
    },

    {
        timestamps: true
    }
);

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;