import { motion } from "framer-motion";
import { fadeUp } from "../../animations/variants";
import SectionLabel from "../SectionLabel/SectionLabel";
import Button from "../Button/Button";
import "./_ctaBanner.scss";

const CTABanner = () => (
  <section className="ctaSection" id="cta">
    <div className="ctaBg" />
    <motion.div
      className="ctaInner text-center"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <SectionLabel style={{ justifyContent: "center" }}>
        Ready to start?
      </SectionLabel>
      <h2 className="sectionTitle">
        Your team deserves
        <br />
        better <span className="grad-text">tools</span>.
      </h2>
      <p className="ctaDesc">
        Join 12,000+ teams that chose NexaFlow to eliminate friction and
        accelerate everything. Set up in under 5 minutes.
      </p>
      <div className="ctaActions">
        <Button href="/signIn" className="btn lg primary">
          Start for free — no card needed
        </Button>
        <Button href="/contact" className="btn lg ghost">
          Talk to sales
        </Button>
      </div>
    </motion.div>
  </section>
);

export default CTABanner;
