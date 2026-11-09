import animate from "tailwindcss-animate";
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))", input: "hsl(var(--input))", ring: "hsl(var(--ring))",
        background: "hsl(var(--background))", foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        night: { 950: "#02050D", 900: "#050C1F", 800: "#0A1836", 700: "#12285A", 500: "#1F47A8" }, mist: "#9AA6C2",
        gold: "#C9B48C", "gold-hi": "#EFE4CC", "gold-lo": "#6B5A3E", ivory: "#F3EDE1", ash: "#8C8579",
      },
      fontFamily: {
        display: ['"Instrument Serif"', "Georgia", "serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        mono: ['"Work Sans"', "system-ui", "sans-serif"],
        sans: ['"Work Sans"', "system-ui", "sans-serif"], ui: ['"Work Sans"', "system-ui", "sans-serif"],
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      transitionTimingFunction: { out: "cubic-bezier(0.23,1,0.32,1)", io: "cubic-bezier(0.77,0,0.175,1)" },
    },
  },
  plugins: [animate],
};
