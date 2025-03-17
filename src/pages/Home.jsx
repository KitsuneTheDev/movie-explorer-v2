import { useEffect, useContext } from "react";
import Movies from "../components/Movies";
import { AppContext } from "../context/AppContext";

export default function Home() {

    const { movies } = useContext(AppContext);

    return(
        <div className="home-page-container">
            <Movies movies={movies} />
        </div>
    );
}