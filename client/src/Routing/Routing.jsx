import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home/Home";

const SignIn = lazy(() => import("../pages/SignIn/SignIn"));
const About = lazy(() => import("../pages/About/About"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

// Per-route document titles + descriptions (lightweight SEO without a helmet dep)
const META = {
  "/": {
    title: "NexaFlow – The Operating System for High-Performance Teams",
    description:
      "NexaFlow unifies your workflows, automates busywork with AI, and gives your team superpowers — without the complexity. Start free.",
  },
  "/signin": {
    title: "Sign in – NexaFlow",
    description: "Sign in to your NexaFlow workspace.",
  },
  "/about": {
    title: "About us – NexaFlow",
    description:
      "Built by builders, for builders. Learn about the team and mission behind NexaFlow.",
  },
  "/contact": {
    title: "Contact – NexaFlow",
    description:
      "Questions about features, pricing, or trials? Get in touch with the NexaFlow team.",
  },
};

// Handles document title, scroll restoration, and in-page hash anchors
const RouteEffects = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const meta = META[pathname.toLowerCase()] ?? {
      title: "NexaFlow",
      description: "NexaFlow – The operating system for high-performance teams.",
    };
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
  }, [pathname]);

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section exists after a route change
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const PageLoader = () => (
  <div className="pageLoader" role="status" aria-label="Loading page">
    <span className="pageLoaderSpinner" />
  </div>
);

const Routing = () => {
  return (
    <>
      <RouteEffects />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Routing;
