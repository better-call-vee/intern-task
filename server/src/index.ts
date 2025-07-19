import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import eventRoutes from './routes/eventRoutes';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
    origin: 'https://intern-task-ashy.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200
};

app.options('*', cors(corsOptions));

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use('/api/events', eventRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});