import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";



const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [removingMovieId, setRemovingMovieId] = useState(null);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleMovieOpen = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    const fetchFavoriteMovies = useCallback(async () => {
        if (!token) {
            setError("Please log in to view your profile.");
            setLoading(false);
            return;
        }

        try {
            setError("");
            const response = await axios.get(`${API_URL}/api/profile/user`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const userData = response.data;

            if (!userData.favorites || userData.favorites.length === 0) {
                setUser({ ...userData, favoriteMovies: [] });
                return;
            }

            const movieDetailsPromises = userData.favorites.map((movieId) =>
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
            );

            const moviesData = await Promise.all(movieDetailsPromises);
            const favoriteMovies = moviesData.map((res) => res.data);

            setUser({ ...userData, favoriteMovies });
        } catch (fetchError) {
            console.error("Error fetching profile data:", fetchError.response?.data || fetchError.message);
            setError(fetchError.response?.data?.message || "Unable to load profile right now.");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchFavoriteMovies();
    }, [fetchFavoriteMovies]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const handleRemoveFavorite = async (event, movieId) => {
        event.stopPropagation();

        if (!token) {
            setError("Please log in again.");
            return;
        }

        try {
            setRemovingMovieId(movieId);
            await axios.post(
                `${API_URL}/api/auth/favorites`,
                { movieId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setUser((prevUser) => {
                if (!prevUser) return prevUser;

                const nextFavorites = (prevUser.favorites || []).filter(
                    (id) => String(id) !== String(movieId)
                );
                const nextFavoriteMovies = (prevUser.favoriteMovies || []).filter(
                    (movie) => String(movie.id) !== String(movieId)
                );

                return {
                    ...prevUser,
                    favorites: nextFavorites,
                    favoriteMovies: nextFavoriteMovies,
                };
            });
        } catch (removeError) {
            console.error("Error removing favorite:", removeError.response?.data || removeError.message);
            setError(removeError.response?.data?.message || "Could not remove favorite movie.");
        } finally {
            setRemovingMovieId(null);
        }
    };

    if (loading) return <h2>Loading Profile...</h2>;
    if (!user) return <h2>{error || "Please log in to view your profile."}</h2>;

    return (
        <div className="profile-container">
            <div className="profile-topbar">
                <div>
                    <p className="profile-kicker">Your account</p>
                    <h1>Welcome, {user.name}!</h1>
                    <p className="profile-email">{user.email}</p>
                </div>
                <div className="profile-actions">
                    <button className="refresh-button" onClick={fetchFavoriteMovies}>Refresh</button>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>

            <h2 className="favorites-heading">Your Favorite Movies</h2>
            <ul className="favorites-list">
                {user.favoriteMovies && user.favoriteMovies.length > 0 ? (
                    user.favoriteMovies.map((movie) => (
                        <li
                            key={movie.id}
                            className="favorite-movie"
                            onClick={() => handleMovieOpen(movie.id)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    handleMovieOpen(movie.id);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label={`Open ${movie.title}`}
                        >
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            <h3>{movie.title}</h3>
                            <p>{movie.release_date?.slice(0, 4) || "N/A"}</p>
                            <button
                                type="button"
                                className="remove-favorite-button"
                                onClick={(event) => handleRemoveFavorite(event, movie.id)}
                                disabled={removingMovieId === movie.id}
                            >
                                {removingMovieId === movie.id ? "Removing..." : "Remove"}
                            </button>
                        </li>
                    ))
                ) : (
                    <p className="empty-state">No favorite movies added yet.</p>
                )}
            </ul>
        </div>
    );
};

export default Profile;
