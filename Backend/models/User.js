const { pool } = require("../config/db");

const findByEmail = async (email) => {
    const [rows] = await pool.query(
        "SELECT id, name, email, password FROM users WHERE email = ? LIMIT 1",
        [email]
    );
    return rows[0] || null;
};

const findById = async (id) => {
    const [users] = await pool.query(
        "SELECT id, name, email FROM users WHERE id = ? LIMIT 1",
        [id]
    );
    if (!users[0]) {
        return null;
    }

    const [favorites] = await pool.query(
        "SELECT movie_id FROM favorites WHERE user_id = ? ORDER BY created_at DESC",
        [id]
    );

    return {
        ...users[0],
        favorites: favorites.map((item) => item.movie_id),
    };
};

const createUser = async ({ name, email, password }) => {
    const [result] = await pool.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, password]
    );
    return { id: result.insertId, name, email };
};

const updatePassword = async (email, hashedPassword) => {
    const [result] = await pool.query(
        "UPDATE users SET password = ? WHERE email = ?",
        [hashedPassword, email]
    );
    return result.affectedRows > 0;
};

const toggleFavorite = async (userId, movieId) => {
    const [existing] = await pool.query(
        "SELECT id FROM favorites WHERE user_id = ? AND movie_id = ? LIMIT 1",
        [userId, movieId]
    );

    if (existing[0]) {
        await pool.query("DELETE FROM favorites WHERE user_id = ? AND movie_id = ?", [
            userId,
            movieId,
        ]);
    } else {
        await pool.query("INSERT INTO favorites (user_id, movie_id) VALUES (?, ?)", [
            userId,
            movieId,
        ]);
    }

    const [favorites] = await pool.query(
        "SELECT movie_id FROM favorites WHERE user_id = ? ORDER BY created_at DESC",
        [userId]
    );

    return favorites.map((item) => item.movie_id);
};

module.exports = {
    findByEmail,
    findById,
    createUser,
    updatePassword,
    toggleFavorite,
};
