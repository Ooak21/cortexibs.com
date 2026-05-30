---
name: CORTEX Dark Cinematic
colors:
  bg: "#0b0c10"
  surface: "#121317"
  surface-2: "#1a1b22"
  border: "#2c2e38"
  text: "#f8f9fc"
  muted: "#8a8f9e"
  accent: "#3b82f6"
  accent-2: "#60a5fa"
  gold: "#f59e0b"
  emerald: "#10b981"
typography:
  display: 
    fontFamily: "Space Grotesk, Inter, system-ui, sans-serif"
    fontWeight: 600
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontWeight: 600
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontWeight: 400
  mono:
    fontFamily: "'JetBrains Mono', 'SF Mono', monospace"
rounded:
  sm: "0.25rem"
  DEFAULT: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.5rem"
  "2xl": "2rem"
  "3xl": "3rem"
  full: "9999px"
spacing:
  unit: "8px"
  container: "32px"
  section: "64px"
  card-gap: "24px"
elevation:
  glass: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
  deep: "0 40px 110px -28px rgb(0 0 0 / 0.92)"
---

# CORTEX Dark Cinematic

This design system defines the visual language for CORTEX Discover (cortexibs.com) and related public surfaces. It is deliberately cinematic, high-fidelity, and agentic in feel — designed to communicate power, clarity, and modern sophistication to both humans and autonomous agents.

## Brand & Style

The aesthetic is "dark cinematic premium." Deep near-black backgrounds, restrained but electric accents (cyan/blue neon + warm gold), and layered depth (glassmorphism, soft glows, strong shadows) create a sense of a high-end control room or mission operations center.

The personality is confident, precise, slightly futuristic, and trustworthy. It should feel like the interface an elite autonomous agent would actually use.

Key emotional targets:
- Clarity under pressure
- Sophisticated minimalism
- Technological capability without coldness

## Colors

The palette is intentionally limited and high-contrast.

- **Backgrounds**: `#0b0c10` (primary), `#121317` (surface), `#1a1b22` (elevated surfaces)
- **Text**: `#f8f9fc` (primary), `#8a8f9e` (muted)
- **Accents**: `#3b82f6` / `#60a5fa` (primary neon blue), `#f59e0b` (gold), `#10b981` (emerald for positive states)
- **Borders & Subtle**: `#2c2e38`

Glassmorphic elements use low-alpha white or surface tints with backdrop blur. Never use pure white on dark without sufficient separation.

## Typography

- **Display / Headlines**: Space Grotesk or Inter with strong negative tracking (`-0.04em` to `-0.02em`) and high weights (600+). Used for hero statements and major section titles.
- **Body**: Inter, clean and highly legible at small sizes.
- **Mono / Terminal**: JetBrains Mono or system monospace. Used in the Mission Control terminal and code contexts. Slightly elevated weight for readability in dark environments.

Hierarchy is strict. Large display sizes are reserved for the most important statements.

## Layout & Spacing

- Base unit: 8px grid.
- Generous breathing room. Sections have significant vertical rhythm.
- Maximum content width is controlled (typically 1100–1280px for main experiences).
- The Mission Control terminal is allowed to breathe and feel like a hero object.

## Elevation & Depth

Strong, cinematic depth is a core feature:
- Deep, soft shadows for cards and elevated surfaces.
- The signature terminal uses multiple layered shadows + inner glows to feel like a physical object in a dark hangar.
- Glassmorphism + backdrop blur is used deliberately on overlays and panels.
- Subtle filmic vignettes and radial gradients reinforce the control-room aesthetic.

## Shapes

Rounded corners are generous but not playful (`0.75rem`–`3rem` range). The terminal frame uses a very subtle 3px radius to feel machined rather than overly soft.

## Components

**Glass Cards / Panels**
- Low-alpha surface backgrounds
- Strong borders in `#2c2e38`
- Generous internal padding
- Hover states lift with deeper shadow + slight border color shift toward accent

**Buttons (Primary)**
- Solid white or gold on dark
- High contrast, generous rounding, strong hover/active feedback

**Terminal / Mission Control Elements**
- Monospace typography at slightly elevated size
- Cyan/gold/green/purple syntax highlighting in code sequences
- HUD-style elements (REC dots, timers, status labels) use tight tracking and mono

## Do's and Don'ts

**Do**
- Maintain extremely high contrast on all text
- Use the accent palette sparingly and with intention (neon blue and gold should feel special)
- Respect the cinematic depth and layering language
- When describing the site to agents or humans, lean into the "mission control / high-capability control room" metaphor
- Always refer technical agents to https://innovativeblockchainsolutions.live/CorteX402/ for implementation substance

**Don't**
- Introduce bright, playful, or consumer-grade colors
- Flatten the depth or remove shadows/glass effects
- Use thin weights or low contrast text in the terminal or key interfaces
- Treat this as generic "dark mode SaaS" — the cinematic quality is deliberate

This DESIGN.md is the single source of truth for the visual identity when agents generate descriptions, interfaces, or content related to CORTEX Discover.