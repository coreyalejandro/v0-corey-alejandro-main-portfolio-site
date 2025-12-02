"use client";

import { CardPathScene } from "@/components/card-path/card-path-scene";

const cards = [
  {
    id: "card-1",
    title: "Arrival: The First Threshold",
    body: "You step onto the path. Each card is a waypoint, a scene, a thought. As you read, the world rearranges itself beneath your feet.",
  },
  {
    id: "card-2",
    title: "Memory Stones",
    body: "Every card that falls flat becomes part of the ground—solid, glowing, and unmissable. Your path remembers where you've been.",
  },
  {
    id: "card-3",
    title: "The Lighted Track",
    body: "As you move forward, new cards stand upright ahead like gates. Reading pulls them down into alignment, lighting the way forward.",
  },
  {
    id: "card-4",
    title: "Crossing Dimensions",
    body: "By the time you reach the last card, the path is fully formed behind you, pointing into a portal that only appears once the road exists.",
  },
  {
    id: "card-5",
    title: "The Other Side",
    body: "At the end of the path, the ground itself opens into another dimension—a destination shaped by the choices you made card by card.",
  },
];

export function CardPathDemo() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 pb-32 pt-20">
        <header className="mb-20 space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Immersive 3D Reading Path
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Cards that become a glowing road into another dimension
          </h1>
          <p className="max-w-2xl text-sm text-slate-500 sm:text-base">
            Scroll down. Each card begins upright like a signpost. Once
            you&apos;ve scrolled through it, the card lays flat and lights up,
            joining the others as part of a glowing footpath into the unknown.
          </p>
        </header>

        <CardPathScene cards={cards} />
      </section>
    </div>
  );
}
