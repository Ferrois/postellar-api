const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
// const jwt = require("jsonwebtoken");

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



mongoose.connect(
  "mongodb+srv://ferrois1:ferrois1@cluster0.zxcdq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
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

app.listen(4000, () => {
  console.log("Listening on 4000");
});
