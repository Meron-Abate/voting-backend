// server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

// Express-level CORS
app.use(cors({
  origin: "https://eternalchristmas.netlify.app",
  methods: ["GET", "POST"],
  credentials: true
}));

const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: "https://eternalchristmas.netlify.app",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket", "polling"]
});

// --- Questions (your full list unchanged) ---
let questions = [
  {
    id: 1,
    question: "Who controls the office playlist?",
    options: [
      { id: 1, name: "Natty", votes: 0 },
      { id: 2, name: "Bereket Zenebew", votes: 0 },
      { id: 3, name: "Ekram", votes: 0 },
      { id: 4, name: "Minte", votes: 0 },
    ],
    userVotes: {}
  },
  {
    id: 2,
    question: "Who secretly knows everything happening?",
    options: [
      { id: 1, name: "Michu", votes: 0 },
      { id: 2, name: "Daniel Abayneh", votes: 0 },
      { id: 3, name: "Dinberu Getachew", votes: 0 },
      { id: 4, name: "Selam", votes: 0 },
    ],
    userVotes: {}
  },
  {
    id: 3,
    question: "What actually Powers Eternal?",
    options: [
      { id: 1, name: "Coffee", votes: 0 },
      { id: 2, name: "Areqe", votes: 0 },
      { id: 3, name: "Deadlines", votes: 0 },
      { id: 4, name: "Cheru Medehaniyalem", votes: 0 },
    ],
    userVotes: {}
  },
  {
    id: 4,
    question: "Always on their Phone?",
    options: [
      { id: 1, name: "Tobel", votes: 0 },
      { id: 2, name: "Yemaneh", votes: 0 },
      { id: 3, name: "Yonan", votes: 0 },
      { id: 4, name: "Barni", votes: 0 },
    ],
    userVotes: {}
  },
  {
    id: 5,
    question: "Adjusts screens to perfection, every time",
    options: [
      { id: 1, name: "Eyuel Mesfin", votes: 0 },
      { id: 2, name: "Natnael Womdemagegne", votes: 0 },
      { id: 3, name: "Ephrem Mohammed", votes: 0 },
      { id: 4, name: "Yemaneh Yetbarek", votes: 0 },
    ],
    userVotes: {}
  },
  {
    id: 6,
    question: "The king/queen of gambling (cards, office bets,  etc.) ",
    options: [
      { id: 1, name: "Mente", votes: 0 },
      { id: 2, name: "Selam", votes: 0 },
      { id: 3, name: "Yonan", votes: 0 },
      { id: 4, name: "Henok Abayneh", votes: 0 },
    ],
    userVotes: {}
  },
  
    {
    id: 7,
    question: "Most likely to audit your lunch expenses",
    options: [
      { id: 1, name: "Abiyu Teketel", votes: 0 },
    ],
    userVotes: {}
  },

    {
    id: 8,
    question: "Always missing something, but somehow saves the day anyway",
    options: [
      { id: 1, name: "Biniyam Event", votes: 0 },
      { id: 2, name: "Natnael Demeke", votes: 0 },
      { id: 3, name: "Beabsew", votes: 0 },
      
    ],
    userVotes: {}
  },
    {
    id: 9,
    question: "The one that hates being on camera",
    options: [
      { id: 1, name: "Mente", votes: 0 },
      { id: 2, name: "Meron", votes: 0 },
      { id: 3, name: "Eskedar", votes: 0 },
      { id: 4, name: "Dinberu Getachew", votes: 0 },
    ],
    userVotes: {}
  },
     {
    id: 10,
    question: "Who controls the sound, controls the vibe",
    options: [
      { id: 1, name: "Beabsew", votes: 0 },
      { id: 2, name: "Bini", votes: 0 },
      { id: 3, name: "Amen", votes: 0 },
      { id: 4, name: "Abel", votes: 0 },
    ],
    userVotes: {}
  },

      {
    id: 11,
    question: "Fashionably on point",
    options: [
      { id: 1, name: "Michu", votes: 0 },
      { id: 2, name: "Yonathan Birhanu", votes: 0 },
      { id: 3, name: "Yonan", votes: 0 },
      { id: 4, name: "Natnael Demeke", votes: 0 },
    ],
    userVotes: {}
  },
    {
    id: 12,
    question: "Coolest Energy in the room",
    options: [
      { id: 1, name: "Ted", votes: 0 },
      { id: 2, name: "DInberu", votes: 0 },
      { id: 3, name: "Barni", votes: 0 },
      { id: 4, name: "Eskedar", votes: 0 },
    ],
    userVotes: {}
  },
    {
    id: 13,
    question: "The one who always Hangovers",
    options: [
      { id: 1, name: "Biniyam Fantahun", votes: 0 },
      { id: 2, name: "Natnael Demeke", votes: 0 },
      { id: 3, name: "Mankila", votes: 0 },
    ],
    userVotes: {}
  },
    {
    id: 14,
    question: "Master of Chill ( Founders Edition)",
    options: [
      { id: 1, name: "Dinberu", votes: 0 },
      { id: 2, name: "Yoni", votes: 0 },
      { id: 3, name: "Abiyu", votes: 0 },
      { id: 4, name: "G Man", votes: 0 },
    ],
    userVotes: {}
  },
    {
    id: 15,
    question: "Chief Complaint Officer",
    options: [
      { id: 1, name: "Wende", votes: 0 },
      { id: 2, name: "Ephrem Shimeles", votes: 0 },
      { id: 3, name: "Abiy Teketel", votes: 0 },
    ],
    userVotes: {}
  },

      {
    id: 16,
    question: "The calmest in the middle of madness",
    options: [
      { id: 1, name: "Ephrem Mohammed", votes: 0 },
      { id: 2, name: "Natnael WOmdenagegn", votes: 0 },
      { id: 3, name: "Abiy Yetebarek", votes: 0 },
      { id: 4, name: "Biruk Ashagre", votes: 0 },
    ],
    userVotes: {}
  },
    {
    id: 17,
    question: "Who spends so long rendering, they forget what day it is",
    options: [
      { id: 1, name: "Dani Addis", votes: 0 },
      { id: 2, name: "Abenezer Zerihun", votes: 0 },
      { id: 3, name: "Leuelseged", votes: 0 },
      { id: 4, name: "Eyouel", votes: 0 },
    ],
    userVotes: {}
  },

    {
    id: 18,
    question: "Who is always there, but hardly noticed",
    options: [
      { id: 1, name: "Lamrot", votes: 0 },
      { id: 2, name: "Kidus Desalign", votes: 0 },
      { id: 3, name: "Bereket Dereje", votes: 0 },
      { id: 4, name: "Betelehem Girma", votes: 0 },
    ],
    userVotes: {}
  },
    {
    id: 19,
    question: "Who controls the sound, controls the vibe",
    options: [
      { id: 1, name: "Beabsew", votes: 0 },
      { id: 2, name: "Bini", votes: 0 },
      { id: 3, name: "Amen", votes: 0 },
      { id: 4, name: "ABel", votes: 0 },
    ],
    userVotes: {}
  },

 
  

];

