import Hero from "@/components/home/Hero";
import MissionVision from "@/components/home/MissionVision";
import QuickLinks from "@/components/home/QuickLinks";
import LatestPosts from "@/components/home/LatestPosts";
import Testimonials from "@/components/home/Testimonials";
import NewsletterSubscription from "@/components/ui/NewsletterSubscription";

export default function Home() {
  return (
    <>
      <Hero />
      <MissionVision />
      <QuickLinks />
      <LatestPosts />
      <Testimonials />
      <section className="section-container">
        <NewsletterSubscription />
      </section>
    </>
  );
}
