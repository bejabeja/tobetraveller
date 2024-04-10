const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const authenticate = require('./auth/authenticate');
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

app.use('/api/signup', require('./routes/signup'));
app.use('/api/login', require('./routes/login'));
app.use('/api/refresh-token', require('./routes/refreshToken'));
app.use('/api/user', authenticate, require('./routes/user')); //ruta protegida
app.use('/api/signout', require('./routes/signout'))
app.use('/api/cities', require('./routes/cities'))


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});