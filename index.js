const express = require("express");
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 3001;
const MONGOURL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/visits';
mongoose.Promise = global.Promise;

mongoose.connect(MONGOURL, { useNewUrlParser: true }, err => {
  if (err) {
    console.error(`Error connecting to MongoDB:`, err.stack);
    console.log('Process exiting with code 1');
    process.exit(1);
  }
  console.log('Connected to DB successfully!');
});


const routes = require("./routes");

app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({
    error: false,
    message: "Server responding"
  });
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
