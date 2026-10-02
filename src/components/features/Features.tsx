import { useRef, useEffect, useState } from "react";
import { Zap, Target, Globe, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Learn at Your Pace",
    description: "Explore topics whenever you want. No schedules, no deadlines. Your learning, your time.",
  },
  {
    icon: Target,
    title: "Practical Knowledge",
    description: "Focus on concepts that help you build. Every lesson is designed for real understanding.",
  },
  {
    icon: Globe,
    title: "Multiple Domains",
    description: "Explore technology from different perspectives — web, AI, security, data, design, and more.",
  },
  {
    icon: TrendingUp,
    title: "Always Growing",
    description: "New courses and topics are added regularly. The platform grows as technology evolves.",
  },
];

const Features = () => {
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{
        background: "#050807",
        padding: "120px 0",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.08), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          style={{
            textAlign: "center",
            marginBottom: 72,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="section-label" style={{ justifyContent: "center", display: "inline-flex" }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#00FF88",
                display: "inline-block",
              }}
            />
            WHY IT WORKS
          </div>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px, 4.5vw, 54px)",
              letterSpacing: "-0.025em",
              color: "#F5F7F6",
              lineHeight: 1.1,
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            LEARNING WITHOUT
            <br />
            <span style={{ color: "#00FF88" }}>THE NOISE</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="feature-card"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
                  padding: "28px 24px",
                  borderRadius: 12,
                  border: "1px solid rgba(0, 255, 136, 0.08)",
                  background: "#0D1511",
                  transition2: "border-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0, 255, 136, 0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0, 255, 136, 0.08)";
                }}
              >
                <div className="feature-icon-wrap" style={{ marginBottom: 20 }}>
                  <Icon size={20} color="#00FF88" strokeWidth={1.5} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#F5F7F6",
                    letterSpacing: "-0.01em",
                    marginBottom: 10,
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ fontSize: 14, color: "#8C9992", lineHeight: 1.65 }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
