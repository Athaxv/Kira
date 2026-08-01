"use client";

import { Player } from "@remotion/player";
import {
  PixelFlow,
  PIXEL_FLOW_DURATION,
  PIXEL_FLOW_FPS,
  PIXEL_FLOW_HEIGHT,
  PIXEL_FLOW_WIDTH,
} from "../remotion/pixel-flow";

const steps = [
  {
    num: "01",
    title: "Capture",
    description:
      "File an issue with a title, description, and severity in seconds.",
  },
  {
    num: "02",
    title: "Triage",
    description: "Sort by what actually hurts — low, medium, or high.",
  },
  {
    num: "03",
    title: "Assign",
    description: "Hand it to one owner. Everyone else stays in the loop.",
  },
  {
    num: "04",
    title: "Resolve",
    description: "Discuss in comments, ship the fix, watch Done fill up.",
  },
];

export function WorkflowViz() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-y border-line bg-surface-raised py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-serif text-3xl tracking-tight sm:text-5xl">
            How Kira works
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-ink-muted">
            Noise comes in as scattered reports. Kira turns it into ordered
            work — triage by severity, assign one owner, and resolve.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl border border-dashed border-line bg-surface">
          <div className="aspect-[72/18] w-full">
            <Player
              component={PixelFlow}
              durationInFrames={PIXEL_FLOW_DURATION}
              compositionWidth={PIXEL_FLOW_WIDTH}
              compositionHeight={PIXEL_FLOW_HEIGHT}
              fps={PIXEL_FLOW_FPS}
              style={{ width: "100%", height: "100%" }}
              controls={false}
              autoPlay
              loop
              acknowledgeRemotionLicense
            />
          </div>
        </div>

        <ol className="mt-12 grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line">
          {steps.map((step) => (
            <li key={step.num} className="lg:px-6 first:lg:pl-0 last:lg:pr-0">
              <span className="font-serif text-3xl italic text-accent">
                {step.num}
              </span>
              <h3 className="mt-3 text-base font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
