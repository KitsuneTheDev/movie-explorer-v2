import { useRef, useContext, useCallback, forwardRef, useEffect, useState } from "react";
import { genreNames } from "../constants/ApiVariables.jsx";
import { AppContext } from "../context/AppContext.jsx";
import FavButton from "./FavButton.jsx";

const Movie = forwardRef((props, ref) => {

    const context = useContext(AppContext);

    const hoverRef = useRef();
    const contentRef = useRef();
    const lastItemRef = useRef();
    const [isFaved, setIsFaved] = useState(() => {
        return context.favoriteMovies.some(movie => {
            return movie.title === props.title;
        })
    });

    useEffect(() => {
        if(!lastItemRef.current) return;
        context.loadMore(lastItemRef.current);
        console.log(lastItemRef);
    }, []);

    const handleMouseEnter = useCallback(() => {
        if(contentRef.current) {
            contentRef.current.classList.toggle('absolute');
            contentRef.current.classList.toggle('hidden');
        } 
    }, []);

    const handleMouseLeave = useCallback(() => {
        if(contentRef.current) {
            contentRef.current.classList.toggle('hidden');
            contentRef.current.classList.toggle('absolute');
        } 
    }, []);

    const handleFavClick = () => {

        if(!isFaved) {
            const newFavorite = {
            id: props.id,
            poster_path: props.image,
            title: props.title,
            original_title: props.original_title,
            original_language: props.original_language,
            description: props.description,
            release_date: props.release_date,
            genre_ids: props.genre_ids,
            vote_average: props.rating,
        };
        context.setFavoriteMovies(prevMovies => {
            const updatedMovies = [...new Set([...prevMovies, newFavorite])];
            console.log("setting favoriteMovies: ", updatedMovies);
            setIsFaved(true);
            return updatedMovies;
        });
        } else if(isFaved){
            context.setFavoriteMovies(context.favoriteMovies.filter(movie => {
                console.log("Deleting favorites", "movie id: ", movie.id, "props.id", props.id);
                return movie.title !== props.title;
            }));
        }
    }

    return(
        <div className="movie-container group flex flex-col items-center gap-2 font-bold border-2 border-gray-500 rounded-sm overflow-hidden hover:cursor-default mt-2" ref={(element) => {
            if(props.lastItemRef !== undefined) props.lastItemRef.current = element;
            hoverRef.current = element;
            if(ref) lastItemRef.current = element;
        }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="image-container h-full w-full">
                <div className="relative">
                    {props.image ? <img src={`https://image.tmdb.org/t/p/original/${props.image}`} className="group-hover:opacity-25" alt={props.title} /> : <h2 className="text-2xl text-center text-gray-500 group-hover:opacity-25">No Image</h2>}
                    <div ref={contentRef} className="additional-info-container hidden top-0 left-0 z-1 ml-1 mt-2 text-sm h-full w-full font-medium">
                        <div onClick={handleFavClick} className="heart-container h-fit w-fit hover:cursor-pointer" isFaved = {isFaved}>
                            <FavButton isFaved={isFaved} />
                        </div>
                        <p className="mb-2 font-bold">Original title: <span className="font-medium">{props.original_title}</span></p>
                        <p className="mb-2 font-bold">Original language: <span className="font-medium">{props.original_language.toUpperCase()}</span></p>
                        <p className="mb-2 font-bold">Description: <span className="font-medium">{props.description && `${props.description.slice(0, 100)}...`}</span></p>
                        <p className="mb-2 font-bold">Release data: <span className="font-medium">{props.release_date}</span></p>
                        <p className="mb-2 font-bold">Genre: 
                            <span className="font-medium">
                                {props.genre_ids.map((id, index) => {
                                    return index + 1 !== props.genre_ids.length ? `${genreNames[id]} - ` : `${genreNames[id]}` 
                                })}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="info-container flex items-center gap-5">
                <h3 className="movie-name">{props.title}</h3>
                <p className="info">&#11088; - {(Math.round(100 * props.rating) / 100).toFixed(2)}</p>
            </div>
        </div>
    );
});

export default Movie;