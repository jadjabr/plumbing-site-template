import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { RADIUS_KM } from "./lib/areas";
import { site } from "./lib/site";

// Social share card (1200×630, the size Facebook/LinkedIn/iMessage expect),
// generated at build time from the same brand tokens as the site.
export const alt = `${site.name}: 24/7 plumbing across Greater Edmonton`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read the palette from globals.css so a reskin only edits one place.
const css = await readFile(join(process.cwd(), "app/globals.css"), "utf8");
const token = (name: string) =>
  css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{3,8})`))?.[1] ??
  "#000";
const ink950 = token("ink-950");
const ink800 = token("ink-800");
const accent = token("accent");
const accentInk = token("accent-ink");

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: `radial-gradient(circle at 85% 20%, ${accent}33, transparent 45%), ${ink950}`,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 16,
              background: ink800,
              color: accent,
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            EP
          </div>
          <div style={{ fontSize: 34, fontWeight: 600 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>
            Fast, reliable plumbing.
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              color: accent,
            }}
          >
            Day or night.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            color: "rgba(255,255,255,0.75)",
          }}
        >
          <div style={{ display: "flex" }}>
            {`Licensed & insured · Greater Edmonton (~${RADIUS_KM} km)`}
          </div>
          <div
            style={{
              display: "flex",
              padding: "14px 26px",
              borderRadius: 14,
              background: accent,
              color: accentInk,
              fontWeight: 700,
            }}
          >
            {`24/7 · ${site.phone.display}`}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
