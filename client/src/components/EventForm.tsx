import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react'; // icons

interface EventFormProps {
    onAddEvent: (event: { title: string; date: string; time: string; notes?: string }) => void;
}

export const EventForm = ({ onAddEvent }: EventFormProps) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!title || !date || !time) {
            alert('Please fill in title, date, and time.');
            return;
        }
        onAddEvent({ title, date, time, notes });
        setTitle('');
        setDate('');
        setTime('');
        setNotes('');
    };

    return (
        <motion.form
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="p-6 mb-8 bg-white rounded-lg shadow-lg"
        >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Event</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                />
            </div>
            <textarea
                placeholder="Notes (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 border rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={3}
            ></textarea>
            <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-md font-bold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
                <PlusCircle size={20} />
                Add Event
            </button>
        </motion.form>
    );
};