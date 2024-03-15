import express from 'express';
import cors from 'cors';
import auction from './routers/auctions.js';
import { subscribeEmail } from './routers/subscribeEmail.js';
import authenticateToken from './middleware/auth.js';
import userRouter from './routers/userRouter.js';

const app = express();

const router = express.Router();
app.use(express.json());
const allowedOrigins = ['https://bidly-auction-project-delta.vercel.app'];
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }))

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next();
});

// Protected routes
app.use('/auction', authenticateToken, auction);
app.use('/user', authenticateToken, userRouter)
app.post('/newsletter/subscribe', authenticateToken, (req, res) => subscribeEmail(req, res));

app.listen(3001, () => {
    console.log(`Server running on PORT: ${3001}`);
});
