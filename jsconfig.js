
// This file serves as an alternative to the read-only jsconfig.json
// JavaScript project configuration for code navigation and intellisense
module.exports = {
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["./src/*"]
    },
    jsx: "react-jsx"
  },
  include: ["src"],
  exclude: ["node_modules", "build", "dist"]
};
