import Movies from "../components/Movies.jsx";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

export default function Favorites() {

    const context = useContext(AppContext);

    if(context.favoriteMovies.length !== 0) {
        return (
            <div className="favorites-container">
                <Movies movies={context.favoriteMovies} />
            </div>
        );
    }
    return(
        <div className="favorites-container flex items-center justify-center mt-5 text-3xl text-gray-500 font-bold">
            <h2>You have not added any movie to favorites yet</h2>
        </div>
    );
} 