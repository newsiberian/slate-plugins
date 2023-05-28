import { config } from '../../rollup.config.mjs';
import packages from './package.json' assert { type: "json" };

export default config('slate-gallery-read-only', Object.keys(packages.dependencies));
