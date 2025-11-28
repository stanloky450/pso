import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import LocationMap from "@/components/contact/LocationMap";

export const metadata = {
  title: "Contact Us | Pastor Sola Olukoya Ministry",
  description: "Get in touch with Pastor Sola Olukoya's ministry - We'd love to hear from you",
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <ContactHero />
      <div className="section-container bg-primary-dark">
        <div className="grid lg:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
      <LocationMap />
    </div>
  );
}
