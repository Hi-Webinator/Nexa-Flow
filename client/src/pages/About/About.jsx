import { motion } from "framer-motion";
import {
  staggerContainer,
  staggerItem,
  fadeUp,
  slideInLeft,
  slideInRight,
} from "../../animations/variants";
import Button from "../../components/Button/Button";
import "./_about.scss";

// ── Data
const timeline = [
  {
    year: "2020",
    title: "Founded in a garage",
    desc: "Three engineers frustrated with fragmented tooling decided to build the workspace they always wanted.",
  },
  {
    year: "2021",
    title: "Seed round & first 100 teams",
    desc: "Raised $4.2M seed. Word spread fast — 100 teams signed up without a single ad.",
  },
  {
    year: "2022",
    title: "Series A & AI integration",
    desc: "Raised $22M. Shipped the first AI-powered task engine. Growth tripled overnight.",
  },
  {
    year: "2023",
    title: "5,000 teams & global expansion",
    desc: "Opened EU and APAC infrastructure. Hit $5M ARR and launched the Enterprise plan.",
  },
  {
    year: "2024",
    title: "Series B & 12,000 teams",
    desc: "Raised $60M Series B. NexaFlow becomes the default workspace for high-growth teams worldwide.",
  },
];

const values = [
  {
    icon: "⚡",
    title: "Speed over perfection",
    desc: "We ship fast, learn faster. Perfect is the enemy of shipped — but we never ship sloppy.",
  },
  {
    icon: "🧠",
    title: "Thoughtful by default",
    desc: "Every feature earns its place. We remove more than we add. Simplicity is the hardest feature.",
  },
  {
    icon: "🤝",
    title: "Customers in the room",
    desc: "We talk to customers every week, not every quarter. Their pain is our product roadmap.",
  },
  {
    icon: "🌍",
    title: "Long-term thinking",
    desc: "We're building for decades, not quarters. Every decision factors in where we want to be in 10 years.",
  },
  {
    icon: "🔒",
    title: "Trust is everything",
    desc: "We never compromise on security, privacy, or reliability. Trust, once broken, takes years to rebuild.",
  },
  {
    icon: "✨",
    title: "Delight in the details",
    desc: "We obsess over the micro-interactions, the loading states, the empty states. Craft shows in the corners.",
  },
];

const team = [
  {
    name: "Maya Chen",
    role: "CEO & Co-founder",
    initials: "MC",
    grad: "linear-gradient(135deg,#7c6fff,#ff6fbd)",
  },
  {
    name: "Luca Ferretti",
    role: "CTO & Co-founder",
    initials: "LF",
    grad: "linear-gradient(135deg,#6fffd8,#7c6fff)",
  },
  {
    name: "Priya Nair",
    role: "CPO",
    initials: "PN",
    grad: "linear-gradient(135deg,#ff6fbd,#ff9a6f)",
  },
  {
    name: "Jordan Blake",
    role: "Head of Design",
    initials: "JB",
    grad: "linear-gradient(135deg,#ffdb6f,#ff9a6f)",
  },
  {
    name: "Sara Okonkwo",
    role: "VP Engineering",
    initials: "SO",
    grad: "linear-gradient(135deg,#6faaff,#6fffd8)",
  },
  {
    name: "Tom Wrigley",
    role: "Head of Growth",
    initials: "TW",
    grad: "linear-gradient(135deg,#ff6fbd,#7c6fff)",
  },
];

const stats = [
  { n: "12K+", l: "Teams worldwide" },
  { n: "$86M", l: "Total raised" },
  { n: "120+", l: "Team members" },
  { n: "32", l: "Countries" },
];

