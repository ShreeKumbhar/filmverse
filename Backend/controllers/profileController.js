const User = require("../models/User");

// Add/Remove Favorite Movie
const updateFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { movieId } = req.body;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!movieId) {
      return res.status(400).json({ message: "Movie ID is required" });
    }

    // Toggle favorite (Add if not present, Remove if already exists)
    if (user.favorites.includes(movieId)) {
      user.favorites = user.favorites.filter((id) => id !== movieId); // Remove
    } else {
      user.favorites.push(movieId); // Add
    }

    await user.save();
    res.json({ favorites: user.favorites });//Send updated favorites list
  } catch (error) {
    console.error("Error updating favorites:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { updateFavorites };
