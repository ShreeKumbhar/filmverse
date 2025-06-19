import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/auth/`;


const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            if (!token) {
                console.warn("No token found. Redirecting to login.");
                setLoading(false);
                return;
            }

            try {
                console.log("Fetching user profile...");
                const response = await axios.get("http://localhost:5000/api/profile/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("User profile received:", response.data);
                const userData = response.data;

                if (!userData.favorites || userData.favorites.length === 0) {
                    console.log("⚠️ No favorite movies found.");
                    setUser(userData);
                    setLoading(false);
                    return;
                }

                // Fetch full movie details from TMDB
                console.log("🔹 Fetching movie details...");
                const movieDetailsPromises = userData.favorites.map((movieId) =>
                    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
                );

                const moviesData = await Promise.all(movieDetailsPromises);
                const favoriteMovies = moviesData.map((res) => res.data);

                console.log("Fetched movie details:", favoriteMovies);
                setUser({ ...userData, favoriteMovies });
            } catch (error) {
                console.error("Error fetching profile data:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteMovies();
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    if (loading) return <h2>Loading Profile...</h2>;
    if (!user) return <h2>Please log in to view your profile.</h2>;

    return (
        <div className="profile-container">
            {/* Logout Button */}
            <button className="logout-button" onClick={handleLogout}>Logout</button>

            <h1>Welcome, {user.name}!</h1>
            <h2>Your Favorite Movies:</h2>
            <ul className="favorites-list">
                {user.favoriteMovies && user.favoriteMovies.length > 0 ? (
                    user.favoriteMovies.map((movie) => (
                        <li key={movie.id} className="favorite-movie">
                            <h3>{movie.title}</h3>
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                        </li>
                    ))
                ) : (
                    <p>No favorite movies added yet.</p>
                )}
            </ul>
        </div>
    );
};

export default Profile;
