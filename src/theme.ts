export const theme = {
  colors: {
    burgundy: '#7D2035',
    berry: '#8B2252',
    coral: '#D9614A',
    apricot: '#E8A07A',
    palePink: '#F0B8C0',
    sage: '#7A9A6A',
    ink: '#3A2A20',
    muted: '#7A6A60',
    cream: '#FAF7F4',
    creamDeep: '#F5F0EB',
  },
  fonts: {
    display: "'Cormorant Garamond', 'Garamond', serif",
    sans: "'Jost', system-ui, -apple-system, sans-serif",
  },
  type: {
    names: {
      fontFamily: "'Cormorant Garamond', 'Garamond', serif",
      size: 'clamp(36px, 4.5vw, 48px)',
      letterSpacing: '0.08em',
      weight: 400,
    },
    sectionTitle: {
      fontFamily: "'Cormorant Garamond', 'Garamond', serif",
      size: 'clamp(36px, 5vw, 52px)',
      weight: 300,
      italic: true,
    },
    body: {
      fontFamily: "'Jost', system-ui, sans-serif",
      size: '15px',
      weight: 300,
      lineHeight: 1.85,
    },
    sectionLabel: {
      fontFamily: "'Jost', system-ui, sans-serif",
      size: '11px',
      letterSpacing: '0.25em',
      weight: 400,
      uppercase: true,
    },
    nav: {
      fontFamily: "'Jost', system-ui, sans-serif",
      size: '14px',
      weight: 400,
      letterSpacing: '0.1em',
      uppercase: true,
    },
    button: {
      fontFamily: "'Jost', system-ui, sans-serif",
      size: '13px',
      weight: 400,
      letterSpacing: '0.15em',
      uppercase: true,
    },
  },
  breakpoints: {
    mobile: 640,
    tablet: 1024,
  },
  z: {
    header: 100,
    drawer: 150,
    modal: 200,
  },
  easing: {
    slow: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
} as const;

export type Theme = typeof theme;
