// components/RetroIntro.tsx
"use client";
import { useEffect, useState } from "react";

interface RetroIntroProps {
  onFinish: () => void;
  typeSpeed?: number;
}

const slides: string[] = [
        `🧑‍💻 Welcome Commander Vinay Yadav...
        
        Student | Web Developer | Designer | Digital Strategist | Financial Expert | Exploring Tech , Management , Marketing , Finance , HR , and more...
      
        You are now inside the core of Project Vinay.dev – a portal engineered by your own hands to change the digital world.
        `,
        
        `📡 Origin Report:
      
        In the silent hours of code and caffeine, a rogue AI whispered blueprints for a forgotten interface...
        A system lost in the archives of the early web — part game, part tool, part digital soul.
        `,
      
        `📚 Journey Logs:
      
        As a student, you started with curiosity—wondering how websites came alive. That spark led you through the worlds of frontend development, UI/UX design, finance dashboards, digital campaigns, and even HR systems.
        You built resume tools, billing apps, marketing dashboards, and more—each project a key in decoding real-world logic.
        Along the way, you trained with J.P. Morgan, Accenture, and Reliance in virtual simulations—where industry systems became blueprints.
      
        🧰 Tech Arsenal:
        Vue.js, React, Tailwind, JavaScript, Figma, Astro, Excel, CRM Tools, Design Systems, and Visual Storytelling.
        ,

        🧰 Soft Skills Arsenal:
       Problem Solving,Self Learning, Creativity, Communication, Leadership, Teamwork, Time Management, Adaptability, and Critical Thinking.
        `,
        
        `🧬 Timeline Reconstruction:
      
        010101: You mastered Typescript, Next.js, Vite, Tailwind, Astro, Vue and React.
        052024: J.P. Morgan (Forage) Investment Banking Virtual Experience .
        052024: Accenture (Forage) Data Analytics & Visualization.
        062025: Reliance Industries Public Relations in the Digital Age.
        052025: NISM – National Institute of Securities Markets Mutual Funds & Investment Advisor (Advanced).
        052025: Investor Awareness & Dispute Resolution (ODR Program).
        052024: IBM Skill Build Web Development Basics | Learn JavaScript.
        062025: NSDC Web Design & Development.
        032023: ALEPH | HP LIFE Digital Ads | Basic Mathematics | Intro to Digital Business.
        100101: You deployed the core to the outer shell.
        111111: You opened the gateway for other agents to enter.
        `,
        
        `🔓 Final Entry:
      
        Project Vinay.dev is now live.
        Awaiting next-gen coders, rebels, and newsletter agents to join the resistance.
        `
      ];
      

const asciiArt = `
   ____  ____  _____   ____  _____ ____ 
  |  _ \|  _ \| ____| |  _ \| ____|  _ \
  | | | | | | |  _|   | | | |  _| | | | |
  | |_| | |_| | |___  | |_| | |___| |_| |
  |____/|____/|_____| |____/|_____|____/ 
`;

const RetroIntro: React.FC<RetroIntroProps> = ({ onFinish, typeSpeed = 40 }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [typedText, setTypedText] = useState<string>("");
  const [charIndex, setCharIndex] = useState<number>(0);
  const [fade, setFade] = useState<"in" | "out" | "none">("in");

  // Handler for advancing slides
  useEffect(() => {
    const handleAdvance = (e: KeyboardEvent | TouchEvent) => {
      if (charIndex < slides[currentSlide].length) return; // Only allow after typing is done
      if (currentSlide < slides.length - 1) {
        setFade("out");
        setTimeout(() => {
          setCurrentSlide((prev) => prev + 1);
        }, 350);
      } else {
        setFade("out");
        setTimeout(() => onFinish(), 350);
      }
    };
    // Keyboard for desktop
    window.addEventListener("keydown", handleAdvance);
    // Touch for mobile
    window.addEventListener("touchstart", handleAdvance);
    return () => {
      window.removeEventListener("keydown", handleAdvance);
      window.removeEventListener("touchstart", handleAdvance);
    };
  }, [charIndex, currentSlide, onFinish]);

  useEffect(() => {
    if (fade === "in" && charIndex < slides[currentSlide].length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + slides[currentSlide][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, typeSpeed);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentSlide, fade, typeSpeed]);

  // Fade in on slide change
  useEffect(() => {
    setFade("in");
    setTypedText("");
    setCharIndex(0);
  }, [currentSlide]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
      <div className="w-full max-w-2xl mx-auto bg-black border-2 border-green-500 rounded-lg shadow-2xl p-0 sm:p-8 crt flex flex-col items-center justify-center min-h-[60vh]">
        <pre className="mb-6 text-green-500 text-sm leading-none select-none">
          {asciiArt}
        </pre>
        {/* Progress Indicator */}
        <div className="flex gap-2 mb-6">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full border border-green-500 ${
                idx === currentSlide ? "bg-green-400" : "bg-black"
              } transition-all duration-300`}
            />
          ))}
        </div>
        {/* Slide Content with Fade Transition */}
        <div
          className={`text-base sm:text-xl mb-10 whitespace-pre-line transition-opacity duration-350 w-full text-green-400 font-mono text-left min-h-[180px]`}
          style={{
            opacity: fade === "in" ? 1 : fade === "out" ? 0 : 1,
          }}
        >
          {typedText}
          {slides[currentSlide] && charIndex < slides[currentSlide].length && <span className="animate-pulse">█</span>}
        </div>
        {/* No buttons, advance by key/tap only */}
        <div className="text-green-700 text-xs opacity-70 select-none">
          {charIndex >= slides[currentSlide].length && (
            <>
              {"Press any key or tap to continue..."}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetroIntro;