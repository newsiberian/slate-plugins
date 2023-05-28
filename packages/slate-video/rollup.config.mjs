import { config } from '../../rollup.config.mjs';
import packages from './package.json' assert { type: "json" };

export default config('slate-video', Object.keys(packages.dependencies));
