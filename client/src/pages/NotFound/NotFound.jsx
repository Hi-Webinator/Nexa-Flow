import { motion } from "framer-motion";
import Button from "../../components/Button/Button";
import "./_notFound.scss";

const NotFound = () => (
  <motion.section
    className="notFound"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.35 }}
  >
    <div className="nfOrb" />
    <div className="nfContent">
      <div className="nfCode grad-text">404</div>
      <h1 className="nfTitle">This page drifted off the flow.</h1>
      <p className="nfSub">
        The page you're looking for doesn't exist or has been moved. Let's get
        you back on track.
      </p>
      <div className="nfActions">
        <Button href="/" className="btn lg primary">
          ← Back to home
        </Button>
        <Button href="/contact" className="btn lg ghost">
          Contact support
        </Button>
      </div>
    </div>
  </motion.section>
);

export default NotFound;
