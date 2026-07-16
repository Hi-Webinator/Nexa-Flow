import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { services } from "../../data/content";
import {
  staggerContainer,
  staggerItem,
  fadeUp,
} from "../../animations/variants";
import SectionLabel from "../SectionLabel/SectionLabel";
import "./_services.scss";

const Services = () => (
  <section className="section bgDarker" id="services">
    <motion.div
      className="text-center"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <SectionLabel>Solutions</SectionLabel>
      <h2 className="sectionTitle">
        Built for teams
        <br />
        at every scale
      </h2>
    </motion.div>

    <motion.div
      className="servicesGrid"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {services.map((s, i) => (
        <motion.div
          key={i}
          className="serviceCard"
          variants={staggerItem}
          whileHover={{ y: -6 }}
        >
          <div className="serviceNum">{s.num}</div>
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
          <Link to="/contact" className="serviceLink">
            Explore →
          </Link>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default Services;
