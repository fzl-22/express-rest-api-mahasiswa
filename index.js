require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");

// server configuration
const app = express();
const port = process.env.PORT;

// importr library CORS
const cors = require("cors");

// use CORS
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// import router mahasiswa
const mahasiswaRouter = require("./routes/mahasiswa.route");

// use Router middleware
app.use('/api/mahasiswa', mahasiswaRouter);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
