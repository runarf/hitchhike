export interface RootObject {
  route: Route[];
}

export interface Route {
  weight_name: string;
  legs: Leg[];
  geometry: string;
  distance: number;
  duration: number;
  weight: number;
}

interface Leg {
  summary: string;
  steps: Step[];
  distance: number;
  duration: number;
  weight: number;
}

interface Step {
  intersections: Intersection[];
  name: string;
  distance: number;
  maneuver: Maneuver;
  weight: number;
  geometry: string;
  duration: number;
  mode: string;
  driving_side: string;
  ref?: string;
}

interface Maneuver {
  bearing_after: number;
  type: string;
  bearing_before: number;
  location: number[];
  instruction: string;
  modifier?: string;
}

interface Intersection {
  out?: number;
  bearings: number[];
  entry: boolean[];
  location: number[];
  in?: number;
  lanes?: Lane[];
}

interface Lane {
  indications: string[];
  valid: boolean;
}
