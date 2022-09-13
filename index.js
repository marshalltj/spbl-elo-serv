/*
SERVER TODO:
  -Better Logging
  -Clean up routes 
  -Comments for routes 
  -readme update for routes and new DB diagram
*/
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const playersRouter = require("./routes/players");
const eventsRouter = require("./routes/events");
const teamsRouter = require("./routes/teams");
var cors = require('cors');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/players", playersRouter);
app.use("/events", eventsRouter);
app.use("/teams", teamsRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`SPBL server app listening at http://localhost:${port}`);
});