const About = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.35 }}
    className="about"
  >
    {/* ── HERO */}
    <section className="hero">
      <div className="heroOrb1" />
      <div className="heroOrb2" />
      <div className="heroGrid" />

      <motion.div
        className="heroContent"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="about-badge" variants={staggerItem}>
          <span className="badgeDot" />
          Our story
        </motion.div>
        <motion.h1 className="heroTitle" variants={staggerItem}>
          Built by builders,
          <br />
          <span className="grad">for builders</span>
        </motion.h1>
        <motion.p className="heroSub" variants={staggerItem}>
          We started NexaFlow because we were sick of the status quo — too many
          tools, too much friction, not enough time. We built the workspace we
          always wished existed.
        </motion.p>
        <motion.div className="heroActions" variants={staggerItem}>
          <Button href="/contact" className="btn lg primary">
            Talk to us →
          </Button>
          <Button href="/#features" className="btn lg ghost">
            See the product
          </Button>
        </motion.div>
      </motion.div>
    </section>

    {/* ── STATS BAR */}
    <section className="statsBar">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          className="statItem"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <span className="statNum">{s.n}</span>
          <span className="statLabel">{s.l}</span>
        </motion.div>
      ))}
    </section>

    {/* ── MISSION */}
    <section className="mission">
      <div className="missionInner">
        <motion.div
          className="missionLeft"
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="sectionLabel">Our mission</div>
          <h2 className="sectionTitle">
            We believe great teams
            <br />
            deserve great tools.
          </h2>
          <p className="missionText">
            The best teams in the world shouldn't have to spend half their day
            fighting their software. They should be doing the work that matters
            — and everything else should just disappear into the background.
          </p>
          <p className="missionText">
            That's why we built NexaFlow: a single workspace that adapts to how
            your team actually works, powered by AI that handles the tedious so
            you can focus on the extraordinary.
          </p>
          <Button
            href="/contact"
            className="btn md primary"
            style={{ marginTop: "1.5rem" }}
          >
            Join us →
          </Button>
        </motion.div>

        <motion.div
          className="missionRight"
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="missionCard">
            <div className="mcQuote">"</div>
            <p className="mcText">
              We don't build features. We solve problems. The feature is just
              the delivery mechanism.
            </p>
            <div className="mcAuthor">
              <div
                className="mcAvatar"
                style={{
                  background: "linear-gradient(135deg,#7c6fff,#ff6fbd)",
                }}
              >
                MC
              </div>
              <div>
                <div className="mcName">Maya Chen</div>
                <div className="mcRole">CEO & Co-founder</div>
              </div>
            </div>
          </div>

          <div className="missionFloatCard">
            <div className="mfcRow">
              <div className="mfcDot" />
              <span>120+ people, fully remote</span>
            </div>
            <div className="mfcSub">Across 18 time zones</div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── TIMELINE */}
    <section className="timelineSection">
      <motion.div
        className="timelineHeader"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="sectionLabel">How we got here</div>
        <h2 className="sectionTitle">Four years, zero shortcuts.</h2>
      </motion.div>

      <div className="timeline">
        <div className="timelineLine" />
        {timeline.map((item, i) => (
          <motion.div
            key={i}
            className={`timelineItem ${i % 2 === 0 ? "left" : "right"}`}
            variants={i % 2 === 0 ? slideInLeft : slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="timelineCard">
              <div className="timelineYear">{item.year}</div>
              <h3 className="timelineTitle">{item.title}</h3>
              <p className="timelineDesc">{item.desc}</p>
            </div>
            <div className="timelineDot" />
          </motion.div>
        ))}
      </div>
    </section>

    {/* ── VALUES */}
    <section className="valuesSection">
      <motion.div
        className="valuesHeader"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="sectionLabel">What we stand for</div>
        <h2 className="sectionTitle">The values we actually live by.</h2>
        <p className="sectionSub">
          Not the ones on the wall — the ones that show up in our decisions.
        </p>
      </motion.div>

      <motion.div
        className="valuesGrid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {values.map((v, i) => (
          <motion.div
            key={i}
            className="valueCard"
            variants={staggerItem}
            whileHover={{ y: -4 }}
          >
            <div className="valueIcon">{v.icon}</div>
            <h3 className="valueTitle">{v.title}</h3>
            <p className="valueDesc">{v.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>

    {/* ── TEAM */}
    <section className="teamSection">
      <motion.div
        className="teamHeader"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="sectionLabel">The team</div>
        <h2 className="sectionTitle">Meet the people behind NexaFlow.</h2>
        <p className="sectionSub">
          A small team with an outsized obsession with quality.
        </p>
      </motion.div>

      <motion.div
        className="teamGrid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {team.map((m, i) => (
          <motion.div
            key={i}
            className="teamCard"
            variants={staggerItem}
            whileHover={{ y: -5 }}
          >
            <div className={"teamAvatar"} style={{ background: m.grad }}>
              {m.initials}
            </div>
            <div className="teamName">{m.name}</div>
            <div className="teamRole">{m.role}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="teamCta"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <p>We're always looking for exceptional people.</p>
        <Button href="/contact" className="btn primary md">
          View open roles →
        </Button>
      </motion.div>
    </section>

    {/* ── CTA */}
    <section className="ctaSection">
      <div className="ctaGlow" />
      <motion.div
        className="ctaInner"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="ctaTitle">
          Ready to join the
          <br />
          <span className="grad">NexaFlow story?</span>
        </h2>
        <p className="ctaSub">
          Start for free — no credit card, no commitment.
        </p>
        <div className="ctaActions">
          <Button href="/signin" className="btn primary lg">
            Get started free →
          </Button>
          <Button href="/contact" className="btn ghost lg">
            Talk to sales
          </Button>
        </div>
      </motion.div>
    </section>
  </motion.div>
);

export default About;
