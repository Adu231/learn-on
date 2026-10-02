import { useState } from "react";
import CustomCursor from "@/components/features/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/features/Hero";
import LearningDomains from "@/components/features/LearningDomains";
import CourseSection from "@/components/features/CourseSection";
import Features from "@/components/features/Features";
import About from "@/components/features/About";
import CTA from "@/components/features/CTA";
import Footer from "@/components/layout/Footer";
import CourseDetail from "@/components/features/CourseDetail";
import { Domain, Course } from "@/types";
import { courses } from "@/data/courses";

const Index = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleDomainSelect = (domain: Domain) => {
    // Scroll to courses and optionally filter — for now just scroll
    const el = document.getElementById("courses");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    document.body.style.overflow = "hidden";
  };

  const handleCloseDetail = () => {
    setSelectedCourse(null);
    document.body.style.overflow = "";
  };

  return (
    <div
      style={{
        background: "#050807",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <LearningDomains onDomainSelect={handleDomainSelect} />
        <CourseSection onCourseSelect={handleCourseSelect} />
        <Features />
        <About />
        <CTA />
      </main>

      <Footer />

      {/* Course Detail Modal */}
      {selectedCourse && (
        <CourseDetail course={selectedCourse} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default Index;
