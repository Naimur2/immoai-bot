import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/main.tsx',
  output: [
    {
      file: 'dist/chat-bot.js',
      format: 'iife', // Browser-friendly format
      name: 'ChatBot', // Global name
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    postcss({ extract: true, minimize: true }),
    terser(),
  ],
};
