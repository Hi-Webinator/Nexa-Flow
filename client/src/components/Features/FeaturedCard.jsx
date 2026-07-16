import { useRef } from "react";
import { motion } from "framer-motion";
import { staggerItem } from "../../animations/variants";
import "./_features.scss";

const FeatureCard = ({ feature }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty(
      "--mx",
      ((e.clientX - r.left) / r.width) * 100 + "%",
    );
    cardRef.current.style.setProperty(
      "--my",
      ((e.clientY - r.top) / r.height) * 100 + "%",
    );
  };

  return (
    <motion.div
      ref={cardRef}
      className={`featureCard ${feature.wide ? "wide" : ""}`}
      variants={staggerItem}
      onMouseMove={handleMouseMove}
      whileHover={{ backgroundColor: "rgba(30,30,62,1)" }}
    >
      <div className="featureIcon">{feature.icon}</div>
      <h3>{feature.title}</h3>
      <p>{feature.desc}</p>
      {feature.tag && <span className="featureTag">{feature.tag}</span>}
    </motion.div>
  );
};

export default FeatureCard;
