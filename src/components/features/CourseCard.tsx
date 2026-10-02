import { Play, Clock, ChevronRight } from "lucide-react";
import { Course } from "@/types";

interface CourseCardProps {
  course: Course;
  index: number;
  isVisible: boolean;
  onClick: () => void;
}

const THUMBNAIL_CONFIGS: Record<string, { label: string; sub: string; gradient: string }> = {
  "html-css": {
    label: "HTML & CSS",
    sub: "01 — FUNDAMENTALS",
    gradient: "linear-gradient(135deg, #0D1511 0%, #071510 50%, #050F08 100%)",
  },
  javascript: {
    label: "JAVASCRIPT",
    sub: "01 — VARIABLES & DATA TYPES",
    gradient: "linear-gradient(135deg, #0A0F08 0%, #0D1208 50%, #081009 100%)",
  },
  react: {
    label: "REACT",
    sub: "01 — COMPONENTS & PROPS",
    gradient: "linear-gradient(135deg, #080D11 0%, #07111A 50%, #050D14 100%)",
  },
  python: {
    label: "PYTHON",
    sub: "01 — GETTING STARTED",
    gradient: "linear-gradient(135deg, #0D110A 0%, #141600 50%, #0A0D00 100%)",
  },
  git: {
    label: "GIT & GITHUB",
    sub: "01 — VERSION CONTROL",
    gradient: "linear-gradient(135deg, #110A0A 0%, #160808 50%, #0D0505 100%)",
  },
  nodejs: {
    label: "NODE.JS",
    sub: "01 — THE RUNTIME",
    gradient: "linear-gradient(135deg, #080D0A 0%, #071108 50%, #040C06 100%)",
  },
};

const CourseThumbnail = ({ thumbnail }: { thumbnail: string }) => {
  const config = THUMBNAIL_CONFIGS[thumbnail] || {
    label: "COURSE",
    sub: "01 — INTRODUCTION",
    gradient: "linear-gradient(135deg, #0D1511 0%, #050807 100%)",
  };

  return (
    <div
      className="course-thumbnail"
      style={{
        background: config.gradient,
        position: "relative",
      }}
    >
      {/* Grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0, 255, 136, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "20px 24px",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.12em",
            color: "rgba(0, 255, 136, 0.5)",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {config.sub}
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(18px, 3vw, 26px)",
            letterSpacing: "-0.02em",
            color: "#F5F7F6",
            lineHeight: 1.1,
          }}
        >
          {config.label}
        </div>
        {/* Code accent */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "rgba(0, 255, 136, 0.3)",
            marginTop: 12,
          }}
        >
          {"{ code → skill }"}
        </div>
      </div>

      {/* Corner accent */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#00FF88",
          animation: "green-pulse 2s ease-in-out infinite",
        }}
      />

      {/* Play button overlay */}
      <div className="thumbnail-play-btn">
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "rgba(0, 255, 136, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Play size={18} color="#050807" fill="#050807" />
        </div>
      </div>
    </div>
  );
};

const CourseCard = ({ course, index, isVisible, onClick }: CourseCardProps) => {
  const difficultyColor =
    course.difficulty === "Beginner"
      ? "#00FF88"
      : course.difficulty === "Intermediate"
      ? "#FFAA00"
      : "#FF6060";

  return (
    <div
      className="course-card"
      data-cursor-hover
      onClick={onClick}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
      }}
    >
      <CourseThumbnail thumbnail={course.thumbnail} />

      <div style={{ padding: "20px 22px 22px" }}>
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

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: "-0.01em",
            color: "#F5F7F6",
            lineHeight: 1.35,
            marginBottom: 8,
          }}
        >
          {course.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.65,
            color: "#8C9992",
            marginBottom: 16,
          }}
        >
          {course.description}
        </p>

        {/* Meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(0, 255, 136, 0.06)",
            paddingTop: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 12,
                color: "#8C9992",
              }}
            >
              <Clock size={12} />
              {course.duration}
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: difficultyColor,
                letterSpacing: "0.06em",
                background: `${difficultyColor}12`,
                border: `1px solid ${difficultyColor}30`,
                borderRadius: 4,
                padding: "2px 7px",
              }}
            >
              {course.difficulty}
            </span>
          </div>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 12,
              color: "#00FF88",
              fontWeight: 600,
            }}
          >
            Start <ChevronRight size={13} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
