import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const PIXEL_SIZE = 8;
const COLS = 72;
const ROWS = 18;

type Pixel = {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay: number;
  color: string;
};

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function buildPixels(): Pixel[] {
  const pixels: Pixel[] = [];
  let id = 0;

  // Scatter cluster on the left (capture / chaos)
  for (let i = 0; i < 90; i++) {
    const r = seededRandom(i + 1);
    const r2 = seededRandom(i + 200);
    const r3 = seededRandom(i + 400);
    pixels.push({
      id: id++,
      startX: 2 + r * 18,
      startY: 1 + r2 * (ROWS - 2),
      endX: 28 + (i % 10) * 1.1,
      endY: 4 + Math.floor(i / 10) * 1.1,
      delay: Math.floor(r3 * 20),
      color: i % 7 === 0 ? "#e3170a" : "#1a1210",
    });
  }

  // Mid ordered block (triage)
  for (let i = 0; i < 60; i++) {
    const r = seededRandom(i + 600);
    const col = i % 8;
    const row = Math.floor(i / 8);
    pixels.push({
      id: id++,
      startX: 8 + r * 16,
      startY: 2 + seededRandom(i + 700) * (ROWS - 4),
      endX: 42 + col * 1.1,
      endY: 5 + row * 1.1,
      delay: 12 + Math.floor(r * 18),
      color: "#e3170a",
    });
  }

  // Right fan / resolve burst
  for (let i = 0; i < 80; i++) {
    const r = seededRandom(i + 900);
    const angle = (i / 80) * Math.PI * 0.9 - Math.PI * 0.45;
    const radius = 4 + seededRandom(i + 1000) * 10;
    pixels.push({
      id: id++,
      startX: 20 + r * 20,
      startY: 3 + seededRandom(i + 1100) * (ROWS - 6),
      endX: 58 + Math.cos(angle) * radius,
      endY: 9 + Math.sin(angle) * radius * 0.7,
      delay: 28 + Math.floor(r * 22),
      color: i % 9 === 0 ? "#c41409" : "#e3170a",
    });
  }

  return pixels;
}

const PIXELS = buildPixels();

export const PIXEL_FLOW_FPS = 30;
export const PIXEL_FLOW_DURATION = 150;
export const PIXEL_FLOW_WIDTH = COLS * PIXEL_SIZE;
export const PIXEL_FLOW_HEIGHT = ROWS * PIXEL_SIZE;

export function PixelFlow() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
      {PIXELS.map((pixel) => {
        const progress = spring({
          frame: frame - pixel.delay,
          fps,
          config: { damping: 200 },
          durationInFrames: 45,
        });

        const x = interpolate(progress, [0, 1], [pixel.startX, pixel.endX], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = interpolate(progress, [0, 1], [pixel.startY, pixel.endY], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const opacity = interpolate(progress, [0, 0.15, 1], [0.35, 0.85, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={pixel.id}
            style={{
              position: "absolute",
              left: x * PIXEL_SIZE,
              top: y * PIXEL_SIZE,
              width: PIXEL_SIZE - 1,
              height: PIXEL_SIZE - 1,
              backgroundColor: pixel.color,
              opacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
}
