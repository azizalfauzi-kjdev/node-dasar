const express = require("express");
const app = express();
const userRoutes = require("../routes/userRoutes");

// Middleware parsing Body dari JSON request (Wajib!)
app.use(express.json);

// Jalur Utama (Prefix URL)
app.use("/users", userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

