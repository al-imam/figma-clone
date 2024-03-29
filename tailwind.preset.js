/* eslint-disable import/no-extraneous-dependencies, global-require, import/no-extraneous-dependencies */
const defaultTheme = require("tailwindcss/defaultTheme");
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");
const { parseColor } = require("tailwindcss/lib/util/color");
const plugin = require("tailwindcss/plugin");

function generateArray(max = 10, min = 1) {
  return Array.from({ length: max - min + 1 }, (_, index) => min + index);
}

function generateValue({ max = 10, key, value, min = 1 }) {
  return generateArray(max, min).reduce((acc, v) => ({ ...acc, [key(v)]: value(v) }), {});
}

const timeFunctions = generateValue({
  max: 100,
  min: 2,
  key: second => `${second}s`,
  value: second => `${second * 1000}ms`,
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  theme: {
    extend: {
      __colors: ({ theme }) => {
        const flatPalette = flattenColorPalette(theme("colors"));

        return Object.fromEntries(
          Object.entries(flatPalette)
            .map(([key, value]) => [key, parseColor(value)?.color.join(" ")])
            .filter(([, value]) => value)
        );
      },

      transitionDuration: timeFunctions,
      transitionDelay: timeFunctions,

      height: {
        screen: ["100vh", "100svh"],
      },

      minHeight: {
        screen: ["100vh", "100svh"],
      },

      maxHeight: {
        screen: ["100vh", "100svh"],
      },

      colors: {
        border: "rgb(var(--border))",
        input: "rgb(var(--input))",
        ring: "rgb(var(--ring))",
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        primary: {
          DEFAULT: "rgb(var(--primary))",
          foreground: "rgb(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary))",
          foreground: "rgb(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive))",
          foreground: "rgb(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "rgb(var(--muted))",
          foreground: "rgb(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "rgb(var(--accent))",
          foreground: "rgb(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "rgb(var(--popover))",
          foreground: "rgb(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "rgb(var(--card))",
          foreground: "rgb(var(--card-foreground))",
        },

        link: {
          DEFAULT: "rgb(var(--link))",
          muted: "rgb(var(--link-muted))",
        },

        shade: {
          DEFAULT: "rgb(var(--shade-500))",
          "p-500": "rgb(var(--shade-p-500))",
          "p-400": "rgb(var(--shade-p-400))",
          "p-300": "rgb(var(--shade-p-300))",
          "p-200": "rgb(var(--shade-p-200))",
          "p-100": "rgb(var(--shade-p-100))",
          0: "rgb(var(--shade-0))",
          "n-100": "rgb(var(--shade-n-100))",
          "n-200": "rgb(var(--shade-n-200))",
          "n-300": "rgb(var(--shade-n-300))",
          "n-400": "rgb(var(--shade-n-400))",
          "n-500": "rgb(var(--shade-n-500))",
        },

        success: "rgb(var(--success))",
        failure: "rgb(var(--failure))",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },

        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },

        "scale-in": {
          from: { opacity: 0, transform: "rotateX(-15deg) scale(0.9)" },
          to: { opacity: 1, transform: "rotateX(0deg) scale(1)" },
        },

        "scale-out": {
          from: { opacity: 1, transform: "rotateX(0deg) scale(1)" },
          to: { opacity: 0, transform: "rotateX(-15deg) scale(0.95)" },
        },

        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },

        "fade-out": {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },

        title: {
          "0%": {
            "line-height": "0%",
            "letter-spacing": "0.25em",
            opacity: "0",
          },
          "25%": {
            "line-height": "0%",
          },
          "50%": {
            opacity: "0%",
          },
          "100%": {
            "line-height": "100%",
            opacity: "100%",
          },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scale-in": "scale-in 200ms ease",
        "scale-out": "scale-out 200ms ease",
        "fade-in": "fade-in 200ms ease",
        "fade-out": "fade-out 200ms ease",
        title: "title 2500ms ease-out forwards",
      },
    },
  },

  plugins: [
    require("tailwindcss-animate"),

    plugin(({ addBase, theme }) => {
      addBase({
        [[":root", ".light"]]: {
          "--background": theme("__colors.zinc-50"),
          "--foreground": theme("__colors.zinc-950"),
          "--card": theme("__colors.zinc-50"),
          "--card-foreground": theme("__colors.zinc-950"),
          "--popover": theme("__colors.zinc-50"),
          "--popover-foreground": theme("__colors.zinc-950"),
          "--primary": theme("__colors.zinc-900"),
          "--primary-foreground": theme("__colors.zinc-100"),
          "--secondary": theme("__colors.zinc-100"),
          "--secondary-foreground": theme("__colors.zinc-900"),
          "--muted": theme("__colors.zinc-200"),
          "--muted-foreground": theme("__colors.zinc-500"),
          "--accent": theme("__colors.zinc-200"),
          "--accent-foreground": theme("__colors.zinc-950"),
          "--destructive": theme("__colors.red-500"),
          "--destructive-foreground": theme("__colors.zinc-50"),
          "--border": theme("__colors.zinc-200"),
          "--input": theme("__colors.zinc-200"),
          "--ring": theme("__colors.zinc-950"),
          "--shade-p-500": theme("__colors.zinc-50"),
          "--shade-p-400": theme("__colors.zinc-100"),
          "--shade-p-300": theme("__colors.zinc-200"),
          "--shade-p-200": theme("__colors.zinc-300"),
          "--shade-p-100": theme("__colors.zinc-400"),
          "--shade-0": theme("__colors.zinc-500"),
          "--shade-n-100": theme("__colors.zinc-600"),
          "--shade-n-200": theme("__colors.zinc-700"),
          "--shade-n-300": theme("__colors.zinc-800"),
          "--shade-n-400": theme("__colors.zinc-900"),
          "--shade-n-500": theme("__colors.zinc-950"),
          "--link": theme("__colors.blue-500"),
          "--link-muted": theme("__colors.blue-600"),
          "--success": theme("__colors.green-400"),
          "--failure": theme("__colors.red-500"),
          "--radius": "0.5rem",
          "--nav-size": "4rem",
        },

        ".dark": {
          "--background": theme("__colors.zinc-950"),
          "--foreground": theme("__colors.zinc-50"),
          "--card": theme("__colors.zinc-950"),
          "--card-foreground": theme("__colors.zinc-50"),
          "--popover": theme("__colors.zinc-950"),
          "--popover-foreground": theme("__colors.zinc-50"),
          "--primary": theme("__colors.zinc-50"),
          "--primary-foreground": theme("__colors.zinc-900"),
          "--secondary": theme("__colors.zinc-800"),
          "--secondary-foreground": theme("__colors.zinc-50"),
          "--muted": theme("__colors.zinc-800"),
          "--muted-foreground": theme("__colors.zinc-400"),
          "--accent": theme("__colors.zinc-800"),
          "--accent-foreground": theme("__colors.zinc-50"),
          "--destructive": theme("__colors.red-800"),
          "--destructive-foreground": theme("__colors.zinc-50"),
          "--border": theme("__colors.zinc-800"),
          "--input": theme("__colors.zinc-800"),
          "--ring": theme("__colors.zinc-300"),
          "--shade-p-500": theme("__colors.zinc-900"),
          "--shade-p-400": theme("__colors.zinc-800"),
          "--shade-p-300": theme("__colors.zinc-700"),
          "--shade-p-200": theme("__colors.zinc-600"),
          "--shade-p-100": theme("__colors.zinc-500"),
          "--shade-0": theme("__colors.zinc-400"),
          "--shade-n-100": theme("__colors.zinc-300"),
          "--shade-n-200": theme("__colors.zinc-200"),
          "--shade-n-300": theme("__colors.zinc-100"),
          "--shade-n-400": theme("__colors.zinc-50"),
          "--shade-n-500": theme("__colors.white"),
        },

        "*": {
          "@apply border-border": {},
        },

        body: {
          "@apply bg-background text-foreground": {},
        },
      });
    }),

    plugin(({ addComponents }) => {
      addComponents({
        ".no-scrollbar::-webkit-scrollbar": { display: "none" },
        ".no-scrollbar": { msOverflowStyle: "none", scrollbarWidth: "none" },

        [[".debug-css *", ".debug-css"]]: {
          "@apply bg-red-500/5 outline outline-1 outline-red-500/20": {},
        },

        ".dragging-none": { WebkitUserDrag: "none", userDrag: "none" },
        ".dragging-auto": { WebkitUserDrag: "auto", userDrag: "auto" },

        ".writing-vertical": { writingMode: "vertical-rl", textOrientation: "mixed" },

        ".stack-content": { display: "grid", gridTemplate: "'container'", isolation: "isolate" },
        ".stack-content > *": { gridArea: "container" },

        [[
          "input:-webkit-autofill",
          "input:-webkit-autofill:hover",
          "input:-webkit-autofill:focus",
          "input:-webkit-autofill:active",
        ]]: {
          transition: ["background-color 50000s ease-in-out 0s", "color 5000s ease-in-out 0s"].join(", "),
        },

        [[".overlay-left", ".overlay-right", ".overlay"]]: {
          "--overlay-width": "10%",
          "--bg-color": "rgb(255 255 255 / 1)",
          "--transparent": "rgb(0 0 0 / 0)",
        },

        [[
          ":is(.overlay-left, .overlay-right, .overlay)::before",
          ":is(.overlay-left, .overlay-right, .overlay)::after",
        ]]: {
          background: "linear-gradient(to right, var(--g-start), var(--g-end))",
          position: "absolute",
          pointerEvents: "none",
          width: "var(--overlay-width)",
          zIndex: 10,
        },

        ":is(.overlay-left, .overlay)::before": {
          "--g-start": "var(--bg-color)",
          "--g-end": "var(--transparent)",
          content: '""',
          inset: "0 auto 0 0",
        },

        ":is(.overlay-right, .overlay)::before": {
          "--g-end": "var(--bg-color)",
          "--g-start": "var(--transparent)",
          content: '""',
          inset: "0 0 0 auto",
        },
      });
    }),

    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: value => ({
          perspective: value,
        }),
      });
    }),

    plugin(({ matchUtilities }) => {
      matchUtilities(
        {
          "animation-duration": value => ({
            animationDuration: value,
          }),

          "transition-duration": value => ({
            transitionDuration: value,
          }),
        },
        { values: { ...timeFunctions, ...defaultTheme.transitionDuration } }
      );
      matchUtilities(
        {
          "animation-delay": value => ({
            animationDelay: value,
          }),

          "transition-delay": value => ({
            transitionDelay: value,
          }),
        },
        { values: { ...timeFunctions, ...defaultTheme.transitionDelay } }
      );
    }),

    plugin(({ addComponents, matchUtilities, addUtilities }) => {
      const mask = [".mask", ".mask-x", ".mask-y", ".mask-top", ".mask-bottom", ".mask-right", ".mask-left"];

      addComponents({
        [mask]: {
          "--fade": "2rem",
          "--fade-x": "var(--fade)",
          "--fade-y": "var(--fade)",
          "--fade-top": "var(--fade-y)",
          "--fade-bottom": "var(--fade-y)",
          "--fade-left": "var(--fade-x)",
          "--fade-right": "var(--fade-x)",

          "--fade-g": "0px",
          "--fade-g-x": "var(--fade-g)",
          "--fade-g-y": "var(--fade-g)",
          "--fade-g-top": "var(--fade-g-y)",
          "--fade-g-bottom": "var(--fade-g-y)",
          "--fade-g-left": "var(--fade-g-x)",
          "--fade-g-right": "var(--fade-g-x)",

          "--alpha": "rgb(0 0 0 / 0)",
          "--solid": "rgb(0 0 0 / 1)",

          "--mask": `linear-gradient(180deg, 
            var(--alpha) calc(min(var(--fade-g-top), var(--fade-top))),
            var(--solid) var(--fade-top),
            var(--solid) calc(100% - var(--fade-bottom)),
            var(--alpha) calc(100% - calc(min(var(--fade-g-bottom), var(--fade-bottom))))
          ), 
          linear-gradient(90deg,
            var(--alpha) calc(min(var(--fade-g-left), var(--fade-left))),
            var(--solid) var(--fade-left),
            var(--solid) calc(100% - var(--fade-right)),
            var(--alpha) calc(100% - calc(min(var(--fade-g-right), var(--fade-right))))
          )`,
        },

        [`:is(${mask.join(", ")}):not(.mask-only)`]: {
          maskComposite: "intersect",
          maskImage: "var(--mask)",
        },

        ".mask-only": {},
      });

      addUtilities({
        ".mask-x": {
          "--fade-y": "0px",
        },

        ".mask-y": {
          "--fade-x": "0px",
        },

        ".mask-top": {
          "--fade-bottom": "0px",
          "--fade-left": "0px",
          "--fade-right": "0px",
        },

        ".mask-bottom": {
          "--fade-top": "0px",
          "--fade-left": "0px",
          "--fade-right": "0px",
        },

        ".mask-right": {
          "--fade-top": "0px",
          "--fade-left": "0px",
          "--fade-bottom": "0px",
        },

        ".mask-left": {
          "--fade-top": "0px",
          "--fade-right": "0px",
          "--fade-bottom": "0px",
        },
      });

      matchUtilities(
        {
          mask: value => ({
            "--fade": value,
          }),

          "mask-x": value => ({
            "--fade-x": value,
          }),

          "mask-y": value => ({
            "--fade-y": value,
          }),

          "mask-top": value => ({
            "--fade-top": value,
          }),

          "mask-bottom": value => ({
            "--fade-bottom": value,
          }),

          "mask-left": value => ({
            "--fade-left": value,
          }),

          "mask-right": value => ({
            "--fade-right": value,
          }),
        },
        {
          values: { ...defaultTheme.spacing, none: "0px" },
        }
      );

      matchUtilities(
        {
          "mask-g": value => ({
            "--fade-g": value,
          }),

          "mask-g-x": value => ({
            "--fade-g-x": value,
          }),

          "mask-g-y": value => ({
            "--fade-g-y": value,
          }),

          "mask-g-top": value => ({
            "--fade-g-top": value,
          }),

          "mask-g-bottom": value => ({
            "--fade-g-bottom": value,
          }),

          "mask-g-left": value => ({
            "--fade-left": value,
          }),

          "mask-g-right": value => ({
            "--fade-g-right": value,
          }),
        },
        {
          values: defaultTheme.spacing,
        }
      );

      matchUtilities(
        {
          "mask-alpha": value => ({
            "--alpha": `rgb(0 0 0 / ${value})`,
          }),

          "mask-solid": value => ({
            "--solid": `rgb(0 0 0 / ${value})`,
          }),
        },
        {
          values: defaultTheme.opacity,
        }
      );
    }),
  ],
};
