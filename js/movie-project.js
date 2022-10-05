// THIS IS JQUERY
$(function () {
    // MOVIE URL
    const movieURL = "https://amused-typical-skunk.glitch.me/movies";
    let movieData = [];

    // this console.log our movie data
    function getAllMovieInfo(){
      return fetch(movieURL).then(resp=>resp.json()).then(data => {
            console.log(data)
            movieData = data;
            return data;
        });
    }
    getAllMovieInfo().then(data=>console.log(data));

    //==================== ADD NEW MOVIE ============================================================
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

//======================= DELETE ====================================================================
    const deleteOptions = {
        method: 'DELETE', // Delete a post
        headers: {
            'Content-Type' : 'application/json'
        }
    }

//=====================OUTPUT MOVIES ================================================================
    getAllMovieInfo().then(data => {
        data.forEach(movieData=> {
            $("#movieContainer").append(`
            <div class="card">
                <p>Title: ${movieData.title}</p>
                <p>Rating: ${movieData.rating}</p>
                <p>Year: ${movieData.year}</p>
                <div class="poster-wrapper">
                    <img width="100%" height="100%" src=${movieData.poster}/>
                </div>  
            </div>
            `)
            console.log(movieData);
        })
    });
    // fetch(movieURL + "/6", deleteOptions);`
});




