---
name: Obsidian Cipher
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c9c6c5'
  primary: '#c9c6c5'
  on-primary: '#313030'
  primary-container: '#050505'
  on-primary-container: '#797777'
  inverse-primary: '#5f5e5e'
  secondary: '#c5c6d1'
  on-secondary: '#2e3039'
  secondary-container: '#454650'
  on-secondary-container: '#b4b4bf'
  tertiary: '#c2c5de'
  on-tertiary: '#2b2f43'
  tertiary-container: '#020415'
  on-tertiary-container: '#73768d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c9c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e1e1ed'
  secondary-fixed-dim: '#c5c6d1'
  on-secondary-fixed: '#191b23'
  on-secondary-fixed-variant: '#454650'
  tertiary-fixed: '#dee1fb'
  tertiary-fixed-dim: '#c2c5de'
  on-tertiary-fixed: '#161b2d'
  on-tertiary-fixed-variant: '#42465a'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-mobile: 20px
  section-gap: 160px
---

## Brand & Style

This design system is built for high-end engineering narratives, blending the precision of technical documentation with the immersive quality of cinematic interfaces. The personality is confident, sophisticated, and intentionally mysterious—evoking the feeling of a high-performance terminal viewed through a refined lens.

The aesthetic utilizes **Glassmorphism** and **Liquid Glass** effects. Surfaces are not merely transparent; they possess physical properties of refraction, depth, and subtle texture. A fine film of digital noise/grain is applied to backgrounds to eliminate sterile gradients and provide a tactile, filmic quality. Lighting is directional and atmospheric, using soft "glow" sources to highlight key interactive paths while leaving peripheral areas in deep, charcoal shadows.

## Colors

The palette is anchored in near-black charcoal and deep slate to provide maximum contrast for the glass effects. 

- **Base Layers:** `#050505` serves as the infinite background, while `#0A0A0A` is used for the primary canvas containers.
- **Cool Tones:** Deep navy (`#12141C`) and muted slate are reserved for subtle surface differentiation and "liquid" shadows.
- **Accent:** Electric Cyan (`#00F0FF`) is used sparingly for critical call-to-actions, active states, and terminal cursors. 
- **Overlays:** Use semi-transparent whites (e.g., `rgba(255, 255, 255, 0.03)`) for glass borders to simulate light catching the edge of a lens.

## Typography

The typographic hierarchy prioritizes high-contrast headers against dense, technical labels. 

- **Headlines:** Use Geist with tight letter-spacing. For display text, utilize a subtle gradient from pure white to a muted silver to simulate metallic reflection.
- **Body:** Inter provides neutral, highly readable content blocks. Keep line heights generous to maintain an airy, premium feel amidst the dark theme.
- **Technical Details:** JetBrains Mono is used for all metadata, labels, and code snippets. Label text should frequently use uppercase with increased tracking for a "schematic" aesthetic.

## Layout & Spacing

The design system utilizes a **Fluid Grid** with significant vertical breathing room. Sections are separated by large gaps (`160px+`) to allow the "atmospheric lighting" of one project to fade before the next begins.

- **Desktop:** 12-column grid with wide gutters (`32px`) to emphasize the "floating" nature of components.
- **Mobile:** 4-column grid. Margins are reduced, but padding within glass cards remains generous to prevent the UI from feeling cramped.
- **Alignment:** Content is often center-aligned or offset intentionally to create a more editorial, cinematic flow.

## Elevation & Depth

Depth is the primary driver of the UI hierarchy. This is achieved through three specific layers:

1.  **The Void (Base):** Pure black `#050505` with a subtle static noise overlay at 2% opacity.
2.  **The Glass (Floating):** Surfaces use `backdrop-filter: blur(20px)` and a background color of `rgba(15, 15, 15, 0.6)`. 
3.  **The Edge (Highlight):** Every glass component must have a 1px inner border. Use a linear gradient for this border (top-left: `rgba(255,255,255,0.15)` to bottom-right: `rgba(255,255,255,0)`).

**Shadows:** Avoid traditional black shadows. Instead, use "Glow Shadows"—diffused, low-opacity dropshadows using the accent color or a deep navy to simulate light bleeding out from under a component.

## Shapes

The shape language is "Soft-Technical." Elements are predominantly rectangular to reflect engineering precision, but corners are smoothed to a `0.5rem` radius to maintain the premium, modern aesthetic. 

Large-scale containers and immersive project cards should use `rounded-xl` (`1.5rem`) to feel like independent, high-tech modules floating in space.

## Components

- **Floating Navigation:** A pill-shaped glass bar at the top or bottom of the viewport. Items should have a "magnetic" hover effect where the text pulls slightly toward the cursor.
- **Magnetic Buttons:** Primary buttons are solid Electric Cyan with black text. On hover, the button should expand slightly, and a large, soft cyan glow should appear behind it. 
- **Project Cards:** Full-width or large-scale glass modules. On scroll, these cards should utilize a parallax effect on their internal imagery or code snippets.
- **Technical Ecosystems:** Small, interactive nodes connected by thin, low-opacity lines (`rgba(255,255,255,0.1)`) to visualize skill sets or tech stacks.
- **Input Fields:** Minimalist. Only a bottom border that illuminates in the accent color when focused. Use monospace for input text.
- **Chips/Badges:** Monospace text inside a glass container with a 1px border. No solid background.