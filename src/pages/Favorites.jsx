import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import Movies from "../components/Movies";

export default function Favorites() {

    const context = useContext(AppContext);

    if(context.favoriteMovies.length !== 0) return(
        <div className="fav-page-container flex items-center justify-center text-2xl font-bold text-gray-500">
            <Movies movies={context.favoriteMovies} />
        </div>
    );

    return(
        <div className="fav-page-container flex items-center justify-center text-2xl font-bold text-gray-500 mt-5">
            <h2>There is no movies here.</h2>
        </div>
    );
}