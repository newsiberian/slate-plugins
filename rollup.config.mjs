import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

function onwarn(message) {
  const suppressed = ['UNRESOLVED_IMPORT', 'THIS_IS_UNDEFINED'];

  if (!suppressed.find((code) => message.code === code)) {
    return console.warn(message.message);
  }
}

export const config = (name, dependencies) => ({
  input: 'lib/index.js',
  output: {
    file: 'lib/bundle.umd.js',
    format: 'umd',
    name: `@mercuriya/slate-plugins.${name}`,
    sourcemap: true,
    exports: 'named',
  },
  onwarn,
  external: dependencies,
  plugins: [typescript(), terser()],
});
