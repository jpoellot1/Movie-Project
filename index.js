// http://www.omdbapi.com/?apikey=c3dc2346&
// http://img.omdbapi.com/?apikey=c3dc2346&

// let currentMovies = []

    async function getMovies(searchQuery) {
            try{
                const response = await fetch (`http://www.omdbapi.com/?apikey=c3dc2346&s=${searchQuery}`)
                const result = await response.json()
                console.log(result)
                return result.Search || []
            } catch (error) {
                console.error('Error fetching data:', error)
                return []
            }
    }

    async function searchResults(searchQuery) {
        const moviesWrapper = document.querySelector('.movies')
        moviesWrapper.classList += ' .loading__state--visible'
        
        const movies = await getMovies(searchQuery)
        console.log("movies received in UI", movies)    
        
        if (!Array.isArray(movies) || movies.length === 0) {
            moviesWrapper.innerHTML = '<p>No Movies Found</p>'
            moviesWrapper.classList.remove('loading__state--visible');
            return;
        }

        const movieHtml = movies
            .slice(0,6)
            .map((movie) => {
                return `<div class="movie">
                <img class="movie__poster" src="${movie.Poster}">
                <h3 class="movie__title">${movie.Title}</h3>
                <p class="movie__year">${movie.Year}</p>
            </div>`
        })
        .join("")
        moviesWrapper.innerHTML = movieHtml

        moviesWrapper.classList.remove('loading__state--visible')
    }

    // async function renderMovies(moviesList) {
    //     const moviesWrapper = document.querySelector('.movies')    

    //     if (!Array.isArray(moviesList) || moviesList.length === 0) {
    //         moviesWrapper.innerHTML = '<p>No Movies Found</p>'
    //         return;
    //     }

    //     const movieHtml = moviesList
    //         .slice(0,6)
    //         .map((movie) => {
    //             return `<div class="movie">
    //             <img class="movie__poster" src="${movie.Poster}">
    //             <h3 class="movie__title">${movie.Title}</h3>
    //             <p class="movie__year">${movie.Year}</p>
    //         </div>`
    //     })
    //     .join("")
    //     moviesWrapper.innerHTML = movieHtml
    // }

    // function handleSort() {
    //     const sortValue = document.getElementById('filter')

    //     let sortedMovies = [...currentMovies]

    //     if (sortValue === 'A_to_Z') {
    //         sortedMovies.sort((a, b) =>
    //         a.Title.localCompare(b.title))
    //     }
    //     else if (sortValue === 'Z_to_A') {
    //         sortedMovies.sort((a, b) =>
    //         b.Title.localCompare(a.title))
    //     }
    //     renderMovies(sortedMovies)
    // }

    function filterMovies(event) {
        searchResults(event.target.value)
    }


    document.getElementById('search-form').addEventListener('submit', async function(event) {
            event.preventDefault();
            const searchQuery = document.getElementById('search-input').value

            if (searchQuery.trim()) {
                await searchResults(searchQuery)
            }
    })