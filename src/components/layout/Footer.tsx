import { Zap, Github, Twitter, Linkedin, ArrowUpRight } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Courses", href: "#courses" },
  { label: "Domains", href: "#domains" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  const handleClick = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      style={{
        background: "#040606",
        borderTop: "1px solid rgba(0, 255, 136, 0.08)",
        paddingTop: 64,
        paddingBottom: 32,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div
                style={{
                  width: 34,
                  height: 34,
                  border: "1.5px solid rgba(0, 255, 136, 0.4)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0, 255, 136, 0.06)",
                }}
              >
                <Zap size={16} color="#00FF88" />
              </div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  letterSpacing: "0.02em",
                  color: "#F5F7F6",
                }}
              >
                LEARN <span style={{ color: "#00FF88" }}>ANYTHING</span>
              </span>
            </div>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: "#8C9992",
                maxWidth: 280,
              }}
            >
              A modern learning platform for developers, designers and curious minds. Technology knowledge — simplified.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <button
                  key={i}
                  style={{
                    width: 36,
                    height: 36,
                    border: "1px solid rgba(0, 255, 136, 0.12)",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent",
                    cursor: "none",
                    transition: "border-color 0.2s ease, background 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0, 255, 136, 0.4)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(0, 255, 136, 0.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0, 255, 136, 0.12)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <Icon size={15} color="#8C9992" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.12em",
                color: "#00FF88",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Navigate
            </p>
            <div className="flex flex-col gap-3">
              {FOOTER_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "none",
                    border: "none",
                    cursor: "none",
                    textAlign: "left",
                    fontSize: 14,
                    color: "#8C9992",
                    transition: "color 0.2s ease",
                    padding: 0,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#F5F7F6";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#8C9992";
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.12em",
                color: "#00FF88",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Contact
            </p>
            <div className="flex flex-col gap-3">
              <p style={{ fontSize: 14, color: "#8C9992" }}>hello@learnanything.dev</p>
              <a
                href="#"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 14,
                  color: "#00FF88",
                  textDecoration: "none",
                  cursor: "none",
                }}
              >
                learnanything.dev <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(0, 255, 136, 0.06)",
            paddingTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: "#8C9992",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            © 2026 Learn Anything. All rights reserved.
          </p>
          <p
            style={{
              fontSize: 12,
              color: "rgba(140, 153, 146, 0.5)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {"// built for developers"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
