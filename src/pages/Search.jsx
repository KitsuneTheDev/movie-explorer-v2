import Movies from "../components/Movies.jsx";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";

export default function Search() {

    const context = useContext(AppContext);
    console.log("results", context.searchResults.length);

    return(
        <div className="search-result-container">
            <Movies movies={context.searchResults} />
        </div>
    );
} 