import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
    >
      <div className="h-full w-full bg-gradient-to-r from-[#FF9900] via-[#38BDF8] to-[#8B5CF6]" />
    </motion.div>
  );
}