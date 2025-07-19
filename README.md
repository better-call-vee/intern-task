# Mini Event Scheduler with AI Categorization

A full-stack event scheduling application built with React, Node.js, TypeScript, and Tailwind CSS. This project allows users to manage their events and leverages a smart, weighted-keyword algorithm to automatically categorize events as "Work," "Personal," or "Other."

---

### ✨ Live Demo

**[https://intern-task-ashy.vercel.app/]** 👈

---

### ## Features

- **Full CRUD Functionality:** Create, read, update (archive), and delete events.
- **Smart AI-like Categorization:** A weighted-keyword scoring system intelligently assigns a category to each new event.
- **Responsive Design:** A clean and modern UI styled with Tailwind CSS that works on all screen sizes.
- **Dynamic Filtering:** Filter events on the frontend by category ("All," "Work," "Personal," "Other").
- **Smooth Animations:** User-friendly animations for adding, deleting, and hovering over events, powered by Framer Motion.
- **Unit Tested:** The backend categorization logic is verified with a full suite of Jest unit tests.

---

### ## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React
- **Backend:** Node.js, Express, TypeScript
- **Testing:** Jest, ts-jest

---

### ## Local Setup & Run

1.  **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd event-scheduler-intern-task
    ```

2.  **Setup the Backend:**

    ```bash
    cd server
    npm install
    npm run dev
    ```

    The backend will be running on `http://localhost:3001`.

3.  **Setup the Frontend:**
    ```bash
    # Open a new terminal
    cd client
    npm install
    npm run dev
    ```
    The frontend will be running on `http://localhost:5173`.

---

### ## API Endpoints

| Method   | Endpoint          | Description                 |
| :------- | :---------------- | :-------------------------- |
| `GET`    | `/api/events`     | Retrieve all events, sorted |
| `POST`   | `/api/events`     | Create a new event          |
| `PUT`    | `/api/events/:id` | Archive an event            |
| `DELETE` | `/api/events/:id` | Delete an event             |
