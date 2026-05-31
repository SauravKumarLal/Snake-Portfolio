import { CERTS } from "../data";
import { DraggableCardBody, DraggableCardContainer } from "./ui/draggable-card";

const POSITIONS = [
  { top: "30px",  left: "2%",  rotate: -8 },
  { top: "48px",  left: "17%", rotate: -3 },
  { top: "22px",  left: "33%", rotate:  5 },
  { top: "40px",  left: "49%", rotate: 10 },
  { top: "285px", left: "9%",  rotate: -6 },
  { top: "305px", left: "25%", rotate:  2 },
  { top: "278px", left: "41%", rotate:  8 },
  { top: "298px", left: "57%", rotate: -3 },
];

export default function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="section-header">
        <p className="section-label">/Certifications</p>
        <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
          drag the cards to explore
        </p>
      </div>

      <DraggableCardContainer>
        {CERTS.map((cert, i) => {
          const pos      = POSITIONS[i] ?? { top: "40px", left: "40%", rotate: 0 };
          const isAWS    = cert.name.toLowerCase().startsWith("aws");
          const isSamsung = cert.name.toLowerCase().includes("samsung");

          // ── theme tokens ──────────────────────────────────────────────────
          const theme = isAWS ? {
            bg:          "rgba(255, 153,   0, 0.05)",
            border:      "rgba(255, 153,   0, 0.22)",
            stripe:      "linear-gradient(90deg, #FF9900, #FFB347)",
            shadow:      "0 8px 32px rgba(0,0,0,0.6), 0 0 28px rgba(255,153,0,0.07)",
            badge:       "AWS ★",
            badgeColor:  "#FF9900",
            badgeBg:     "rgba(255,153,0,0.10)",
            badgeBorder: "rgba(255,153,0,0.20)",
            nameColor:   "#fff",
          } : isSamsung ? {
            bg:          "rgba(0, 168, 255, 0.05)",
            border:      "rgba(0, 168, 255, 0.22)",
            stripe:      "linear-gradient(90deg, #0062BD, #00A8FF)",
            shadow:      "0 8px 32px rgba(0,0,0,0.6), 0 0 28px rgba(0,168,255,0.07)",
            badge:       "SRIB ★",
            badgeColor:  "#00A8FF",
            badgeBg:     "rgba(0,168,255,0.10)",
            badgeBorder: "rgba(0,168,255,0.20)",
            nameColor:   "#fff",
          } : null;

          const isHighlighted = isAWS || isSamsung;

          return (
            <DraggableCardBody
              key={cert.name}
              style={{ top: pos.top, left: pos.left }}
              rotate={pos.rotate}
            >
              <a
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                style={{ display: "block" }}
              >
                <div style={{
                  width: 210,
                  height: 210,
                  borderRadius: 10,
                  background: isHighlighted ? theme.bg    : "rgba(255,255,255,0.03)",
                  border:     isHighlighted ? `1px solid ${theme.border}` : "1px solid rgba(255,255,255,0.07)",
                  padding: 20,
                  color: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  boxShadow: isHighlighted ? theme.shadow : "0 8px 28px rgba(0,0,0,0.5)",
                }}>

                  {/* top accent stripe */}
                  {isHighlighted && (
                    <div style={{
                      position: "absolute",
                      top: 0, left: 0, right: 0,
                      height: 2,
                      borderRadius: "10px 10px 0 0",
                      background: theme.stripe,
                    }} />
                  )}

                  <div>
                    {/* badge or index */}
                    {isHighlighted ? (
                      <span style={{
                        display: "inline-block",
                        fontFamily: "var(--mono)",
                        fontSize: 9,
                        color: theme.badgeColor,
                        background: theme.badgeBg,
                        border: `1px solid ${theme.badgeBorder}`,
                        borderRadius: 4,
                        padding: "2px 7px",
                        letterSpacing: "0.06em",
                        marginBottom: 12,
                      }}>
                        {theme.badge}
                      </span>
                    ) : (
                      <p style={{
                        fontFamily: "var(--mono)",
                        fontSize: 10,
                        color: "rgba(255,255,255,0.18)",
                        marginBottom: 12,
                        letterSpacing: "0.05em",
                      }}>
                        {String(i + 1).padStart(2, "0")}
                      </p>
                    )}

                    <h3 style={{
                      fontFamily: "var(--mono)",
                      fontSize: 13,
                      fontWeight: 600,
                      lineHeight: 1.35,
                      marginBottom: 6,
                      color: isHighlighted ? theme.nameColor : "rgba(255,255,255,0.82)",
                    }}>
                      {cert.name}
                    </h3>

                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", lineHeight: 1.4 }}>
                      {cert.desc}
                    </p>

                    {cert.credentialId && (
                      <p style={{
                        fontSize: 9,
                        color: "rgba(255,255,255,0.18)",
                        marginTop: 8,
                        fontFamily: "var(--mono)",
                        wordBreak: "break-all",
                      }}>
                        {cert.credentialId}
                      </p>
                    )}
                  </div>

                  {/* verify chip */}
                  <span style={{
                    display: "inline-block",
                    border: isHighlighted
                      ? `1px solid ${theme.badgeBorder}`
                      : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 4,
                    padding: "3px 10px",
                    fontSize: 10,
                    fontFamily: "var(--mono)",
                    color: isHighlighted ? theme.badgeColor : "rgba(255,255,255,0.28)",
                  }}>
                    [Verify] →
                  </span>
                </div>
              </a>
            </DraggableCardBody>
          );
        })}
      </DraggableCardContainer>
    </section>
  );
}
