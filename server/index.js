import express from 'express';
import cors from 'cors';
// import bodyParser from 'body-parser';
import authenticate from './auth/authenticate.js'; // Adjust the path if necessary
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json({ limit: '10mb' }));
// app.use(bodyParser.json())
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const corsOptions = {
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200
};


app.use(cors(corsOptions))

import signupRouter from './routes/signup.js';
import loginRouter from './routes/login.js';
import refreshTokenRouter from './routes/refreshToken.js';
import userRouter from './routes/user.js';
import signoutRouter from './routes/signout.js';
import citiesRouter from './routes/cities.js';
import favsRouter from './routes/favs.js';
import travelsRouter from './routes/userTravels.js';
import itinerarioRouter from './routes/itinerario.js';

app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);
app.use('/api/refresh-token', refreshTokenRouter);
app.use('/api/user', authenticate, userRouter); // Protected route
app.use('/api/signout', signoutRouter);
app.use('/api/cities', citiesRouter);
app.use('/api/favs', favsRouter);
app.use('/api/user-travels', travelsRouter)
app.use('/api/itinerario', itinerarioRouter)



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});