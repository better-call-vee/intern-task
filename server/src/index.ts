
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import eventRoutes from './routes/eventRoutes';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Telling Express to use our event routes for any request to /api/events
app.use('/api/events', eventRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});