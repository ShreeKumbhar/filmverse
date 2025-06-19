import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./movie.css";
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;


const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [trailerKey, setTrailerKey] = useState("");
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Fetch Movie Details
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
            .then((res) => res.json())
            .then((data) => setMovie(data))
            .catch((error) => console.error("Error fetching movie details:", error));

        // Fetch Cast
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
            .then((res) => res.json())
            .then((data) => setCast(data.cast.slice(0, 10)))
            .catch((error) => console.error("Error fetching cast:", error));

        // Fetch Trailer
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
            .then((res) => res.json())
            .then((data) => {
                const trailer = data.results.find((video) => video.type === "Trailer" && video.site === "YouTube");
                if (trailer) {
                    setTrailerKey(trailer.key);
                }
            })
            .catch((error) => console.error("Error fetching trailer:", error));
    }, [id]);

    // Load favorites from localStorage
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    // Checking if movie is in favorites
    const isFavorite = favorites.includes(id);

    // Handle adding/removing from favorites
    const handleFavorite = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to add favorites.");
            return;
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/favorites`,
                { movieId: id },  // Send movie ID
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("Favorites updated:", response.data.favorites);

            // Toggle favorite locally
            const updatedFavorites = isFavorite
                ? favorites.filter((fav) => fav !== id) // Remove from favorites
                : [...favorites, id]; // Add to favorites

            setFavorites(updatedFavorites);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        } catch (error) {
            console.error("Error updating favorites:", error.response?.data || error.message);
        }
    };

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <img className="movie__poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

                    {/* Fixed Favorite Button */}
                    <button className="favoriteButton" onClick={handleFavorite}>
                        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </button>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <h2 className="movie__name">{movie.title}</h2>
                        <p>{movie.release_date} | {movie.vote_average}⭐</p>
                        <div className="movie__genres">
                            {movie.genres.map((genre) => (
                                <span key={genre.id} className="movie__genre">{genre.name}</span>
                            ))}
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <h3 className="synopsisText">Synopsis</h3>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            </div>

            {/* Cast Section */}
            <div className="movie__cast">
                <h3>Top Cast</h3>
                <div className="cast-list">
                    {cast.map((actor) => (
                        <div key={actor.id} className="cast-member">
                            <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
                            <p>{actor.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trailer Video Section */}
            {trailerKey && (
                <div className="trailer-container">
                    <iframe
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        title="Movie Trailer"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default MovieDetails;
