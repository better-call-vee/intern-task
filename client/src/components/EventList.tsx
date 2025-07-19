import { AnimatePresence } from 'framer-motion';
import { Event } from '../apiService';
import { EventItem } from './EventItem';

interface EventListProps {
    events: Event[];
    onArchive: (id: string) => void;
    onDelete: (id: string) => void;
}

export const EventList = ({ events, onArchive, onDelete }: EventListProps) => {
    if (events.length === 0) {
        return <p className="text-center text-gray-500 mt-10">No events scheduled. Add one above!</p>;
    }

    return (
        <div className="space-y-4">
            <AnimatePresence>
                {events.map((event) => (
                    <EventItem key={event.id} event={event} onArchive={onArchive} onDelete={onDelete} />
                ))}
            </AnimatePresence>
        </div>
    );
};