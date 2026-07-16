import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Button from "../../components/Button/Button";
import {
  staggerContainer,
  staggerItem,
  floatAnimation,
  floatAnimation2,
} from "../../animations/variants";
import "./_hero.scss";

const floatingCards = [
  {
    className: "card1",
    animation: floatAnimation,
    content: (
      <>
        <div className="metric">+247%</div>
        <div className="metricLabel">Revenue growth</div>
        <div className="badge">▲ This quarter</div>
      </>
    ),
  },
  {
    className: "card2",
    animation: floatAnimation2,
    content: (
      <>
        <div className="metric">98.9%</div>
        <div className="metricLabel">Uptime SLA</div>
        <div className="badge">✦ Verified</div>
      </>
    ),
  },
  {
    className: "card3",
    animation: floatAnimation,
    content: (
      <>
        <div className="deployLabel">New deployment</div>
        <div className="deployName">v3.4.1 → Production</div>
        <div className="badge">✓ Live in 2.3s</div>
      </>
    ),
  },
];

const Hero = () => (
  <section className="hero" id="hero">
    {/* Background */}
    <div className="bg">
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />
      <div className="grid" />
    </div>

    {/* Floating cards */}
    {floatingCards.map((card, i) => (
      <motion.div
        key={i}
        className={`floatCard ${card.className}`}
        variants={card.animation}
        animate="animate"
      >
        {card.content}
      </motion.div>
    ))}

    {/* Main content */}
    <motion.div
      className="content"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="badge_wrap" variants={staggerItem}>
        <span className="dot" />
        Now in public beta — Join 12,000+ teams
      </motion.div>

      <motion.h1 className="title" variants={staggerItem}>
        The platform that
        <br />
        <span className="grad">
          <TypeAnimation
            sequence={[
              "multiplies output by 10×",
              2000,
              "automates your busywork",
              2000,
              "ships faster than ever",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </span>
      </motion.h1>

      <motion.p className="subtitle" variants={staggerItem}>
        NexaFlow unifies your workflows, automates the mundane, and gives your
        team superpowers — without the complexity.
      </motion.p>

      <motion.div className="actions" variants={staggerItem}>
        <Button href="#pricing" className="btn primary lg">
          Start for free →
        </Button>
        <Button href="#features" className="btn ghost lg">
          ▷ See it in action
        </Button>
      </motion.div>

      <motion.div className="socialProof" variants={staggerItem}>
        <div className="avatarStack">
          {["AR", "KL", "MJ", "+"].map((t, i) => (
            <div key={i} className="avatar">
              {t}
            </div>
          ))}
        </div>
        <span>Trusted by 12,000+ high-growth teams worldwide</span>
      </motion.div>
    </motion.div>
  </section>
);

export default Hero;
