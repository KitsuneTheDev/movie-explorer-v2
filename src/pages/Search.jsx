import Movies from "../components/Movies.jsx";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

export default function Search() {

    const { searchResults } = useContext(AppContext);

    return(
        <div className="search-result-container">
            <Movies movies={searchResults} />
        </div>
    );
} 