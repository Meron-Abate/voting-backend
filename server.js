// server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

// Express-level CORS (for any REST routes you may add)
app.use(cors({
  origin: "https://eternalchristmas.netlify.app",
  methods: ["GET", "POST"],
  credentials: true
}));

const server = http.createServer(app);

// --- Socket.IO with proper CORS and transports ---
const io = new Server(server, {
  cors: {
    origin: "https://eternalchristmas.netlify.app",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket", "polling"] // enable polling for Render/Netlify compatibility
});

// --- Sample Questions ---
let questions = [
  {
    id: 1,
    question: "Who is most likely to survive a zombie apocalypse?",
    options: [
      { id: 1, name: "Alice", votes: 0 },
      { id: 2, name: "Bob", votes: 0 },
      { id: 3, name: "Charlie", votes: 0 },
      { id: 4, name: "Diana", votes: 0 },
    ],
    userVotes: {}
  },
  {
    id: 2,
    question: "Who tells the funniest jokes?",
    options: [
      { id: 1, name: "Alice", votes: 0 },
      { id: 2, name: "Bob", votes: 0 },
      { id: 3, name: "Charlie", votes: 0 },
      { id: 4, name: "Diana", votes: 0 },
    ],
    userVotes: {}
  },
  {
    id: 3,
    question: "Who is most likely to become famous?",
    options: [
      { id: 1, name: "Alice", votes: 0 },
      { id: 2, name: "Bob", votes: 0 },
      { id: 3, name: "Charlie", votes: 0 },
      { id: 4, name: "Diana", votes: 0 },
    ],
    userVotes: {}
  }
];

let currentQuestionIndex = 0;
let hostId = null;
let gameStarted = false;

// --- Helper: Send current question to all clients ---
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

  // Send current question if game already started
  if (gameStarted) socket.emit("question", questions[currentQuestionIndex]);

  // --- Host setup ---
  socket.on("setHost", (pin) => {
    const HOST_PIN = "1234"; // Change to your desired PIN
    if (pin === HOST_PIN && !hostId) {
      hostId = socket.id;
      gameStarted = true;
      console.log("Host connected:", hostId);
      socket.emit("hostConfirmed");
      sendCurrentQuestion(true); // Start first question
    } else {
      socket.emit("hostDenied");
    }
  });

  // --- Voting ---
  socket.on("vote", (optionId) => {
    if (!gameStarted) return;

    const question = questions[currentQuestionIndex];
    const prevVote = question.userVotes[socket.id];

    if (prevVote) {
      const prevOption = question.options.find(o => o.id === prevVote);
      if (prevOption) prevOption.votes -= 1;
    }

    const option = question.options.find(o => o.id === optionId);
    if (option) option.votes += 1;

    question.userVotes[socket.id] = optionId;

    io.emit("votesUpdate", question);
  });

  // --- Next Question (host only) ---
  socket.on("nextQuestion", () => {
    if (socket.id !== hostId) return;

    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) currentQuestionIndex = 0;
    sendCurrentQuestion(true);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    if (socket.id === hostId) {
      console.log("Host disconnected. Game paused.");
      hostId = null;
      gameStarted = false;
      io.emit("gamePaused");
    }
  });
});

// --- Start server ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
