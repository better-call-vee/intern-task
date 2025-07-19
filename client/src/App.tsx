import { useState, useEffect } from 'react';
import type { Event } from './apiService';
import { getEvents, createEvent, archiveEvent, deleteEvent } from './apiService';
import { EventForm } from './components/EventForm';
import { EventList } from './components/EventList';
import { CalendarDays } from 'lucide-react';

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setError(null);
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
    } catch (err) {
      setError('Failed to load events. Is the backend server running?');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = async (newEventData: { title: string; date: string; time: string; notes?: string }) => {
    try {
      await createEvent(newEventData);
      fetchEvents();
    } catch (err) { setError('Failed to create event.') }
  };

  const handleArchiveEvent = async (id: string) => {
    try {
      await archiveEvent(id);
      fetchEvents();
    } catch (err) { setError('Failed to archive event.') }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteEvent(id);
      fetchEvents();
    } catch (err) { setError('Failed to delete event.') }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-4">
            <CalendarDays className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Mini Event Scheduler</h1>
          </div>
        </div>
      </header>

      <main className="py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <EventForm onAddEvent={handleAddEvent} />
          {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
          <EventList events={events} onArchive={handleArchiveEvent} onDelete={handleDeleteEvent} />
        </div>
      </main>
    </div>
  );
}

export default App;