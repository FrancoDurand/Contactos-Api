import express from 'express';
import { userRouter } from './routes/user-routes';

const app = express();

const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');

app.use(express.json());
app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});