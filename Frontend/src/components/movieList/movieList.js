import React, { useEffect, useState } from "react";
 import "./movieList.css";
 import { useParams } from "react-router-dom";
 import Cards from "../card/card";
 const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
 
 const MovieList = () => {
     const [movieList, setMovieList] = useState([]);
     const [loading, setLoading] = useState(true); // Add loading state
     const { type } = useParams();
 
     useEffect(() => {
         getData();
     }, [type]); //Fetch data when "type" changes
 
     const getData = async () => {
         setLoading(true);
         try {
             const response = await fetch(
                 `https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=${API_KEY}&language=en-US`
             );
             const data = await response.json();
     
             if (data.results) {
                 setMovieList(data.results);
             } else {
                 console.error("Invalid API response:", data);
                 setMovieList([]);
             }
         } catch (error) {
             console.error("Error fetching movie data:", error);
             setMovieList([]);
         } finally {
             setLoading(false);
         }
     };

     return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
                  
            {loading ? (
                 <p>Loading movies...</p> 
             ) : movieList.length > 0 ? (
                 <div className="list__cards">
                     {movieList.map(movie => (
                         <Cards key={movie.id} movie={movie} />
                     ))}
                 </div>
             ) : (
                 <p>No movies found.</p>
             )}
         </div>
     );
 };
 
 export default MovieList;