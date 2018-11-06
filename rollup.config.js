import buble from 'rollup-plugin-buble';

export default {
  plugins: [
    buble()
  ],
  input: 'src/index.mjs',
  output: {
    name: 'teston',
    dir: './dist',
    format: 'umd',
    file: 'teston.js'
  }
};
