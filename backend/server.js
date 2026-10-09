const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const connectDB = require('./config/db');
const seedDatabase = require('./seed/seedData');

// Route imports
const round1Routes = require('./routes/round1Routes');
const round2Routes = require('./routes/round2Routes');
const round3Routes = require('./routes/round3Routes');
const teamRoutes = require('./routes/teamRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB().then(async () => {
    // Run seed check if connected
    if (mongoose.connection.readyState === 1) {
        await seedDatabase();
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get('/api/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({
        status: 'ok',
        appName: 'Project Nirmaan Backend',
        database: dbStatus,
        uptime: process.uptime(),
        timestamp: new Date()
    });
});

// Mount Feature API Routes
app.use('/api/round1', round1Routes);
app.use('/api/round2', round2Routes);
app.use('/api/round3', round3Routes);
app.use('/api/teams', teamRoutes);

// Static file serving for Round 1, Round 2, Round 3
const projectRoot = path.join(__dirname, '..');
app.use('/round1', express.static(path.join(projectRoot, 'round1')));
app.use('/round2', express.static(path.join(projectRoot, 'round2')));
app.use('/round3', express.static(path.join(projectRoot, 'round3')));

// Serve an intuitive Project Nirmaan Master Hub & Status UI at "/"
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Nirmaan - Control Center & API Hub</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;900&family=Rajdhani:wght@600;700&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            background: radial-gradient(circle at center, #0e1026 0%, #05060d 100%);
            color: #fff;
            font-family: 'Rajdhani', sans-serif;
            min-height: 100vh;
            padding: 30px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        h1 {
            font-family: 'Orbitron', sans-serif;
            color: #00ffff;
            font-size: 2.8rem;
            text-shadow: 0 0 20px #00ffff, 0 0 40px #ff00ff;
            margin-bottom: 5px;
            text-align: center;
        }
        .subtitle {
            color: #f6d148;
            font-size: 1.2rem;
            letter-spacing: 2px;
            margin-bottom: 25px;
            text-align: center;
        }
        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 8px 20px;
            border-radius: 30px;
            background: rgba(0, 255, 128, 0.1);
            border: 1px solid #00ff80;
            color: #00ff80;
            font-weight: 700;
            margin-bottom: 30px;
            font-size: 1rem;
        }
        .dot {
            width: 10px;
            height: 10px;
            background: #00ff80;
            border-radius: 50%;
            box-shadow: 0 0 10px #00ff80;
            animation: pulse 1.5s infinite;
        }
        @keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 25px;
            width: 100%;
            max-width: 1100px;
        }
        .card {
            background: rgba(255, 255, 255, 0.03);
            border: 2px solid #222c54;
            border-radius: 16px;
            padding: 25px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: 0.3s;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .card:hover {
            border-color: #00ffff;
            box-shadow: 0 10px 30px rgba(0,255,255,0.2);
            transform: translateY(-4px);
        }
        .card h2 {
            font-family: 'Orbitron', sans-serif;
            font-size: 1.5rem;
            margin-bottom: 10px;
            color: #ff00ff;
        }
        .card p {
            color: #aaa;
            font-size: 1rem;
            line-height: 1.5;
            margin-bottom: 15px;
        }
        .btn-group {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        .btn {
            display: inline-block;
            padding: 10px 18px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            font-size: 1rem;
            transition: 0.2s;
            cursor: pointer;
            border: none;
        }
        .btn-primary {
            background: linear-gradient(90deg, #00ffff, #0088ff);
            color: #000;
        }
        .btn-primary:hover { opacity: 0.9; box-shadow: 0 0 15px #00ffff; }
        .btn-secondary {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid #ff00ff;
            color: #ff00ff;
        }
        .btn-secondary:hover { background: #ff00ff; color: #fff; }
        .api-list {
            margin-top: 15px;
            padding: 10px;
            background: rgba(0,0,0,0.4);
            border-radius: 8px;
            font-family: monospace;
            font-size: 0.85rem;
            color: #00ffff;
        }
        .api-list div { margin-bottom: 4px; }
        .footer {
            margin-top: 40px;
            color: #666;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <h1>PROJECT NIRMAAN</h1>
    <div class="subtitle">NODE.JS + EXPRESS + MONGODB CONNECTED BACKEND</div>
    
    <div class="status-badge">
        <span class="dot"></span>
        <span>SERVER & MONGODB ONLINE ON PORT ${PORT}</span>
    </div>

    <div class="grid">
        <!-- ROUND 1 -->
        <div class="card">
            <div>
                <h2>ROUND 1: JUGAAD GAUNTLET</h2>
                <p>Family Feud style interactive board. Fully connected with MongoDB questions bank, dynamic score tracking, and strike management.</p>
                <div class="api-list">
                    <div>GET /api/round1/questions</div>
                    <div>GET /api/round1/match</div>
                    <div>PUT /api/round1/match</div>
                </div>
            </div>
            <div class="btn-group" style="margin-top: 20px;">
                <a class="btn btn-primary" href="/round1/!DOCTYPE.html" target="_blank">Launch Game</a>
                <a class="btn btn-secondary" href="/api/round1/questions?format=game" target="_blank">View Questions</a>
            </div>
        </div>

        <!-- ROUND 2 -->
        <div class="card">
            <div>
                <h2>ROUND 2: BLUEPRINT GENERATOR</h2>
                <p>Cinematic Slot Machine for Map Terrain, Team Role, and Budget. Saves team draws permanently into MongoDB collection.</p>
                <div class="api-list">
                    <div>GET /api/round2/options</div>
                    <div>GET /api/round2/teams</div>
                    <div>POST /api/round2/teams</div>
                </div>
            </div>
            <div class="btn-group" style="margin-top: 20px;">
                <a class="btn btn-primary" href="/round2/round2.html" target="_blank">Launch Slot Machine</a>
                <a class="btn btn-secondary" href="/api/round2/teams" target="_blank">View Team History</a>
            </div>
        </div>

        <!-- ROUND 3 -->
        <div class="card">
            <div>
                <h2>ROUND 3: DEFUSAL ARENA</h2>
                <p>Cyber Bomb Defusal Puzzle Game with 5 wires, timer countdown, component puzzles, penalties, and live defusal leaderboard.</p>
                <div class="api-list">
                    <div>GET /api/round3/puzzles</div>
                    <div>GET /api/round3/sessions</div>
                    <div>POST /api/round3/session</div>
                </div>
            </div>
            <div class="btn-group" style="margin-top: 20px;">
                <a class="btn btn-primary" href="/round3/round3.html" target="_blank">Launch Defusal</a>
                <a class="btn btn-secondary" href="/api/round3/puzzles" target="_blank">View Puzzles</a>
            </div>
        </div>

        <!-- CONSOLIDATED LEADERBOARD -->
        <div class="card" style="grid-column: 1 / -1;">
            <div>
                <h2>MASTER LEADERBOARD & SYNC</h2>
                <p>Unified teams dashboard consolidating scores and blueprint allocations across Round 1, Round 2, and Round 3.</p>
                <div class="api-list">
                    <div>GET /api/teams (All Teams & Consolidated Scores)</div>
                    <div>POST /api/teams/sync (Sync Rounds 1, 2, 3 Data)</div>
                </div>
            </div>
            <div class="btn-group" style="margin-top: 20px;">
                <a class="btn btn-primary" href="/api/teams" target="_blank">View Master Teams Data</a>
                <a class="btn btn-secondary" href="/api/health" target="_blank">Server Health</a>
            </div>
        </div>
    </div>

    <div class="footer">Project Nirmaan Backend &copy; 2026. Running on Node.js & Express with MongoDB.</div>
</body>
</html>
    `);
});

// Start Express Server
const server = app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Project Nirmaan Backend is RUNNING on http://localhost:${PORT}`);
    console.log(`📡 MongoDB Target: ${process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/project_nirmaan'}`);
    console.log(`🎮 Round 1: http://localhost:${PORT}/round1/!DOCTYPE.html`);
    console.log(`🎰 Round 2: http://localhost:${PORT}/round2/round2.html`);
    console.log(`💣 Round 3: http://localhost:${PORT}/round3/round3.html`);
    console.log(`====================================================`);
});

// Export app for testing or process management
module.exports = app;
