// Motion presets for High Tide Studios
// Style: BBC / Bloomberg / Monocle — calm, classy, broadcast-grade

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const fade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Subtle hover lift (no scaling, keeps layout stable)
export const hoverLift = {
  y: -4,
  transition: { duration: 0.2 },
};
