import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  staggerContainer,
  staggerItem,
  fadeUp,
  slideInLeft,
  slideInRight,
} from "../../animations/variants";
import Button from "../../components/Button/Button";
import "./_contact.scss";
import { channelsAbt, officesAbt, topicsAbt } from "../../data/content";

// ── Validation
const validate = ({ name, email, message }) => {
  if (!name.trim()) return "Please enter your name.";
  if (!email.trim()) return "Please enter your email address.";
  if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email address.";
  if (!message.trim()) return "Please enter your message.";
  return null;
};

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    topic: topicsAbt[0],
    message: "",
  });
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate(form);
    if (err) {
      setError(err);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSent(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="contact"
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
          <motion.div className="badge" variants={staggerItem}>
            <span className="badgeDot" /> Get in touch
          </motion.div>
          <motion.h1 className="heroTitle" variants={staggerItem}>
            We'd love to
            <br />
            <span className="grad">hear from you</span>
          </motion.h1>
          <motion.p className="heroSub" variants={staggerItem}>
            Whether you have a question about features, pricing, trials, or
            anything else — our team is ready to answer.
          </motion.p>
        </motion.div>
      </section>

      {/* ── CHANNELS */}
      <section className="channels">
        <motion.div
          className="channelsGrid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {channelsAbt.map((c, i) => (
            <motion.div
              key={i}
              className="channelCard"
              variants={staggerItem}
              whileHover={{ y: -5 }}
              style={{ "--accent": c.accent }}
            >
              <div
                className="channelIcon"
                style={{
                  background: `${c.accent}18`,
                  border: `1px solid ${c.accent}44`,
                }}
              >
                {c.icon}
              </div>
              <h3 className="channelTitle">{c.title}</h3>
              <p className="channelDesc">{c.desc}</p>
              <button
                className="channelCta"
                style={{ color: c.accent, borderColor: `${c.accent}44` }}
              >
                {c.cta} →
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── FORM + SIDEBAR */}
      <section className="formSection">
        <div className="formInner">
          {/* Sidebar */}
          <motion.div
            className="sidebar"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="sidebarLabel">Our offices</div>
            <div className="officeList">
              {officesAbt.map((o, i) => (
                <div key={i} className="officeCard">
                  <div className="officeFlag">{o.emoji}</div>
                  <div>
                    <div className="officeCity">{o.city}</div>
                    <div className="officeAddr">{o.address}</div>
                    <div className="officeTz">{o.tz}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sidebarDivider" />

            <div className="sidebarLabel">Response times</div>
            <div className="responseTimes">
              {[
                { plan: "Starter", time: "< 48h" },
                { plan: "Pro", time: "< 12h" },
                { plan: "Enterprise", time: "< 1h" },
              ].map((r, i) => (
                <div key={i} className="rtRow">
                  <span className="rtPlan">{r.plan}</span>
                  <span className="rtTime">{r.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form card */}
          <motion.div
            className="formCard"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  className="successState"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="successIcon">✓</div>
                  <h3>Message received!</h3>
                  <p>
                    We'll get back to you at <strong>{form.email}</strong>{" "}
                    within one business day.
                  </p>
                  <Button
                    href="/"
                    className="ghost btn md"
                    style={{ marginTop: "1.5rem" }}
                  >
                    ← Back to home
                  </Button>
                </motion.div>
              ) : (
                <motion.div key="form">
                  <h2 className="formTitle">Send us a message</h2>
                  <p className="formSub">
                    We typically reply within a few hours during business days.
                  </p>

                  <form className="form" onSubmit={handleSubmit} noValidate>
                    {/* Row: name + company */}
                    <div className="fieldRow">
                      <div
                        className={`field ${focused === "name" ? "focused" : ""}`}
                      >
                        <label className="label">
                          Full name <span className="req">*</span>
                        </label>
                        <input
                          name="name"
                          type="text"
                          placeholder="Alex Rivera"
                          value={form.name}
                          onChange={handleChange}
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused("")}
                          className="input"
                        />
                      </div>
                      <div
                        className={`field ${focused === "company" ? "focused" : ""}`}
                      >
                        <label className="label">Company</label>
                        <input
                          name="company"
                          type="text"
                          placeholder="Acme Corp"
                          value={form.company}
                          onChange={handleChange}
                          onFocus={() => setFocused("company")}
                          onBlur={() => setFocused("")}
                          className="input"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div
                      className={`field ${focused === "email" ? "focused" : ""}`}
                    >
                      <label className="label">
                        Work email <span className="req">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={handleChange}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused("")}
                        className="input"
                      />
                    </div>

                    {/* Topic */}
                    <div
                      className={`field ${focused === "topic" ? "focused" : ""}`}
                    >
                      <label className="label">Topic</label>
                      <select
                        name="topic"
                        value={form.topic}
                        onChange={handleChange}
                        onFocus={() => setFocused("topic")}
                        onBlur={() => setFocused("")}
                        className="input select"
                      >
                        {topicsAbt.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div
                      className={`field ${focused === "message" ? "focused" : ""}`}
                    >
                      <label className="label">
                        Message <span className="req">*</span>
                      </label>
                      <textarea
                        name="message"
                        placeholder="Tell us what's on your mind…"
                        value={form.message}
                        onChange={handleChange}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused("")}
                        className="input textarea"
                        rows={5}
                      />
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          className="errorMsg"
                          initial={{ opacity: 0, y: -8, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          ⚠ {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      className="submitBtn"
                      disabled={loading}
                      whileHover={
                        !loading
                          ? {
                              y: -2,
                              boxShadow: "0 0 48px rgba(124,111,255,0.6)",
                            }
                          : {}
                      }
                      whileTap={!loading ? { scale: 0.97 } : {}}
                    >
                      {loading ? (
                        <span className="spinner" />
                      ) : (
                        <>Send message →</>
                      )}
                    </motion.button>

                    <p className="privacy">
                      By submitting this form you agree to our{" "}
                      <a href="#">Privacy Policy</a>. We won't spam you — ever.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── OFFICES MAP VISUAL */}
      <section className="globeSection">
        <motion.div
          className="globeInner"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="sectionLabel">Worldwide</div>
          <h2 className="sectionTitle">Global team, local presence.</h2>
          <p className="sectionSub">
            With teams in 3 continents and infrastructure in 32 regions,
            someone's always awake and ready to help.
          </p>

          <div className="globeMapWrap">
            <div className="globeMap">
              <div className="gmOrb" />
              {/* SVG world line art */}
              <svg
                className="gmSvg"
                viewBox="0 0 800 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Horizontal lines (latitude) */}
                {[60, 120, 180, 240, 300, 340].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="800"
                    y2={y}
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                  />
                ))}
                {/* Vertical lines (longitude) */}
                {[80, 160, 240, 320, 400, 480, 560, 640, 720].map((x) => (
                  <line
                    key={x}
                    x1={x}
                    y1="0"
                    x2={x}
                    y2="400"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                  />
                ))}
                {/* Arc connecting cities */}
                <path
                  d="M 190 170 Q 370 60 610 190"
                  stroke="url(#lineGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  fill="none"
                />
                <path
                  d="M 610 190 Q 720 140 680 200"
                  stroke="url(#lineGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  fill="none"
                />
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7c6fff" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#6fffd8" stopOpacity="0.7" />
                  </linearGradient>
                </defs>
                {/* City dots */}
                <circle cx="190" cy="170" r="5" fill="#7c6fff" />
                <circle
                  cx="190"
                  cy="170"
                  r="12"
                  fill="#7c6fff"
                  fillOpacity="0.15"
                />
                <circle cx="610" cy="190" r="5" fill="#ff6fbd" />
                <circle
                  cx="610"
                  cy="190"
                  r="12"
                  fill="#ff6fbd"
                  fillOpacity="0.15"
                />
                <circle cx="680" cy="200" r="5" fill="#6fffd8" />
                <circle
                  cx="680"
                  cy="200"
                  r="12"
                  fill="#6fffd8"
                  fillOpacity="0.15"
                />
              </svg>

              {/* City labels */}
              <div className="cityPin sf">
                <div className="pinDot" style={{ background: "#7c6fff" }} />
                <div className="pinLabel">San Francisco</div>
              </div>
              <div className="cityPin london">
                <div className="pinDot" style={{ background: "#ff6fbd" }} />
                <div className="pinLabel">London</div>
              </div>
              <div className="cityPin singapore">
                <div className="pinDot" style={{ background: "#6fffd8" }} />
                <div className="pinLabel">Singapore</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Contact;
