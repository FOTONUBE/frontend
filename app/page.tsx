// import CTASection from "@/components/cta-section";
import DiscoverSection from '@/components/discover-section'
import FAQSection from '@/components/faq-section'
import FeaturesSection from '@/components/features-section'
import ContactSection from '@/components/home/ContactSection'
import CTASection from '@/components/home/CTASection'
import { HeroMasterclass } from '@/components/home/HeroMasterclass'
import HeroCarousel from '@/components/hero-carousel'
import HowItWorksSection from '@/components/how-it-works-section'
import NewsletterSection from '@/components/newsletter-section'
import TestimonialsSection from '@/components/testimonials-section'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroCarousel />

      {/* <HeroMasterclass /> */}

      <FeaturesSection />

      <HowItWorksSection />

      <DiscoverSection />

      <CTASection />
      {/* <CTASection /> */}

      <TestimonialsSection />

      <FAQSection />

      <ContactSection />

      {/* <NewsletterSection /> */}
    </main>
  )
}
