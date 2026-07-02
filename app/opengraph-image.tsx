import { ImageResponse } from "next/og";

// Site-wide OG share card (homepage + inherited by all pages without their
// own). Rendered from code so it always matches the brand.
export const alt = "Text to Emo — AI Emo & Pop Punk Song Generator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0a0208 0%, #16062a 55%, #0a0208 100%)",
          position: "relative",
        }}
      >
        {/* glow accents */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "rgba(155,48,255,0.22)",
            filter: "blur(120px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -140,
            right: -60,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "rgba(255,45,120,0.18)",
            filter: "blur(130px)",
            display: "flex",
          }}
        />

        {/* badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            border: "2px solid rgba(255,45,120,0.45)",
            borderRadius: 9999,
            padding: "10px 28px",
            color: "#ff2d78",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 6,
            marginBottom: 36,
          }}
        >
          ⚡ AI SONG GENERATOR
        </div>

        {/* wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 28,
            fontSize: 140,
            fontWeight: 900,
            letterSpacing: -2,
          }}
        >
          <span style={{ color: "#ffffff" }}>TEXT</span>
          <span
            style={{
              backgroundImage:
                "linear-gradient(90deg, #ff2d78 0%, #9b30ff 55%, #00cfff 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            TO
          </span>
          <span style={{ color: "#ffffff" }}>EMO</span>
        </div>

        {/* tagline */}
        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.65)",
            fontSize: 34,
            marginTop: 28,
          }}
        >
          Drop your words. Get a full emo pop punk song in minutes.
        </div>

        {/* footer */}
        <div
          style={{
            position: "absolute",
            bottom: 42,
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "rgba(255,255,255,0.4)",
            fontSize: 26,
            fontWeight: 600,
          }}
        >
          texttoemo.com
        </div>
      </div>
    ),
    { ...size }
  );
}
