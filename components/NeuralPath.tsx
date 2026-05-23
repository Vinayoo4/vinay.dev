"use client";
import { motion } from "framer-motion";

interface NeuralPathProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  isActive?: boolean;
  isBlurred?: boolean;
}

export function NeuralPath({ x1, y1, x2, y2, color = "#06b6d4", isActive, isBlurred }: NeuralPathProps) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const cpY = midY - 60;

  return (
    <g>
      {isBlurred && (
        <path
          d={`M ${x1} ${y1} Q ${midX} ${cpY} ${x2} ${y2}`}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          opacity={0.1}
        />
      )}
      <motion.path
        d={`M ${x1} ${y1} Q ${midX} ${cpY} ${x2} ${y2}`}
        fill="none"
        stroke={color}
        strokeWidth={isActive ? 2.5 : 1}
        strokeLinecap="round"
        strokeDasharray={isActive ? "none" : "6 4"}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, opacity: isActive ? [0.6, 1, 0.6] : 0.3 }}
        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
      />
      {isActive && (
        <motion.circle r={3} fill={color} cx={x1} cy={y1} animate={{ cx: [x1, x2], cy: [y1, y2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
      )}
    </g>
  );
}
