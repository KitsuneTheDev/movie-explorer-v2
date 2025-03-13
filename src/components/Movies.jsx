import { AppContext } from "../context/AppContext.jsx";
import { useContext, useRef } from "react";
import Movie from "./Movie.jsx";

export default function Movies() {

    const lastItemRef = useRef();
    const context = useContext(AppContext);

    return(
        <div className="movies-container grid grid-cols-5 gap-2">
            {context.movies.map((movie, index) => {
                if(index + 1 !== context.movies.length) {
                    return(
                        <Movie key={movie.id} title={movie.title} image={movie.poster_path} rating={movie.vote_average} description={movie.overview} original_title={movie.original_title}
                        original_language={movie.original_language} release_date={movie.release_date} genre_ids={movie.genre_ids}/>
                    );
                }
                return(
                    <Movie key={movie.id} title={movie.title} image={movie.poster_path} rating={movie.vote_average} description={movie.overview} original_title={movie.original_title}
                    original_language={movie.original_language} release_date={movie.release_date} genre_ids={movie.genre_ids} ref={lastItemRef}/>
                );
            })}
        </div>
    );
}