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

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  // Always send the current question
  const sendCurrentQuestion = () => {
    const question = questions[currentQuestionIndex];
    question.options.forEach(o => o.votes = 0); // reset votes
    question.userVotes = {};
    socket.emit("question", question);
  };

  sendCurrentQuestion();

  // Handle voting
  socket.on("vote", (optionId) => {
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

  // Handle next question
  socket.on("nextQuestion", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
      currentQuestionIndex = 0; // loop to first question
    }
    sendCurrentQuestion();
  });

  socket.on("disconnect", () => console.log("User disconnected: " + socket.id));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
