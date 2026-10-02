import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const CODE_SYMBOLS = [
  { text: "{ }", x: "8%", y: "15%", size: 28, delay: 0, duration: 7 },
  { text: "</>", x: "85%", y: "12%", size: 22, delay: 1.2, duration: 8 },
  { text: "01", x: "92%", y: "45%", size: 18, delay: 0.4, duration: 9 },
  { text: "const", x: "6%", y: "60%", size: 16, delay: 2, duration: 10 },
  { text: "function", x: "78%", y: "70%", size: 14, delay: 0.8, duration: 7.5 },
  { text: "import", x: "15%", y: "80%", size: 14, delay: 1.5, duration: 8.5 },
  { text: "API", x: "70%", y: "25%", size: 20, delay: 3, duration: 6.5 },
  { text: "AI", x: "50%", y: "8%", size: 24, delay: 1, duration: 9.5 },
  { text: "CSS", x: "35%", y: "88%", size: 16, delay: 2.5, duration: 7 },
  { text: "JS", x: "55%", y: "82%", size: 18, delay: 0.6, duration: 8 },
  { text: "React", x: "22%", y: "22%", size: 15, delay: 1.8, duration: 9 },
  { text: "Node", x: "88%", y: "82%", size: 14, delay: 3.5, duration: 7.5 },
  { text: "=>", x: "45%", y: "15%", size: 22, delay: 2.2, duration: 8 },
  { text: "[ ]", x: "12%", y: "40%", size: 20, delay: 1.3, duration: 6.8 },
];

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "ANYTHING";
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    let i = 0;
    intervalRef.current = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(intervalRef.current);
      }
    }, 80);
    return () => clearInterval(intervalRef.current);
  }, [loaded]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="hero-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background image subtle overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.06,
          zIndex: 0,
        }}
      />

      {/* Grid */}
      <div className="grid-overlay" style={{ zIndex: 1 }} />

      {/* Radial fade */}
      <div className="radial-fade" style={{ zIndex: 2 }} />

      {/* Green ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 400,
          background: "radial-gradient(ellipse, rgba(0,255,136,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Floating Code Symbols */}
      <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none" }}>
        {CODE_SYMBOLS.map((sym, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: sym.x,
              top: sym.y,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: sym.size,
              fontWeight: 500,
              color: "#00FF88",
              opacity: 0.07,
              animation: `float-symbol ${sym.duration}s ease-in-out ${sym.delay}s infinite`,
              userSelect: "none",
              letterSpacing: "0.05em",
            }}
          >
            {sym.text}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: 900,
          width: "100%",
        }}
      >
        {/* Label */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          <span className="section-label" style={{ marginBottom: 32 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#00FF88",
                display: "inline-block",
                animation: "green-pulse 2s ease-in-out infinite",
              }}
            />
            YOUR JOURNEY STARTS HERE
          </span>
        </div>

        {/* Main Heading */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
          }}
        >
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(64px, 13vw, 130px)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              color: "#F5F7F6",
              marginBottom: 4,
            }}
          >
            LEARN
          </h1>
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(64px, 13vw, 130px)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              color: "#00FF88",
              marginBottom: 32,
              minHeight: "1.1em",
            }}
          >
            {typedText}
            <span
              style={{
                display: "inline-block",
                width: 5,
                height: "0.8em",
                background: "#00FF88",
                marginLeft: 4,
                verticalAlign: "baseline",
                animation: typedText.length < fullText.length ? "none" : "blink-cursor 1s step-end infinite",
              }}
            />
          </h1>
        </div>

        {/* Subheading */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s",
          }}
        >
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              fontWeight: 400,
              color: "#8C9992",
              letterSpacing: "0.01em",
              lineHeight: 1.6,
              maxWidth: 520,
              margin: "0 auto 48px",
            }}
          >
            Explore technology. Understand concepts.{" "}
            <span style={{ color: "#F5F7F6" }}>Build real skills.</span>
          </p>
        </div>

        {/* CTAs */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 1s, transform 0.6s ease 1s",
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => scrollToSection("courses")}
            className="btn-primary"
            style={{ fontSize: 15, padding: "14px 32px" }}
          >
            Explore Courses
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => scrollToSection("domains")}
            className="btn-secondary"
            style={{ fontSize: 15, padding: "14px 32px" }}
          >
            <Play size={14} />
            What Can I Learn?
          </button>
        </div>

        {/* Stats row */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.6s ease 1.3s",
            display: "flex",
            gap: 40,
            justifyContent: "center",
            marginTop: 64,
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "8+", label: "Domains" },
            { value: "50+", label: "Lessons" },
            { value: "Free", label: "Forever" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#00FF88",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#8C9992",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: 4,
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          opacity: loaded ? 0.5 : 0,
          transition: "opacity 0.6s ease 1.5s",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.15em",
            color: "#8C9992",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
        <div className="animate-scroll-bounce">
          <ChevronDown size={16} color="#00FF88" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
