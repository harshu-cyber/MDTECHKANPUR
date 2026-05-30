import express from "express";

const app = express();
const port = process.env.PORT || 4000;

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
