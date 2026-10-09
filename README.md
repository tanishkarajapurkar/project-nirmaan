# Project Nirmaan 🚀

Full-Stack interactive arena and management system for **Project Nirmaan**, featuring 3 dynamic rounds powered by a **Node.js + Express + MongoDB** backend.

---

## 🎮 The Three Rounds

1. **Round 1: Jugaad Gauntlet (Face-Off Board)**
   - Family Feud style interactive board for Team A vs Team B.
   - Dynamic questions bank fetched from MongoDB.
   - Real-time score, strikes, and round state synchronization.

2. **Round 2: Cinematic Blueprint Generator (Slot Machine)**
   - Cyberpunk slot machine generating Map Terrains, Team Roles, and Budgets.
   - Smart non-repeating memory algorithm.
   - Persists all team allocations permanently into MongoDB.

3. **Round 3: Defusal Arena (Bomb Defusal)**
   - High-stakes engineering component defusal challenge with 5 wires and timer.
   - Dynamic component encryption puzzles from MongoDB.
   - Saves team completion times and penalties to MongoDB live leaderboard.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Modern CSS (Cyberpunk & Arcade themes), Vanilla JavaScript, Web Audio API
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Environment**: dotenv, CORS

---

## 🚀 Quick Setup & Run

### 1. Install & Run Backend
```bash
cd backend
npm install
npm start
```

### 2. Access the Application
- **Master Control Hub**: [http://localhost:5000/](http://localhost:5000/)
- **Round 1**: [http://localhost:5000/round1/index.html](http://localhost:5000/round1/index.html)
- **Round 2**: [http://localhost:5000/round2/round2.html](http://localhost:5000/round2/round2.html)
- **Round 3**: [http://localhost:5000/round3/round3.html](http://localhost:5000/round3/round3.html)

---

## 📡 API Overview

- `GET /api/health` - Health check & MongoDB status
- `GET /api/round1/questions` - Question bank for Round 1
- `PUT /api/round1/match` - Live match state & scores
- `GET /api/round2/options` - Terrain, role, and budget pool
- `POST /api/round2/teams` - Save team blueprint allocation
- `GET /api/round3/puzzles` - Engineering puzzles for defusal
- `POST /api/round3/session` - Record defusal run & time
- `GET /api/round3/leaderboard` - Round 3 rankings
- `GET /api/teams` - Consolidated 3-round scoreboard
