import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      // Same mark as the navbar: tinted circle with a sky ring and LM
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#080808" }}>
        <div
          style={{
            width: 150, height: 150, borderRadius: 150, display: "flex", alignItems: "center", justifyContent: "center",
            background: "#10242f", border: "5px solid #19506c", color: "#7dd3fc", fontSize: 58, fontWeight: 700, letterSpacing: -2,
          }}
        >
          LM
        </div>
      </div>
    ),
    size,
  );
}
