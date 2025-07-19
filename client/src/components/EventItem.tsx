import { motion } from 'framer-motion';
import { Archive, Trash2, Calendar, Clock, FileText } from 'lucide-react';
import { Event } from '../apiService';

interface EventItemProps {
    event: Event;
    onArchive: (id: string) => void;
    onDelete: (id: string) => void;
}

const categoryStyles: Record<Event['category'], { border: string; bg: string }> = {
    Work: { border: 'border-blue-500', bg: 'bg-blue-50' },
    Personal: { border: 'border-green-500', bg: 'bg-green-50' },
    Other: { border: 'border-gray-400', bg: 'bg-gray-50' },
};

export const EventItem = ({ event, onArchive, onDelete }: EventItemProps) => {
    const { border, bg } = categoryStyles[event.category];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className={`p-5 rounded-lg shadow-md border-l-4 ${border} ${bg} ${event.archived ? 'opacity-60' : ''}`}
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {event.date}</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {event.time}</span>
                    </div>
                    {event.notes && (
                        <p className="flex items-start gap-2 mt-3 text-gray-700">
                            <FileText size={14} className="mt-1 flex-shrink-0" />
                            <span>{event.notes}</span>
                        </p>
                    )}
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                    {!event.archived && (
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => onArchive(event.id)} className="p-2 bg-yellow-400 text-white rounded-full hover:bg-yellow-500"><Archive size={16} /></motion.button>
                    )}
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => onDelete(event.id)} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"><Trash2 size={16} /></motion.button>
                </div>
            </div>
        </motion.div>
    );
};