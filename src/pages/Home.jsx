import { useEffect, useContext } from "react";
import Movies from "../components/Movies";
import { AppContext } from "../context/AppContext";

export default function Home() {

    const context = useContext(AppContext);

    return(
        <div className="home-page-container">
            <Movies />
        </div>
    );
}