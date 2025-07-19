import { Event, Category } from '../types';
import { categorizeEvent } from './categorizationService';
// in-memory "database"
let events: Event[] = [];
let currentId = 1;

export const getAllEvents = (): Event[] => {
    // Sort events by date and then by time
    return [...events].sort((a, b) => {
        const dateTimeA = new Date(`${a.date}T${a.time}`);
        const dateTimeB = new Date(`${b.date}T${b.time}`);
        return dateTimeA.getTime() - dateTimeB.getTime();
    });
};

export const createEvent = (data: { title: string, date: string, time: string, notes?: string }): Event => {
    const category = categorizeEvent(data.title, data.notes);
    const newEvent: Event = {
        id: (currentId++).toString(),
        archived: false,
        category,
        ...data,
    };
    events.push(newEvent);
    return newEvent;
};

export const findEventById = (id: string): Event | undefined => {
    return events.find(event => event.id === id);
};

export const archiveEvent = (id: string): Event | null => {
    const eventIndex = events.findIndex(event => event.id === id);
    if (eventIndex === -1) {
        return null; // Not found
    }
    events[eventIndex].archived = true;
    return events[eventIndex];
};

export const deleteEvent = (id: string): boolean => {
    const initialLength = events.length;
    events = events.filter(event => event.id !== id);
    return events.length < initialLength; // true if an event was deleted
};