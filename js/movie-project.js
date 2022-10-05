// THIS IS JQUERY
$(function () {
$("#movieAndRating").on('click', function (e) {
    e.preventDefault();
    /** The C in CRUD: CREATE */
    let idMovie = $("#addMovie").val();
    let ratingMovie = $("#movieRating").val();
    let movieToPost = {
        title: `${idMovie}`,
        rating: `${ratingMovie}`
    }
    const movieURL = "https://amused-typical-skunk.glitch.me/movies";

    const postMovie = {
        method: 'POST', // Create a new post
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(movieToPost)
    }

    function getMovies() {
        fetch(movieURL, postMovie).then(resp => resp.json()).then(data=>console.log(data));
    }
    getMovies();

    });
});
// fetch(movieURL, postMovie).then(getMovies); // This will create a new movie when userInput clicks enter




