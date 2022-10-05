function getMovies() {
    fetch(movieURL).then(resp => resp.json()).then(data=>console.log(data));
}

getMovies();
