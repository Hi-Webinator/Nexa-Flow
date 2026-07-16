import { motion } from "framer-motion";
import { testimonials } from "../../data/content";
import SectionLabel from "../SectionLabel/SectionLabel";
import {
  staggerContainer,
  staggerItem,
  fadeUp,
} from "../../animations/variants";
import "./_testimonials.scss";

const Testimonials = () => (
  <section className="section bgDark" id="testimonials">
    <motion.div
      className="text-center"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <SectionLabel>Testimonials</SectionLabel>
      <h2 className="sectionTitle">
        Loved by teams
        <br />
        who ship fast
      </h2>
    </motion.div>

    <motion.div
      className="testiGrid"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {testimonials.map((t) => (
        <motion.div
          key={t.id}
          className="testiCard"
          variants={staggerItem}
          whileHover={{ y: -4 }}
        >
          <div className="stars">★★★★★</div>
          <p className="testiText">{t.text}</p>
          <div className="testiAuthor">
            <div className="testiAvatar" style={{ background: t.gradient }}>
              {t.initials}
            </div>
            <div>
              <div className="testiName">{t.name}</div>
              <div className="testiRole">{t.role}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default Testimonials;
