const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1";
const IMG_PATH = "https://image.tmdb.org/t/p/w500/";

const moviesBox = document.querySelector(".movies-box");
const searchInput = document.querySelector("input[type='text']"); 

// Fetch movies from the API
async function getMovies(url) {
  const response = await fetch(url);
  const data = await response.json();
  displayMovies(data.results); // Calling function to render movies
}

// Render movies dynamically
function displayMovies(movies) {
  moviesBox.innerHTML = ""; // Clearing previous movies before adding new ones

  // Adding responsive grid layout classes
  moviesBox.classList.add("grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-3", "lg:grid-cols-4", "gap-6");

  movies.forEach((movie) => {
    const { title, poster_path, overview, vote_average } = movie;

    const movieElement = document.createElement("div");
    movieElement.classList.add("bg-gray-800", "rounded-lg", "shadow-md", "overflow-hidden");

    // Creating movie card structure
    movieElement.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}" class="rounded-t-lg w-full h-60 object-cover" />
      <div class="p-4">
        <h2 class="text-lg font-bold">${title}</h2>
        <p class="text-gray-400 text-sm mt-3 mb-3">${overview.substring(0, 100)}...</p>
        <span class="bg-green-500 text-white px-2 py-1 rounded text-xs cursor-pointer">
          Rating: ${vote_average}
        </span>
      </div>
    `;

    moviesBox.appendChild(movieElement);
  });
}

// Searching movies based on the input text
async function searchMovies(query) {
  if (query.trim() === "") {
    getMovies(API_URL); 
  } else {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=${query}`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    displayMovies(data.results);
  }
}

// Event listener for the search input
searchInput.addEventListener("input", (e) => {
  searchMovies(e.target.value); 
});

getMovies(API_URL);



const categoryItems = document.querySelectorAll(".category-item");

// Adding event listener to each category item
categoryItems.forEach((item) => {
  item.addEventListener("click", async () => {
    const genre = item.dataset.genre;
    await fetchMoviesByCategory(genre);
  });
});

// Fetching movies by category from the API
async function fetchMoviesByCategory(genre) {
  try {
    const categoryUrl = `https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&with_genres=${genre}`;
    const response = await fetch(categoryUrl);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}
