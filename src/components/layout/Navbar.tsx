import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import { useScrollY } from "@/hooks/useScrollY";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "What You Can Learn", href: "#domains" },
  { label: "Courses", href: "#courses" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const scrollY = useScrollY();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const scrolled = scrollY > 60;

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "domains", "courses", "about", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        transition: "all 0.3s ease",
        backgroundColor: scrolled
          ? "rgba(5, 8, 7, 0.95)"
          : "rgba(5, 8, 7, 0.6)",
        backdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
        borderBottom: scrolled
          ? "1px solid rgba(0, 255, 136, 0.08)"
          : "1px solid transparent",
        padding: scrolled ? "12px 0" : "20px 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("#home")}
          className="flex items-center gap-2.5 group"
          style={{ cursor: "none" }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              border: "1.5px solid rgba(0, 255, 136, 0.5)",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0, 255, 136, 0.06)",
              transition: "all 0.3s ease",
            }}
            className="group-hover:border-[#00FF88] group-hover:bg-[rgba(0,255,136,0.12)]"
          >
            <Zap size={15} color="#00FF88" />
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: "0.02em",
              color: "#F5F7F6",
            }}
          >
            LEARN{" "}
            <span style={{ color: "#00FF88" }}>ANYTHING</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => handleNavClick("#courses")}
            className="btn-primary"
            style={{ padding: "10px 22px", fontSize: 13 }}
          >
            Explore Courses
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-[#8C9992] hover:text-[#F5F7F6] transition-colors"
          style={{ cursor: "none" }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            background: "rgba(10, 16, 13, 0.98)",
            borderTop: "1px solid rgba(0, 255, 136, 0.1)",
            padding: "20px 24px 28px",
          }}
        >
          <div className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    textAlign: "left",
                    fontSize: 15,
                    fontWeight: 500,
                    color: isActive ? "#00FF88" : "#8C9992",
                    background: "none",
                    border: "none",
                    cursor: "none",
                    transition: "color 0.2s ease",
                  }}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => handleNavClick("#courses")}
              className="btn-primary"
              style={{ width: "fit-content", marginTop: 8 }}
            >
              Explore Courses
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
