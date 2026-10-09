const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Round1Question = require('../models/Round1Question');
const Round2Option = require('../models/Round2Option');
const Round3Puzzle = require('../models/Round3Puzzle');
const connectDB = require('../config/db');

const round1Questions = [
    {
        question: "Name something an engineering student loses in the first year.",
        order: 1,
        category: "College Life",
        answers: [
            { rank: 1, text: "Friends Circle", points: 35 },
            { rank: 2, text: "Love Interest", points: 25 },
            { rank: 3, text: "Sleep / Motivation", points: 20 },
            { rank: 4, text: "Books", points: 10 },
            { rank: 5, text: "Pen / Stationery", points: 5 },
            { rank: 6, text: "ID Card", points: 5 }
        ]
    },
    {
        question: "What is the most common excuse for submitting an assignment late?",
        order: 2,
        category: "College Life",
        answers: [
            { rank: 1, text: "Printer not working (Shop Closed)", points: 35 },
            { rank: 2, text: "Laptop Crashed / File Corrupt", points: 25 },
            { rank: 3, text: "Was Sick / Medical", points: 15 },
            { rank: 4, text: "Forgot it at home", points: 10 },
            { rank: 5, text: "Partner didn't do it", points: 10 },
            { rank: 6, text: "Train Traffic", points: 5 }
        ]
    },
    {
        question: "Which app do college students use the most during a boring lecture?",
        order: 3,
        category: "College Life",
        answers: [
            { rank: 1, text: "Instagram (Reels)", points: 35 },
            { rank: 2, text: "WhatsApp", points: 25 },
            { rank: 3, text: "Spotify", points: 15 },
            { rank: 4, text: "YouTube", points: 10 },
            { rank: 5, text: "Snapchat", points: 10 },
            { rank: 6, text: "Games (BGMI/Free Fire)", points: 5 }
        ]
    },
    {
        question: "What do students mostly eat during the recess in our college?",
        order: 4,
        category: "College Life",
        answers: [
            { rank: 1, text: "Mendu Vada / Idli (Anna)", points: 20 },
            { rank: 2, text: "Manchurian (Chinese)", points: 20 },
            { rank: 3, text: "Vada Pav / Bhaji Pav", points: 20 },
            { rank: 4, text: "Chips / Lays", points: 20 },
            { rank: 5, text: "Burger / Pizza / Wrap", points: 10 },
            { rank: 6, text: "Tea / Coffee", points: 10 }
        ]
    },
    {
        question: "What is the first thing students do when they get free high-speed campus Wi-Fi?",
        order: 5,
        category: "College Life",
        answers: [
            { rank: 1, text: "Download Movies/Series", points: 35 },
            { rank: 2, text: "Update Large Apps", points: 25 },
            { rank: 3, text: "Download Big Games", points: 15 },
            { rank: 4, text: "Scroll Instagram Reels", points: 10 },
            { rank: 5, text: "Sending Larger Files", points: 10 },
            { rank: 6, text: "Watch YouTube 1080p", points: 5 }
        ]
    },
    {
        question: "Name a place where students go to bunk classes.",
        order: 6,
        category: "College Life",
        answers: [
            { rank: 1, text: "Washroom", points: 35 },
            { rank: 2, text: "Ground", points: 25 },
            { rank: 3, text: "Canteen / Cafe / Tapri", points: 15 },
            { rank: 4, text: "Home / Friend's Room", points: 10 },
            { rank: 5, text: "Committee Work", points: 10 },
            { rank: 6, text: "Library", points: 5 }
        ]
    },
    {
        question: "What is the most common lie told to parents by engineering students?",
        order: 7,
        category: "College Life",
        answers: [
            { rank: 1, text: "Need money for Books/Print", points: 35 },
            { rank: 2, text: "Extra classes are going on", points: 25 },
            { rank: 3, text: "Group study at friend's house", points: 15 },
            { rank: 4, text: "Internship", points: 10 },
            { rank: 5, text: "Teacher cut my marks", points: 10 },
            { rank: 6, text: "Train was late", points: 5 }
        ]
    },
    {
        question: "When planning a college trip, where do students usually want to go (but it cancels)?",
        order: 8,
        category: "College Life",
        answers: [
            { rank: 1, text: "Goa", points: 35 },
            { rank: 2, text: "Villa / Resort", points: 25 },
            { rank: 3, text: "Manali", points: 15 },
            { rank: 4, text: "Lonavala", points: 10 },
            { rank: 5, text: "Matheran", points: 10 },
            { rank: 6, text: "Kokan", points: 5 }
        ]
    },
    {
        question: "Name a skill or software every engineer fakes on their resume.",
        order: 9,
        category: "College Life",
        answers: [
            { rank: 1, text: "MS Excel / Word", points: 35 },
            { rank: 2, text: "Programming (C++/Python)", points: 25 },
            { rank: 3, text: "Leadership Skills", points: 15 },
            { rank: 4, text: "AutoCAD", points: 10 },
            { rank: 5, text: "Hobbies (Reading Books)", points: 10 },
            { rank: 6, text: "Foreign Language", points: 5 }
        ]
    },
    {
        question: "What is the most important survival tool in a college hostel/PG?",
        order: 10,
        category: "College Life",
        answers: [
            { rank: 1, text: "Extension Board", points: 35 },
            { rank: 2, text: "Electric Kettle", points: 25 },
            { rank: 3, text: "Instant Maggi", points: 15 },
            { rank: 4, text: "Headphones", points: 10 },
            { rank: 5, text: "Iron (Press)", points: 10 },
            { rank: 6, text: "Deo / Perfume (No Bath)", points: 5 }
        ]
    }
];

