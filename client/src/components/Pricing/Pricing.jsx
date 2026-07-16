import { useState } from "react";
import { motion } from "framer-motion";
import { plans } from "../../data/content";
import {
  staggerContainer,
  staggerItem,
  fadeUp,
} from "../../animations/variants";
import SectionLabel from "../SectionLabel/SectionLabel";
import Button from "../Button/Button";
import "./_pricing.scss";

const Pricing = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="section bgDarker" id="pricing">
      <motion.div
        className="text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SectionLabel>Pricing</SectionLabel>
        <h2 className="sectionTitle">
          Simple, transparent
          <br />
          pricing that scales
        </h2>

        <div className="pricingToggle">
          <span className="toggleLabel">Monthly</span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-label="Toggle yearly billing"
            className={`toggleSwitch ${yearly ? "active" : ""}`}
            onClick={() => setYearly((y) => !y)}
          >
            <div className="toggleKnob" />
          </button>
          <span className="toggleLabel">Yearly</span>
          <span className="saveBadge">Save 25%</span>
        </div>
      </motion.div>

      <motion.div
        className="pricingGrid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            className={`pricingCard ${plan.featured ? "featured" : ""}`}
            variants={staggerItem}
            whileHover={{ y: plan.featured ? 0 : -4 }}
          >
            <div className="planName">{plan.name}</div>
            <div className="planPrice">
              <span className="planPriceNum">
                {plan.monthly
                  ? `$${yearly ? plan.yearly : plan.monthly}`
                  : "Custom"}
              </span>
              {plan.monthly && <span className="planPricePeriod">/mo</span>}
            </div>
            <div className="planDesc">{plan.desc}</div>
            <hr className="planDivider" />
            <ul className="planFeatures">
              {plan.features.map((f, j) => (
                <li key={j}>{f}</li>
              ))}
              {plan.dimFeatures.map((f, j) => (
                <li key={`d${j}`} className="dim">
                  {f}
                </li>
              ))}
            </ul>
            <Button
              href={plan.monthly ? "/signIn" : "/contact"}
              className={
                plan.featured
                  ? "btn md primary"
                  : plan.monthly
                    ? "btn md ghost"
                    : "btn md outline"
              }
              style={{ width: "100%", justifyContent: "center" }}
            >
              {plan.cta}
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Pricing;
