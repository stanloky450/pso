import EventsCalendar from "@/components/events/EventsCalendar";
import UpcomingEvents from "@/components/events/UpcomingEvents";

export const metadata = {
  title: "Events | Pastor Sola Olukoya Ministry",
  description: "Stay updated with our upcoming events, conferences, and programs",
};

export default function EventsPage() {
  return (
    <div className="pt-20" style={{ backgroundColor: "var(--bg-dark)" }}>
      <div className="section-container">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: "var(--text)" }}>
            Upcoming <span className="gradient-text">Events</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Join us for life-transforming services, conferences, and special programs
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <EventsCalendar />
          </div>
          <div>
            <UpcomingEvents />
          </div>
        </div>
      </div>
    </div>
  );
}
