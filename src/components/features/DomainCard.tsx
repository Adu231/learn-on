import { ArrowRight } from "lucide-react";
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

interface DomainCardProps {
  domain: Domain;
  index: number;
  isVisible: boolean;
  onClick: () => void;
}

const DomainCard = ({ domain, index, isVisible, onClick }: DomainCardProps) => {
  const Icon = ICON_MAP[domain.icon] || Code2;

  const direction = index % 3 === 0 ? "slide-up" : index % 3 === 1 ? "slide-left" : "slide-right";

  return (
    <div
      className="domain-card"
      onClick={onClick}
      data-cursor-hover
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) translateX(0)"
          : direction === "slide-up"
          ? "translateY(40px)"
          : direction === "slide-left"
          ? "translateX(30px)"
          : "translateX(-30px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`,
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            border: "1px solid rgba(0, 255, 136, 0.2)",
            background: "rgba(0, 255, 136, 0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            flexShrink: 0,
          }}
        >
          <Icon size={20} color="#00FF88" strokeWidth={1.5} />
        </div>

        {/* Arrow */}
        <div
          style={{
            color: "#8C9992",
            transition: "color 0.3s ease, transform 0.3s ease",
          }}
          className="card-arrow"
        >
          <ArrowRight size={16} />
        </div>
      </div>

      {/* Category label */}
      <span
        style={{
          display: "inline-block",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.12em",
          color: "#00C96B",
          background: "rgba(0, 201, 107, 0.08)",
          border: "1px solid rgba(0, 201, 107, 0.15)",
          borderRadius: 4,
          padding: "3px 8px",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        {domain.category}
      </span>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: "-0.01em",
          color: "#F5F7F6",
          marginBottom: 8,
          lineHeight: 1.3,
        }}
      >
        {domain.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.65,
          color: "#8C9992",
          marginBottom: 20,
        }}
      >
        {domain.description}
      </p>

      {/* Bottom */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(0, 255, 136, 0.06)",
          paddingTop: 16,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "#8C9992",
          }}
        >
          {domain.courses} courses
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "#00FF88",
            letterSpacing: "0.06em",
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontWeight: 600,
          }}
        >
          EXPLORE →
        </span>
      </div>
    </div>
  );
};

export default DomainCard;
