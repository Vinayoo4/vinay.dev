"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeuralNodeProps {
  id: string;
  label: string;
  status: "completed" | "in-progress" | "locked";
  color: string;
  icon?: React.ReactNode;
  x: number;
  y: number;
  isActive?: boolean;
  isPath?: boolean;
  onClick?: () => void;
}

export function NeuralNode({ label, status, color, icon, x, y, isActive, isPath, onClick }: NeuralNodeProps) {
  return (
    <motion.g
      className="cursor-pointer"
      style={{ transform: `translate(${x}px, ${y}px)` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.15 }}
      onClick={onClick}
    >
      <motion.circle
        r={28}
        fill={isActive ? `${color}30` : `${color}15`}
        stroke={color}
        strokeWidth={isActive ? 3 : 1.5}
        animate={
          isActive
            ? { r: [28, 32, 28], opacity: [1, 0.8, 1] }
            : isPath
            ? { strokeWidth: [1.5, 3, 1.5] }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        r={20}
        fill={`${color}25`}
        stroke={color}
        strokeWidth={1}
        className={cn(status === "completed" && "animate-neon-pulse")}
      />
      {icon && (
        <foreignObject x={-12} y={-12} width={24} height={24}>
          <div className="flex items-center justify-center w-full h-full text-gray-200">{icon}</div>
        </foreignObject>
      )}
      <text y={42} textAnchor="middle" fill={color} fontSize={11} fontFamily="var(--font-mono)" className="select-none">
        {label}
      </text>
      {status === "completed" && (
        <circle cx={18} cy={-18} r={6} fill={color} stroke="#050505" strokeWidth={2} />
      )}
      {status === "in-progress" && (
        <motion.circle
          cx={18} cy={-18} r={5}
          fill="none" stroke={color} strokeWidth={2}
          animate={{ rotate: 360 }}
          style={{ originX: "18px", originY: "-18px" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      )}
    </motion.g>
  );
}
