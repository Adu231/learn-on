import { X, Clock, Play, ChevronRight, BookOpen, BarChart2 } from "lucide-react";
import { Course } from "@/types";
import { useState } from "react";

interface CourseDetailProps {
  course: Course;
  onClose: () => void;
}

const THUMBNAIL_CONFIGS: Record<string, { label: string; gradient: string }> = {
  "html-css": { label: "HTML & CSS", gradient: "linear-gradient(135deg, #0D1511 0%, #071510 50%, #050F08 100%)" },
  javascript: { label: "JAVASCRIPT", gradient: "linear-gradient(135deg, #0A0F08 0%, #0D1208 50%, #081009 100%)" },
  react: { label: "REACT", gradient: "linear-gradient(135deg, #080D11 0%, #07111A 50%, #050D14 100%)" },
  python: { label: "PYTHON", gradient: "linear-gradient(135deg, #0D110A 0%, #141600 50%, #0A0D00 100%)" },
  git: { label: "GIT & GITHUB", gradient: "linear-gradient(135deg, #110A0A 0%, #160808 50%, #0D0505 100%)" },
  nodejs: { label: "NODE.JS", gradient: "linear-gradient(135deg, #080D0A 0%, #071108 50%, #040C06 100%)" },
};

const CourseDetail = ({ course, onClose }: CourseDetailProps) => {
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [startLearning, setStartLearning] = useState(false);

  const config = THUMBNAIL_CONFIGS[course.thumbnail] || {
    label: course.title.toUpperCase(),
    gradient: "linear-gradient(135deg, #0D1511 0%, #050807 100%)",
  };

  const difficultyColor =
    course.difficulty === "Beginner" ? "#00FF88" : course.difficulty === "Intermediate" ? "#FFAA00" : "#FF6060";

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-content"
        style={{ animation: "slide-up 0.4s cubic-bezier(0.16,1,0.3,1) forwards" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 36,
            height: 36,
            border: "1px solid rgba(0, 255, 136, 0.15)",
            borderRadius: 8,
            background: "rgba(0, 255, 136, 0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "none",
            zIndex: 10,
            transition: "all 0.2s ease",
            color: "#8C9992",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(0, 255, 136, 0.4)";
            (e.currentTarget as HTMLElement).style.color = "#F5F7F6";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(0, 255, 136, 0.15)";
            (e.currentTarget as HTMLElement).style.color = "#8C9992";
          }}
        >
          <X size={16} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-0">
          {/* Left: Thumbnail + Info */}
          <div
            style={{
              gridColumn: "span 2",
              borderRight: "1px solid rgba(0, 255, 136, 0.08)",
            }}
          >
            {/* Thumbnail */}
            <div
              style={{
                aspectRatio: "16/9",
                background: config.gradient,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Grid */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "linear-gradient(rgba(0, 255, 136, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.04) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: 24,
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    color: "rgba(0, 255, 136, 0.5)",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  {startLearning ? "LESSON 01 — NOW PLAYING" : "COURSE OVERVIEW"}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 28,
                    color: "#F5F7F6",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {config.label}
                </div>
              </div>

              {/* Play overlay */}
              {startLearning && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "#00FF88",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Play size={24} color="#050807" fill="#050807" />
                  </div>
                </div>
              )}
            </div>

            {/* Course meta */}
            <div style={{ padding: 24 }}>
              <div className="section-label" style={{ marginBottom: 12, fontSize: 10 }}>
                {course.domain}
              </div>
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 22,
                  letterSpacing: "-0.02em",
                  color: "#F5F7F6",
                  marginBottom: 12,
                  lineHeight: 1.25,
                }}
              >
                {course.title}
              </h2>
              <p style={{ fontSize: 13, color: "#8C9992", lineHeight: 1.65, marginBottom: 20 }}>
                {course.description}
              </p>

              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                {[
                  { icon: Clock, label: "Duration", value: course.duration },
                  { icon: BarChart2, label: "Level", value: course.difficulty },
                  { icon: BookOpen, label: "Lessons", value: `${course.lessons.length} lessons` },
                  { icon: Play, label: "Format", value: "Video + Text" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      background: "rgba(0, 255, 136, 0.04)",
                      border: "1px solid rgba(0, 255, 136, 0.08)",
                      borderRadius: 8,
                      padding: "10px 14px",
                    }}
                  >
                    <div style={{ fontSize: 11, color: "#8C9992", marginBottom: 4 }}>{item.label}</div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: item.label === "Level" ? difficultyColor : "#F5F7F6",
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", fontSize: 14 }}
                onClick={() => setStartLearning(true)}
              >
                <Play size={15} />
                {startLearning ? "Continue Learning" : "Start Learning"}
              </button>
            </div>
          </div>

          {/* Right: Lesson List */}
          <div
            style={{
              gridColumn: "span 3",
              padding: "28px",
              overflowY: "auto",
              maxHeight: "80vh",
            }}
          >
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                color: "#F5F7F6",
                marginBottom: 6,
                letterSpacing: "-0.01em",
              }}
            >
              Course Curriculum
            </h3>
            <p style={{ fontSize: 13, color: "#8C9992", marginBottom: 24 }}>
              {course.lessons.length} lessons · {course.duration}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {course.lessons.map((lesson, i) => {
                const isActive = activeLesson === i || (startLearning && i === 0 && activeLesson === null);

                return (
                  <button
                    key={lesson.id}
                    data-cursor-hover
                    onClick={() => {
                      setActiveLesson(i);
                      setStartLearning(true);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 16,
                      padding: "14px 16px",
                      borderRadius: 8,
                      border: isActive
                        ? "1px solid rgba(0, 255, 136, 0.3)"
                        : "1px solid rgba(0, 255, 136, 0.06)",
                      background: isActive ? "rgba(0, 255, 136, 0.06)" : "transparent",
                      cursor: "none",
                      textAlign: "left",
                      transition: "all 0.2s ease",
                      width: "100%",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = "rgba(0, 255, 136, 0.03)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0, 255, 136, 0.15)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0, 255, 136, 0.06)";
                      }
                    }}
                  >
                    {/* Number / Play */}
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        border: isActive
                          ? "1.5px solid rgba(0, 255, 136, 0.6)"
                          : "1px solid rgba(140, 153, 146, 0.2)",
                        background: isActive ? "rgba(0, 255, 136, 0.1)" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.2s ease",
                      }}
                    >
                      {isActive ? (
                        <Play size={12} color="#00FF88" fill="#00FF88" />
                      ) : (
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 11,
                            color: "#8C9992",
                            fontWeight: 600,
                          }}
                        >
                          {String(lesson.number).padStart(2, "0")}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 14,
                          color: isActive ? "#F5F7F6" : "#C0C8C4",
                          marginBottom: 4,
                          letterSpacing: "-0.005em",
                        }}
                      >
                        {lesson.title}
                      </div>
                      <div style={{ fontSize: 12, color: "#8C9992", lineHeight: 1.5 }}>
                        {lesson.description}
                      </div>
                    </div>

                    {/* Duration + arrow */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: 6,
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 11,
                          color: "#8C9992",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Clock size={10} />
                        {lesson.duration}
                      </span>
                      <ChevronRight
                        size={13}
                        color={isActive ? "#00FF88" : "rgba(140, 153, 146, 0.4)"}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
