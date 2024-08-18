/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      padding: {
        "5xl": "220px",
        "2xl": "120px",
      },
      screens: {
        xs: "530px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: "#813DD4",
        "primary-light": "#FAF6FF",
        "neutral-500": "#DBAB00",
        text_primary: "#000000",
        text_secondary: "#8E8297",
        bullish_primary: "#0B834B",
        neutral_primary: "#DBAB00",
        bearish_primary: "#DB0000",
        bullish_secondary: "#C5FAE2",
        neutral_secondary: "#FFE791",
        bearish_secondary: "#FFA9A9",
        primary_extralight: "#FCFBFF",
        smoke_white: "#D9D9D9",
        border_primary: "#D0D5DD",
        link: "#3D72FC",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        select:
          "0px 1px 2px 0px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #F4EBFF;",
        "pie-chart-container": "0px 3.989px 23.934px 0px rgba(5, 4, 29, 0.08);",
        caseSelector_card: "0px 0px 8px 0px rgba(129, 61, 212, 0.34)",
      },
      fontFamily: {},
    },
  },
  plugins: [],
};
