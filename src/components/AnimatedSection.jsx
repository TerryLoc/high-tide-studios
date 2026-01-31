import { motion } from "framer-motion";
import { fadeUp, fade, staggerContainer } from "../animations/motion";

// Main animated section wrapper - scroll triggered, animates once
export default function AnimatedSection({ children, className = "" }) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Fade up animation for individual elements
export function FadeInUp({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Simple fade (no movement)
export function FadeIn({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      variants={fade}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger container for lists/grids
export function StaggerContainer({ children, className = "" }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger child item
export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Hover lift wrapper (subtle, no scale)
export function HoverLift({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
