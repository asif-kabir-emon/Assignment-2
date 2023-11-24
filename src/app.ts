import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoute } from './app/modules/User/User.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/users', UserRoute);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world');
});

export default app;
