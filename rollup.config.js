import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import polyfillNode from "rollup-plugin-polyfill-node";
import bakedEnv from "rollup-plugin-baked-env";


const myVariables = {
  NODE_ENV: "production",
};

export default {
  input: "src/index.tsx",
  output: [
    {
      file: "bot/chat.js",
      format: "iife", // Browser-friendly format
      name: "ChatBot", // Global name
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    postcss({ extract: true, minimize: true }),
    terser(),
    polyfillNode(),
    bakedEnv(myVariables, {
      moduleName: "env",
      preferConst: true,
      compact: false,
      indent: "  ",
    }),
  ],
};
