// THIS IS JQUERY
$(function () {
    // MOVIE URL
    const movieURL = "https://amused-typical-skunk.glitch.me/movies";
    let allMoviesPromise;
    // let movieData = [];

    // this console.log our movie data
    function getAllMovieInfo(){
    // fetch both a function and a promise
      return fetch(movieURL).then(resp=>resp.json()).then(data => {
            console.log(data)
            // movieData = data;
            return data;
        });
    }
    //               .then is waiting for a promise
    getAllMovieInfo().then(data=>console.log(data));

//==================== ADD NEW MOVIE ===================================================================================
        //============ API FUNCTION ===========
    let poster;
    function apiMoviesDataBase(userInput)  {
       return fetch(`https://api.themoviedb.org/3/search/movie${TMBD_TOKEN}&language=en-US&query=${userInput}&include_adult=false`)
            .then(resp=>resp.json())
            .then(data => {
                // this has the first part of the image that you search
                poster = 'https://image.tmdb.org/t/p/original/'

                console.log(data)
                return data.results[0].poster_path;
            });
    }
    // This function adds new movie when you click the button
    addNewMovie()
    function addNewMovie() {
        $("#movieAndRating").on('click', function (e) {
            e.preventDefault();
            let idMovie = $("#addMovie").val();        //search bar in HTML
            let ratingMovie = $("#movieRating").val();
            let posterPath = apiMoviesDataBase(idMovie);
            // console.log("console log detective work:")
            // console.log(posterPath);
            posterPath.then(moviePosterPath=>{
                // console.log("more detective work")
                // console.log(moviePosterPath);
                // console.log(`${poster}${moviePosterPath}`);
                let movieToPost = {
                    title: `${idMovie}`,
                    rating: `${ratingMovie}`,
                    poster: `${poster}${moviePosterPath}`
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
            });
        }); // The of the end of on click function
    }
//=====================OUTPUT MOVIES ===================================================================================
    // getting data
    getAllMovieInfo().then(data => {
        printMovieCards(data);
    });
    // This is where it prints the movie card
    async function printMovieCards(movieList) {
        $("#movieContainer").empty();
        movieList.forEach(movieData=> {
            $("#movieContainer").append(`
            <div class="card mt-3 mb-3" data-movie-id="${movieData.id}">
                <p class="movieHidden hiddenInfo">${movieData.title}</p>
                <p class="movieHidden hiddenInfo">Rating: ${movieData.rating}</p>
                <div class="poster-wrapper">
                    <img width="100%" height="100%" src="${movieData.poster}">
                </div>   
                <input class="editTitle" type="text"placeholder="Edit Movie Title">
                <button class="movieHidden hiddenInfo edit btn btn-outline-success" type="submit">Edit</button>
                <button class="movieHidden hiddenInfo delete btn btn-outline-success" type="submit">Delete</button>             
            </div>
            `)
            console.log(movieData);
            // <p className="movieHidden hiddenInfo">Year: ${movieData.year}</p>
        });
    }
//======================= EDIT =========================================================================================
    async function editMovie(id, title){
        console.log(id);
        let modification = {
            title: title
        };
        // Created a variable to PATCH userInput
        let editOptions = {
            method: 'PATCH', // It adds to the existing array base on 'id' partial
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(modification)
        }
        // console.log(editOptions);
        await fetch(`${movieURL}/${id}`, editOptions).then(result => result).then(getAllMovieInfo).then(data=>printMovieCards(data));
    }
    // Hidden Edit and delete button
    $(document.body).on("click",".card", function(e){
        e.preventDefault()
        console.log("inside .card")
        $(this).children(".hiddenInfo").toggleClass("movieHidden");
    });
    // Function that shows the hidden "editTitle"
    $(document.body).on("click",".edit", function(e){
        e.preventDefault()
        let $editButton = $(this).parents(".card").children(".editTitle");
        //console.log($editButton);
        $editButton.fadeIn();
        $editButton.focus();
    });
    // Function on keyup userInput to add new movie title
    $(document.body).on('keyup','.editTitle', function(e){
        e.preventDefault()
        let parentMovie = $(this).parent()
            if(e.key === "Enter") {
                let title = $(this).val();
                console.log("You press enter on the form")
            editMovie(parentMovie.attr("data-movie-id"),title)
                console.log(parentMovie.attr("data-movie-id"))
            }
    });
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
//===================== DELETE MOVIES ==================================================================================
    $(document.body).on("click",".delete", function(e){
        e.preventDefault()
        deleteMovie($(this).parent().attr("data-movie-id"))
    });
    // populating allmoviepromise so that when we get the result it will have a JSON file with all the movies
    allMoviesPromise = getAllMovieInfo()
    // calling the function to print all the movies on the screen
    printMovieCards(allMoviesPromise);
    // fetch(movieURL + "/6", deleteOptions);`
});




