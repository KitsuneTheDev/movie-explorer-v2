import { useState } from "react";
import { ACCESS_TOKEN } from "../constants/ApiVariables.jsx";

export default function useFetch(baseUrl) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [movies, setMovies] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [controller, setcontroller] = useState(null);

    function get(pageNumber) {
        console.log(pageNumber);
        if(controller) {
            controller.abort();
        }

        const newController = new AbortController();
        setcontroller(newController);
        const signal = newController.signal;

        setError(false);
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl + `discover/movie?page=${pageNumber}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${ACCESS_TOKEN}`,
                },
                signal: signal,
            })
            .then(response => {
                if(!response.ok) {
                    console.log("HTTP Status Error. Status: ", response.status);
                    setError(true);
                    setLoading(false);
                    return reject(response.status);
                } return response.json();
            })
            .then(data => {
                if(!data) {
                    console.log("No Data Fetched. Data:", data);
                    setLoading(false);
                    setError(true);
                    if(data.total_pages === pageNumber) return reject(data);
                    return reject(data);
                }
                console.log("success");
                setError(false);
                setLoading(false);
                setMovies(prevMovies => {
                    console.log("newMovies -->", data.results);
                    console.log("prevMovies -->", prevMovies);
                    return [...new Set([...prevMovies, ...data.results])];
                });
                return resolve();
            })
            .catch(error => {
                setError(true);
                setLoading(false);
                if(error.name !== "AbortError") {
                    console.log("An Error Occured. Error: ", error);
                    return reject(error.name);
                }
            })
        })
    }

    function search(query, pageNumber) {

        setLoading(true);
        setError(false);

        setSearchResults([]);

        if(controller) {
            controller.abort();
        }

        const newController = new AbortController();
        setcontroller(newController);
        const signal = newController.signal;

        return new Promise((resolve, reject) => {
            fetch(baseUrl + `search/movie?query=${query}&page=${pageNumber}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${ACCESS_TOKEN}`,
                },
                signal: signal,
            })
            .then(response => {
                if(!response.ok) {
                    setError(true);
                    setLoading(false);
                    console.log(`HTTP Status Error. Status: `, response.status);
                    return reject(response.status);
                } return response.json();
            })
            .then(data => {
                if(!data) {
                    setLoading(false);
                    setError(true);
                    console.log("No Data Fetched. Data: ", data);
                    return reject(data);
                }
                setLoading(false);
                setError(false);
                if(searchResults.total_pages === pageNumber) return reject(data);
                setSearchResults(prevMovies => {
                    return [...new Set([...prevMovies, ...data.results])];
                });
                console.log("success");
                resolve();
            })
            .catch(error => {
                setLoading(false);
                setError(true);
                if(error.name !== "AbortError") {
                    console.log("An Error Occured. Error: ", error);
                    return reject(error);
                }
            })
        })
    }

    return { get, loading, error, movies, hasMore, search, searchResults }
}