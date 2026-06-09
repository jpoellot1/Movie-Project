async function getMovies(searchQuery) { 
    try{
        const response = await fetch (`https://www.omdbapi.com/?apikey=c3dc2346&s=${searchQuery}`)
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
    moviesWrapper.classList += ' loading__state'
    
    const movies = await getMovies(searchQuery)
    console.log("movies received in UI", movies) 
    
    if (!Array.isArray(movies) || movies.length === 0) {
        moviesWrapper.innerHTML = '<p>No Movies Found</p>'
        return;
    }
     moviesWrapper.classList.remove('loading__state')
     
    const originalSixMovies = movies.slice(0,6)

    const sortValue = document.getElementById('sort-select').value

    if (sortValue === 'A_to_Z') {
        originalSixMovies.sort((a,b) => a.Title.localeCompare(b.Title))
    }
    else if (sortValue === 'Z_to_A') {
        originalSixMovies.sort((a,b) => b.Title.localeCompare(a.Title))
    }

    document.getElementById('sort-select').value = "";

    const movieHtml = originalSixMovies
        .map((movie) => {
            return `<div class="movie">
            <img class="movie__poster" src="${movie.Poster}">
            <h3 class="movie__title">${movie.Title}</h3>
            <p class="movie__year">${movie.Year}</p>
        </div>`
    })
    .join("")
    moviesWrapper.innerHTML = movieHtml
}

function handleSort() {
    const currentSearch = document.getElementById('search-input').value
    if (currentSearch.trim()) {
        searchResults(currentSearch)
    }
}

document.getElementById('search-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        const searchQuery = document.getElementById('search-input').value

        if (searchQuery.trim()) {
            await searchResults(searchQuery)
        }
})