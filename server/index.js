const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')
require('dotenv').config();

const app = express()
app.use(express.json())
// const corsOptions = {
//   origin: '*',
//   credential: true,
//   optionSuccessStatus: 200
// }

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/api', router)


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});