// THIS IS JQUERY
$(function () {
    // MOVIE URL
    const movieURL = "https://amused-typical-skunk.glitch.me/movies";
    let allMoviesPromise;
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

//==================== ADD NEW MOVIE ===================================================================================
        // This function adds new movie when you click the button
    $("#movieAndRating").on('click', function (e) {
        e.preventDefault();
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
        async function postMovie() {
            await fetch(movieURL, postMovieOptions).then(resp => resp.json()).then(data=>console.log(data));
            getAllMovieInfo().then(data => {
                printMovieCards(data);
            });
        }
        postMovie();
    }); // The of the end of on click function

//=====================OUTPUT MOVIES ===================================================================================
    // getting data
    getAllMovieInfo().then(data => {
        printMovieCards(data);
    });

    async function printMovieCards(movieList) {
        $("#movieContainer").empty();
        movieList.forEach(movieData=> {
            $("#movieContainer").append(`
            <div class="card">
                <p>Title: ${movieData.title}</p>
                <p>Rating: ${movieData.rating}</p>
                <p>Year: ${movieData.year}</p>
                <div class="poster-wrapper">
                    <img width="100%" height="100%" src=${movieData.poster}/>
                </div>  
                <button type="submit" id="edit-button">Edit</button>
                <button type="submit" class="delete" data-delete="${movieData.id}">Delete</button>
            </div>
            `)
            console.log(movieData);
        });
    }


//======================= EDIT =========================================================================================
//     $("#edit-button").on('click', function (e) {
//         e.preventDefault();
//         let idMovie = $("#addMovie").val();
//         let ratingMovie = $("#movieRating").val();
//         let editPost = {
//             title: `${idMovie}`,
//             rating: `${ratingMovie}`
//         }
//
//     const patchOptions = {
//         method: 'PATCH', // It adds to the existing array base on 'id' partial
//         headers: {
//             'Content-Type' : 'application/json'
//         },
//         body: JSON.stringify(editPost)
//     }
//======================= DELETE =======================================================================================
    async function deleteMovie(id){
        let deleteOption = {
            method: 'DELETE',
            header: {
                'Content-Type' : 'application/json'
            }
        }
    await fetch(`${movieURL}/${id}`, deleteOption).then(result => result);
        getAllMovieInfo().then(data => {
            printMovieCards(data);
        });
    }
    //===================== DELETE MOVIES ================================================================
    $(document.body).on("click",".delete", function(e){
        e.preventDefault()
        deleteMovie($(this).attr("data-delete"))
    });
    // populating allmoviepromise so that when we get the result it will have a JSON file with all the movies
    allMoviesPromise = getAllMovieInfo()
    // calling the function to print all the movies on the screen
    printMovieCards(allMoviesPromise);
    // fetch(movieURL + "/6", deleteOptions);`
});




