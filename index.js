const express = require("express");
var https = require("https");
var http = require("http")
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
var dbURI = process.env.MONGODB_URI;
const ChatSchema = require("./models/Chat.js");
// if (process.env.NODE_ENV === 'production'){
//   dbURI = process.env.MONGOLAB_URI
// }
// const jwt = require("jsonwebtoken");

app.get("/teste", async (req,res) => {
  const chats = await ChatSchema.find().limit(100);
  res.json(chats);
})

app.use(
  cors({
    origin: "*",
    methods: ["PUT", "GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const postRoute = require("./routes/posts");
const chatRoute = require("./routes/chat");

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/posts",postRoute);
app.use("/chat",chatRoute);

app.get("/",(req,res)=>{
  res.send(`postellar api ${dbURI}`)
})

mongoose.connect(
  `${dbURI}`,
  {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  },
  () => console.log("connect to mongodb")
);

// app.listen(PORT, () => {
//   console.log(`Listening on ${PORT}`);
// });

var server = http.createServer(app)

server.listen(PORT,()=>{
  console.log(`listening server at ${PORT}`)
})
