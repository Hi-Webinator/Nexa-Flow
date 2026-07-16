import Brands from "../../components/Brands/Brands";
import CTABanner from "../../components/CTABanner/CTABanner";
import Faq from "../../components/Faq/Faq";
import Features from "../../components/Features/Features";
import Hero from "../../components/Hero/Hero";
import Pricing from "../../components/Pricing/Pricing";
import Services from "../../components/Services/Services";
import Stats from "../../components/Stats/Stats";
import Testimonials from "../../components/Testimonials/Testimonials";

const Home = () => {
  return (
    <>
      <Hero />
      <Brands />
      <Features />
      <Stats />
      <Services />
      <Testimonials />
      <Pricing />
      <Faq />
      <CTABanner />
    </>
  );
};

export default Home;
