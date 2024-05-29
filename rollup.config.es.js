import buble from "rollup-plugin-buble";

export default {
  plugins: [buble()],
  input: "src/index.js",
  output: {
    name: "teston",
    format: "esm",
    file: "dist/teston.es.js",
  },
};
