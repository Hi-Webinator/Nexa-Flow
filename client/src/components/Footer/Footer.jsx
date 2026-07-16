import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./_footer.scss";

const footerCols = [
  {
    title: "Product",
    links: [
      { label: "Features", to: "/#features" },
      { label: "Pricing", to: "/#pricing" },
      { label: "Solutions", to: "/#services" },
      { label: "FAQ", to: "/#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Sign in", to: "/signIn" },
    ],
  },
];

const socials = [
  { label: "X (Twitter)", icon: "𝕏", href: "https://x.com" },
  { label: "LinkedIn", icon: "in", href: "https://linkedin.com" },
  { label: "GitHub", icon: "gh", href: "https://github.com" },
  { label: "YouTube", icon: "yt", href: "https://youtube.com" },
];

const EMAIL_RE = /\S+@\S+\.\S+/;

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // "" | "error" | "success"

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footerTop">
        <div>
          <div className="footerLogo">
            Nexa<span>Flow</span>
          </div>
          <p className="footerTagline">
            The operating system for high-performance teams. Built for speed,
            designed for humans.
          </p>
          <div className="socials d-flex flex-row">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="socialIcon"
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        {footerCols.map((col) => (
          <div key={col.title}>
            <h4 className="footerColTitle">{col.title}</h4>
            <ul className="footerLinks">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="footerColTitle">Newsletter</h4>
          <p className="footerNewsletterDesc">
            Stay ahead with our weekly dispatch on product and team performance.
          </p>
          <form className="newsletterForm" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="you@company.com"
              aria-label="Email address for newsletter"
              className="newsletterInput"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status) setStatus("");
              }}
            />
            <Button
              className="btn primary sm"
              size="sm"
              type="submit"
              aria-label="Subscribe to newsletter"
            >
              →
            </Button>
          </form>
          {status === "success" && (
            <p className="newsletterNote" role="status">
              ✓ You're subscribed — see you in your inbox.
            </p>
          )}
          {status === "error" && (
            <p className="newsletterNote error" role="alert">
              Please enter a valid email address.
            </p>
          )}
        </div>
      </div>
      <div className="footerBottom">
        <span>
          © {new Date().getFullYear()} Hi Webinator. All rights reserved.
        </span>
        <div className="footerBottomLinks">
          {["Privacy", "Terms", "Cookies"].map((l) => (
            <a key={l} href="#">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
