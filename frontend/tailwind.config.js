export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        site: {
            DEFAULT: "#212121", // allows bg-site
          100: "#2a2a2a",
          200: "#242424",
          300: "#212121",
          1000: "#1b1b1b"      // now bg-site-1000 will be generated
        },
      },
    },
  },
}
