import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../animations/variants";
import SectionLabel from "../SectionLabel/SectionLabel";
import "./_faq.scss";
import { faqs } from "../../data/content";

const Faq = () => {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="section bgDark" id="faq">
      <motion.div
        className="text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="sectionTitle">
          Got questions?
          <br />
          We've got answers.
        </h2>
      </motion.div>

      <div className="faqList">
        {faqs.map((f, i) => (
          <motion.div
            key={i}
            className={`faqItem ${openIdx === i ? "open" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
          >
            <button
              type="button"
              className="faqQ"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              aria-expanded={openIdx === i}
              aria-controls={`faq-answer-${i}`}
            >
              {f.q}
              <motion.span
                className="faqArrow"
                aria-hidden="true"
                animate={{ rotate: openIdx === i ? 135 : 0 }}
                transition={{ duration: 0.3 }}
              >
                +
              </motion.span>
            </button>
            <motion.div
              id={`faq-answer-${i}`}
              className="faqA"
              initial={false}
              animate={{
                height: openIdx === i ? "auto" : 0,
                opacity: openIdx === i ? 1 : 0,
              }}
              transition={{ duration: 0.35 }}
              style={{ overflow: "hidden" }}
            >
              <p
                style={{
                  padding: "0 1.5rem 1.25rem",
                  color: "var(--text2)",
                  fontSize: "0.88rem",
                  lineHeight: 1.7,
                }}
              >
                {f.a}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
