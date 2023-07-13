// Retrieve the movies list and update the table
function loadMovies() {
    fetch('http://localhost:3000/movies')
      .then(response => response.json())
      .then(movies => {
        const moviesList = document.getElementById('moviesList');
        moviesList.innerHTML = '';
        
        movies.forEach(movie => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${movie.id}</td>
            <td>${movie.title}</td>
            <td>${movie.genre}</td>
            <td>
              <button onclick="editMovie(${movie.id})">Edit</button>
              <button onclick="deleteMovie(${movie.id})">Delete</button>
            </td>
          `;
          moviesList.appendChild(row);
        });
      })
      .catch(error => console.error(error));
  }
  
  // Add a new movie
  function addMovie(event) {
    event.preventDefault();
    
    const form = document.getElementById('addMovieForm');
    const title = form.title.value;
    const genre = form.genre.value;
    
    fetch('http://localhost:3000/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, genre, description })
    })
      .then(() => {
        form.reset();
        loadMovies();
      })
      .catch(error => console.error(error));
  }
  
  // Edit a movie
  function editMovie(movieId) {
    const newTitle = prompt('Enter the new title:');
    const newGenre = prompt('Enter the new genre:');
    const newDescription = prompt("Enter the new Description");
    
    fetch(`http://localhost:3000/movies/${movieId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: newTitle, genre: newGenre })
    })
      .then(() => loadMovies())
      .catch(error => console.error(error));
  }
  
  // Delete a movie
  function deleteMovie(movieId) {
    if (confirm('Are you sure you want to delete this movie?')) {
      fetch(`http://localhost:3000/movies/${movieId}`, {
        method: 'DELETE'
      })
        .then(() => loadMovies())
        .catch(error => console.error(error));
    }
  }
  
  // Load movies on page load
  document.addEventListener('DOMContentLoaded', () => {
    loadMovies();
    const addMovieForm = document.getElementById('addMovieForm');
    addMovieForm.addEventListener('submit', addMovie);
  });
  