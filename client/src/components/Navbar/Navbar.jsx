import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useScrolled } from "../../hooks/hooks";
import Button from "../Button/Button";
import "./_navbar.scss";

const links = [
  { label: "Features", to: "/#features" },
  { label: "Solutions", to: "/#services" },
  { label: "Pricing", to: "/#pricing" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const scrolled = useScrolled(60);
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      className={`nav ${scrolled ? "scrolled" : ""}`}
      aria-label="Main navigation"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="inner">
        <Link to="/" className="logo" aria-label="NexaFlow home">
          Nexa<span>Flow</span>
        </Link>

        <ul className="links">
          {links.map((l) => (
            <li key={l.label}>
              <Link to={l.to} className="link">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="cta nav-cta">
          <Button href="/signIn" className="btn md outline">
            Sign in
          </Button>
          <Button href="/signIn" className="btn md primary">
            Get started →
          </Button>
        </div>

        <button
          className={`hamburger ${open ? "open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobileMenu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
          >
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="mobileLink"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="mobileCta">
              <Button
                href="/signIn"
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Sign in
              </Button>
              <Button
                href="/signIn"
                variant="primary"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Get started →
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
