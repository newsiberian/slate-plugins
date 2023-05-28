import { config } from '../../rollup.config.mjs';
import packages from './package.json' assert { type: "json" };

export default config('slate-linkify', Object.keys(packages.dependencies));
