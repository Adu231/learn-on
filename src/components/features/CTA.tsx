import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  const scrollToCourses = () => {
    const el = document.getElementById("courses");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{
        background: "#050807",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.1), transparent)",
        }}
      />

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          height: "40vh",
          background: "radial-gradient(ellipse, rgba(0, 255, 136, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          animation: "pulse-glow 4s ease-in-out infinite",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center" style={{ position: "relative", zIndex: 2 }}>
        {/* Label */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div className="section-label" style={{ marginBottom: 32 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#00FF88",
                display: "inline-block",
              }}
            />
            THE NEXT STEP
          </div>
        </div>

        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(40px, 7vw, 80px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.0,
            color: "#F5F7F6",
            marginBottom: 20,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
          }}
        >
          WHAT WILL YOU
          <br />
          <span style={{ color: "#00FF88" }}>LEARN NEXT?</span>
        </h2>

        <p
          style={{
            fontSize: 18,
            color: "#8C9992",
            lineHeight: 1.65,
            maxWidth: 460,
            margin: "0 auto 48px",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.6s ease 0.3s",
          }}
        >
          There is always something new to explore.
        </p>

        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={scrollToCourses}
            className="btn-primary"
            style={{ fontSize: 16, padding: "16px 40px" }}
          >
            START EXPLORING
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Bottom decorative code line */}
        <div
          style={{
            marginTop: 64,
            opacity: isVisible ? 0.25 : 0,
            transition: "opacity 0.6s ease 0.6s",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "#00FF88",
            letterSpacing: "0.1em",
          }}
        >
          {"// the best time to start is now"}
        </div>
      </div>
    </section>
  );
};

export default CTA;
