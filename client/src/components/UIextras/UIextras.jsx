import { motion, AnimatePresence } from "framer-motion";
import {
  useScrollProgress,
  useScrolled,
  useMousePosition,
} from "../../hooks/hooks";
import "./_uiExtras.scss";

export const ScrollProgress = () => {
  const progress = useScrollProgress();
  return (
    <motion.div className="progressBar" style={{ width: `${progress}%` }} />
  );
};

export const BackToTop = () => {
  const scrolled = useScrolled(400);
  return (
    <AnimatePresence>
      {scrolled && (
        <motion.button
          className="backToTop"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          whileHover={{ y: -4 }}
          aria-label="Back to top"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export const CursorGlow = () => {
  const { x, y } = useMousePosition();
  return <div className="cursorGlow" style={{ left: x, top: y }} />;
};