const round2Options = [
    // Terrains
    { category: "terrain", text: "River in Center", img: "🌊", desc: "[Must build a bridge; limited central space]" },
    { category: "terrain", text: "Hilly Slopes", img: "⛰️", desc: "[High landslide risk; foundation costs 2x]" },
    { category: "terrain", text: "Island Ground", img: "🏝️", desc: "[Limited space; must plan tight zoning]" },
    { category: "terrain", text: "Highway Crossing", img: "🛣️", desc: "[High traffic noise; Residential must be far]" },
    { category: "terrain", text: "Dense Forest", img: "🌲", desc: "[Eco-zone; cannot cut more than 30% area]" },
    { category: "terrain", text: "Fault Line", img: "⚡", desc: "[Earthquake zone; no tall structures allowed]" },

    // Roles
    { category: "role", text: "The Thief", img: "🥷", desc: "[Can steal 1 sticky note or 10 Cr from any rival team during planning]", sfxId: "sfx-thief" },
    { category: "role", text: "The Hacker", img: "👨‍💻", desc: "[Gets exactly 1 minute of Google Search to verify a technical solution]", sfxId: "sfx-hacker" },
    { category: "role", text: "The VIP", img: "🕴️", desc: "[Gets absolute immunity from the first Doom Wheel disaster in Round 3]", sfxId: "sfx-vip" },
    { category: "role", text: "The Architect", img: "📐", desc: "[Given 2 extra sticky notes of any color for advanced zoning logic]", sfxId: "sfx-architect" },
    { category: "role", text: "The Corrupt Builder", img: "🏗️", desc: "[Gets extra ₹20 Cr budget, but takes double damage during Earthquakes]", sfxId: "sfx-corrupt" },
    { category: "role", text: "The Auditor", img: "🕵️", desc: "[Can pause the timer for 30s to inspect and copy a rival's map idea]", sfxId: "sfx-auditor" },

    // Budgets
    { category: "budget", text: "₹ 50 Crores", img: "🪙", desc: "[Tight Budget: Focus on low-cost survival]" },
    { category: "budget", text: "₹ 100 Crores", img: "💵", desc: "[Balanced: Standard urban planning]" },
    { category: "budget", text: "₹ 150 Crores", img: "💰", desc: "[Rich: Can afford advanced tech & defenses]" },
    { category: "budget", text: "₹ 75 Crores", img: "📉", desc: "[Low Budget: Requires extreme Jugaad]" },
    { category: "budget", text: "₹ 200 Crores", img: "🏦", desc: "[Luxury: Build premium eco-friendly infra]" },
    { category: "budget", text: "₹ 80 Cr + Loan", img: "💳", desc: "[Takes ₹20 Cr loan, must pay back 5 points later]" }
];

