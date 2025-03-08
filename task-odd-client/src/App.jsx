import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

const App = () => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/odds`, { headers: { "x-api-key": "secret123" } })
      .then((res) => setMatches(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleFilter = (matchId) => {
    axios
      .post(`${API_URL}/filter`, { matchId }, { headers: { "x-api-key": "secret123" } })
      .then((res) => setSelectedMatch(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h1>Football Betting Odds </h1>
      <div>
        <select onChange={(e) => handleFilter(Number(e.target.value))}>
          <option value="">Select a Match</option>
          {matches.map((m) => (
            <option key={m.matchId} value={m.matchId}>
              {m.teams}
            </option>
          ))}
        </select>
      </div>
      {selectedMatch && (
        <div className="match-details">
          <h2>{selectedMatch.teams}</h2>
          <p>Win {selectedMatch.odds.winA ? `A: ${selectedMatch.odds.winA} (Probability is ${Math.round(1/selectedMatch.odds.winA*100)}%) ` : `C: ${selectedMatch.odds.winC} (Probability is ${Math.round(1/selectedMatch.odds.winC*100)}%)`}</p>
          <p>Win {selectedMatch.odds.winB ? `B: ${selectedMatch.odds.winB} (Probability is ${Math.round(1/selectedMatch.odds.winB*100)}%)` : `D: ${selectedMatch.odds.winD} (Probability is ${Math.round(1/selectedMatch.odds.winD*100)}%)`}</p>

          <p>Draw: {selectedMatch.odds.draw}</p>
        </div>
      )}
    </div>
  );
};

export default App;
