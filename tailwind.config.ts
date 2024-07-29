import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontSize: {
        xxs: ["0.625rem", { lineHeight: "1rem" }], // 10px
        xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
        sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
        base: ["1rem", { lineHeight: "1.5rem" }], // 16px
        lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
        xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
        "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
        "5xl": ["3rem", { lineHeight: "1" }], // 48px
        "6xl": ["3.75rem", { lineHeight: "1" }], // 60px
        "7xl": ["4.5rem", { lineHeight: "1" }], // 72px
        "8xl": ["6rem", { lineHeight: "1" }], // 96px
        "9xl": ["8rem", { lineHeight: "1" }], // 128px
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }: any) {
      const fontSizes = theme("fontSize") as {
        [key: string]: [string, { lineHeight: string }];
      };

      const remToPx = (rem: string) => parseFloat(rem) * 16;
      const keys = Object.keys(fontSizes);
      keys.sort((a, b) => remToPx(fontSizes[a][0]) - remToPx(fontSizes[b][0]));
      const responsiveFontSizes: { [key: string]: any } = {};

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = fontSizes[key];
        const prevValue = fontSizes[keys[i - 1]] || value;
        responsiveFontSizes[`.text-responsive-${key}`] = {
          fontSize: prevValue[0],
          lineHeight: prevValue[1].lineHeight,
          [`@screen lg`]: {
            fontSize: value[0],
            lineHeight: value[1].lineHeight,
          },
        };
      }
      addUtilities(responsiveFontSizes, ["responsive"]);
    },
  ],
};

export default config;
