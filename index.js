// http://www.omdbapi.com/?apikey=c3dc2346&
// http://img.omdbapi.com/?apikey=c3dc2346&

// const searchBar = document.getElementById('search-bar')
// const movies = document.getElementsByClassName('movie')

// async function fetchSearchResults(query) {
//     if (!query) {
//         movies.innerHTML = ''
//         return
//     }
    
//     try{
//         const promise = await fetch(`http://www.omdbapi.com/?apikey=c3dc2346&s={endcodeURIComponent(query)}`)

//         const result = await fetch(promise)

//         if (!result.ok) {
//             throw new Error('Network response was not OK')
//         }

//         const data = await result.json()

//         displayResults(data.results)
//     }
//     catch (error) {
//         console.error('Error fetching data:', error)
//         movies.innerHTML = '<p>Error loading results</p>'
//     }
// }

async function getMovies() {
    const moviesResult= await fetch ("http://www.omdbapi.com/?apikey=c3dc2346&s=Fast")
    const result = await moviesResult.json()
    console.log(result)
    return result.Search
}

async function searchResults(search) {
    const moviesWrapper = document.querySelector('.movies')
    
    const movies = await getMovies()

    const movieHtml = movies
            .map((movie) => {
        return `<div class="movie">
        <img class="movie__poster" src="${movie.Poster}"    
            alt="">
        <h3 class="movie__title">
            ${movie.Title}
        </h3>
        <p class="movie__year">
            ${movie.Year}
        </p>
    </div>`
    }).slice(0,6)
    .join("")
    moviesWrapper.innerHTML = movieHtml
}

setTimeout(() => {
    searchResults()
})



// const search = document.getElementById('search-input')
// search.addEventListener('click', startSearch(event))

// async function startSearch(event) {
//     const userInputValue = document.getElementById('search-bar').value
//     const urlBase = 'http://www.omdbapi.com/?apikey=c3dc2346&s='
//     if (userInputValue === null || userInputValue === ''){
//         return}
//     const searchUrl = urlBase + userInputValue
// }
