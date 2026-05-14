// Inline SVG icons matching the design (1.5–2 stroke, currentColor, no fill).
type IconProps = { size?: number; className?: string; style?: React.CSSProperties };

const base = (size = 16) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24" as const,
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeWidth: 2,
});

export const ArrowRight = ({ size = 14, className, style }: IconProps) => (
  <svg {...base(size)} className={className} style={style}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const ArrowLeft = ({ size = 12, className, style }: IconProps) => (
  <svg {...base(size)} className={className} style={style}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export const ArrowUp = ({ size = 16, className, style }: IconProps) => (
  <svg {...base(size)} className={className} style={style}>
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

export const ExternalLink = ({ size = 14, className, style }: IconProps) => (
  <svg {...base(size)} className={className} style={style}>
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

export const Send = ({ size = 14, className, style }: IconProps) => (
  <svg {...base(size)} className={className} style={style}>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export const Check = ({ size = 12, className, style }: IconProps) => (
  <svg {...base(size)} className={className} style={style}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const Close = ({ size = 16, className, style }: IconProps) => (
  <svg {...base(size)} className={className} style={style}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export const Github = ({ size = 14, className, style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.3v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
  </svg>
);

export const Linkedin = ({ size = 16, className, style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
  </svg>
);

export const Twitter = ({ size = 16, className, style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M14.258 10.152L23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309h7.133zm-2.895 3.293l-.947-1.327L2.875 1.56h3.246l6.086 8.523.948 1.327 7.91 11.078h-3.246z" />
  </svg>
);

export const Mortarboard = ({ size = 32, className, style }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.5} className={className} style={style}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

export const Users = ({ size = 16, className, style }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.5} className={className} style={style}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const Flask = ({ size = 16, className, style }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.5} className={className} style={style}>
    <path d="M10 2v7.31" />
    <path d="M14 9.3V1.99" />
    <path d="M8.5 2h7" />
    <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
  </svg>
);

export const Star = ({ size = 16, className, style }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.5} className={className} style={style}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const Quote = ({ size = 24, className, style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="rgba(124,196,240,0.5)" className={className} style={style}>
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 .985 0 1 0 1 1v1c0 1-1 2-2 2-.985 0-1 .008-1 1.031V20c0 1 0 1 1 1z" />
  </svg>
);

export const ThumbsUp = ({ size = 18, className, style }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.8} className={className} style={style}>
    <path d="M7 10v12M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H7m0-12V5a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v.88" />
  </svg>
);

export const ThumbsDown = ({ size = 18, className, style }: IconProps) => (
  <svg {...base(size)} strokeWidth={1.8} className={className} style={style}>
    <path d="M17 14V2M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H17m0 12v5a3 3 0 0 1-3 3v0a3 3 0 0 1-3-3v-.88" />
  </svg>
);

export const Link2 = ({ size = 14, className, style }: IconProps) => (
  <svg {...base(size)} className={className} style={style}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);
