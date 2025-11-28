import Hero from "@/components/home/Hero";
import MissionVision from "@/components/home/MissionVision";
import QuickLinks from "@/components/home/QuickLinks";
import LatestPosts from "@/components/home/LatestPosts";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <MissionVision />
      <QuickLinks />
      <LatestPosts />
      <Testimonials />
    </>
  );
}
