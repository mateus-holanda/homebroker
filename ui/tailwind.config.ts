import flowbite from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";
//@ts-expect-error - flowbite-typography has no type
import flowbiteTypography from "flowbite-typography";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [flowbite.plugin(), flowbiteTypography],
} satisfies Config;