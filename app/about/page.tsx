import Biography from "@/components/about/Biography";
import CoreBeliefs from "@/components/about/CoreBeliefs";
import MinistryHistory from "@/components/about/MinistryHistory";
import PublishedBooks from "@/components/about/PublishedBooks";
import TeamSection from "@/components/about/TeamSection";

export const metadata = {
  title: "About Pastor Sola Olukoya | Biography & Ministry",
  description: "Learn about Pastor Sola Olukoya's journey, education, ministry achievements, and his role as SATGO in RCCG",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <Biography />
      <CoreBeliefs />
      <MinistryHistory />
      <PublishedBooks />
      <TeamSection />
    </div>
  );
}
