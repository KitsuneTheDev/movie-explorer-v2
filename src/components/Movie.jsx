import { useRef, useContext, useCallback, forwardRef, useEffect } from "react";
import { genreNames } from "../constants/ApiVariables.jsx";
import { AppContext } from "../context/AppContext.jsx";

const Movie = forwardRef((props, ref) => {

    const hoverRef = useRef();
    const contentRef = useRef();
    const lastItemRef = useRef();
    const context = useContext(AppContext);

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

    return(
        <div className="movie-container group flex flex-col items-center gap-2 font-bold border-2 border-gray-500 rounded-sm overflow-hidden hover:cursor-default mt-2" ref={(element) => {
            if(props.lastItemRef !== undefined) props.lastItemRef.current = element;
            hoverRef.current = element;
            if(ref) lastItemRef.current = element;
        }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="image-container">
                <div className="relative">
                    <img src={`https://image.tmdb.org/t/p/original/${props.image}`} className="static group-hover:opacity-25" alt={props.title} />
                    <div ref={contentRef} className="additional-info-container hidden top-0 left-0 z-10 ml-1 mt-2 text-sm font-medium">
                        <p className="mb-2 font-bold">Original title: <span className="font-medium">{props.original_title}</span></p>
                        <p className="mb-2 font-bold">Original language: <span className="font-medium">{props.original_language.toUpperCase()}</span></p>
                        <p className="mb-2 font-bold">Description: <span className="font-medium">{`${props.description.slice(0, 100)}...`}</span></p>
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