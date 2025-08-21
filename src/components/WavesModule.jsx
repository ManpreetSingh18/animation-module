import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// === Waves Module for Class 10 ===

export default function WavesModule() {
  const [amplitude, setAmplitude] = useState(40);
  const [frequency, setFrequency] = useState(1.0);
  const [wavelength, setWavelength] = useState(240);
  const [showGrid, setShowGrid] = useState(true);
  const [paused, setPaused] = useState(false);
  const [waveType, setWaveType] = useState("transverse"); // transverse | longitudinal
  const [selectedExample, setSelectedExample] = useState(null); // currently selected example object

  // Extended data including selectable examples
  const wavesData = {
    transverse: {
      title: "Transverse Wave",
      description:
        "Medium moves perpendicular to wave direction. Examples: water waves, light waves.",
      examples: [
        {
          id: "water",
          name: "Water Surface Wave",
          note: "Ripples formed when a stone is dropped in water.",
        },
        {
          id: "light",
          name: "Light Wave",
          note: "Electromagnetic transverse wave traveling in space.",
        },
        {
            id: "rope",
            name: "Rope Wave",
            note: "Up–down pulse sent along a stretched rope.",
        },
      ],
    },
    longitudinal: {
      title: "Longitudinal Wave",
      description:
        "Medium moves parallel to wave direction. Examples: sound waves, seismic P-waves.",
      examples: [
        {
          id: "sound",
          name: "Sound Wave",
          note: "Compression & rarefaction of air carrying sound.",
        },
        {
          id: "pwave",
          name: "Seismic P-Wave",
          note: "Primary earthquake wave moving through Earth (fastest).",
        },
        {
          id: "slinky",
          name: "Slinky Compression",
          note: "Push–pull (compression) motion in a slinky toy.",
        },
      ],
    },
  };

  // Whenever wave type changes, auto-select first example of that type
  useEffect(() => {
    const first = wavesData[waveType].examples?.[0] || null;
    setSelectedExample(first);
  }, [waveType]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 160 }}
              className="h-9 w-9 rounded-2xl bg-black/90 text-white grid place-items-center font-bold"
            >
              W
            </motion.div>
            <div>
              <h1 className="text-xl font-semibold leading-tight">
                Waves Module (Class 10)
              </h1>
              <p className="text-xs text-gray-500 -mt-0.5">
                Click a wave type to see animation • Adjust amplitude & speed
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Two-column layout */}
      <main className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Content Cards */}
        <section className="space-y-4">
          <Card title="Introduction to Waves">
            <p>
              Waves transfer energy from one place to another without
              transferring matter. For example, ripples in water after dropping
              a pebble.
            </p>
          </Card>

          <Card title="Types of Waves">
            <ul className="list-disc pl-5 space-y-1">
              {Object.keys(wavesData).map((key) => (
                <li
                  key={key}
                  className={`cursor-pointer hover:text-blue-600 ${
                    waveType === key ? "font-semibold text-blue-700" : ""
                  }`}
                  onClick={() => setWaveType(key)}
                >
                  <b>{wavesData[key].title}</b>: {wavesData[key].description}{" "}
                  <span className="text-xs text-gray-400">(click to animate)</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Properties of Waves">
            <ul className="list-disc pl-5 space-y-1">
              <li>Crest & Trough: Peaks and valleys (transverse waves)</li>
              <li>Compression & Rarefaction: Dense & less dense regions (longitudinal waves)</li>
              <li>Amplitude: Maximum displacement</li>
              <li>Wavelength: Distance between two consecutive crests</li>
              <li>Frequency: How fast wave vibrates</li>
            </ul>
          </Card>

          <Card title="Real-life Examples">
            <ul className="list-disc pl-5 space-y-1">
              <li>Water ripples in a pond</li>
              <li>Sound propagation in air</li>
              <li>Light traveling in space</li>
            </ul>
          </Card>
        </section>

        {/* Right: Interactive Canvas */}
        <section>
          <div className="rounded-2xl border shadow-sm p-4 space-y-4">
            {/* Quick wave type buttons */}
            <div className="flex gap-2">
              {Object.keys(wavesData).map((k) => (
                <button
                  key={k}
                  onClick={() => setWaveType(k)}
                  className={`px-3 py-1.5 rounded-lg text-sm border ${
                    waveType === k
                      ? "bg-black text-white border-black"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {wavesData[k].title.split(" ")[0]}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <h2 className="font-semibold">
                {wavesData[waveType].title}
                {selectedExample ? ` – ${selectedExample.name}` : ""}
              </h2>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="accent-black"
                    checked={showGrid}
                    onChange={(e) => setShowGrid(e.target.checked)}
                  />
                  Grid
                </label>
                <button
                  onClick={() => setPaused((p) => !p)}
                  className="px-3 py-1.5 rounded-xl text-sm border bg-white hover:bg-gray-50"
                >
                  {paused ? "Play" : "Pause"}
                </button>
              </div>
            </div>

            <div className="relative aspect-[16/9] w-full rounded-xl border overflow-hidden">
              <WaveCanvas
                amplitude={amplitude}
                frequency={frequency}
                wavelength={wavelength}
                showGrid={showGrid}
                paused={paused}
                type={waveType}
                selectedExample={selectedExample}
              />
              {selectedExample && (
                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {selectedExample.name}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SliderCard
                label={`Amplitude: ${amplitude.toFixed(0)} px`}
                min={5}
                max={120}
                step={1}
                value={amplitude}
                onChange={setAmplitude}
                hint="Crest height"
              />
              <SliderCard
                label={`Frequency: ${frequency.toFixed(2)} Hz`}
                min={0.1}
                max={5}
                step={0.01}
                value={frequency}
                onChange={setFrequency}
                hint="Oscillations/sec"
              />
              <SliderCard
                label={`Wavelength: ${wavelength.toFixed(0)} px`}
                min={80}
                max={480}
                step={1}
                value={wavelength}
                onChange={setWavelength}
                hint="Distance between crests"
              />
            </div>

            {/* Examples below animation */}
            <div className="border rounded-xl p-3">
              <h3 className="text-sm font-semibold mb-2">{wavesData[waveType].title} Examples</h3>
              <div className="flex flex-wrap gap-2">
                {wavesData[waveType].examples?.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => setSelectedExample(ex)}
                    className={`text-xs px-2 py-1 rounded border ${
                      selectedExample?.id === ex.id
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    {ex.name}
                  </button>
                ))}
              </div>
              {selectedExample && (
                <p className="mt-2 text-xs text-gray-600">{selectedExample.note}</p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// === UI Components ===
function Card({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border shadow-sm p-4"
    >
      <h3 className="font-semibold mb-1.5">{title}</h3>
      <div className="text-sm leading-relaxed text-gray-700">{children}</div>
    </motion.div>
  );
}

function SliderCard({ label, min, max, step, value, onChange, hint }) {
  return (
    <div className="rounded-xl border p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-gray-500">{hint}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-black"
      />
    </div>
  );
}

// === Wave Canvas ===
function WaveCanvas({ amplitude, frequency, wavelength, showGrid, paused, type, selectedExample }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const t0Ref = useRef(performance.now());

  useEffect(() => {
    // Reset time origin whenever type or selected example changes so each demo starts fresh
    t0Ref.current = performance.now();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const sampleStep = 4;

    const draw = () => {
      const now = performance.now();
      const t = (now - t0Ref.current) / 1000;

      ctx.clearRect(0, 0, width, height);

      if (showGrid) {
        ctx.save();
        ctx.strokeStyle = "#f0f0f0";
        for (let x = 0; x < width; x += 40) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
        ctx.restore();
      }

      ctx.save();
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
      ctx.restore();

      const A = amplitude;
      const f = frequency;
      const lambda = Math.max(20, wavelength);
      const twoPi = Math.PI * 2;

      // Helper color choices per example
      const colorMap = {
        water: "#2563eb",
        light: "#f59e0b",
        rope: "#111827",
        sound: "#dc2626",
        pwave: "#7c3aed",
        slinky: "#059669",
      };
      const currentColor = selectedExample ? colorMap[selectedExample.id] || "#111827" : "#111827";

      if (type === "transverse") {
        if (selectedExample?.id === "water") {
          // Water: superposed waves + translucent fill + orbital particle hints
          const grad = ctx.createLinearGradient(0, 0, 0, height);
          grad.addColorStop(0, "rgba(59,130,246,0.40)");
          grad.addColorStop(1, "rgba(59,130,246,0.05)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          for (let x = 0; x <= width; x += sampleStep) {
            const phase = twoPi * (f * t - x / lambda);
            const y =
              height / 2 +
              A * 0.9 * Math.sin(phase) +
              A * 0.3 * Math.sin(phase * 2 + t * 2);
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.lineTo(width, height);
          ctx.lineTo(0, height);
          ctx.closePath();
            ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = currentColor;
          ctx.stroke();

          // Orbital particle motion (approx circular paths decreasing with "depth")
          const rowCount = 3;
          for (let r = 0; r < rowCount; r++) {
            const depthFactor = (r + 1) / (rowCount + 1);
            for (let x = 0; x < width; x += 60) {
              const phase = twoPi * (f * t - x / lambda);
              const orbitR = A * 0.25 * depthFactor;
              const px = x + orbitR * Math.cos(phase);
              const py = height / 2 + orbitR * Math.sin(phase) + 18 + r * 12;
              ctx.beginPath();
              ctx.fillStyle = "rgba(59,130,246,0.55)";
              ctx.arc(px, py, 3, 0, twoPi);
              ctx.fill();
            }
          }
        } else if (selectedExample?.id === "light") {
          // Light: depict E and B fields perpendicular & in phase
          // E-field (vertical oscillation)
          const lambdaE = lambda * 0.7;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.strokeStyle = "#f59e0b";
          for (let x = 0; x <= width; x += sampleStep) {
            const phase = twoPi * ((f * 1.8) * t - x / lambdaE);
            const y = height / 2 + A * 0.45 * Math.sin(phase);
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.stroke();

          // B-field (drawn offset vertically, smaller amplitude)
          ctx.beginPath();
          ctx.strokeStyle = "#6366f1";
          for (let x = 0; x <= width; x += sampleStep) {
            const phase = twoPi * ((f * 1.8) * t - x / lambdaE);
            const y = height / 2 + 40 + A * 0.25 * Math.sin(phase);
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.stroke();

          // Direction arrow
          ctx.strokeStyle = "#374151";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(16, height - 24);
          ctx.lineTo(width - 16, height - 24);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(width - 16, height - 24);
          ctx.lineTo(width - 26, height - 30);
          ctx.lineTo(width - 26, height - 18);
          ctx.closePath();
          ctx.fillStyle = "#374151";
          ctx.fill();
        } else if (selectedExample?.id === "rope") {
          // Rope: traveling Gaussian pulse (already distinct) + slight damping
          ctx.beginPath();
          ctx.lineWidth = 3;
          ctx.strokeStyle = currentColor;
          const pulseWidth = lambda * 0.6;
          for (let x = 0; x <= width; x += sampleStep) {
            const position = (t * f * lambda * 0.8) % (width + pulseWidth) - pulseWidth;
            const dist = x - position;
            const envelope = Math.exp(-((dist * dist) / (pulseWidth * pulseWidth * 0.5)));
            const damping = Math.exp(-t * 0.2);
            const y = height / 2 - A * 0.9 * envelope * damping;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.stroke();
        } else {
          // Default transverse (simple sine)
          ctx.beginPath();
          ctx.lineWidth = 2.2;
          ctx.strokeStyle = currentColor;
          for (let x = 0; x <= width; x += sampleStep) {
            const phase = twoPi * (f * t - x / lambda);
            const y = height / 2 + A * Math.sin(phase);
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      } else {
        // Longitudinal
        if (selectedExample?.id === "sound") {
          // Sound: particle oscillations + faint compression bands
          for (let x = 0; x <= width; x += 10) {
            const phase = twoPi * (f * t - x / lambda);
            const density = (Math.cos(phase) + 1) / 2;
            ctx.fillStyle = `rgba(220,38,38,${0.05 + density * 0.18})`;
            ctx.fillRect(x, 0, 10, height);
          }
          const rows = 5;
            const cols = 55;
          const baseSpacingX = width / (cols - 1);
          const baseSpacingY = (height * 0.55) / (rows - 1);
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const x0 = c * baseSpacingX;
              const y0 = height * 0.225 + r * baseSpacingY;
              const phase = twoPi * (f * t - x0 / lambda);
              const displacement = (A * 0.35) * Math.cos(phase);
              const x = x0 + displacement;
              ctx.beginPath();
              ctx.fillStyle = currentColor;
              ctx.arc(x, y0, 3, 0, twoPi);
              ctx.fill();
            }
          }
        } else if (selectedExample?.id === "slinky") {
          // Slinky: show connected coils (lines) to emphasize compression/rarefaction
          const coils = 70;
          const centerY = height / 2;
          const baseSpacing = width / (coils - 1);
          let prevX = null, prevY = null;
          ctx.lineWidth = 2;
          ctx.strokeStyle = currentColor;
          ctx.beginPath();
          for (let i = 0; i < coils; i++) {
            const x0 = i * baseSpacing;
            const phase = twoPi * (f * t - x0 / lambda);
            const longitudinal = (A * 0.45) * Math.cos(phase);
            const x = x0 + longitudinal;
            const y = centerY + Math.sin((i / coils) * Math.PI * 2) * 4; // subtle coil wobble
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            prevX = x;
            prevY = y;
          }
          ctx.stroke();

          // Highlight compressed regions (shorter spacing)
          for (let i = 1; i < coils; i++) {
            const xPrev = (i - 1) * baseSpacing + (A * 0.45) * Math.cos(twoPi * (f * t - ((i - 1) * baseSpacing) / lambda));
            const xCurr = i * baseSpacing + (A * 0.45) * Math.cos(twoPi * (f * t - (i * baseSpacing) / lambda));
            const spacing = xCurr - xPrev;
            if (spacing < baseSpacing * 0.65) {
              ctx.fillStyle = "rgba(5,150,105,0.35)";
              ctx.fillRect(Math.min(xPrev, xCurr), centerY - 22, Math.abs(spacing), 44);
            }
          }
        } else if (selectedExample?.id === "pwave") {
          // Density bands: draw vertical bars whose opacity follows compression
          for (let x = 0; x <= width; x += 8) {
            const phase = twoPi * (f * t - x / lambda);
            const density = (Math.cos(phase) + 1) / 2; // 0..1
            ctx.fillStyle = `rgba(124,58,237,${0.15 + density * 0.55})`;
            ctx.fillRect(x, 0, 8, height);
          }
        } else {
          // Default longitudinal line (cosine) for fallback
          ctx.beginPath();
          ctx.lineWidth = 2;
          ctx.strokeStyle = currentColor;
          for (let x = 0; x <= width; x += sampleStep) {
            const phase = twoPi * (f * t - x / lambda);
            const y = height / 2 + A * 0.6 * Math.cos(phase);
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
    };

    const loop = () => {
      if (!paused) draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [amplitude, frequency, wavelength, showGrid, paused, type, selectedExample]); // added selectedExample

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
