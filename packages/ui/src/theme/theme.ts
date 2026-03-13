import { colors, spacing, typography, radii, shadows, breakpoints, transitions } from "./tokens";

export const theme = {
  colors,
  spacing,
  typography,
  radii,
  shadows,
  breakpoints,
  transitions,
} as const;

export type Theme = typeof theme;

// Emotion theme augmentation — allows useTheme() to return Theme type
declare module "@emotion/react" {
  export interface Theme {
    colors: typeof colors;
    spacing: typeof spacing;
    typography: typeof typography;
    radii: typeof radii;
    shadows: typeof shadows;
    breakpoints: typeof breakpoints;
    transitions: typeof transitions;
  }
}
