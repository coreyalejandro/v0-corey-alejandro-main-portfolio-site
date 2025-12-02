"use client";

import { useEffect, useMemo, useState } from "react";
import { CardPathDemo } from "@/components/playground/card-path-demo";
import { TableCardDemo } from "@/components/playground/table-card-demo";
import { ScrollCardDemo } from "@/components/playground/scroll-card-demo";

type ExperimentId = "card-path" | "table-card" | "scroll-card";
type PresetId = "prototype" | "immersive" | "precision";
type ViewMode = "canvas" | "wire" | "devtools";

const experiments = [
  {
    id: "card-path",
    name: "3D Card Path",
    description: "Cards collapse into a luminous road that remembers your read state.",
    component: CardPathDemo,
  },
  {
    id: "table-card",
    name: "Pivot Interaction",
    description: "Click-triggered pivot designed for tactile in-product handoffs.",
    component: TableCardDemo,
  },
  {
    id: "scroll-card",
    name: "Scroll Trigger",
    description: "Intersection-driven laydown tuned for scroll-based narrative.",
    component: ScrollCardDemo,
  },
] as const;

const presets: Record<
  PresetId,
  { title: string; temp: number; tokens: number; pitch: string }
> = {
  prototype: {
    title: "Prototype",
    temp: 0.4,
    tokens: 520,
    pitch: "Stable defaults for shipping new patterns fast.",
  },
  immersive: {
    title: "Immersive",
    temp: 0.72,
    tokens: 640,
    pitch: "Higher temperature for bolder visual storytelling.",
  },
  precision: {
    title: "Precision",
    temp: 0.18,
    tokens: 380,
    pitch: "Deterministic handoff notes and clean diffs.",
  },
};

const signalLog = [
  { label: "Frame sync", value: "16ms", accent: "text-emerald-300" },
  { label: "GPU focus", value: "WebGL + CSSOM blend", accent: "text-sky-300" },
  { label: "Latency", value: "44ms edge", accent: "text-amber-200" },
  { label: "Tokens", value: "1.2k streaming", accent: "text-indigo-200" },
];

const quickActions = [
  "Edge deploy preview",
  "Export to React server component",
  "Generate design tokens",
  "Capture motion story",
];

