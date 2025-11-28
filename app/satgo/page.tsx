import SATGOHero from "@/components/satgo/SATGOHero";
import InitiativesGrid from "@/components/satgo/InitiativesGrid";

export const metadata = {
  title: "SATGO Office - Special Adviser to the General Overseer on Youth Affairs",
  description: "Explore the global youth initiatives led by Pastor Sola Olukoya as SATGO in RCCG",
};

export default function SATGOPage() {
  return (
    <div className="pt-20">
      <SATGOHero />
      <InitiativesGrid />
    </div>
  );
}
