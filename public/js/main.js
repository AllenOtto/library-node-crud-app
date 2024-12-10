async function deleteItem(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/books/deleteBook/${id}`, {
            method: "DELETE"
        });

        if(response.ok) {
            const result = await response.json();
            console.log(result);
            location.reload();
        } else {
            console.error("Error: Deletion operation failed");
        }

    } catch(error) {
        console.error(`Error: ${error}`);
    }
}