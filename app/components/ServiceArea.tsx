import { site } from "../lib/site";
import { HUB, RADIUS_KM, areas } from "../lib/areas";
import { MapPinIcon, PhoneIcon } from "./icons";

// Equirectangular projection centred on the hub: 10 map units = 1 km.
const KM_PER_DEG_LAT = 111;
const KM_PER_DEG_LON = 111.32 * Math.cos((HUB.lat * Math.PI) / 180);
const project = ({ lat, lon }: { lat: number; lon: number }) => ({
  x: (lon - HUB.lon) * KM_PER_DEG_LON * 10,
  y: (HUB.lat - lat) * KM_PER_DEG_LAT * 10,
});
const kmFromHub = (a: { lat: number; lon: number }) => {
  const { x, y } = project(a);
  return Math.round(Math.hypot(x, y) / 10);
};

// List order: nearest first.
const areasByDistance = [...areas].sort((a, b) => kmFromHub(a) - kmFromHub(b));

// North Saskatchewan River, smoothed from points along its course
// (projected with the function above).
const RIVER =
  "M-467 306 C-440 295 -350 258 -302 240 C-253 221 -208 212 -176 195 C-144 179 -130 158 -110 140 C-90 121 -70 101 -57 84 C-44 68 -40 52 -31 40 C-21 28 -11 21 3 12 C16 4 34 -2 49 -10 C63 -18 75 -22 89 -38 C102 -53 113 -82 128 -104 C144 -126 150 -141 181 -171 C212 -200 291 -263 313 -282";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function AreaMap() {
  const r = RADIUS_KM * 10;
  return (
    <svg
      viewBox="-460 -430 920 860"
      role="img"
      aria-labelledby="service-map-title"
      className="h-auto w-full"
    >
      <title id="service-map-title">
        {`Map of our service area: ${areas.map((a) => a.name).join(", ")}, within about ${RADIUS_KM} km of central Edmonton.`}
      </title>
      <defs>
        <pattern
          id="map-grid"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
          x="-460"
          y="-430"
        >
          <path
            d="M100 0H0V100"
            fill="none"
            stroke="white"
            strokeOpacity="0.04"
            strokeWidth="2"
          />
        </pattern>
        <radialGradient id="map-coverage">
          <stop
            offset="0%"
            stopColor="var(--color-accent)"
            stopOpacity="0.14"
          />
          <stop
            offset="100%"
            stopColor="var(--color-accent)"
            stopOpacity="0.02"
          />
        </radialGradient>
      </defs>

      <rect x="-460" y="-430" width="920" height="860" fill="url(#map-grid)" />

      {/* Coverage radius */}
      <circle
        r={r}
        fill="url(#map-coverage)"
        stroke="var(--color-accent)"
        strokeOpacity="0.45"
        strokeWidth="3"
        strokeDasharray="10 12"
      />
      <text
        y={-r - 16}
        textAnchor="middle"
        className="fill-accent text-[30px] font-medium sm:text-[20px]"
      >
        ~{RADIUS_KM} km service radius
      </text>

      {/* City of Edmonton footprint, simplified */}
      <ellipse
        rx="150"
        ry="140"
        cx="-10"
        cy="10"
        fill="white"
        fillOpacity="0.035"
        stroke="white"
        strokeOpacity="0.08"
        strokeWidth="2"
      />

      {/* River */}
      <path
        d={RIVER}
        fill="none"
        stroke="#3b6b8f"
        strokeOpacity="0.55"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* Communities */}
      {areas.map((area) => {
        const { x, y } = project(area);
        const hub = area.name === "Edmonton";
        return (
          <g
            key={area.name}
            transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
          >
            {hub && (
              <circle r="34" fill="var(--color-accent)" fillOpacity="0.18" />
            )}
            <circle
              r={hub ? 16 : 10}
              fill={hub ? "var(--color-accent)" : "var(--color-ink-950)"}
              stroke="var(--color-accent)"
              strokeWidth={hub ? 0 : 5}
            />
            <text
              x={area.label.dx}
              y={area.label.dy}
              textAnchor={area.label.anchor}
              className={`font-semibold ${hub ? "fill-white text-[38px] sm:text-[26px]" : "fill-white/80 text-[32px] sm:text-[21px]"}`}
              // Dark halo keeps labels legible where they cross the river or ring.
              stroke="var(--color-ink-950)"
              strokeWidth="8"
              paintOrder="stroke"
            >
              {area.name}
            </text>
          </g>
        );
      })}

      {/* North arrow */}
      <g transform="translate(410 -385)" className="fill-white/40">
        <path d="M0 -24 L10 6 L0 0 L-10 6 Z" />
        <text y="32" textAnchor="middle" className="text-[20px] font-semibold">
          N
        </text>
      </g>
    </svg>
  );
}

export default function ServiceArea() {
  return (
    <section
      id="service-area"
      aria-labelledby="service-area-heading"
      className="border-t border-white/10 bg-ink-950"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-accent">Service Area</p>
          <h2
            id="service-area-heading"
            className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-balance text-white sm:text-4xl lg:text-5xl"
          >
            Proudly serving the Greater Edmonton Area.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-pretty text-white/70 sm:text-lg">
            Our plumbers are on the road across the city and the surrounding
            communities every day, so help is never far away.
          </p>

          <ul className="mt-8 grid gap-2 sm:grid-cols-2 sm:gap-3">
            {areasByDistance.map((area) => {
              const km = kmFromHub(area);
              return (
                <li
                  key={area.name}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3"
                >
                  <MapPinIcon className="size-4 shrink-0 text-accent" />
                  <span className="min-w-0 flex-1 truncate font-semibold text-white">
                    {area.name}
                  </span>
                  <span className="shrink-0 text-sm text-white/50 tabular-nums">
                    {km === 0 ? (
                      "All areas"
                    ) : (
                      <>
                        ~{km} km<span className="sr-only"> from Edmonton</span>
                      </>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-col gap-4 rounded-xl border border-white/10 bg-ink-900/60 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-white/70">
              <span className="font-semibold text-white">
                Don&apos;t see your area?
              </span>{" "}
              Call us. We may still be able to help.
            </p>
            <a
              href={site.phone.href}
              className={`inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg border border-ink-600 bg-ink-800/60 px-5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-ink-700 ${focusRing}`}
            >
              <PhoneIcon className="size-4 shrink-0 text-accent" />
              <span className="tabular-nums">{site.phone.display}</span>
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60 p-2 shadow-[0_24px_60px_-30px_rgb(0_0_0/0.8)] sm:p-4">
          <AreaMap />
        </div>
      </div>
    </section>
  );
}
