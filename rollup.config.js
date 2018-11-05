import buble from 'rollup-plugin-buble';

export default {
  plugins: [
    buble()
  ],
  input: 'src/index.mjs',
  output: {
    name: 'test',
    dir: './dist',
    format: 'cjs',
    file: 'teston.js'
  }
};