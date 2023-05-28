import { config } from '../../rollup.config';
import packages from './package.json' assert { type: "json" };

export default config('slate-inline-toolbar', Object.keys(packages.dependencies));
