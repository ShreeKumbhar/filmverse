const express = require("express");
const axios = require("axios");
const { authenticateUser } = require("../middleware/authMiddleware");
const User = require("../models/User");
const router = express.Router();

const API_KEY = process.env.TMDB_API_KEY;

router.get("/profile", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const movieDetailsPromises = (user.favorites || []).map((movieId) =>
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
    );

    const moviesData = await Promise.all(movieDetailsPromises);
    const favoriteMovies = moviesData.map((response) => response.data);

    res.json({ name: user.name, favoriteMovies });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