let currentQuestionIndex = 0;
let hostId = null;
let gameStarted = false;

// --- Helper: determine winner safely + tie breaker ---
function getWinnerWithTieBreaker(question) {
  const options = question.options;

  // 1. Find highest vote count
  const maxVotes = Math.max(...options.map(o => o.votes));

  // 2. Get all options that have that vote count
  const topCandidates = options.filter(o => o.votes === maxVotes);

  // If only one winner → return normally
  if (topCandidates.length === 1) {
    return topCandidates[0];
  }

  // --- Tie breaker logic ---
  // Pick a RANDOM winner among tied options
  const randomIndex = Math.floor(Math.random() * topCandidates.length);
  const selectedWinner = topCandidates[randomIndex];

  return selectedWinner;
}

// --- Send question (reset votes if needed) ---
const sendCurrentQuestion = (resetVotes = false) => {
  const question = questions[currentQuestionIndex];

  if (resetVotes) {
    question.options.forEach(o => o.votes = 0);
    question.userVotes = {};
  }

  io.emit("question", question);
};

// --- Socket.IO connections ---
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  if (gameStarted) {
    socket.emit("question", questions[currentQuestionIndex]);
  }

  // --- Host authentication ---
  socket.on("setHost", (pin) => {
    const HOST_PIN = "1234";

    if (pin === HOST_PIN && !hostId) {
      hostId = socket.id;
      gameStarted = true;
      socket.emit("hostConfirmed");
      sendCurrentQuestion(true);
    } else {
      socket.emit("hostDenied");
    }
  });

  // --- Voting ---
  socket.on("vote", (optionId) => {
    if (!gameStarted) return;

    const question = questions[currentQuestionIndex];

    // Remove previous vote by this user
    const prevVote = question.userVotes[socket.id];
    if (prevVote !== undefined) {
      const prevOption = question.options.find(o => o.id === prevVote);
      if (prevOption) prevOption.votes -= 1;
    }

    // Add new vote
    const option = question.options.find(o => o.id === optionId);
    if (option) option.votes += 1;

    question.userVotes[socket.id] = optionId;

    io.emit("votesUpdate", question);
  });

  // --- Next Question ---
  socket.on("nextQuestion", () => {
    if (socket.id !== hostId) return;

    const currentQuestion = questions[currentQuestionIndex];

    // Determine winner using tie-breaker
    const winner = getWinnerWithTieBreaker(currentQuestion);

    // Broadcast final winner before moving on
    io.emit("finalWinner", {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      winner
    });

    // Move to next question
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
      currentQuestionIndex = 0;
    }

    sendCurrentQuestion(true);
  });

  // --- Disconnect Handling ---
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    if (socket.id === hostId) {
      hostId = null;
      gameStarted = false;
      io.emit("gamePaused");
    }
  });
});

// --- Start server ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
