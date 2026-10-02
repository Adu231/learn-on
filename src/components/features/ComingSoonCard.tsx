import { Lock, Clock } from "lucide-react";

interface ComingSoonCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    domain: string;
    tags: string[];
  };
  index: number;
  isVisible: boolean;
}

const ComingSoonCard = ({ course, index, isVisible }: ComingSoonCardProps) => {
  return (
    <div
      className="coming-soon-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
        position: "relative",
      }}
    >
      {/* Blur overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 12,
          background: "rgba(5, 8, 7, 0.6)",
          backdropFilter: "blur(1px)",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1.5px solid rgba(0, 255, 136, 0.3)",
              background: "rgba(0, 255, 136, 0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 10px",
            }}
          >
            <Lock size={16} color="rgba(0, 255, 136, 0.7)" />
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "#00FF88",
              textTransform: "uppercase",
              fontWeight: 600,
              background: "rgba(5, 8, 7, 0.8)",
              padding: "6px 14px",
              borderRadius: 4,
              border: "1px solid rgba(0, 255, 136, 0.2)",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Clock size={10} />
            COMING SOON
          </div>
        </div>
      </div>

      {/* Background content (blurred) */}
      <div style={{ filter: "blur(2px)", pointerEvents: "none" }}>
        {/* Tags */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
          {course.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: "#8C9992",
                background: "rgba(140, 153, 146, 0.08)",
                border: "1px solid rgba(140, 153, 146, 0.12)",
                borderRadius: 4,
                padding: "2px 7px",
                letterSpacing: "0.05em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 17,
            letterSpacing: "-0.01em",
            color: "#F5F7F6",
            marginBottom: 8,
          }}
        >
          {course.title}
        </h3>

        <p style={{ fontSize: 13, lineHeight: 1.65, color: "#8C9992", marginBottom: 16 }}>
          {course.description}
        </p>

        <div
          style={{
            borderTop: "1px solid rgba(0, 255, 136, 0.06)",
            paddingTop: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#8C9992",
            }}
          >
            {course.domain}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonCard;
