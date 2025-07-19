import { Event, Category } from '../types';
import { categorizeEvent } from './categorizationService';
// in-memory "database"
let events: Event[] = [
    {
        id: '1',
        title: 'Project Deadline: Event Scheduler',
        date: '2025-07-21',
        time: '23:59',
        notes: 'Final commit and submission for the internship task.',
        category: 'Work',
        archived: false,
    },
    {
        id: '2',
        title: 'Mimi\'s Birthday',
        date: '2025-08-29',
        time: '19:00',
        notes: 'Celebrate at the new cafe downtown. Don\'t forget the gift!',
        category: 'Personal',
        archived: false,
    },
    {
        id: '3',
        title: 'Weekly Sprint Meeting',
        date: '2025-07-22',
        time: '10:00',
        notes: 'Discuss progress on the MERN stack project.',
        category: 'Work',
        archived: true,
    },
    {
        id: '4',
        title: 'Doctor Appointment',
        date: '2025-07-30',
        time: '11:30',
        notes: 'Annual check-up.',
        category: 'Personal',
        archived: false,
    },
    {
        id: '5',
        title: 'Buy Groceries',
        date: '2025-07-20',
        time: '18:00',
        notes: 'Milk, eggs, bread, and chicken.',
        category: 'Other',
        archived: true,
    },
    {
        id: '6',
        title: 'Client Call - Project Alpha',
        date: '2025-07-24',
        time: '15:00',
        notes: 'Follow-up call with the client about new feature requests.',
        category: 'Work',
        archived: false,
    },
    {
        id: '7',
        title: 'Gym Session',
        date: '2025-07-22',
        time: '07:00',
        notes: 'Leg day.',
        category: 'Personal',
        archived: false,
    },
    {
        id: '8',
        title: 'Pay Internet Bill',
        date: '2025-07-25',
        time: '12:00',
        notes: 'Due before the end of the day.',
        category: 'Other',
        archived: false,
    },
    {
        id: '9',
        title: 'Study for University Exams',
        date: '2025-07-28',
        time: '20:00',
        notes: 'Focus on Data Structures and Algorithms.',
        category: 'Work',
        archived: false,
    },
    {
        id: '10',
        title: 'Family Dinner',
        date: '2025-08-02',
        time: '20:30',
        notes: 'Family gathering at home in Khulna.',
        category: 'Personal',
        archived: false,
    },
    {
        id: '11',
        title: 'Car Service',
        date: '2025-09-05',
        time: '09:00',
        notes: 'Oil change and tire rotation.',
        category: 'Other',
        archived: false,
    },
    {
        id: '12',
        title: 'Plan Weekend Trip',
        date: '2025-08-08',
        time: '18:00',
        notes: 'Look up destinations and book accommodation.',
        category: 'Personal',
        archived: false,
    }
];

let currentId = 13;

export const getAllEvents = (): Event[] => {
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
    return events.length < initialLength; 
};