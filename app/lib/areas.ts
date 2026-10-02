// Communities served, shared by the Service Area map/list and the FAQ.
// Real coordinates: the map positions and "km from Edmonton" figures are
// computed from these, so editing this list is all a reskin needs. `label`
// nudges each name off its dot so labels don't collide (x/y in map units,
// anchor = SVG text-anchor).
export type Area = {
  name: string;
  lat: number;
  lon: number;
  label: { dx: number; dy: number; anchor: "start" | "middle" | "end" };
};

export const HUB = { lat: 53.5461, lon: -113.4938 }; // Central Edmonton
export const RADIUS_KM = 38; // Placeholder coverage radius for the map ring.

export const areas: Area[] = [
  {
    name: "Edmonton",
    lat: 53.5461,
    lon: -113.4938,
    label: { dx: 0, dy: 62, anchor: "middle" },
  },
  {
    name: "St. Albert",
    lat: 53.6305,
    lon: -113.6256,
    label: { dx: -22, dy: -14, anchor: "end" },
  },
  {
    name: "Sherwood Park",
    lat: 53.5413,
    lon: -113.2958,
    label: { dx: 22, dy: 10, anchor: "start" },
  },
  {
    name: "Fort Saskatchewan",
    lat: 53.7128,
    lon: -113.2133,
    label: { dx: 0, dy: -26, anchor: "middle" },
  },
  {
    name: "Spruce Grove",
    lat: 53.545,
    lon: -113.9008,
    label: { dx: 0, dy: -26, anchor: "middle" },
  },
  {
    name: "Stony Plain",
    lat: 53.5264,
    lon: -114.0068,
    label: { dx: 0, dy: 46, anchor: "middle" },
  },
  {
    name: "Beaumont",
    lat: 53.3572,
    lon: -113.4147,
    label: { dx: 22, dy: 10, anchor: "start" },
  },
  {
    name: "Leduc",
    lat: 53.2594,
    lon: -113.5492,
    label: { dx: 22, dy: 10, anchor: "start" },
  },
];
