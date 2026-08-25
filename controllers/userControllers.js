const db = require("../config/db");

// 1. GET ALL (Mendapatkan Array Data)
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. GET BY ID (Mendapatkan 1 Object berdasarkan ID)
exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: rows[0], // Mengembalikan objek tunggal
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. CREATE / POST (Menambah Data Baru)
exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Name and email are required" });
  }
  try {
    const [result] = await db.query(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email],
    );
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { id: result.insertId, name, email },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. UPDATE / PUT (Mengubah Data)
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, userId],
    );
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: { id: userId, name, email },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. DELETE (Menghapus Data)
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [userId]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
