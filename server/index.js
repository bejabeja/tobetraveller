import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import authenticate from './auth/authenticate.js';

import citiesRouter from './routes/cities.route.js';
import favsRouter from './routes/favs.route.js';
import itinerarioRouter from './routes/itinerario.js';
import loginRouter from './routes/login.route.js';
import logoutRouter from './routes/logout.js';
import refreshTokenRouter from './routes/refreshToken.route.js';
import signupRouter from './routes/signup.route.js';
import userRouter from './routes/user.js';
import travelsRouter from './routes/plannedTravels.route.js';


dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const corsOptions = {
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions))


app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);
app.use('/api/refresh-token', refreshTokenRouter);
app.use('/api/user', authenticate, userRouter); // Protected route
app.use('/api/logout', logoutRouter);
app.use('/api/cities', citiesRouter);
app.use('/api/favs', favsRouter);
app.use('/api/planned-travels', travelsRouter)
app.use('/api/itinerario', itinerarioRouter)



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});