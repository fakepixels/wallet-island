import { motion } from 'framer-motion';

const heartVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: (i: number) => ({
    scale: [0, 1, 0.5],
    opacity: [1, 1, 0],
    y: [0, -100 - Math.random() * 100],
    x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 200],
    rotate: Math.random() * 360,
    transition: {
      duration: 1 + Math.random() * 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

interface FlyingHeartsProps {
  mousePosition: { x: number; y: number };
}

export function FlyingHearts({ mousePosition }: FlyingHeartsProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{ 
            left: mousePosition.x, 
            top: mousePosition.y,
            position: 'fixed',
          }}
          custom={i}
          initial="initial"
          animate="animate"
          variants={heartVariants}
        >
          💙
        </motion.div>
      ))}
    </div>
  );
}