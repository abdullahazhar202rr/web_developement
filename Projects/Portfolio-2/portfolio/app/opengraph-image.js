import { ImageResponse } from "next/og";

export const alt = "Abdullah Azhar — AI Engineer & Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #171717 60%, #262626 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#ffaa80", letterSpacing: 6 }}>
          HI, MY NAME IS
        </div>
        <div style={{ display: "flex", fontSize: 92, fontWeight: 800, marginTop: 12 }}>
          Abdullah Azhar
        </div>
        <div style={{ display: "flex", fontSize: 40, marginTop: 18, color: "#e5e5e5" }}>
          AI Engineer · Full Stack Developer
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 28, color: "#a3a3a3" }}>
          Machine Learning · Computer Vision · Fine-tuned LLMs · Next.js
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            width: 220,
            height: 8,
            borderRadius: 4,
            background: "linear-gradient(90deg, #ffaa80, #ff512f)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
