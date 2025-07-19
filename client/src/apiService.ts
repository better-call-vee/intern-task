// Defining the types to match the backend
export type Category = "Work" | "Personal" | "Other";

export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    notes?: string;
    category: Category;
    archived: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getEvents = async (): Promise<Event[]> => {
    const response = await fetch(`${API_BASE_URL}/events`);
    if (!response.ok) throw new Error('Failed to fetch events');
    return response.json();
};

export const createEvent = async (data: { title: string; date: string; time: string; notes?: string }): Promise<Event> => {
    const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create event');
    return response.json();
};

export const archiveEvent = async (id: string): Promise<Event> => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, { method: 'PUT' });
    if (!response.ok) throw new Error('Failed to archive event');
    return response.json();
};

export const deleteEvent = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete event');
};