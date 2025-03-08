const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const mockOdds = [
  { matchId: 1, teams: "Team A vs Team B", odds: { winA: 2.1, winB: 3.5, draw: 2.8 } },
  { matchId: 2, teams: "Team C vs Team D", odds: { winC: 1.9, winD: 4.0, draw: 3.0 } }
];

app.use((req, res, next) => {
  if (req.headers["x-api-key"] !== "secret123") {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
});

app.get("/api/odds", (req, res) => {
  res.json(mockOdds);
});

app.post("/api/filter", (req, res) => {
  const { matchId } = req.body;
  const match = mockOdds.find(m => m.matchId === matchId);
  if (!match) return res.status(404).json({ error: "Match not found" });
  res.json(match);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
