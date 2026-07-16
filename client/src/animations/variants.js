// Reusable Framer Motion variants

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const floatAnimation = {
  animate: {
    y: [0, -18, 0],
    rotate: [0, 2, 0],
    transition: { duration: 7, repeat: Infinity, ease: "easeInOut" },
  },
};

export const floatAnimation2 = {
  animate: {
    y: [0, 16, 0],
    rotate: [0, -2, 0],
    transition: { duration: 9, repeat: Infinity, ease: "easeInOut" },
  },
};

export const pulseAnimation = {
  animate: {
    scale: [1, 0.85, 1],
    opacity: [1, 0.5, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const hoverLift = {
  rest: { y: 0, transition: { duration: 0.3 } },
  hover: { y: -6, transition: { duration: 0.3 } },
};
