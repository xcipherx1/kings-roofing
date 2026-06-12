import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import CertificationsSection from "@/components/certifications-section";
import AboutSection from "@/components/about-section";
import ReviewsSection from "@/components/reviews-section";
import ServicesSection from "@/components/services-section";
import ServiceDetailSection from "@/components/service-detail-section";
import ProjectsSection from "@/components/projects-section";
import PartnersSection from "@/components/partners-section";
import WhyChooseUsSection from "@/components/whychooseus-section";
import ProcessSection from "@/components/process-section";
import WhoWeServeSection from "@/components/whoweserve-section";
import ServiceAreasSection from "@/components/serviceareas-section";
import CTASection from "@/components/cta-section";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CertificationsSection />
      <AboutSection />
      <ServicesSection />
      <ServiceDetailSection />
      <ProjectsSection />
      <PartnersSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <WhoWeServeSection />
      <ServiceAreasSection />
      <ReviewsSection />
      <CTASection />
      <FAQSection />
      <Footer />
    </main>
  );
}
