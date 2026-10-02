import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface FocusGridGroupProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const FocusGridGroup: React.FC<FocusGridGroupProps> = ({
  children,
  className = "",
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Query interactive card children inside this group
    const cards = Array.from(
      container.querySelectorAll<HTMLElement>(
        ".course-card, .domain-card, .coming-soon-card, .feature-card, [data-interactive-card]"
      )
    );

    if (cards.length === 0) return;

    // Remove any conflicting CSS transition on transform property to prevent animation stutter
    cards.forEach((card) => {
      card.style.transition = "border-color 0.3s ease, box-shadow 0.3s ease";
      card.style.transformOrigin = "center center";
    });

    const isMobile = () => window.innerWidth < 640;
    const isTablet = () => window.innerWidth >= 640 && window.innerWidth < 1024;

    const handleMouseEnterCard = (hoveredIndex: number) => {
      if (isMobile()) return;

      const tablet = isTablet();
      const focusScale = tablet ? 1.04 : 1.08;
      const focusY = tablet ? -5 : -10;
      const compressScale = tablet ? 0.97 : 0.95;
      const compressOpacity = tablet ? 0.82 : 0.72;

      cards.forEach((card, i) => {
        if (i === hoveredIndex) {
          // Hovered card becomes visually dominant with silky GSAP tween
          gsap.to(card, {
            scale: focusScale,
            x: 0,
            y: focusY,
            opacity: 1,
            zIndex: 50,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });

          card.style.borderColor = "rgba(0, 255, 136, 0.45)";
          card.style.boxShadow =
            "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 255, 136, 0.2)";
        } else {
          // Surrounding cards compress subtly and drop opacity for visual focus
          const deltaIndex = i - hoveredIndex;
          const shiftX = Math.sign(deltaIndex) * (tablet ? 4 : 8);

          gsap.to(card, {
            scale: compressScale,
            x: shiftX,
            y: 0,
            opacity: compressOpacity,
            zIndex: 1,
            duration: 0.38,
            ease: "power2.out",
            overwrite: "auto",
          });

          card.style.borderColor = "";
          card.style.boxShadow = "";
        }
      });
    };

    const handleMouseLeaveGroup = () => {
      if (isMobile()) return;

      cards.forEach((card) => {
        gsap.to(card, {
          scale: 1,
          x: 0,
          y: 0,
          opacity: 1,
          zIndex: 1,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });

        card.style.borderColor = "";
        card.style.boxShadow = "";
      });
    };

    const cleanups: (() => void)[] = [];

    cards.forEach((card, index) => {
      const enterHandler = () => handleMouseEnterCard(index);
      card.addEventListener("mouseenter", enterHandler);
      cleanups.push(() => card.removeEventListener("mouseenter", enterHandler));
    });

    container.addEventListener("mouseleave", handleMouseLeaveGroup);
    cleanups.push(() => container.removeEventListener("mouseleave", handleMouseLeaveGroup));

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [children]);

  return (
    <div ref={containerRef} className={className} style={{ position: "relative", ...style }}>
      {children}
    </div>
  );
};

export default FocusGridGroup;
