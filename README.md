# Movie Explorer

Movie Explorer is a React-based web application that allows users to browse, search, and favorite movies using data from The Movie Database (TMDB). It features infinite scrolling, a dynamic search function, and local storage support for saving favorites.

## Features

* Infinite Scrolling: As you scroll, more movies are loaded dynamically.

* Search Functionality: Type in the search bar to fetch and display movies dynamically.

* Request Cancellation: If you type quickly, previous fetch requests are canceled to optimize performance.

* Movie Details on Hover: Hover over a movie to view additional information.

* Favorite System: Click the heart icon to add a movie to your favorites (stored in local storage).

* Favorites Management: View and remove favorite movies in the favorites section.

* Persistent Favorites: Favorited movies remain saved even after refreshing the page.

* React Context for State Management.

## Technologies Used

* React

* Tailwind CSS

* Vite

* React Router

* Context API

* Fetch API

* Local Storage

* TMDB API

## Demo

Infinite Scrolling

![Infinite Scroll](./src/assets/demo/InfiniteScroll.gif)

Dynamic Search

![Search](./src/assets/demo/search.gif)

Add to Favorites

![Add to Favorites](./src/assets/demo/AddFav.gif)

## Usage

1. Browse Movies: Movies load dynamically as you scroll down.

2. Search Movies: Click the search bar in the navbar and type to find movies.

3. Add to Favorites: Click the heart icon on any movie to add it to your favorites.

4. View Favorites: Go to the Favorites page to see your saved movies.

5. Remove from Favorites: Click the filled heart icon in the Favorites section to remove a movie.

## License

This project is licensed under the MIT License.

## Author

Ozan Çelikkol
