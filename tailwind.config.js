const prod = process.env.NODE_ENV === "production";

module.exports = {
  purge: {
    enabled: prod,
    layers: ["components", "utilities"],
    content: ["./src/**/*.{jsx,html}"],
  },
  darkMode: "class",
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
