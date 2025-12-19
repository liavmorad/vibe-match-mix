import { motion } from "framer-motion";

interface MusicWaveProps {
  className?: string;
  barCount?: number;
}

const MusicWave = ({ className = "", barCount = 5 }: MusicWaveProps) => {
  return (
    <div className={`flex items-end gap-1 h-6 ${className}`}>
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-primary rounded-full"
          animate={{
            height: ["8px", "24px", "12px", "20px", "8px"],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default MusicWave;
