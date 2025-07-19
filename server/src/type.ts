export type Category = "Work" | "Personal" | "Other";

export interface Event {
    id: string;
    title: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:MM
    notes?: string; // optional 
    category: Category;
    archived: boolean;
}