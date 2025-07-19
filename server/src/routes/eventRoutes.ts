import { Router, Request, Response } from 'express';
import {
    getAllEvents,
    createEvent,
    archiveEvent,
    deleteEvent,
    findEventById
} from '../services/eventService';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json(getAllEvents());
});

router.post('/', (req: Request, res: Response) => {
    const { title, date, time, notes } = req.body;
    if (!title || !date || !time) {
        return res.status(400).json({ message: 'Title, date, and time are required' });
    }
    const newEvent = createEvent({ title, date, time, notes });
    res.status(201).json(newEvent);
});

router.put('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedEvent = archiveEvent(id);
    if (!updatedEvent) {
        return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updatedEvent);
});

router.delete('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const wasDeleted = deleteEvent(id);
    if (!wasDeleted) {
        return res.status(404).json({ message: 'Event not found' });
    }
    res.status(204).send();
});

export default router;