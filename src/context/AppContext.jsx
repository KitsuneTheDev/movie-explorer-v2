import { useState, useEffect, createContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFecth";

const AppContext = createContext();

function AppProvider(props) {

    const [pageNumber, setPageNumber] = useState(1);
    const [resultsPageNumber, setResultsPageNumber] = useState(1);
    const [favoriteMovies, setFavoriteMovies] = useState(() => {
        return JSON.parse(localStorage.getItem('movies')) || [];
    });
    const [storedFavorites, setStoredFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem('movies')) || [];
    })
    const [query, setQuery] = useState('');
    const observer = useRef(null);

    const location = useLocation();

    const { get, loading, error, movies, hasMore, search, searchResults, setSearchResults } = useFetch(`https://api.themoviedb.org/3/`);

    const loadMore = (node) => {
        if(!node) return;
        if(observer.current) observer.current.disconnect();
        console.log("here");

        observer.current = new IntersectionObserver(([entries]) => {
            console.log(entries);
            if(entries.isIntersecting && hasMore) {
                console.log("visible");
                if(location.pathname === "/") setPageNumber(prevPageNumber => prevPageNumber + 1);
                else if(location.pathname === "/search") setResultsPageNumber(prevPageNumber => prevPageNumber + 1);
                else return;
            }
        });
        observer.current.observe(node);
    }

    function changeQuery(query) {
        setResultsPageNumber(1);
        setQuery(query);
        setSearchResults([]);
    }

    useEffect(() => {
        console.log("Saving favorites");
        localStorage.setItem('movies', JSON.stringify(favoriteMovies));
        console.log("Favorites saved. Favorite Movies: ", favoriteMovies);
        setStoredFavorites(JSON.parse(localStorage.getItem('movies')));
        console.log("stored", storedFavorites);
    }, [favoriteMovies])

    useEffect(() => {
        console.log(location.pathname)
        if(location.pathname !== "/search") setQuery("");
    }, [location])

    useEffect(() => {
        search(query, resultsPageNumber);
    }, [query, location, resultsPageNumber])

    useEffect(() => {
            setQuery("");
            get(pageNumber);
        }, [pageNumber]);


    const value = {
        loading: loading,
        error: error,
        hasMore: hasMore,
        movies: movies,
        changeQuery: changeQuery,
        loadMore: loadMore,
        searchResults: searchResults,
        favoriteMovies: favoriteMovies,
        setFavoriteMovies: setFavoriteMovies,
        storedFavorites: storedFavorites,
        setStoredFavorites: setStoredFavorites,
    };

    return (
        <AppContext.Provider value={value} >{props.children}</AppContext.Provider>
    );
}

export { AppContext, AppProvider }
