"use client";

import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import EventModal from "./EventModal";

const localizer = momentLocalizer(moment);

interface Event {
  _id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  isOnline: boolean;
  meetingLink?: string;
  category: string;
}

const EventsCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events`);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const calendarEvents = events.map((event) => ({
    id: event._id,
    title: event.title,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    resource: event,
  }));

  return (
    <>
      <div className="card p-4">
        <div style={{ height: "600px" }}>
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={(event) => setSelectedEvent(event.resource)}
            style={{ height: "100%" }}
            views={["month", "week", "day", "agenda"]}
          />
        </div>

        <style jsx global>{`
          .rbc-calendar {
            color: var(--text);
            background-color: var(--bg);
          }
          .rbc-header {
            background-color: var(--primary);
            color: var(--text);
            padding: 10px;
            font-weight: bold;
          }
          .rbc-today {
            background-color: var(--secondary);
            opacity: 0.2;
          }
          .rbc-event {
            background-color: var(--secondary);
            color: var(--primary);
            border: none;
          }
          .rbc-selected {
            background-color: var(--secondary-dark);
          }
          .rbc-toolbar button {
            color: var(--text);
            border: 1px solid var(--secondary);
          }
          .rbc-toolbar button:hover {
            background-color: var(--secondary);
            color: var(--primary);
          }
          .rbc-toolbar button.rbc-active {
            background-color: var(--secondary);
            color: var(--primary);
          }
        `}</style>
      </div>

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  );
};

export default EventsCalendar;
