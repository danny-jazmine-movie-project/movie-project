// THIS IS JQUERY
$(function () {

    const movieURL = "https://amused-typical-skunk.glitch.me/movies";

    function getAllMovieInfo(){
        fetch(movieURL).then(resp=>resp.json()).then(data => console.log(data));
    }
    getAllMovieInfo();

$("#movieAndRating").on('click', function (e) {
    e.preventDefault();
    /** The C in CRUD: CREATE */
    let idMovie = $("#addMovie").val();
    let ratingMovie = $("#movieRating").val();
    let movieToPost = {
        title: `${idMovie}`,
        rating: `${ratingMovie}`
    }
    const postMovieOptions = {
        method: 'POST', // Create a new post
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(movieToPost)
    }
    function postMovie() {
        fetch(movieURL, postMovieOptions).then(resp => resp.json()).then(data=>console.log(data));
    }
    postMovie();
    });
    /** THE D IN CRUD -- Delete */
    const deleteOptions = {
        method: 'DELETE', // Delete a post
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    fetch(movieURL + "/22", deleteOptions);
});




