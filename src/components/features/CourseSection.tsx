import { useRef, useState, useEffect } from "react";
import { courses, comingSoonCourses } from "@/data/courses";
import CourseCard from "./CourseCard";
import ComingSoonCard from "./ComingSoonCard";
import FocusGridGroup from "@/components/ui/FocusGridGroup";
import { Course } from "@/types";

interface CourseSectionProps {
  onCourseSelect: (course: Course) => void;
}

const CourseSection = ({ onCourseSelect }: CourseSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [comingVisible, setComingVisible] = useState(false);
  const comingRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  useEffect(() => {
    const el = comingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setComingVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <section
      id="courses"
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{
        background: "#0A100D",
        padding: "120px 0",
        position: "relative",
      }}
    >
      {/* Top separator */}
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
            marginBottom: 64,
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
            AVAILABLE NOW
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
            EXPLORE
            <br />
            <span style={{ color: "#00FF88" }}>COURSES</span>
          </h2>
          <p style={{ fontSize: 16, color: "#8C9992", lineHeight: 1.7 }}>
            Start with something you want to understand. Every course is built for clarity.
          </p>
        </div>

        {/* Interactive Focus Course Grid */}
        <FocusGridGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {courses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
              isVisible={isVisible}
              onClick={() => onCourseSelect(course)}
            />
          ))}
        </FocusGridGroup>

        {/* Coming Soon */}
        <div ref={comingRef}>
          <div
            style={{
              marginBottom: 40,
              opacity: comingVisible ? 1 : 0,
              transform: comingVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div className="section-label" style={{ display: "inline-flex" }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#00C96B",
                  display: "inline-block",
                }}
              />
              ON THE ROADMAP
            </div>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(24px, 3vw, 36px)",
                letterSpacing: "-0.02em",
                color: "#F5F7F6",
                marginBottom: 8,
              }}
            >
              More Coming Soon
            </h3>
            <p style={{ fontSize: 14, color: "#8C9992" }}>
              Advanced courses are in development. Be the first to know.
            </p>
          </div>

          <FocusGridGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {comingSoonCourses.map((course, index) => (
              <ComingSoonCard
                key={course.id}
                course={course}
                index={index}
                isVisible={comingVisible}
              />
            ))}
          </FocusGridGroup>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
