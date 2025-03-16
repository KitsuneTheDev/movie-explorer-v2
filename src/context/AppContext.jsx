import { useState, useEffect, createContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFecth";

const AppContext = createContext();

function AppProvider(props) {

    const [pageNumber, setPageNumber] = useState(1);
    const [favoriteMovies, setFavoriteMovies] = useState(() => {
        return JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    });
    const observer = useRef(null);
    const { get, loading, error, movies, hasMore, search, searchResults } = useFetch(`https://api.themoviedb.org/3/`);
    const location = useLocation();
    
    const loadMore = (node) => {
        if(!node) return;
        if(observer.current) observer.current.disconnect();
        console.log("here");

        observer.current = new IntersectionObserver(([entries]) => {
            console.log(entries);
            if(entries.isIntersecting && hasMore) {
                console.log("visible");
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        });
        observer.current.observe(node);
    }

    function changeQuery(query) {
        if(!query) setPageNumber(1);
        search(query, pageNumber);
    }

    function addFavedMovie(movie) {
            console.log("IN ADDFAVEDMOVIE", movie)
            setFavoriteMovies(prevFavoriteMovies => {
                if(!movie) {
                    console.warn("Attempted to add an undefined/null movie");
                    return prevFavoriteMovies;
                }
                const updatedFavorites = [...new Set([...prevFavoriteMovies, movie])];
                console.log("Updated favorites: ", updatedFavorites);
                return updatedFavorites;
            });
        }
    

    function removeUnfavedMovie(id) {
        console.log("Removing item from favorites.")
        setFavoriteMovies(prevFavoriteMovies => {
            return [...prevFavoriteMovies.filter(movie => {
                return movie.id !== id;
            })];
        });
    }

    useEffect(() => {
        console.log("Saving to localStorage", favoriteMovies);
        localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
    }, [favoriteMovies])

    useEffect(() => {
        if(location.pathname === "/favorites") {
            const storedFavorites = JSON.parse(
                localStorage.getItem("favoriteMovies")
            ) || [];
            console.log("Loading favorite movies from localStorage: ", storedFavorites);
            setFavoriteMovies(storedFavorites);
        }
    }, [location])

    useEffect(() => {
        get(pageNumber);
    }, [pageNumber])

    const value = {
        loading: loading,
        error: error,
        hasMore: hasMore,
        movies: movies,
        changeQuery: changeQuery,
        // loadMovies: loadMovies,
        loadMore: loadMore,
        searchResults: searchResults,
        addFavedMovie: addFavedMovie,
        favoriteMovies: favoriteMovies,
        removeUnfavedMovie: removeUnfavedMovie,
    };

    return (
        <AppContext.Provider value={value} >{props.children}</AppContext.Provider>
    );
}

export { AppContext, AppProvider }
