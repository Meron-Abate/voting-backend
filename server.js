const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

// Sample Questions
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
  },
  {
    id: 4,
    question: "Who is most likely to eat dessert first?",
    options: [
      { id: 1, name: "Alice", votes: 0 },
      { id: 2, name: "Bob", votes: 0 },
      { id: 3, name: "Charlie", votes: 0 },
      { id: 4, name: "Diana", votes: 0 },
    ],
    userVotes: {}
  },
  {
    id: 5,
    question: "Who is the most adventurous?",
    options: [
      { id: 1, name: "Alice", votes: 0 },
      { id: 2, name: "Bob", votes: 0 },
      { id: 3, name: "Charlie", votes: 0 },
      { id: 4, name: "Diana", votes: 0 },
    ],
    userVotes: {}
  },
];

let currentQuestionIndex = 0;

// Helper: send current question
const sendCurrentQuestion = (resetVotes = false) => {
  const question = questions[currentQuestionIndex];

  if (resetVotes) {
    // Reset votes only when moving to next question
    question.options.forEach(o => o.votes = 0);
    question.userVotes = {};
  }

  io.emit("question", question); // broadcast to everyone
};

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  // Send current question to this new user (do NOT reset votes)
  socket.emit("question", questions[currentQuestionIndex]);

  // Handle voting
  socket.on("vote", (optionId) => {
    const question = questions[currentQuestionIndex];
    const prevVote = question.userVotes[socket.id];

    // Remove previous vote
    if (prevVote) {
      const prevOption = question.options.find(o => o.id === prevVote);
      if (prevOption) prevOption.votes -= 1;
    }

    // Add new vote
    const option = question.options.find(o => o.id === optionId);
    if (option) option.votes += 1;

    // Update user's vote
    question.userVotes[socket.id] = optionId;

    // Broadcast updated votes to all clients
    io.emit("votesUpdate", question);
  });

  // Handle next question
  socket.on("nextQuestion", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) currentQuestionIndex = 0;

    sendCurrentQuestion(true); // reset votes for new question
  });

  socket.on("disconnect", () => console.log("User disconnected: " + socket.id));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
