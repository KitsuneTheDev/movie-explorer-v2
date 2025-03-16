import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import useFetch from "../hooks/useFecth";
import { AppContext } from "../context/AppContext.jsx";

export default function Navbar() {

    const context = useContext(AppContext);

    return(
        <div className="sticky top-0 z-1">
            <div className="navbar-container flex items-center w-full bg-gray-500 text-2xl h-[4em] text-amber-50 font-bold">
                <div className="logo-container h-full w-[30%] flex items-center overflow-hidden">
                    <img alt="site-logo" src="../../images/logo.png" className="logo-image w-[80%]" />
                </div>
                <div className="navbar-elements-container flex items-center h-full w-[70%]">
                    <ul className="navbar-elements flex items-center justify-around gap-100">
                        <Link to="/"><li className="navbar-element hover:cursor-pointer">Home</li></Link>
                        <Link to="/favorites"><li className="navbar-element hover:cursor-pointer">Favorites</li></Link>
                        <Link to="/search"><li className="navbar-element search-input hover:cursor-pointer"><input className="bg-amber-50 rounded-2xl text-gray-500 text-center" placeholder="Search..." onChange={(event) => {context.changeQuery(event.target.value)}} /></li></Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}