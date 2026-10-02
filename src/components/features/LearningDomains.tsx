import { useRef, useState, useEffect } from "react";
import { domains } from "@/data/domains";
import DomainCard from "./DomainCard";
import { Domain } from "@/types";

interface LearningDomainsProps {
  onDomainSelect: (domain: Domain) => void;
}

const LearningDomains = ({ onDomainSelect }: LearningDomainsProps) => {
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
        padding: "120px 0",
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
          background: "linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.1), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          style={{
            maxWidth: 640,
            marginBottom: 72,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
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

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
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
      </div>
    </section>
  );
};

export default LearningDomains;
