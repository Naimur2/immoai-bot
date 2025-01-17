import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import bakedEnv from "rollup-plugin-baked-env";
import polyfillNode from "rollup-plugin-polyfill-node";
import postcss from "rollup-plugin-postcss";
import { importAsString } from "rollup-plugin-string-import";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import tsConfigPaths from "rollup-plugin-ts-paths";
import gzipPlugin from "rollup-plugin-gzip";
import { babel } from "@rollup/plugin-babel";

const myVariables = {
  NODE_ENV: "production",
  VITE_APP_API_URL: "https://api.immoai-bot.com",
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
    postcss({ extract: true, minimize: true, modules: true, sourceMap: true }),
    terser(),
    polyfillNode(),
    bakedEnv(myVariables, {
      moduleName: "env",
      preferConst: true,
      compact: false,
      indent: "  ",
    }),
    importAsString({
      include: ["**/*.txt", "**/*.css"],
    }),
    url({
      publicPath: "/public/",
      include: [
        "**/*.svg",
        "**/*.png",
        "**/*.jpg",
        "**/*.gif",
        "**/*.woff",
        "**/*.woff2",
      ],
      limit: Infinity,
    }),
    tsConfigPaths(),
    gzipPlugin(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
  ],
  external: ["react", "react-dom"],
};
