import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "../SectionLabel/SectionLabel";
import FeatureCard from "./FeaturedCard";
import { features } from "../../data/content";
import { staggerContainer, fadeUp } from "../../animations/variants";
import "./_features.scss";

const Features = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="section bgDark" id="features">
      <motion.div
        className="text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SectionLabel>Features</SectionLabel>
        <h2 className="sectionTitle">
          Everything you need.
          <br />
          Nothing you don't.
        </h2>
        <p className="sectionSub mx-auto" style={{ margin: "0.75rem auto 0" }}>
          Thoughtfully crafted tools that eliminate friction and accelerate
          everything you do.
        </p>
      </motion.div>

      <motion.div
        ref={ref}
        className="featuresGrid"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {features.map((f) => (
          <FeatureCard key={f.id} feature={f} />
        ))}
      </motion.div>
    </section>
  );
};

export default Features;
