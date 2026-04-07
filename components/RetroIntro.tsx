// components/RetroIntro.tsx
"use client";
import { useEffect, useRef, useState, useCallback } from "react";

interface RetroIntroProps {
  onFinish: () => void;
  typeSpeed?: number;
}

const slides: string[] = [
  `🧑‍💻 INITIALISING VINAY.DEV...

  Student · Web Developer · Designer · Digital Strategist · Financial Expert

  You are now inside the core of Project Vinay.dev — a portal
  engineered to bridge code, creativity, and commerce.

  Press any key, tap, or click CONTINUE to proceed.`,

  `📡 SYSTEM LOGS:

  Built with Next.js · React · TypeScript · Tailwind · Express · MongoDB
  Trained at J.P. Morgan · Accenture · Reliance Industries

  ⚡ Skills: Frontend · UI/UX · Finance Analytics · Digital Marketing
  ⚡ Soft: Leadership · Problem Solving · Communication · Teamwork`,

  `🔓 LAUNCH SEQUENCE COMPLETE.

  Project Vinay.dev is now live.
  Awaiting next-gen coders, rebels, and collaborators.

  >>> ENTERING PORTFOLIO...`,
];

const asciiArt = `
 __   _____ _   _    _ __   __
 \\ \\ / /_ _| \\ | |  / \\\\ \\ / /
  \\ V / | ||  \\| | / _ \\\\ V /
   \\_/ |___|_|\\__|/_/ \\_\\\\_/
       D E V  P O R T A L
`;

// Matrix rain canvas background
function MatrixRain({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement | null> }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";

    let animFrame: number;
    function draw() {
      ctx!.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      ctx!.fillStyle = "#003300";
      ctx!.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx!.fillStyle = Math.random() > 0.95 ? "#00ff41" : "#003300";
        ctx!.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas!.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animFrame = requestAnimationFrame(draw);
    }
    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef]);
  return null;
}

const RetroIntro: React.FC<RetroIntroProps> = ({ onFinish, typeSpeed = 22 }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [typedText, setTypedText] = useState<string>("");
  const [charIndex, setCharIndex] = useState<number>(0);
  const [fade, setFade] = useState<"in" | "out">("in");
  const [glitch, setGlitch] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const advance = useCallback(() => {
    setFade("out");
    setTimeout(() => {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide((prev) => prev + 1);
      } else {
        onFinish();
      }
    }, 300);
  }, [currentSlide, onFinish]);

  const skipAll = useCallback(() => {
    setFade("out");
    setTimeout(onFinish, 300);
  }, [onFinish]);

  // Keyboard / tap to advance (only when typing done)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { skipAll(); return; }
      if (charIndex >= slides[currentSlide].length) advance();
      else {
        // Skip typing animation on current slide
        setCharIndex(slides[currentSlide].length);
        setTypedText(slides[currentSlide]);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [charIndex, currentSlide, advance, skipAll]);

  // Typing effect
  useEffect(() => {
    if (fade === "in" && charIndex < slides[currentSlide].length) {
      const t = setTimeout(() => {
        setTypedText((p) => p + slides[currentSlide][charIndex]);
        setCharIndex((p) => p + 1);
      }, typeSpeed);
      return () => clearTimeout(t);
    }
  }, [charIndex, currentSlide, fade, typeSpeed]);

  // Auto-advance 1.8s after slide is fully typed
  useEffect(() => {
    if (charIndex < slides[currentSlide].length) return;
    const t = setTimeout(advance, 1800);
    return () => clearTimeout(t);
  }, [charIndex, currentSlide, advance]);

  // Reset on slide change
  useEffect(() => {
    setFade("in");
    setTypedText("");
    setCharIndex(0);
  }, [currentSlide]);

  // Periodic glitch effect on ASCII art
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const progress = ((currentSlide + 1) / slides.length) * 100;
  const typed = charIndex >= slides[currentSlide].length;

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center overflow-hidden">
      {/* Matrix rain background */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40 pointer-events-none" />
      <MatrixRain canvasRef={canvasRef} />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.03) 2px, rgba(0,255,65,0.03) 4px)",
        }}
      />

      {/* Skip button */}
      <button
        onClick={skipAll}
        className="absolute top-4 right-4 z-10 px-4 py-1.5 text-xs font-mono border border-green-700 text-green-500 hover:bg-green-900/40 hover:text-green-300 transition-all rounded"
        aria-label="Skip intro"
      >
        SKIP [ESC]
      </button>

      {/* Terminal window */}
      <div
        className="relative w-full max-w-xl mx-4 border border-green-600 rounded-lg shadow-[0_0_40px_rgba(0,255,65,0.25)] flex flex-col"
        style={{
          background: "rgba(0,8,0,0.92)",
          opacity: fade === "in" ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-green-900/60 bg-green-950/30 rounded-t-lg">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-2 text-green-600 text-xs font-mono">vinay.dev — terminal v2.0</span>
        </div>

        <div className="p-5 sm:p-7 flex flex-col gap-4">
          {/* ASCII art with glitch */}
          <pre
            className="text-green-500 text-[0.55rem] sm:text-xs leading-tight select-none font-mono"
            style={{
              textShadow: glitch
                ? "2px 0 #ff0040, -2px 0 #00ffff"
                : "0 0 8px rgba(0,255,65,0.6)",
              filter: glitch ? "blur(0.5px)" : "none",
              transition: "filter 0.05s",
            }}
          >
            {asciiArt}
          </pre>

          {/* Progress bar */}
          <div className="w-full h-1 bg-green-950 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Slide content */}
          <div
            className="font-mono text-sm sm:text-base text-green-300 whitespace-pre-line min-h-[130px] leading-relaxed"
            style={{ textShadow: "0 0 6px rgba(0,255,65,0.3)" }}
          >
            {typedText}
            {!typed && (
              <span className="inline-block w-2.5 h-4 bg-green-400 animate-pulse align-middle ml-0.5" />
            )}
          </div>

          {/* Slide dots + hint */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full border transition-all duration-300 ${
                    idx === currentSlide
                      ? "bg-green-400 border-green-400 shadow-[0_0_6px_#00ff41]"
                      : idx < currentSlide
                      ? "bg-green-800 border-green-700"
                      : "bg-transparent border-green-800"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={typed ? advance : () => { setCharIndex(slides[currentSlide].length); setTypedText(slides[currentSlide]); }}
              className="px-4 py-1.5 text-xs font-mono bg-green-700/30 border border-green-600 text-green-400 hover:bg-green-600/40 hover:text-green-200 transition-all rounded"
            >
              {typed
                ? currentSlide < slides.length - 1
                  ? "CONTINUE ›"
                  : "ENTER PORTAL ›"
                : "SKIP TYPING"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetroIntro;