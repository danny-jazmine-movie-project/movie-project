// THIS IS JQUERY
$(function () {
    // MOVIE URL
    const movieURL = "https://amused-typical-skunk.glitch.me/movies";
    let movieData = [];

    // this console.log our movie data
    function getAllMovieInfo(){
        fetch(movieURL).then(resp=>resp.json()).then(data => {
            console.log(data)
            movieData = data;
        });
    }
    getAllMovieInfo();
    // This function adds new movie
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
    }); // The of the end of on click function
    /** THE D IN CRUD -- Delete */
    const deleteOptions = {
        method: 'DELETE', // Delete a post
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    // fetch(movieURL + "/6", deleteOptions);`
    movieData.forEach((element, i) => {
        $(".movieContainer").append(`
            <div class="card">
                <p>Test Again</p>
                <p>Title: ${movieData[i].title}</p>
                <p>Year: ${movieData[i].year}</p>
                <img width="100%" height="70%" src=${movieData[i].poster}>
            </div>
            `)
    });
});