const round3Puzzles = [
    {
        level: 1,
        title: "PRIMARY LOGIC GATE",
        clue: "I output high only when both my inputs agree to be true. Which component am I?",
        componentName: "AND Gate IC (7408)",
        wireNumber: 1,
        hint: "Two switches in series",
        difficulty: "easy"
    },
    {
        level: 2,
        title: "POWER REGULATION DECOUPLING",
        clue: "I store electrical energy in an electric field and block DC while passing AC noise. Cut my bypass wire!",
        componentName: "Electrolytic Capacitor",
        wireNumber: 2,
        hint: "Measured in microfarads",
        difficulty: "easy"
    },
    {
        level: 3,
        title: "REVERSE BREAKDOWN DIODE",
        clue: "I allow current in forward bias like normal, but conduct safely in reverse bias at a specified breakdown voltage.",
        componentName: "Zener Diode",
        wireNumber: 3,
        hint: "Voltage reference guardian",
        difficulty: "medium"
    },
    {
        level: 4,
        title: "STRUCTURAL LOAD BEARING",
        clue: "In beam mechanics, I represent the cross-sectional resistance against bending moments. Cut the neutral axis trace!",
        componentName: "Section Modulus (I/y)",
        wireNumber: 4,
        hint: "Second moment of area divided by fiber distance",
        difficulty: "hard"
    },
    {
        level: 5,
        title: "MASTER TIMING CRYSTAL",
        clue: "I generate precise clock oscillations using the piezoelectric effect to keep the detonator synchronized.",
        componentName: "Quartz Crystal Oscillator",
        wireNumber: 5,
        hint: "16 MHz frequency heartbeat",
        difficulty: "hard"
    }
];

const seedDatabase = async () => {
    try {
        console.log('🌱 Checking database seeding...');
        if (mongoose.connection.readyState !== 1) {
            const conn = await connectDB();
            if (!conn) {
                console.error('❌ Could not connect to MongoDB for seeding.');
                return false;
            }
        }

        // Round 1
        const r1Count = await Round1Question.countDocuments();
        if (r1Count === 0) {
            await Round1Question.insertMany(round1Questions);
            console.log(`✅ Seeded ${round1Questions.length} Round 1 Questions`);
        } else {
            console.log(`ℹ️ Round 1 Questions already exist (${r1Count} found)`);
        }

        // Round 2
        const r2Count = await Round2Option.countDocuments();
        if (r2Count === 0) {
            await Round2Option.insertMany(round2Options);
            console.log(`✅ Seeded ${round2Options.length} Round 2 Options`);
        } else {
            console.log(`ℹ️ Round 2 Options already exist (${r2Count} found)`);
        }

        // Round 3
        const r3Count = await Round3Puzzle.countDocuments();
        if (r3Count === 0) {
            await Round3Puzzle.insertMany(round3Puzzles);
            console.log(`✅ Seeded ${round3Puzzles.length} Round 3 Puzzles`);
        } else {
            console.log(`ℹ️ Round 3 Puzzles already exist (${r3Count} found)`);
        }

        console.log('🎉 Seeding check complete!');
        return true;
    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
        return false;
    }
};

// If run directly from terminal
if (require.main === module) {
    seedDatabase().then(() => {
        mongoose.connection.close();
        process.exit(0);
    });
}

module.exports = seedDatabase;
