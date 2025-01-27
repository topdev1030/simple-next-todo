// babel.config.js or .babelrc
module.exports = {
  presets: [
    "next/babel", // Use Next.js preset for default settings
    "@babel/preset-env", // Ensure ES6+ code is transpiled
  ],
  env: {
    test: {
      presets: ["next/babel", "@babel/preset-env", "@babel/preset-typescript"],
    },
  },
};
