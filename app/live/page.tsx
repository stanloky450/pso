import LiveStream from "@/components/ui/LiveStream";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import { FaBroadcastTower } from "react-icons/fa";

export const metadata = {
  title: "Live Service | Pastor Sola Olukoya Ministry",
  description: "Watch our live services and events online",
};

export default function LivePage() {
  return (
    <div className="pt-20" style={{ backgroundColor: "var(--bg-dark)" }}>
      <div className="section-container">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{ backgroundColor: "var(--secondary)" }}
          >
            <FaBroadcastTower className="text-4xl" style={{ color: "var(--primary)" }} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: "var(--text)" }}>
            Live <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Join us online for powerful worship, teaching, and encounters with God
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Replace empty string with actual YouTube video ID when live */}
            <LiveStream
              youtubeVideoId=""
              isLive={false}
              title="Sunday Service - Live"
              viewerCount={0}
            />

            {/* Service Information */}
            <div className="card mt-8">
              <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--secondary)" }}>
                Service Times
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--bg-dark)" }}>
                  <h4 className="font-bold mb-2" style={{ color: "var(--text)" }}>
                    Sunday Service
                  </h4>
                  <p style={{ color: "var(--text-muted)" }}>
                    First Service: 8:00 AM WAT
                    <br />
                    Second Service: 10:00 AM WAT
                  </p>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--bg-dark)" }}>
                  <h4 className="font-bold mb-2" style={{ color: "var(--text)" }}>
                    Midweek Service
                  </h4>
                  <p style={{ color: "var(--text-muted)" }}>Wednesday: 6:00 PM WAT</p>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--bg-dark)" }}>
                  <h4 className="font-bold mb-2" style={{ color: "var(--text)" }}>
                    Youth Service
                  </h4>
                  <p style={{ color: "var(--text-muted)" }}>Friday: 7:00 PM WAT</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <UpcomingEvents />
          </div>
        </div>
      </div>
    </div>
  );
}
