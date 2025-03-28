import { AppContext } from "../context/AppContext";
import { useContext, useEffect } from "react";
import Movies from "../components/Movies";

export default function Favorites() {

    const { storedFavorites } = useContext(AppContext);

    if(storedFavorites.length !== 0) return(
        <div className="fav-page-container flex items-center justify-center text-2xl font-bold text-gray-500">
            <Movies movies={storedFavorites} />
        </div>
    );

    return(
        <div className="fav-page-container flex items-center justify-center text-2xl font-bold text-gray-500 mt-5">
            <h2>There is no movies here.</h2>
        </div>
    );
}