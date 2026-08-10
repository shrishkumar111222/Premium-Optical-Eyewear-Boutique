import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import CollectionSection from '@/components/CollectionSection';
import EyeglassesSection from '@/components/EyeglassesSection';
import SunglassesSection from '@/components/SunglassesSection';
import MensCollection from '@/components/MensCollection';
import WomensCollection from '@/components/WomensCollection';
import KidsCollection from '@/components/KidsCollection';
import BrandWall from '@/components/BrandWall';
import FaceShapeGuide from '@/components/FaceShapeGuide';
import FrameFinder from '@/components/FrameFinder';
import LensOptions from '@/components/LensOptions';
import Consultation from '@/components/Consultation';
import WhyChooseUs from '@/components/WhyChooseUs';
import StoreExperience from '@/components/StoreExperience';
import Testimonials from '@/components/Testimonials';
import StyleStories from '@/components/StyleStories';
import Gallery from '@/components/Gallery';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Map from '@/components/Map';
import BusinessValue from '@/components/BusinessValue';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import MobileCta from '@/components/MobileCta';
import BackToTop from '@/components/BackToTop';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <TrustBar />
        <CollectionSection />
        <EyeglassesSection />
        <SunglassesSection />
        <MensCollection />
        <WomensCollection />
        <KidsCollection />
        <BrandWall />
        <FaceShapeGuide />
        <FrameFinder />
        <LensOptions />
        <Consultation />
        <WhyChooseUs />
        <StoreExperience />
        <Testimonials />
        <StyleStories />
        <Gallery />
        <Faq />
        <Contact />
        <Map />
        <BusinessValue />
        <FinalCta />
      </main>
      <Footer />

      {/* Persistent conversion layer */}
      <WhatsAppButton />
      <BackToTop />
      <MobileCta />
      {/* Clears the sticky mobile bar so nothing sits underneath it. */}
      <div aria-hidden="true" className="h-[64px] lg:hidden" />
    </>
  );
}
