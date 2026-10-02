import { useRef, useState, useEffect } from "react";
import { domains } from "@/data/domains";
import DomainCard from "./DomainCard";
import CardFanCarousel from "./CardFanCarousel";
import { Domain } from "@/types";
import { Layers, LayoutGrid } from "lucide-react";

interface LearningDomainsProps {
  onDomainSelect: (domain: Domain) => void;
}

const LearningDomains = ({ onDomainSelect }: LearningDomainsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [viewMode, setViewMode] = useState<"fan" | "grid">("fan");

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
      { threshold: 0.05, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <section
      id="domains"
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{
        background: "#050807",
        padding: "120px 0 80px",
        position: "relative",
      }}
    >
      {/* Subtle top separator */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.1), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header & View Mode Switcher */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: 48,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <div className="section-label">
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#00FF88",
                  display: "inline-block",
                }}
              />
              LEARNING PATHS
            </div>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(36px, 5vw, 60px)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                color: "#F5F7F6",
                marginBottom: 20,
              }}
            >
              WHAT DO YOU WANT
              <br />
              <span style={{ color: "#00FF88" }}>TO LEARN?</span>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#8C9992",
                lineHeight: 1.7,
              }}
            >
              Choose a domain and start exploring. Each path takes you from fundamentals to real understanding.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "#0A100D",
              border: "1px solid rgba(0, 255, 136, 0.15)",
              borderRadius: 8,
              padding: 4,
              gap: 4,
            }}
          >
            <button
              onClick={() => setViewMode("fan")}
              data-cursor-hover
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: 6,
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                color: viewMode === "fan" ? "#050807" : "#8C9992",
                background: viewMode === "fan" ? "#00FF88" : "transparent",
                border: "none",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              <Layers size={14} /> Fan View
            </button>

            <button
              onClick={() => setViewMode("grid")}
              data-cursor-hover
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: 6,
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                color: viewMode === "grid" ? "#050807" : "#8C9992",
                background: viewMode === "grid" ? "#00FF88" : "transparent",
                border: "none",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              <LayoutGrid size={14} /> Grid View
            </button>
          </div>
        </div>

        {/* Display Fan Carousel or Grid based on view mode */}
        {viewMode === "fan" ? (
          <CardFanCarousel domains={domains} onDomainSelect={onDomainSelect} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {domains.map((domain, index) => (
              <DomainCard
                key={domain.id}
                domain={domain}
                index={index}
                isVisible={isVisible}
                onClick={() => onDomainSelect(domain)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LearningDomains;
