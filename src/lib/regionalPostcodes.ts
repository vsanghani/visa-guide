/**
 * Australian Regional Postcode Data
 * Based on the Department of Home Affairs (DHA) definition of
 * "Designated Regional Areas" for migration purposes.
 *
 * Categories:
 * - "regional"   → Designated Regional Area (eligible for 491, regional study points, etc.)
 * - "metro"      → Metropolitan area (not regional)
 *
 * Source: DHA Instrument, Migration Regulations 1994
 * Note: This is indicative data. Always verify with official DHA sources.
 */

export type PostcodeResult = {
  postcode: string;
  suburb?: string;
  state: string;
  category: "regional" | "metro";
  notes?: string;
};

// Metro postcodes (NOT regional) — the major city ranges
// Everything else in Australia is considered regional
const METRO_RANGES: { state: string; ranges: [number, number][] }[] = [
  {
    state: "NSW",
    // Sydney metropolitan area
    ranges: [
      [2000, 2234],
      [2555, 2574],
      [2740, 2786],
    ],
  },
  {
    state: "VIC",
    // Melbourne metropolitan area
    ranges: [[3000, 3211], [3335, 3341], [3427, 3430], [3649, 3658], [3765, 3810], [8000, 8499]],
  },
  {
    state: "QLD",
    // Brisbane + Gold Coast + Sunshine Coast (as per the old definition,
    // but from Nov 2019 ALL of QLD except Brisbane/Gold Coast is regional)
    ranges: [
      [4000, 4078],
      [4109, 4207],
      [4500, 4549],
      [9000, 9499],
    ],
  },
  {
    state: "WA",
    // Perth metropolitan area
    ranges: [[6000, 6199], [6800, 6999]],
  },
];

// These states/territories are ENTIRELY regional
const ENTIRELY_REGIONAL_STATES = ["SA", "TAS", "NT", "ACT"];

/**
 * Determines whether an Australian postcode is classified as Regional
 * (Designated Regional Area) by the DHA.
 */
export function checkPostcode(input: string): PostcodeResult | null {
  const cleaned = input.trim();
  if (!/^\d{4}$/.test(cleaned)) return null;

  const code = parseInt(cleaned, 10);

  // Determine state from postcode
  let state = "";
  if (code >= 2000 && code <= 2599) state = "NSW";
  else if (code >= 2600 && code <= 2618) state = "ACT";
  else if (code >= 2619 && code <= 2899) state = "NSW";
  else if (code >= 2900 && code <= 2920) state = "ACT";
  else if (code >= 2921 && code <= 2999) state = "NSW";
  else if (code >= 3000 && code <= 3999) state = "VIC";
  else if (code >= 4000 && code <= 4999) state = "QLD";
  else if (code >= 5000 && code <= 5799) state = "SA";
  else if (code >= 5800 && code <= 5999) state = "SA";
  else if (code >= 6000 && code <= 6797) state = "WA";
  else if (code >= 6800 && code <= 6999) state = "WA";
  else if (code >= 7000 && code <= 7799) state = "TAS";
  else if (code >= 7800 && code <= 7999) state = "TAS";
  else if (code >= 800 && code <= 899) state = "NT";
  else if (code >= 900 && code <= 999) state = "NT";
  else if (code >= 200 && code <= 299) state = "ACT";
  else if (code >= 8000 && code <= 8499) state = "VIC"; // PO boxes
  else if (code >= 9000 && code <= 9499) state = "QLD"; // PO boxes
  else if (code >= 1000 && code <= 1999) state = "NSW"; // PO boxes
  else return null; // Unknown

  // Check if entirely regional state
  if (ENTIRELY_REGIONAL_STATES.includes(state)) {
    return {
      postcode: cleaned,
      state,
      category: "regional",
      notes: `All of ${getStateName(state)} is classified as a Designated Regional Area.`,
    };
  }

  // Check against metro ranges
  for (const entry of METRO_RANGES) {
    if (entry.state === state) {
      for (const [min, max] of entry.ranges) {
        if (code >= min && code <= max) {
          return {
            postcode: cleaned,
            state,
            category: "metro",
            notes: `This postcode falls within the ${getStateName(state)} metropolitan area and is NOT classified as regional.`,
          };
        }
      }
    }
  }

  // If not in a metro range, it's regional
  return {
    postcode: cleaned,
    state,
    category: "regional",
    notes: `This postcode is in regional ${getStateName(state)} — a Designated Regional Area.`,
  };
}

function getStateName(code: string): string {
  const map: Record<string, string> = {
    NSW: "New South Wales",
    VIC: "Victoria",
    QLD: "Queensland",
    SA: "South Australia",
    WA: "Western Australia",
    TAS: "Tasmania",
    NT: "Northern Territory",
    ACT: "Australian Capital Territory",
  };
  return map[code] || code;
}
