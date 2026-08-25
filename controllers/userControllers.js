const db = require("../config/db");

// 1. GET ALL (Mendapatkan Array Data)
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.status(200).json({
      success: true,
      message: "Berhasil mengambil semua data user",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. GET BY ID (Mendapatkan 1 Object berdasarkan ID)
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data user",
      data: rows[0], // Mengembalikan objek tunggal
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. CREATE / POST (Menambah Data Baru)
exports.createUser = async (req, res) => {
  const { nama, email } = req.body;

  if (!nama || !email) {
    return res.status(400).json({
      success: false,
      message: "Nama dan email wajib diisi!",
    });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO users (Name, Email) VALUES (?, ?)",
      [nama, email],
    );

    res.status(201).json({
      success: true,
      message: "User berhasil ditambahkan",
      data: {
        nama,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. UPDATE / PUT (Mengubah Data)
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { nama, email } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE users SET Name = ?, Email = ? WHERE id = ?",
      [nama, email, id],
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User tidak ditemukan" });
    }

    res.status(200).json({
      success: true,
      message: "Data user berhasil diperbarui",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. DELETE (Menghapus Data)
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User tidak ditemukan" });
    }

    res.status(200).json({
      success: true,
      message: "User berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
