import { useState, useEffect } from 'react';
import type { Event, Category } from './apiService';
import { getEvents, createEvent, archiveEvent, deleteEvent } from './apiService';
import { EventForm } from './components/EventForm';
import { EventList } from './components/EventList';
import { CalendarDays } from 'lucide-react';
import Swal from 'sweetalert2'; // Import SweetAlert2

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [activeFilter, setActiveFilter] = useState<Category | 'All'>('All');
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setError(null);
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
    } catch (err) {
      setError('Failed to load events. Is the backend server running?');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = async (newEventData: { title: string; date: string; time: string; notes?: string }) => {
    try {
      await createEvent(newEventData);
      await fetchEvents();
      Swal.fire({
        title: 'Success!',
        text: 'Your event has been created.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) { setError('Failed to create event.') }
  };

  const handleArchiveEvent = async (id: string) => {
    try {
      await archiveEvent(id);
      await fetchEvents();
      Swal.fire({
        title: 'Archived!',
        text: 'The event has been moved to archives.',
        icon: 'info',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) { setError('Failed to archive event.') }
  };

  const handleDeleteEvent = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteEvent(id);
          await fetchEvents();
          Swal.fire(
            'Deleted!',
            'Your event has been deleted.',
            'success'
          );
        } catch (err) { setError('Failed to delete event.') }
      }
    });
  };

  const filteredEvents = events.filter(event => {
    if (activeFilter === 'All') return true;
    return event.category === activeFilter;
  });

  const filterButtons: (Category | 'All')[] = ['All', 'Work', 'Personal', 'Other'];

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

          <div className="my-6 flex items-center justify-center space-x-2">
            {filterButtons.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${activeFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}

          <EventList events={filteredEvents} onArchive={handleArchiveEvent} onDelete={handleDeleteEvent} />
        </div>
      </main>
    </div>
  );
}

export default App;