const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1";
const IMG_PATH = "https://image.tmdb.org/t/p/w500/";

const moviesBox = document.querySelector(".movies-box"); 

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

getMovies(API_URL); 
