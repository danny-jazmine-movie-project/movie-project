// API - Application Programming Interface
// a set of rules defining how applications and/or devices can connect to each other and communicate with one another.

// REST means representational state transfer.
// A pattern of design principles for APIs
// REST APIs communicate via HTTP request

// In a REST API, communication via HTTP request is used to perform the sandard set of actions called CRUD
// Create, Read, Update, Delete

// JSON Javascript Object Notation
// is not mandatory but is popular because it is both human and machine-readable

// https://glitch.com/amused-typical-skunk

/** The R in CRUD: READ */
const booksURL = "https://amused-typical-skunk.glitch.me/books";
const movieURL = "https://amused-typical-skunk.glitch.me/movies";
function getMovies() {
    fetch(movieURL).then(resp => resp.json()).then(data=>console.log(data));
}

getMovies();

//*************************** The C in CRUD: CREATE ********************************************//
/** The C in CRUD: CREATE */

const bookToPost = {
    title: "Eleanor of Aquitaine",
    author: {
        firstName: "Ralph",
        lastName: "Turner"
    }
}

const postOptions = {
    method: 'POST', // Create a new post
    headers: {
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify(bookToPost)
}
function getBooks() {
    fetch(booksURL).then(resp => resp.json()).then(data=>console.log(data));
}

getBooks();

// fetch(booksURL, postOptions).then(getBooks); // This will create a new book in the array

/** The U in CRUD: Updating with PUT and PATCH request */
// We'll use PUT to replace the entire content
// We'll use PATCH to modify only part of the entry

let modification = {
    title: "Eleanor of Aquitaine: Queen of France, Queen of England5"

}

const patchOptions = {
    method: 'PATCH', // It adds to the existing array base on 'id' partial
    headers: {
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify(modification)
}

// This will modify the book base on "id"
// fetch(booksURL + "/5 ", patchOptions).then(getBooks);

modification = {
    title: "Eleanor of Aquitaine and the Four Kings",
    author: {
        firstName: "Amy",
        lastName: "Kelly"
    }
}

const putOptions = {
    method: 'PUT', // Modify the entire content
    headers: {
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify(modification)
}
// This will modify
// fetch(booksURL + "/5", putOptions).then(getBooks);

/** THE D IN CRUD -- Delete */

const deleteOptions = {
    method: 'DELETE', // Delete a post
    headers: {
        'Content-Type' : 'application/json'
    }
}
// This will modify
fetch(booksURL + "/2", deleteOptions).then(getBooks);