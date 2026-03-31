const express = require("express");
const axios = require("axios");
const { authenticateUser } = require("../middleware/authMiddleware"); 
const User = require("../models/User");

const router = express.Router();
const API_KEY = process.env.TMDB_API_KEY;

//Route to fetch user profile
router.get("/user", authenticateUser, async (req, res) => {
    try {
        console.log("API Request Received for Profile");
        console.log("Headers:", req.headers);

        const userId = req.user?.id; 
        console.log("Extracted User ID:", userId);

        if (!userId) {
            console.warn("User ID is undefined. Token may be missing or invalid.");
            return res.status(401).json({ message: "Unauthorized. Token may be invalid." });
        }

        // Fetch user from the database
        const user = await User.findById(userId);

        if (!user) {
            console.warn(" User not found in database.");
            return res.status(404).json({ message: "User not found" });
        }

        console.log(" User Found:", user);

        // Fetching full movie details from TMDB for each favorite movie ID
        const favoriteMovies = [];
        if (user.favorites && user.favorites.length > 0) {
            const movieDetailsPromises = user.favorites.map(async (movieId) => {
                try {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
                    );
                    return response.data;
                } catch (error) {
                    console.error(`Failed to fetch movie ${movieId}:`, error.message);
                    return null;
                }
            });

            const moviesData = await Promise.all(movieDetailsPromises);
            favoriteMovies.push(...moviesData.filter(movie => movie !== null));
        }

        // Sending response with user details and favorite movies
        res.json({
            name: user.name,
            email: user.email,
            favorites: user.favorites,
            favoriteMovies,
        });

    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = router;
