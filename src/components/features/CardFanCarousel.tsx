import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Globe,
  Smartphone,
  Brain,
  BarChart2,
  Shield,
  Layers,
  Code2,
  Cloud,
} from "lucide-react";
import { Domain } from "@/types";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>> = {
  Globe,
  Smartphone,
  Brain,
  BarChart2,
  Shield,
  Layers,
  Code2,
  Cloud,
};

interface CardFanCarouselProps {
  domains: Domain[];
  onDomainSelect: (domain: Domain) => void;
}

const CardFanCarousel = ({ domains, onDomainSelect }: CardFanCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isRevealed, setIsRevealed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragDistance = useRef(0);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Intersection observer for section entrance
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  // Compute and apply base fan layout with GSAP
  const updateFanLayout = useCallback(
    (animate = true) => {
      const isMobile = windowWidth < 640;
      const isTablet = windowWidth >= 640 && windowWidth < 1024;

      const spacing = isMobile ? 55 : isTablet ? 95 : 140;
      const maxRotation = isMobile ? 6 : isTablet ? 8.5 : 10;
      const arcFactor = isMobile ? 5 : 10;

      cardsRef.current.forEach((cardEl, i) => {
        if (!cardEl) return;

        const offset = i - activeIndex;
        const absOffset = Math.abs(offset);

        // Calculate positions
        const baseX = offset * spacing;
        const baseY = Math.pow(absOffset, 1.35) * arcFactor;
        const baseRotZ = offset * maxRotation;
        const baseRotY = -offset * (isMobile ? 3 : 5);
        const baseScale = Math.max(0.7, 1 - absOffset * (isMobile ? 0.09 : 0.075));
        const baseOpacity = absOffset > (isMobile ? 2.5 : 3.5) ? 0 : Math.max(0.35, 1 - absOffset * 0.2);
        const zIndex = 100 - absOffset * 10;

        // Store base transform values on DOM dataset for stable hover restoration
        cardEl.dataset.baseY = String(baseY);
        cardEl.dataset.baseScale = String(baseScale);
        cardEl.dataset.zIndex = String(zIndex);

        if (animate) {
          gsap.to(cardEl, {
            x: baseX,
            y: baseY,
            rotationZ: baseRotZ,
            rotationY: baseRotY,
            scale: baseScale,
            opacity: baseOpacity,
            zIndex: zIndex,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });
        } else {
          gsap.set(cardEl, {
            x: baseX,
            y: baseY,
            rotationZ: baseRotZ,
            rotationY: baseRotY,
            scale: baseScale,
            opacity: baseOpacity,
            zIndex: zIndex,
          });
        }
      });
    },
    [activeIndex, windowWidth]
  );

  // Entrance animation
  useEffect(() => {
    if (!isRevealed) return;

    cardsRef.current.forEach((cardEl) => {
      if (!cardEl) return;
      gsap.set(cardEl, {
        y: 80,
        opacity: 0,
        scale: 0.6,
        rotationZ: 0,
      });
    });

    const validCards = cardsRef.current.filter(Boolean);
    if (validCards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.to(validCards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: {
          amount: 0.4,
          from: "center",
        },
        ease: "back.out(1.2)",
        onComplete: () => {
          updateFanLayout(true);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isRevealed, updateFanLayout]);

  // Update layout when active index or window width changes
  useEffect(() => {
    if (isRevealed) {
      updateFanLayout(true);
    }
  }, [activeIndex, windowWidth, isRevealed, updateFanLayout]);

  // Smooth Direct Element Hover Handlers (Zero React State Re-renders!)
  const handleCardMouseEnter = (cardEl: HTMLDivElement) => {
    const baseY = parseFloat(cardEl.dataset.baseY || "0");
    const baseScale = parseFloat(cardEl.dataset.baseScale || "1");

    gsap.to(cardEl, {
      y: baseY - 18,
      scale: baseScale * 1.06,
      zIndex: 300,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });

    cardEl.style.borderColor = "rgba(0, 255, 136, 0.6)";
    cardEl.style.boxShadow = "0 22px 55px rgba(0,0,0,0.85), 0 0 25px rgba(0, 255, 136, 0.25)";
  };

  const handleCardMouseLeave = (cardEl: HTMLDivElement, isActive: boolean) => {
    const baseY = parseFloat(cardEl.dataset.baseY || "0");
    const baseScale = parseFloat(cardEl.dataset.baseScale || "1");
    const zIndex = parseInt(cardEl.dataset.zIndex || "100", 10);

    gsap.to(cardEl, {
      y: baseY,
      scale: baseScale,
      zIndex: zIndex,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });

    cardEl.style.borderColor = isActive
      ? "rgba(0, 255, 136, 0.35)"
      : "rgba(0, 255, 136, 0.12)";
    cardEl.style.boxShadow = isActive
      ? "0 16px 40px rgba(0,0,0,0.7), 0 0 15px rgba(0, 255, 136, 0.1)"
      : "0 8px 25px rgba(0,0,0,0.5)";
  };

  // Controls
  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : domains.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < domains.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [domains.length]);

  // Drag handlers
  const handleDragStart = (clientX: number) => {
    isDragging.current = true;
    startX.current = clientX;
    dragDistance.current = 0;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging.current) return;
    dragDistance.current = clientX - startX.current;
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (dragDistance.current > 35) {
      handlePrev();
    } else if (dragDistance.current < -35) {
      handleNext();
    }
  };

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        padding: isMobile ? "10px 0 30px" : "20px 0 40px",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* 3D Stage Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: isMobile ? 370 : isTablet ? 410 : 450,
          perspective: "1200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        {domains.map((domain, index) => {
          const Icon = ICON_MAP[domain.icon] || Code2;
          const isActive = index === activeIndex;

          return (
            <div
              key={domain.id}
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => {
                if (Math.abs(dragDistance.current) > 10) return;
                if (!isActive) {
                  setActiveIndex(index);
                } else {
                  onDomainSelect(domain);
                }
              }}
              onMouseEnter={(e) => handleCardMouseEnter(e.currentTarget)}
              onMouseLeave={(e) => handleCardMouseLeave(e.currentTarget, isActive)}
              data-cursor-hover
              style={{
                position: "absolute",
                width: isMobile ? 260 : isTablet ? 290 : 320,
                background: "#0D1511",
                border: isActive
                  ? "1px solid rgba(0, 255, 136, 0.35)"
                  : "1px solid rgba(0, 255, 136, 0.12)",
                borderRadius: 14,
                padding: isMobile ? "20px" : "24px",
                boxShadow: isActive
                  ? "0 16px 40px rgba(0,0,0,0.7), 0 0 15px rgba(0, 255, 136, 0.1)"
                  : "0 8px 25px rgba(0,0,0,0.5)",
                cursor: "pointer",
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
                willChange: "transform, opacity",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Background ambient radial glow */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 14,
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(0, 255, 136, 0.08) 0%, transparent 70%)",
                  pointerEvents: "none",
                  opacity: isActive ? 1 : 0.4,
                  transition: "opacity 0.3s ease",
                }}
              />

              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    border: "1px solid rgba(0, 255, 136, 0.25)",
                    background: "rgba(0, 255, 136, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: isActive ? "0 0 12px rgba(0, 255, 136, 0.2)" : "none",
                  }}
                >
                  <Icon size={20} color="#00FF88" strokeWidth={1.5} />
                </div>

                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    color: "#00C96B",
                    background: "rgba(0, 201, 107, 0.1)",
                    border: "1px solid rgba(0, 201, 107, 0.2)",
                    borderRadius: 4,
                    padding: "3px 8px",
                    textTransform: "uppercase",
                  }}
                >
                  {domain.category}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: isMobile ? 16 : 18,
                  letterSpacing: "-0.015em",
                  color: "#F5F7F6",
                  marginBottom: 8,
                  lineHeight: 1.3,
                  pointerEvents: "none",
                }}
              >
                {domain.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "#8C9992",
                  marginBottom: 20,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  minHeight: 62,
                  pointerEvents: "none",
                }}
              >
                {domain.description}
              </p>

              {/* Bottom Row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid rgba(0, 255, 136, 0.08)",
                  paddingTop: 14,
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "#8C9992",
                    pointerEvents: "none",
                  }}
                >
                  {domain.courses} courses
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDomainSelect(domain);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: isActive ? "rgba(0, 255, 136, 0.12)" : "transparent",
                    border: isActive
                      ? "1px solid rgba(0, 255, 136, 0.3)"
                      : "1px solid transparent",
                    borderRadius: 6,
                    padding: "5px 10px",
                    color: "#00FF88",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  EXPLORE <ArrowRight size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          marginTop: 10,
          position: "relative",
          zIndex: 200,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={handlePrev}
            aria-label="Previous card"
            data-cursor-hover
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#0A100D",
              border: "1px solid rgba(0, 255, 136, 0.25)",
              color: "#00FF88",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0, 255, 136, 0.6)";
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 255, 136, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(0, 255, 136, 0.25)";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.4)";
            }}
          >
            <ChevronLeft size={20} />
          </button>

          <div
            style={{
              minWidth: 200,
              textAlign: "center",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: "#F5F7F6",
              letterSpacing: "0.05em",
            }}
          >
            <span style={{ color: "#00FF88", marginRight: 8 }}>
              0{activeIndex + 1} / 0{domains.length}
            </span>
            <span style={{ color: "#8C9992" }}>— {domains[activeIndex]?.title}</span>
          </div>

          <button
            onClick={handleNext}
            aria-label="Next card"
            data-cursor-hover
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#0A100D",
              border: "1px solid rgba(0, 255, 136, 0.25)",
              color: "#00FF88",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0, 255, 136, 0.6)";
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 255, 136, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(0, 255, 136, 0.25)";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.4)";
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {domains.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              data-cursor-hover
              style={{
                width: idx === activeIndex ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: idx === activeIndex ? "#00FF88" : "rgba(0, 255, 136, 0.2)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardFanCarousel;
