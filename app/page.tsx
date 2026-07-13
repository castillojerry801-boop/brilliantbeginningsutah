import Navbar from "@/app/components/sections/Navbar";
import Hero from "@/app/components/sections/Hero";
import TrustStrip from "@/app/components/sections/TrustStrip";
import Services from "@/app/components/sections/Services";
import WhyChooseUs from "@/app/components/sections/WhyChooseUs";
import Testimonials from "@/app/components/sections/Testimonials";
import ServiceArea from "@/app/components/sections/ServiceArea";
import ContactForm from "@/app/components/sections/ContactForm";
import FAQ from "@/app/components/sections/FAQ";
import Footer from "@/app/components/sections/Footer";
import MobileCTA from "@/app/components/ui/MobileCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">
        <Hero />
        <TrustStrip />
        <Services />
        <WhyChooseUs />
        <Testimonials />
        <ServiceArea />
        <ContactForm />
        <FAQ />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
