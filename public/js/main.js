async function editItem(id, title, author, isbn, image) {
    document.getElementById("updateId").value = id;
    document.getElementById("updateTitle").value = title;
    document.getElementById("updateAuthor").value = author;
    document.getElementById("updateIsbn").value = isbn;
    document.getElementById("updateImage").value = image;

    document.getElementById("updateForm").action = `/api/books/updateBook/${id}`;
};

async function deleteItem(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/books/deleteBook/${id}`, {
            method: "DELETE"
        });

        if(response.ok) {
            // const result = await response.json();
            // console.log(result);
            location.reload();
        } else {
            console.error("Error! Server out of reach");
        }

    } catch(error) {
        console.error(`Error: ${error}`);
    }
};