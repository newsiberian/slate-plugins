import sourcemaps from 'rollup-plugin-sourcemaps';

function onwarn(message) {
  const suppressed = ['UNRESOLVED_IMPORT', 'THIS_IS_UNDEFINED'];

  if (!suppressed.find(code => message.code === code)) {
    return console.warn(message.message);
  }
}

export default (name, dependencies) => ({
  input: 'lib/index.js',
  output: {
    file: 'lib/bundle.umd.js',
    format: 'umd',
    name: `@mercuriya/slate-plugins.${name}`,
    // globals,
    sourcemap: true,
    exports: 'named',
  },
  onwarn,
  external: dependencies,
  plugins: [
    sourcemaps(),
  ],
});
