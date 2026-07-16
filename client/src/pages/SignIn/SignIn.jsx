import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  staggerContainer,
  staggerItem,
  fadeUp,
} from "../../animations/variants";
import "./_signin.scss";

// ── Social providers
const socialProviders = [
  {
    id: "google",
    label: "Continue with Google",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
          fill="#4285F4"
        />
        <path
          d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
          fill="#34A853"
        />
        <path
          d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
          fill="#FBBC05"
        />
        <path
          d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
          fill="#EA4335"
        />
      </svg>
    ),
  },
  {
    id: "github",
    label: "Continue with GitHub",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    id: "microsoft",
    label: "Continue with Microsoft",
    icon: (
      <svg width="18" height="18" viewBox="0 0 21 21" fill="none">
        <rect x="1" y="1" width="9" height="9" fill="#F25022" />
        <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
        <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
        <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
      </svg>
    ),
  },
];

// ── Eye icon
const EyeIcon = ({ open }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

// ── Floating background card
const BgCard = ({ className, children, anim }) => (
  <motion.div
    className={`bgCard ${className}`}
    animate={anim}
    transition={{
      duration: anim?.duration ?? 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

// ── Main component
const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email) {
      setError("Please enter your email address.");
      return;
    }
    if (!form.password) {
      setError("Please enter your password.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className="signIn">
      {/* ── Background orbs */}
      <div className="orb1" />
      <div className="orb2" />
      <div className="grid" />

      {/* ── Decorative floating cards (left panel) */}
      <div className="leftPanel">
        <motion.div
          className="leftContent"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="leftLogo" variants={staggerItem}>
            Nexa<span>Flow</span>
          </motion.div>

          <motion.h2 className="leftHeading" variants={staggerItem}>
            Your team's
            <br />
            <span className="grad">command centre</span>
            <br />
            awaits.
          </motion.h2>

          <motion.p className="leftSub" variants={staggerItem}>
            Sign in to access your workspace, automations, and insights — all in
            one place.
          </motion.p>

          {/* Stats row */}
          <motion.div className="statRow" variants={staggerItem}>
            {[
              { n: "12K+", l: "Teams" },
              { n: "98%", l: "Uptime" },
              { n: "4.2M", l: "Tasks/day" },
            ].map((s) => (
              <div key={s.l} className="stat">
                <span className="statNum">{s.n}</span>
                <span className="statLabel">{s.l}</span>
              </div>
            ))}
          </motion.div>

          {/* Floating UI cards */}
          <BgCard className="bc1" anim={{ y: [0, -14, 0] }}>
            <div className="bcRow">
              <div className="bcDot" style={{ background: "#6fffd8" }} />
              <span>Sprint planning complete</span>
            </div>
            <div className="bcSmall">AI drafted 12 tasks · 2 min ago</div>
          </BgCard>

          <BgCard className="bc2" anim={{ y: [0, 12, 0] }}>
            <div className="bcLabel">Pipeline velocity</div>
            <div className="bcBars">
              {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                <div key={i} className="bcBar" style={{ height: `${h}%` }} />
              ))}
            </div>
          </BgCard>

          <BgCard className="bc3" anim={{ y: [0, -10, 0] }}>
            <div className="bcRow">
              <div className="bcAvatars">
                {["AR", "KL", "MJ"].map((a) => (
                  <div key={a} className="bcAvatar">
                    {a}
                  </div>
                ))}
              </div>
              <span className="bcActive">3 active now</span>
            </div>
          </BgCard>
        </motion.div>
      </div>

      {/* ── Right: form panel */}
      <div className="rightPanel">
        <motion.div
          className="authCard"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                className="successState"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="successIcon">✓</div>
                <h3>Welcome back!</h3>
                <p>Redirecting you to your workspace…</p>
                <motion.div
                  className="successBar"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "linear" }}
                />
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 1 }}>
                {/* Header */}
                <div className="cardHeader">
                  <div className="cardLogo">
                    Nexa<span>Flow</span>
                  </div>
                  <h1 className="cardTitle">Sign in to your account</h1>
                  <p className="cardSub">
                    Don't have an account?{" "}
                    <a href="#" className="cardLink">
                      Get started free →
                    </a>
                  </p>
                </div>

                {/* Social buttons */}
                <div className="socials">
                  {socialProviders.map((p, i) => (
                    <motion.button
                      key={p.id}
                      className="socialBtn"
                      whileHover={{
                        y: -2,
                        borderColor: "rgba(124,111,255,0.4)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                    >
                      {p.icon}
                      <span>{p.label}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Divider */}
                <div className="divider">
                  <span>or continue with email</span>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="form" noValidate>
                  {/* Email */}
                  <div
                    className={`field ${focused === "email" ? "fieldFocused" : ""} ${error && !form.email ? "fieldError" : ""}`}
                  >
                    <label htmlFor="email" className="label">
                      Email address
                    </label>
                    <div className="inputWrap">
                      <svg
                        className="inputIcon"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={handleChange}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused("")}
                        className="input"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div
                    className={`field ${focused === "password" ? "fieldFocused" : ""} ${error && !form.password ? "fieldError" : ""}`}
                  >
                    <div className="labelRow">
                      <label htmlFor="password" className="label">
                        Password
                      </label>
                      <a href="#" className="forgotLink">
                        Forgot password?
                      </a>
                    </div>
                    <div className="inputWrap">
                      <svg
                        className="inputIcon"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="11"
                          rx="2"
                          ry="2"
                        />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                      <input
                        id="password"
                        name="password"
                        type={showPw ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="••••••••••"
                        value={form.password}
                        onChange={handleChange}
                        onFocus={() => setFocused("password")}
                        onBlur={() => setFocused("")}
                        className="input"
                      />
                      <button
                        type="button"
                        className="eyeBtn"
                        onClick={() => setShowPw((v) => !v)}
                        aria-label={showPw ? "Hide password" : "Show password"}
                      >
                        <EyeIcon open={showPw} />
                      </button>
                    </div>
                  </div>

                  {/* Remember me */}
                  <div className="rememberRow">
                    <label className="checkLabel">
                      <input
                        type="checkbox"
                        name="remember"
                        checked={form.remember}
                        onChange={handleChange}
                        className="checkbox"
                      />
                      <span className="checkBox">
                        {form.remember && (
                          <motion.svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <polyline
                              points="1.5,5 4,7.5 8.5,2.5"
                              stroke="white"
                              strokeWidth="1.5"
                              fill="none"
                              strokeLinecap="round"
                            />
                          </motion.svg>
                        )}
                      </span>
                      <span className="checkText">Remember me for 30 days</span>
                    </label>
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        className="errorMsg"
                        initial={{ opacity: 0, y: -8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -8, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    className="submitBtn"
                    disabled={loading}
                    whileHover={
                      !loading
                        ? { y: -2, boxShadow: "0 0 48px rgba(124,111,255,0.6)" }
                        : {}
                    }
                    whileTap={!loading ? { scale: 0.97 } : {}}
                  >
                    {loading ? (
                      <span className="spinner" />
                    ) : (
                      <>
                        Sign in to NexaFlow <span className="arrow">→</span>
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Footer note */}
                <p className="footerNote">
                  By signing in, you agree to our{" "}
                  <a href="#" className="cardLink">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="cardLink">
                    Privacy Policy
                  </a>
                  .
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
