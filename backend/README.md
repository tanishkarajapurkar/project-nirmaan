# Project Nirmaan - Backend (Node.js + Express + MongoDB)

Production-ready backend for **Project Nirmaan**, connecting **Round 1 (Jugaad Gauntlet)**, **Round 2 (Blueprint Generator)**, and **Round 3 (Defusal Arena)** with MongoDB.

---

## 🚀 Quick Start

### 1. Requirements
- **Node.js** (v18+)
- **MongoDB** (running on `mongodb://127.0.0.1:27017` or configured via `.env`)

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Start the Server
```bash
# Production mode
npm start

# Watch / Development mode
npm run dev

# Manual database re-seed (Optional - automatically runs if empty)
npm run seed
```

Server starts by default on: **`http://localhost:5000`**

---

## 🌐 Application Endpoints & Pages

| Round / Feature | URL | Description |
|---|---|---|
| **Master Control Center** | `http://localhost:5000/` | Interactive hub with live DB status & quick actions |
| **Round 1: Jugaad Gauntlet** | `http://localhost:5000/round1/!DOCTYPE.html` or `/round1/index.html` | Family Feud face-off board with live scores & DB questions |
| **Round 2: Blueprint Generator** | `http://localhost:5000/round2/round2.html` | Slot machine with permanent MongoDB team history |
| **Round 3: Defusal Arena** | `http://localhost:5000/round3/round3.html` | Bomb defusal game with live engineering puzzles & leaderboard |

---

## 📡 REST API Reference

### Health Check
- `GET /api/health` - Server and MongoDB connectivity status

### Round 1: Jugaad Gauntlet
- `GET /api/round1/questions?format=game` - Get questions formatted for the game board (`q`, `a1`..`a6`, `p1`..`p6`)
- `GET /api/round1/questions` - Full structured question objects
- `POST /api/round1/questions` - Create new question
- `PUT /api/round1/questions/:id` - Update question
- `DELETE /api/round1/questions/:id` - Delete question
- `GET /api/round1/match` - Get active match state (scores, strikes, winner)
- `PUT /api/round1/match` - Update active match state
- `POST /api/round1/match/reset` - Reset match scores & strikes

### Round 2: Blueprint Generator
- `GET /api/round2/options` - Get master pool of terrains, roles, budgets
- `POST /api/round2/options` - Add custom terrain, role, or budget
- `GET /api/round2/teams` - Get all saved team blueprint records
- `POST /api/round2/teams` - Save/update team blueprint allocation
- `DELETE /api/round2/teams/:id` - Delete team blueprint record
- `DELETE /api/round2/history` - Clear all team blueprint records

### Round 3: Defusal Arena
- `GET /api/round3/puzzles` - Get Level 1 to 5 engineering component puzzles
- `POST /api/round3/puzzles` - Add new puzzle
- `PUT /api/round3/puzzles/:id` - Update puzzle
- `GET /api/round3/sessions` - Get all defusal attempts
- `POST /api/round3/session` - Save team defusal session (time left, wires cut, penalties, won/lost)
- `GET /api/round3/leaderboard` - Ranked leaderboard of teams

### Master Teams Scoreboard
- `GET /api/teams` - Overall standings across all 3 rounds
- `POST /api/teams` - Create/update team record
- `POST /api/teams/sync` - Synchronize Round 1, Round 2, and Round 3 data into unified scoreboard
- `POST /api/teams/reset-all` - Clear all match records and team data for a new event

---

## 📁 Backend Directory Architecture

```
backend/
├── .env                  # Environment configuration (PORT, MONGO_URI)
├── .env.example          # Environment template
├── package.json          # Node dependencies & npm scripts
├── server.js             # Express entry point, DB loader, static files & routes
├── config/
│   └── db.js             # Mongoose connection & event handlers
├── models/
│   ├── Round1Question.js # Schema for Round 1 question bank
│   ├── Round1Match.js    # Schema for Round 1 live match state
│   ├── Round2Option.js   # Schema for Round 2 master blueprint choices
│   ├── Round2Blueprint.js# Schema for Round 2 assigned team blueprints
│   ├── Round3Puzzle.js   # Schema for Round 3 engineering component puzzles
│   ├── Round3Session.js  # Schema for Round 3 defusal attempts & scores
│   └── Team.js           # Schema for consolidated master team scoreboard
├── controllers/
│   ├── round1Controller.js
│   ├── round2Controller.js
│   ├── round3Controller.js
│   └── teamController.js
├── routes/
│   ├── round1Routes.js
│   ├── round2Routes.js
│   ├── round3Routes.js
│   └── teamRoutes.js
└── seed/
    └── seedData.js       # Auto-seeder for default questions, options & puzzles
```