export default function PlaygroundPage() {
  const [activeExperiment, setActiveExperiment] =
    useState<ExperimentId>("card-path");
  const [activePreset, setActivePreset] = useState<PresetId>("prototype");
  const [temperature, setTemperature] = useState(presets.prototype.temp);
  const [maxTokens, setMaxTokens] = useState(presets.prototype.tokens);
  const [viewMode, setViewMode] = useState<ViewMode>("canvas");
  const [signalPulse, setSignalPulse] = useState(62);
  const [showComments, setShowComments] = useState(false);

  const ActiveComponent =
    experiments.find((e) => e.id === activeExperiment)?.component ||
    CardPathDemo;

  useEffect(() => {
    const interval = setInterval(() => {
      setSignalPulse((prev) => {
        const next = prev + (Math.random() > 0.5 ? 1 : -1) * 3;
        return Math.min(Math.max(next, 58), 75);
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const preset = presets[activePreset];
    setTemperature(preset.temp);
    setMaxTokens(preset.tokens);
  }, [activePreset]);

  const presetDescription = useMemo(
    () => presets[activePreset].pitch,
    [activePreset],
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#04060b] text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 mix-blend-screen blur-[120px] bg-[conic-gradient(at_20%_30%,rgba(255,120,198,0.24),rgba(125,249,255,0.2),rgba(255,255,255,0.18),rgba(120,249,196,0.28),rgba(255,120,198,0.24))]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-black/60 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(120,249,196,0.08),transparent_30%)]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 pb-24 pt-12 lg:flex-row lg:px-10 xl:px-12">
        <aside className="w-full max-w-xs shrink-0 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-lg lg:sticky lg:top-10">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[radial-gradient(circle_at_40%_40%,#f8c6ff,#7fffe1,#7da8ff)] shadow-[0_15px_40px_rgba(111,255,220,0.3)]">
              <ChaosGlyph />
            </div>
            <div>
              <p
                className="text-xs uppercase tracking-[0.25em] text-slate-300"
                title="A playground that refuses SaaS vibes"
              >
                Chaos Lab
              </p>
              <h1 className="text-lg font-semibold text-white">
                Playground vNext
              </h1>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-200" title="Why the UI feels different">
            Developer controls wrapped in joyful chaos. Decluttered panes,
            breathing room, and hover helpers for every touchpoint.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {signalLog.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/15 bg-white/5 px-3 py-3"
                title={`${item.label}: ${item.value}`}
              >
                <p className="text-[11px] uppercase tracking-[0.12em] text-slate-400">
                  {item.label}
                </p>
                <p className={`text-sm font-semibold ${item.accent}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2">
            <p
              className="text-[11px] uppercase tracking-[0.16em] text-slate-400"
              title="Jump directly into a frequent action"
            >
              Quick jumps
            </p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <button
                  key={action}
                  className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs text-slate-100 transition hover:-translate-y-0.5 hover:border-fuchsia-300/60 hover:bg-fuchsia-500/15 hover:text-white"
                  title={action}
                >
                  <ChaosDot />
                  {action}
                </button>
              ))}
            </div>
          </div>

          <div
            className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/15 p-4"
            title="Live perception of how users respond"
          >
            <div className="flex items-center gap-2 text-emerald-200">
              <ChaosPulse />
              <p className="text-[11px] uppercase tracking-[0.16em]">
                Live observability
              </p>
            </div>
            <p className="mt-2 text-sm text-emerald-50">
              {signalPulse}% of visitors now prefer this interaction over the
              baseline table drop.
            </p>
          </div>
        </aside>

        <main className="flex-1 space-y-6">
          <header className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p
                  className="text-xs uppercase tracking-[0.25em] text-slate-400"
                  title="This cluster hosts the experiments and controls"
                >
                  Playground Suite
                </p>
                <h2 className="text-3xl font-semibold text-white md:text-4xl">
                  Chaos-driven interactions, still calm to use
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:border-fuchsia-400/60 hover:bg-fuchsia-500/20"
                  onClick={() => setShowComments(true)}
                  title="Open feedback thread overlay"
                >
                  Session feedback
                </button>
                <button
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-amber-400 to-emerald-400 px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-fuchsia-500/40 transition hover:-translate-y-0.5"
                  title="Export the current build spec for the canvas"
                >
                  Export build spec
                </button>
              </div>
            </div>
            <p className="mt-3 max-w-3xl text-base text-slate-300">
              Multi-pane orchestration inspired by playground telemetry, dressed
              with v0 craft and Banana-style kinetic polish. Swap experiments,
              adjust model controls, and watch the live canvas respond.
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-[minmax(320px,360px)_1fr]">
            <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-[11px] uppercase tracking-[0.16em] text-slate-400"
                    title="Select a preset that adjusts temperature and tokens"
                  >
                    Session preset
                  </p>
                  <h3 className="text-lg font-semibold text-white">
                    {presets[activePreset].title}
                  </h3>
                </div>
                <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                  <ChaosDot />
                  Joy tuned
                </div>
              </div>
              <p className="text-sm text-slate-300">{presetDescription}</p>

              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(presets) as PresetId[]).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setActivePreset(preset)}
                    title={`Switch to ${presets[preset].title} preset`}
                    className={`group rounded-2xl border px-3 py-3 text-left transition ${
                      activePreset === preset
                        ? "border-indigo-300/60 bg-indigo-500/10 text-white shadow-[0_20px_60px_rgba(79,70,229,0.25)]"
                        : "border-white/10 bg-white/5 text-slate-200 hover:border-indigo-300/40 hover:bg-indigo-500/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">
                        {presets[preset].title}
                      </span>
                      <span className="text-[10px] text-indigo-200">
                        adaptive
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {presets[preset].pitch}
                    </p>
                  </button>
                ))}
              </div>

              <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/50 p-4">
                <ControlSlider
                  id="temp"
                  label="Temperature"
                  value={temperature}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={(val) => setTemperature(val)}
                />
                <ControlSlider
                  id="tokens"
                  label="Max tokens"
                  value={maxTokens}
                  min={120}
                  max={1200}
                  step={10}
                  onChange={(val) => setMaxTokens(Math.round(val))}
                />
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200" title="Lock randomness for repeatable outcomes">
                  <div className="flex items-center gap-2">
                    <ChaosDot />
                    Deterministic seed
                  </div>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-indigo-100">
                    #4242
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-4">
                <div className="flex items-center gap-2 text-indigo-100">
                  <ChaosDot />
                  <p className="text-xs uppercase tracking-[0.16em]">
                    Developer rail
                  </p>
                </div>
                <p className="mt-2 text-sm text-indigo-50">
                  Watch the canvas respond live to temperature and token shifts,
                  then export the exact config as a shareable spec.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10">
                      <ChaosGlyph />
                    </div>
                    <div>
                      <p
                        className="text-[11px] uppercase tracking-[0.16em] text-slate-400"
                        title="Main visual surface"
                      >
                        Live canvas
                      </p>
                      <p className="text-lg font-semibold text-white">
                        {experiments.find((e) => e.id === activeExperiment)?.name ||
                          "Card Path"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                    Responsive, instrumented
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {experiments.map((exp) => (
                    <button
                      key={exp.id}
                      onClick={() => setActiveExperiment(exp.id as ExperimentId)}
                      title={`Show ${exp.name}`}
                      className={`rounded-full border px-3 py-2 text-xs transition ${
                        activeExperiment === exp.id
                          ? "border-indigo-300/60 bg-indigo-500/15 text-white shadow-[0_10px_30px_rgba(79,70,229,0.35)]"
                          : "border-white/10 bg-white/5 text-slate-200 hover:border-indigo-300/40 hover:bg-indigo-500/5"
                      }`}
                    >
                      {exp.name}
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {(["canvas", "wire", "devtools"] as ViewMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      title={`Switch to ${mode} mode`}
                      className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs uppercase tracking-[0.18em] transition ${
                        viewMode === mode
                          ? "border-emerald-300/70 bg-emerald-500/10 text-emerald-50"
                          : "border-white/10 bg-white/5 text-slate-300 hover:border-emerald-300/40 hover:bg-emerald-500/5"
                      }`}
                    >
                      <span className="text-[10px]">{mode}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-950">
                  <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <div className="flex h-2 w-2 rounded-full bg-emerald-400" />
                      {viewMode === "canvas"
                        ? "Interactive scene"
                        : viewMode === "wire"
                        ? "Wired states"
                        : "Devtools trace"}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      {temperature.toFixed(2)} temp · {maxTokens} tokens
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-inner">
                      <div className="bg-slate-900/60">
                        <ActiveComponent />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
                    <ChaosDot />
                    Joy outputs
                  </div>
                  <div className="mt-3 space-y-3 text-sm text-slate-200">
                    <p>
                      • Playbook-ready export: capture the interaction, motion,
                      and model inputs as a signed build sheet.
                    </p>
                    <p>
                      • Banana Pro lift: micro-gestures on scroll and hover to
                      keep the experience playful but focused.
                    </p>
                    <p>
                      • OpenAI-grade controls: deterministic seeds, temp and
                      token sliders, and live spec sharing.
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
                    <ChaosDot />
                    Signal stream
                  </div>
                  <div className="mt-3 space-y-3 text-sm text-slate-200">
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/50 px-3 py-2" title="Animation status">
                      <span>Framer sync</span>
                      <span className="text-emerald-200">Stable</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/50 px-3 py-2" title="Edge timing">
                      <span>Latency budget</span>
                      <span className="text-amber-200">44ms edge</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/50 px-3 py-2" title="What ships">
                      <span>Hand-off package</span>
                      <span className="text-sky-200">React + tokens</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {showComments && (
        <div className="fixed inset-y-6 right-6 z-40 w-[360px] max-w-full rounded-3xl border border-white/10 bg-white/10 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-[11px] uppercase tracking-[0.16em] text-slate-300"
                title="Thread for this session"
              >
                Session thread
              </p>
              <h3 className="text-lg font-semibold text-white">Feedback</h3>
            </div>
            <button
              onClick={() => setShowComments(false)}
              className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-xs text-slate-200 hover:border-indigo-300/40 hover:bg-indigo-500/10"
              title="Close feedback panel"
            >
              Close
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <CommentCard
              author="Corey"
              time="Just now"
              body="Card path glow now echoes the Banana Pro softness—keep it."
            />
            <CommentCard
              author="System"
              time="2m ago"
              body="Telemetry streaming: temp 0.40, tokens 520, seed #4242."
            />
          </div>

          <div className="mt-4 space-y-2">
            <textarea
              placeholder="Leave a note for the next remix..."
              className="w-full rounded-2xl border border-white/15 bg-white/5 p-3 text-sm text-white placeholder:text-slate-400 focus:border-indigo-300/60 focus:outline-none"
              title="Type your note here"
            />
            <button className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5">
              Post feedback
            </button>
          </div>
        </div>
      )}

      <SuperAgentDock />
    </div>
  );
}

type ControlSliderProps = {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

function ControlSlider({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
}: ControlSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-300">
        <label
          htmlFor={id}
          className="uppercase tracking-[0.14em]"
          title={`Adjust ${label}`}
        >
          {label}
        </label>
        <span className="rounded-full bg-white/5 px-2 py-1 text-[11px] text-white">
          {label === "Temperature" ? value.toFixed(2) : Math.round(value)}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-indigo-400"
      />
    </div>
  );
}

type CommentCardProps = {
  author: string;
  time: string;
  body: string;
};

function CommentCard({ author, time, body }: CommentCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-100">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="font-semibold text-white">{author}</span>
        <span>{time}</span>
      </div>
      <p className="mt-1 text-slate-200">{body}</p>
    </div>
  );
}

function ChaosGlyph() {
  return (
    <div className="relative h-7 w-7">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-fuchsia-400 via-amber-200 to-emerald-300 blur-[6px]" />
      <div className="absolute inset-1 rounded-full bg-slate-950" />
      <div className="absolute inset-2 rounded-[30%] bg-gradient-to-tr from-emerald-400 via-fuchsia-200 to-cyan-200 rotate-6" />
    </div>
  );
}

function ChaosDot() {
  return (
    <span
      className="inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-fuchsia-300 to-emerald-300"
      aria-hidden
    />
  );
}

function ChaosPulse() {
  return (
    <div className="relative h-4 w-4">
      <span className="absolute inset-0 animate-ping rounded-full bg-emerald-300/60" />
      <span className="absolute inset-[2px] rounded-full bg-emerald-200" />
    </div>
  );
}

function SuperAgentDock() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex flex-col items-center gap-3 px-4 pb-6">
      <div className="w-full max-w-4xl rounded-3xl border border-white/10 bg-white/10 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p
              className="text-[11px] uppercase tracking-[0.18em] text-slate-300"
              title="System-wide orchestrator"
            >
              Super Agent0 · Council Orchestrator
            </p>
            <p className="text-sm text-slate-200">
              LangChain · IBM InstructLab · Agent0 · verbalized sampling · Karpathy LLM Council
            </p>
          </div>
          <div
            className="flex items-center gap-2 text-xs text-emerald-200"
            title="Current mode"
          >
            <ChaosDot />
            Coding + visual effects + second-brain recall
          </div>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-3 text-sm text-slate-200"
            title="What the agent can do for you"
          >
            • Invent new visual components. • Recall your portfolio context. •
            Orchestrate multi-agent tool use. • Explain choices out loud.
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-3 text-sm text-slate-200"
            title="How it routes work"
          >
            Routes prompts through LangChain flows, delegates to Agent0 and LLM
            Council, aligns with IBM InstructLab for instruction fidelity.
          </div>
        </div>
        <div className="mt-3 flex flex-col gap-2 md:flex-row">
          <input
            type="text"
            placeholder="Ask Super Agent0 to design, code, or recall…"
            title="Type a prompt for the orchestrator"
            className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-300/60 focus:outline-none"
          />
          <button
            className="whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-400 via-amber-300 to-fuchsia-400 px-4 py-3 text-sm font-semibold text-black shadow-lg shadow-emerald-400/30 transition hover:-translate-y-0.5"
            title="Send prompt to Super Agent0"
          >
            Deploy prompt
          </button>
        </div>
      </div>
    </div>
  );
}
