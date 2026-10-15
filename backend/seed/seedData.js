const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Round1Question = require('../models/Round1Question');
const Round2Option = require('../models/Round2Option');
const Round3Puzzle = require('../models/Round3Puzzle');
const Team = require('../models/Team');
const connectDB = require('../config/db');

const round1Questions = [
    {
        question: "Which app do college students use the most during a boring lecture?",
        order: 1,
        category: "College Life",
        answers: [
            { rank: 1, text: "Instagram (Reels)", points: 35 },
            { rank: 2, text: "WhatsApp", points: 25 },
            { rank: 3, text: "Games (BGMI/Free Fire)", points: 15 },
            { rank: 4, text: "YouTube", points: 10 },
            { rank: 5, text: "Snapchat", points: 10 },
            { rank: 6, text: "Spotify", points: 5 }
        ]
    },
    {
        question: "Name a place where students go to bunk classes.",
        order: 2,
        category: "College Life",
        answers: [
            { rank: 1, text: "Washroom", points: 35 },
            { rank: 2, text: "Committee Work", points: 25 },
            { rank: 3, text: "Canteen / Café / Tapri", points: 15 },
            { rank: 4, text: "Home / Friend's Room", points: 10 },
            { rank: 5, text: "Library", points: 10 },
            { rank: 6, text: "Ground", points: 5 }
        ]
    },
    {
        question: "What is the most common lie told to parents by engineering students?",
        order: 3,
        category: "College Life",
        answers: [
            { rank: 1, text: "Need money for books/print", points: 35 },
            { rank: 2, text: "Extra classes are going on", points: 25 },
            { rank: 3, text: "Group study at friend's house", points: 15 },
            { rank: 4, text: "Internship", points: 10 },
            { rank: 5, text: "Teacher cut my marks", points: 10 },
            { rank: 6, text: "Train was late", points: 5 }
        ]
    },
    {
        question: "When planning a college trip, where do students usually want to go (but it cancels)?",
        order: 4,
        category: "College Life",
        answers: [
            { rank: 1, text: "Goa", points: 35 },
            { rank: 2, text: "Villa / Resort", points: 25 },
            { rank: 3, text: "Manali", points: 15 },
            { rank: 4, text: "Lonavala", points: 10 },
            { rank: 5, text: "Matheran", points: 10 },
            { rank: 6, text: "Beach", points: 5 }
        ]
    },
    {
        question: "Name a skill or software every engineer fakes on their resume.",
        order: 5,
        category: "College Life",
        answers: [
            { rank: 1, text: "Programming (C++/Python)", points: 35 },
            { rank: 2, text: "Leadership Skills", points: 25 },
            { rank: 3, text: "Reading Books", points: 15 },
            { rank: 4, text: "CAD", points: 10 },
            { rank: 5, text: "AutoCAD", points: 10 },
            { rank: 6, text: "MS Excel / Word", points: 5 }
        ]
    },
    {
        question: "What is the most important survival tool in a college hostel/PG?",
        order: 6,
        category: "College Life",
        answers: [
            { rank: 1, text: "Instant Maggi", points: 35 },
            { rank: 2, text: "Electric Kettle", points: 25 },
            { rank: 3, text: "Perfume", points: 15 },
            { rank: 4, text: "Iron", points: 10 },
            { rank: 5, text: "Extension Board", points: 10 },
            { rank: 6, text: "Lamp", points: 5 }
        ]
    },
    {
        question: "Name something an engineering student loses in the first year.",
        order: 7,
        category: "College Life",
        answers: [
            { rank: 1, text: "Friends Circle", points: 35 },
            { rank: 2, text: "ID Card", points: 25 },
            { rank: 3, text: "Sleep / Motivation", points: 15 },
            { rank: 4, text: "Pen / Stationery", points: 10 },
            { rank: 5, text: "Love Interest", points: 10 },
            { rank: 6, text: "Books", points: 5 }
        ]
    },
    {
        question: "What is the most common excuse for submitting an assignment late?",
        order: 8,
        category: "College Life",
        answers: [
            { rank: 1, text: "Printer not working (shop closed)", points: 35 },
            { rank: 2, text: "Laptop crashed / file corrupt", points: 25 },
            { rank: 3, text: "Was sick / medical", points: 15 },
            { rank: 4, text: "Forgot it at home", points: 10 },
            { rank: 5, text: "Partner didn't do it", points: 10 },
            { rank: 6, text: "Train traffic", points: 5 }
        ]
    },
    {
        question: "What is the final contribution of the laziest member (free-rider) in a project group?",
        order: 9,
        category: "College Life",
        answers: [
            { rank: 1, text: "Printing and binding the final project report", points: 35 },
            { rank: 2, text: "Making the \"Thank You\" and \"Title\" slide of the PPT", points: 25 },
            { rank: 3, text: "Buying snacks or coffee for the group", points: 15 },
            { rank: 4, text: "Carrying the laptop/hardware to the venue", points: 10 },
            { rank: 5, text: "Clicking group photos for social media", points: 10 },
            { rank: 6, text: "Giving moral support (\"We can do it guys\")", points: 5 }
        ]
    },
    {
        question: "During a Viva (oral exam), what is the most common cross-question the external asks that nobody knows?",
        order: 10,
        category: "College Life",
        answers: [
            { rank: 1, text: "\"Did you actually write this code yourself?\"", points: 35 },
            { rank: 2, text: "What is its real-world practical application?", points: 25 },
            { rank: 3, text: "Asking for a basic definition or formula from 1st year", points: 15 },
            { rank: 4, text: "What was the total cost/budget of this project?", points: 10 },
            { rank: 5, text: "Why did you choose this specific topic?", points: 10 },
            { rank: 6, text: "Can you explain the block diagram/flowchart?", points: 5 }
        ]
    },
    {
        question: "Name the most common way students secretly communicate in an exam hall.",
        order: 11,
        category: "College Life",
        answers: [
            { rank: 1, text: "Coughing or clearing their throat to get attention", points: 35 },
            { rank: 2, text: "Tapping the pen or desk continuously", points: 25 },
            { rank: 3, text: "Showing hand signs / finger numbers for MCQ options", points: 15 },
            { rank: 4, text: "Throwing a crushed piece of paper / eraser", points: 10 },
            { rank: 5, text: "Whispering when the invigilator turns around", points: 10 },
            { rank: 6, text: "Kicking the chair of the person sitting ahead", points: 5 }
        ]
    },
    {
        question: "What is the MAIN reason students volunteer to organize college fests?",
        order: 12,
        category: "College Life",
        answers: [
            { rank: 1, text: "To get official attendance / bunk classes legally", points: 35 },
            { rank: 2, text: "To impress a crush or socialize with seniors/juniors", points: 25 },
            { rank: 3, text: "For the Free Food / Committee T-shirts", points: 15 },
            { rank: 4, text: "To get a certificate for their resume", points: 10 },
            { rank: 5, text: "To boss around the juniors", points: 10 },
            { rank: 6, text: "Because they actually care about the event", points: 5 }
        ]
    },
    {
        question: "Name a thought every engineering student has during an 8 AM morning lecture.",
        order: 13,
        category: "College Life",
        answers: [
            { rank: 1, text: "\"Why did I even choose Engineering?\"", points: 35 },
            { rank: 2, text: "Is the professor taking attendance today? Can I leave?", points: 25 },
            { rank: 3, text: "If I sleep right now, will anyone notice?", points: 15 },
            { rank: 4, text: "Can I just pack my bag and leave at the break?", points: 10 },
            { rank: 5, text: "What is for breakfast in the canteen?", points: 10 },
            { rank: 6, text: "I should drop out and start a startup.", points: 5 }
        ]
    },
    {
        question: "What is the biggest struggle of traveling to college via public transport (train/bus)?",
        order: 14,
        category: "College Life",
        answers: [
            { rank: 1, text: "Getting a place to sit", points: 35 },
            { rank: 2, text: "Standing with a heavy laptop bag breaking your shoulders", points: 25 },
            { rank: 3, text: "The crowd crushing your freshly ironed clothes", points: 15 },
            { rank: 4, text: "Sweating before the day has even started", points: 10 },
            { rank: 5, text: "Running for your life to catch it at the exact minute", points: 10 },
            { rank: 6, text: "Smelling other people's armpits", points: 5 }
        ]
    },
    {
        question: "What is the biggest lie students tell their parents to get extra pocket money?",
        order: 15,
        category: "College Life",
        answers: [
            { rank: 1, text: "\"I need to buy a new reference book.\"", points: 35 },
            { rank: 2, text: "The college is asking for an extra exam/practical fee.", points: 25 },
            { rank: 3, text: "I need to buy hardware components for my project.", points: 15 },
            { rank: 4, text: "Mess food is terrible, need money for outside food.", points: 10 },
            { rank: 5, text: "I need to upgrade my laptop RAM for coding.", points: 10 },
            { rank: 6, text: "Need money for an official Industrial Visit .", points: 5 }
        ]
    },
    {
        question: "What ACTUALLY happens during a night-out \"Group Study\" session?",
        order: 16,
        category: "College Life",
        answers: [
            { rank: 1, text: "Gossiping about classmates and professors", points: 35 },
            { rank: 2, text: "Ordering fast food / Making midnight Maggi", points: 25 },
            { rank: 3, text: "Watching a movie or random YouTube videos", points: 15 },
            { rank: 4, text: "Playing multiplayer games (BGMI/FIFA/Valorant)", points: 10 },
            { rank: 5, text: "Everyone falling asleep one by one", points: 10 },
            { rank: 6, text: "Actually studying the syllabus", points: 5 }
        ]
    },
    {
        question: "What is the most common reason a student suddenly starts attending ALL lectures?",
        order: 17,
        category: "College Life",
        answers: [
            { rank: 1, text: "Received a defaulter / low attendance warning", points: 35 },
            { rank: 2, text: "The professor threatened to fail them in internals", points: 25 },
            { rank: 3, text: "Their crush attends that specific lecture", points: 15 },
            { rank: 4, text: "Internal assessment/Unit tests are next week", points: 10 },
            { rank: 5, text: "Parents were called by the HOD", points: 10 },
            { rank: 6, text: "They genuinely want to learn", points: 5 }
        ]
    },
    {
        question: "Name something you will ALWAYS find written or carved on a college last bench.",
        order: 18,
        category: "College Life",
        answers: [
            { rank: 1, text: "Random names with a heart / Crush's name", points: 35 },
            { rank: 2, text: "Answers or formulas for cheating in exams", points: 25 },
            { rank: 3, text: "Instagram handles / Snapchat IDs", points: 15 },
            { rank: 4, text: "Abusive words for the college or strict professors", points: 10 },
            { rank: 5, text: "Tick-Tack-Toe (Zero Kata) games", points: 10 },
            { rank: 6, text: "Abstract art / Random scribbling", points: 5 }
        ]
    },
    {
        question: "What is the first thing students check after an exam ends?",
        order: 19,
        category: "College Life",
        answers: [
            { rank: 1, text: "Answers with friends", points: 35 },
            { rank: 2, text: "The question paper", points: 25 },
            { rank: 3, text: "Messages on their phone", points: 15 },
            { rank: 4, text: "The next exam date", points: 10 },
            { rank: 5, text: "How many marks they may get", points: 10 },
            { rank: 6, text: "Whether attendance was taken", points: 5 }
        ]
    },
    {
        question: "Name something students do when the college announces a holiday.",
        order: 20,
        category: "College Life",
        answers: [
            { rank: 1, text: "Sleep longer", points: 35 },
            { rank: 2, text: "Make plans with friends", points: 25 },
            { rank: 3, text: "Watch movies or series", points: 15 },
            { rank: 4, text: "Visit family", points: 10 },
            { rank: 5, text: "Play video games", points: 10 },
            { rank: 6, text: "Finish pending assignments", points: 5 }
        ]
    },
    {
        question: "What is something students commonly borrow from classmates?",
        order: 21,
        category: "College Life",
        answers: [
            { rank: 1, text: "Pen", points: 35 },
            { rank: 2, text: "Class notes", points: 25 },
            { rank: 3, text: "Charger", points: 15 },
            { rank: 4, text: "Calculator", points: 10 },
            { rank: 5, text: "Lab coat or apron", points: 10 },
            { rank: 6, text: "Money", points: 5 }
        ]
    },
    {
        question: "Name a reason students rush into class just before attendance.",
        order: 22,
        category: "College Life",
        answers: [
            { rank: 1, text: "Woke up late", points: 35 },
            { rank: 2, text: "Missed the earlier bus/train", points: 25 },
            { rank: 3, text: "Got ready slowly", points: 15 },
            { rank: 4, text: "Traffic jam", points: 10 },
            { rank: 5, text: "Forgot the timetable", points: 10 },
            { rank: 6, text: "Was chatting with friends", points: 5 }
        ]
    },
    {
        question: "What is something students do in a computer lab when the internet stops working?",
        order: 23,
        category: "College Life",
        answers: [
            { rank: 1, text: "Refresh the page", points: 35 },
            { rank: 2, text: "Ask the lab assistant", points: 25 },
            { rank: 3, text: "Use mobile data", points: 15 },
            { rank: 4, text: "Talk to friends", points: 10 },
            { rank: 5, text: "Wait for it to return", points: 10 },
            { rank: 6, text: "Restart the computer", points: 5 }
        ]
    },
    {
        question: "Name something students usually do the night before a submission.",
        order: 24,
        category: "College Life",
        answers: [
            { rank: 1, text: "Work all night", points: 35 },
            { rank: 2, text: "Ask for an extension", points: 25 },
            { rank: 3, text: "Borrow a laptop or charger", points: 15 },
            { rank: 4, text: "Print the report", points: 10 },
            { rank: 5, text: "Fix formatting", points: 10 },
            { rank: 6, text: "Message group members", points: 5 }
        ]
    },
    {
        question: "What is a common reason a college group project becomes stressful?",
        order: 25,
        category: "College Life",
        answers: [
            { rank: 1, text: "Members do not contribute equally", points: 35 },
            { rank: 2, text: "Someone misses deadlines", points: 25 },
            { rank: 3, text: "Poor communication", points: 15 },
            { rank: 4, text: "Last-minute changes", points: 10 },
            { rank: 5, text: "Conflicts over ideas", points: 10 },
            { rank: 6, text: "Unclear task distribution", points: 5 }
        ]
    },
    {
        question: "Name something students do during a free lecture.",
        order: 26,
        category: "College Life",
        answers: [
            { rank: 1, text: "Chat with friends", points: 35 },
            { rank: 2, text: "Use social media", points: 25 },
            { rank: 3, text: "Sleep", points: 15 },
            { rank: 4, text: "Visit the canteen", points: 10 },
            { rank: 5, text: "Study for another subject", points: 10 },
            { rank: 6, text: "Play games", points: 5 }
        ]
    },
    {
        question: "What is something students worry about at the start of a new semester?",
        order: 27,
        category: "College Life",
        answers: [
            { rank: 1, text: "Attendance shortage", points: 35 },
            { rank: 2, text: "Difficult subjects", points: 25 },
            { rank: 3, text: "New timetable", points: 15 },
            { rank: 4, text: "Internal exams", points: 10 },
            { rank: 5, text: "Project deadlines", points: 10 },
            { rank: 6, text: "Making new friends", points: 5 }
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

    // 15 Official Roles from Master Rulebook
    { 
        category: "role", 
        text: "The Industrial Tycoon", 
        img: "🏭", 
        desc: "[Perk: Red notes -50% cost | Constraint: Must place ≥3 Green notes at 2x cost]", 
        sfxId: "sfx-architect" 
    },
    { 
        category: "role", 
        text: "The Eco-Visionary", 
        img: "🌱", 
        desc: "[Perk: All Green notes free | Constraint: No Red notes within 2 blocks of River/Yellow]", 
        sfxId: "sfx-vip" 
    },
    { 
        category: "role", 
        text: "The Tech Mogul", 
        img: "💻", 
        desc: "[Perk: Blue notes 2x points | Constraint: Starting Base Budget slashed by 20%]", 
        sfxId: "sfx-hacker" 
    },
    { 
        category: "role", 
        text: "The Real Estate Shark", 
        img: "🏙️", 
        desc: "[Perk: 4 Yellow notes free | Constraint: All Yellow notes in 1 giant connected block]", 
        sfxId: "sfx-architect" 
    },
    { 
        category: "role", 
        text: "The Corrupt Politician", 
        img: "💼", 
        desc: "[Perk: +40L budget bonus | Constraint: Host raids 2 notes 2m before end; fix in 120s]", 
        sfxId: "sfx-corrupt" 
    },
    { 
        category: "role", 
        text: "The Crisis Manager", 
        img: "🚨", 
        desc: "[Perk: Build on River/Highway edges | Constraint: Round ends 5m early (at 25m)]", 
        sfxId: "sfx-auditor" 
    },
    { 
        category: "role", 
        text: "The Speedrunner", 
        img: "⚡", 
        desc: "[Perk: +50L budget bonus | Constraint: Only 15 Minutes to complete map]", 
        sfxId: "sfx-thief" 
    },
    { 
        category: "role", 
        text: "The Philanthropist", 
        img: "🤝", 
        desc: "[Perk: Equal Yellow & Blue gives +20 pts | Constraint: Red notes cost 2x]", 
        sfxId: "sfx-vip" 
    },
    { 
        category: "role", 
        text: "The Logistics Master", 
        img: "🚛", 
        desc: "[Perk: Immune to pollution penalties | Constraint: 2-grid wide Mega Highway left empty]", 
        sfxId: "sfx-auditor" 
    },
    { 
        category: "role", 
        text: "The Perfectionist", 
        img: "📐", 
        desc: "[Perk: Symmetrical design gets 1.5x score | Constraint: Asymmetry loses 30% points]", 
        sfxId: "sfx-architect" 
    },
    { 
        category: "role", 
        text: "The Suburb Developer", 
        img: "🏡", 
        desc: "[Perk: Yellow notes cost 50% less | Constraint: Completely banned from Blue notes]", 
        sfxId: "sfx-architect" 
    },
    { 
        category: "role", 
        text: "The Megacity Mayor", 
        img: "👑", 
        desc: "[Perk: Unlimited Funds | Constraint: Must cover ≥80% of A3 Grid or disqualified]", 
        sfxId: "sfx-vip" 
    },
    { 
        category: "role", 
        text: "The Tourist Trap", 
        img: "🎡", 
        desc: "[Perk: 1 Green note gives 1 Yellow free | Constraint: Red & Blue clustered in 1 corner]", 
        sfxId: "sfx-thief" 
    },
    { 
        category: "role", 
        text: "The Underdog", 
        img: "🥊", 
        desc: "[Perk: Least budget spent gets Round 3 wildcard | Constraint: Starts with only 50% budget]", 
        sfxId: "sfx-hacker" 
    },
    { 
        category: "role", 
        text: "The Dictator", 
        img: "🎖️", 
        desc: "[Perk: Ignore standard zoning logic | Constraint: Cannot place any Green notes]", 
        sfxId: "sfx-corrupt" 
    }
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

// Master 42 Verified Teams (Pool A: 1-21, Pool B: 22-42)
const officialTeams = [
    { teamNumber: 1, teamName: "Supermovaa" },
    { teamNumber: 2, teamName: "Team Rocket" },
    { teamNumber: 3, teamName: "Team harmony" },
    { teamNumber: 4, teamName: "Fab 3" },
    { teamNumber: 5, teamName: "Team Alpha" },
    { teamNumber: 6, teamName: "Og's" },
    { teamNumber: 7, teamName: "H.K.TTECH" },
    { teamNumber: 8, teamName: "TriNova" },
    { teamNumber: 9, teamName: "Badshah boys" },
    { teamNumber: 10, teamName: "Dedar Fast" },
    { teamNumber: 11, teamName: "Project Alchemists" },
    { teamNumber: 12, teamName: "Cmkar kadam's Squad" },
    { teamNumber: 13, teamName: "Elite duo" },
    { teamNumber: 14, teamName: "Elite duo 1" },
    { teamNumber: 15, teamName: "Master planers" },
    { teamNumber: 16, teamName: "TriTech" },
    { teamNumber: 17, teamName: "Sanika Panchal's Squad" },
    { teamNumber: 18, teamName: "Anushka Kori's Squad" },
    { teamNumber: 19, teamName: "Civil Titans" },
    { teamNumber: 20, teamName: "Civil Titans 1" },
    { teamNumber: 21, teamName: "Sakshi and Priya" },
    { teamNumber: 22, teamName: "Kuchupuchu" },
    { teamNumber: 23, teamName: "ACDC" },
    { teamNumber: 24, teamName: "Rising stars" },
    { teamNumber: 25, teamName: "Novacode" },
    { teamNumber: 26, teamName: "Cyberpulse" },
    { teamNumber: 27, teamName: "TEAM CHEETAH" },
    { teamNumber: 28, teamName: "Trio" },
    { teamNumber: 29, teamName: "Siddharth Shejwal's Squad" },
    { teamNumber: 30, teamName: "GxdL(Tag)" },
    { teamNumber: 31, teamName: "Mechanic" },
    { teamNumber: 32, teamName: "Prakshata grp" },
    { teamNumber: 33, teamName: "Team IT" },
    { teamNumber: 34, teamName: "Team rocket 1" },
    { teamNumber: 35, teamName: "The crew" },
    { teamNumber: 36, teamName: "Dhurandar" },
    { teamNumber: 37, teamName: "Chronos" },
    { teamNumber: 38, teamName: "Power rangers SPD" },
    { teamNumber: 39, teamName: "MegaX" },
    { teamNumber: 40, teamName: "Team Mech" },
    { teamNumber: 41, teamName: "Team bsquare" },
    { teamNumber: 42, teamName: "Team Civil" }
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

        // Round 1 - Always synchronize to match the complete 19 questions
        const r1Count = await Round1Question.countDocuments();
        if (r1Count !== round1Questions.length) {
            await Round1Question.deleteMany({});
            await Round1Question.insertMany(round1Questions);
            console.log(`✅ Seeded ${round1Questions.length} Round 1 Questions from master bank`);
        } else {
            console.log(`ℹ️ Round 1 Questions already up to date (${r1Count} found)`);
        }

        // Round 2
        const r2Count = await Round2Option.countDocuments();
        if (r2Count !== round2Options.length) {
            await Round2Option.deleteMany({});
            await Round2Option.insertMany(round2Options);
            console.log(`✅ Seeded ${round2Options.length} Round 2 Options (including 15 official roles)`);
        } else {
            console.log(`ℹ️ Round 2 Options already up to date (${r2Count} found)`);
        }

        // Round 3
        const r3Count = await Round3Puzzle.countDocuments();
        if (r3Count === 0) {
            await Round3Puzzle.insertMany(round3Puzzles);
            console.log(`✅ Seeded ${round3Puzzles.length} Round 3 Puzzles`);
        } else {
            console.log(`ℹ️ Round 3 Puzzles already exist (${r3Count} found)`);
        }

        // Master 42 Teams Seeding (Pool A: 1-21, Pool B: 22-42)
        const teamCount = await Team.countDocuments();
        if (teamCount < officialTeams.length) {
            for (const t of officialTeams) {
                const existing = await Team.findOne({ teamNumber: t.teamNumber });
                if (!existing) {
                    await Team.create(t);
                } else if (existing.teamName !== t.teamName) {
                    existing.teamName = t.teamName;
                    await existing.save();
                }
            }
            console.log(`✅ Seeded / Verified 42 Official Teams from Master List`);
        } else {
            console.log(`ℹ️ Teams already up to date (${teamCount} found)`);
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
