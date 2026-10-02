import { useRef, useEffect, useState } from "react";

const CODE_LINES = [
  { text: "{ }", color: "rgba(0, 255, 136, 0.5)", size: 48, x: 20, y: 30 },
  { text: "</>", color: "rgba(0, 201, 107, 0.4)", size: 36, x: 65, y: 15 },
  { text: "01", color: "rgba(0, 255, 136, 0.3)", size: 28, x: 80, y: 60 },
  { text: "LEARN", color: "rgba(0, 255, 136, 0.15)", size: 20, x: 10, y: 65 },
  { text: "BUILD", color: "rgba(0, 201, 107, 0.15)", size: 20, x: 45, y: 80 },
  { text: "REPEAT", color: "rgba(0, 255, 136, 0.12)", size: 18, x: 70, y: 85 },
];

const About = () => {
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
      id="about"
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{
        background: "#0A100D",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
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
              ABOUT
            </div>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(28px, 4vw, 50px)",
                letterSpacing: "-0.025em",
                color: "#F5F7F6",
                lineHeight: 1.1,
                marginBottom: 28,
              }}
            >
              LEARNING SHOULD
              <br />
              HAVE{" "}
              <span style={{ color: "#00FF88" }}>NO LIMITS.</span>
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: "#8C9992",
                maxWidth: 500,
                marginBottom: 32,
              }}
            >
              Learn Anything is built around a simple idea — technology and knowledge should be easier to explore. Discover a topic, understand the fundamentals and keep building.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "No paywalls. No subscriptions.",
                "Structured paths from beginner to advanced.",
                "Built by developers, for everyone.",
              ].map((point, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                    transition: `opacity 0.6s ease ${0.3 + i * 0.1}s, transform 0.6s ease ${0.3 + i * 0.1}s`,
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#00FF88",
                      flexShrink: 0,
                      marginTop: 7,
                    }}
                  />
                  <span style={{ fontSize: 15, color: "#C0C8C4", lineHeight: 1.6 }}>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            <div
              style={{
                position: "relative",
                height: 380,
                borderRadius: 16,
                border: "1px solid rgba(0, 255, 136, 0.1)",
                background: "#0D1511",
                overflow: "hidden",
              }}
            >
              {/* Grid */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                  pointerEvents: "none",
                }}
              />

              {/* Floating code symbols */}
              {CODE_LINES.map((item, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: item.size,
                    fontWeight: 700,
                    color: item.color,
                    animation: `float-symbol ${6 + i}s ease-in-out ${i * 0.8}s infinite`,
                    userSelect: "none",
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.text}
                </div>
              ))}

              {/* Center accent */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    color: "rgba(0, 255, 136, 0.4)",
                    letterSpacing: "0.1em",
                    marginBottom: 8,
                  }}
                >
                  // since 2024
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 900,
                    fontSize: 32,
                    color: "rgba(245, 247, 246, 0.08)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  LEARN
                </div>
              </div>

              {/* Radial glow */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 200,
                  height: 200,
                  background:
                    "radial-gradient(circle, rgba(0, 255, 136, 0.05) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Bottom terminal block */}
            <div
              style={{
                marginTop: 16,
                background: "#0D1511",
                border: "1px solid rgba(0, 255, 136, 0.1)",
                borderRadius: 10,
                padding: "16px 20px",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  marginBottom: 12,
                }}
              >
                {["#FF6060", "#FFAA00", "#00FF88"].map((color, i) => (
                  <div
                    key={i}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: color,
                      opacity: 0.7,
                    }}
                  />
                ))}
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.8 }}>
                <div style={{ color: "rgba(0, 255, 136, 0.6)" }}>{"$ learn --domain web"}</div>
                <div style={{ color: "#8C9992" }}>{"→ Loading Web Development..."}</div>
                <div style={{ color: "rgba(0, 255, 136, 0.8)" }}>{"✓ 12 courses available"}</div>
                <div
                  style={{
                    color: "rgba(0, 255, 136, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {"$ "}{" "}
                  <span
                    style={{
                      display: "inline-block",
                      width: 7,
                      height: 14,
                      background: "#00FF88",
                      animation: "blink-cursor 1s step-end infinite",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
