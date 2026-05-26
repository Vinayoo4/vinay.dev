"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NeuralNode } from "./NeuralNode";
import { NeuralPath } from "./NeuralPath";
import { Brain, Terminal, Layout, Smartphone, Cloud } from "lucide-react";

interface GraphNode {
  id: string;
  label: string;
  status: "completed" | "in-progress" | "locked";
  color: string;
  icon: string;
  description?: string;
  children?: string[];
  details?: Record<string, any>;
}

interface NeuralGraphProps {
  nodes: GraphNode[];
  width?: number;
  height?: number;
}

const iconMap: Record<string, React.ReactNode> = {
  brain: <Brain className="w-5 h-5 text-neon-cyan" />,
  terminal: <Terminal className="w-5 h-5 text-neon-green" />,
  layout: <Layout className="w-5 h-5 text-neon-purple" />,
  smartphone: <Smartphone className="w-5 h-5 text-neon-amber" />,
  cloud: <Cloud className="w-5 h-5 text-neon-red" />,
};

export function NeuralGraph({ nodes, width = 900, height = 500 }: NeuralGraphProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [bfsPath, setBfsPath] = useState<string[]>([]);

  const positions = useMemo(() => {
    const pos: Record<string, { x: number; y: number }> = {};
    const levels: Record<number, string[]> = {};
    const visited = new Set<string>();
    const queue: { id: string; level: number }[] = [{ id: nodes[0]?.id, level: 0 }];
    let idx = 0;

    while (queue.length > 0) {
      const { id, level } = queue.shift()!;
      if (visited.has(id) || !id) continue;
      visited.add(id);
      if (!levels[level]) levels[level] = [];
      levels[level].push(id);

      const node = nodes.find((n) => n.id === id);
      if (node?.children) {
        for (const child of node.children) {
          queue.push({ id: child, level: level + 1 });
        }
      }
    }

    const levelKeys = Object.keys(levels).map(Number);
    for (const lv of levelKeys) {
      const items = levels[lv];
      const spacing = width / (items.length + 1);
      items.forEach((id, i) => {
        pos[id] = {
          x: spacing * (i + 1),
          y: 80 + lv * 110,
        };
      });
    }

    return pos;
  }, [nodes, width]);

  const edges = useMemo(() => {
    const result: { from: string; to: string }[] = [];
    for (const node of nodes) {
      if (node.children) {
        for (const child of node.children) {
          result.push({ from: node.id, to: child });
        }
      }
    }
    return result;
  }, [nodes]);

  const handleNodeClick = (id: string) => {
    const node = nodes.find((n) => n.id === id);
    if (!node) return;

    const path: string[] = [];
    const visited = new Set<string>();
    const queue: { id: string; trail: string[] }[] = [{ id: nodes[0]?.id, trail: [] }];

    while (queue.length > 0) {
      const { id: currId, trail } = queue.shift()!;
      if (visited.has(currId)) continue;
      visited.add(currId);
      const newTrail = [...trail, currId];

      if (currId === id) {
        path.push(...newTrail);
        break;
      }

      const curr = nodes.find((n) => n.id === currId);
      if (curr?.children) {
        for (const child of curr.children) {
          queue.push({ id: child, trail: newTrail });
        }
      }
    }

    setBfsPath(path);
    setSelectedId(selectedId === id ? null : id);
  };

  const selectedNode = nodes.find((n) => n.id === selectedId);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl glass-panel p-4">
      <svg viewBox={`0 0 ${width} ${height + 80}`} className="w-full h-auto" style={{ minHeight: 400 }}>
        {edges.map((edge) => {
          const from = positions[edge.from];
          const to = positions[edge.to];
          if (!from || !to) return null;
          const isPathEdge =
            bfsPath.includes(edge.from) && bfsPath.includes(edge.to) &&
            Math.abs(bfsPath.indexOf(edge.from) - bfsPath.indexOf(edge.to)) === 1;
          return (
            <NeuralPath
              key={`${edge.from}-${edge.to}`}
              x1={from.x} y1={from.y + 28}
              x2={to.x} y2={to.y - 28}
              color={nodes.find((n) => n.id === edge.from)?.color}
              isActive={isPathEdge}
              isBlurred
            />
          );
        })}

        {nodes.map((node) => {
          const pos = positions[node.id];
          if (!pos) return null;
          return (
            <NeuralNode
              key={node.id}
              id={node.id}
              label={node.label}
              status={node.status}
              color={node.color}
              icon={iconMap[node.icon]}
              x={pos.x}
              y={pos.y}
              isActive={selectedId === node.id}
              isPath={bfsPath.includes(node.id)}
              onClick={() => handleNodeClick(node.id)}
            />
          );
        })}
      </svg>

      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-4 p-6 rounded-xl glass-panel border border-neon-cyan/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neon-cyan font-mono">
                {selectedNode.label}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                selectedNode.status === "completed" ? "bg-neon-green/20 text-neon-green" :
                selectedNode.status === "in-progress" ? "bg-neon-amber/20 text-neon-amber" :
                "bg-gray-500/20 text-gray-400"
              }`}>
                {selectedNode.status === "completed" ? "UNLOCKED" : selectedNode.status === "in-progress" ? "IN PROGRESS" : "LOCKED"}
              </span>
            </div>
            {selectedNode.description && (
              <p className="text-sm text-gray-400 mb-4">{selectedNode.description}</p>
            )}
            {selectedNode.details?.offerings && (
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedNode.details.offerings.map((o: string) => (
                  <span key={o} className="px-2.5 py-1 text-xs rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
                    {o}
                  </span>
                ))}
              </div>
            )}
            {selectedNode.details?.caseStudy && (
              <div className="mt-3 p-3 rounded-lg bg-neon-cyan/5 border border-neon-cyan/10">
                <p className="text-xs text-gray-400 font-mono">
                  <span className="text-neon-cyan">case study:</span> {selectedNode.details.caseStudy}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-4 right-4 flex items-center gap-2 text-[10px] text-gray-500 font-mono">
        <span className="inline-block w-2 h-2 rounded-full bg-neon-green animate-neon-pulse" />
        BFS PATH TRACE ACTIVE
      </div>
    </div>
  );
}
