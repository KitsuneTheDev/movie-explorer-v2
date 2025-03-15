import { useState, useEffect, useCallback, createContext, useRef } from "react";
import useFetch from "../hooks/useFecth";

const AppContext = createContext();

function AppProvider(props) {

    const [pageNumber, setPageNumber] = useState(1);
    const observer = useRef(null);

    const { get, loading, error, movies, hasMore, search, searchResults } = useFetch(`https://api.themoviedb.org/3/`);

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
    };

    return (
        <AppContext.Provider value={value} >{props.children}</AppContext.Provider>
    );
}

export { AppContext, AppProvider }
