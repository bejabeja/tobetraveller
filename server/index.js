const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')
require('dotenv').config();

const app = express();
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const corsOptions = {
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200
};


app.use(cors(corsOptions))
app.use('/api', router)

console.log(corsOptions)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});