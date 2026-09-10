import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

function App() {
    const [events, setEvents] = useState([
        {
            id: "1",
            title: "AI Project Post",
            date: "2026-09-10",
        },
        {
            id: "2",
            title: "React Tutorial",
            date: "2026-09-12",
        },
        {
            id: "3",
            title: "College Event",
            date: "2026-09-15",
        },
    ]);

    const handleDateClick = (info) => {
        const title = prompt(
            `Enter post title for ${info.dateStr}:`
        );

        if (!title) {
            return;
        }

        const newEvent = {
            id: String(Date.now()),
            title: title,
            date: info.dateStr,
        };

        setEvents((prevEvents) => [
            ...prevEvents,
            newEvent,
        ]);
    };

    const handleEventClick = (info) => {
        alert(
            `Post: ${info.event.title}\nDate: ${info.event.startStr}`
        );
    };

    const handleEventDrop = (info) => {
        const updatedDate = info.event.startStr;

        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === info.event.id
                    ? {
                          ...event,
                          date: updatedDate,
                      }
                    : event
            )
        );

        alert(
            `"${info.event.title}" rescheduled to ${updatedDate}`
        );
    };

    const handleEventDelete = (eventId) => {
        setEvents((prevEvents) =>
            prevEvents.filter(
                (event) => event.id !== eventId
            )
        );
    };

    return (
        <div className="app">
            <header className="header">
                <h1>Social Media Post Scheduler</h1>

                <p>
                    Schedule, view and manage your posts
                </p>
            </header>

            <main className="calendar-container">

                <div className="instructions">
                    <h2>Interactive Calendar</h2>

                    <p>
                        Click on a date to schedule a new post.
                    </p>

                    <p>
                        Click an existing post to view details.
                    </p>

                    <p>
                        Drag a post to another date to reschedule it.
                    </p>
                </div>

                <FullCalendar
                    plugins={[
                        dayGridPlugin,
                        interactionPlugin,
                    ]}
                    initialView="dayGridMonth"
                    initialDate="2026-09-01"
                    editable={true}
                    selectable={true}
                    events={events}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    eventDrop={handleEventDrop}
                    height="auto"
                />

                <div className="event-list">
                    <h2>Scheduled Posts</h2>

                    {events.length === 0 ? (
                        <p>No posts scheduled.</p>
                    ) : (
                        events.map((event) => (
                            <div
                                className="event-item"
                                key={event.id}
                            >
                                <div>
                                    <strong>
                                        {event.title}
                                    </strong>

                                    <span>
                                        {event.date}
                                    </span>
                                </div>

                                <button
                                    onClick={() =>
                                        handleEventDelete(
                                            event.id
                                        )
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>

            </main>
        </div>
    );
}

export default App;