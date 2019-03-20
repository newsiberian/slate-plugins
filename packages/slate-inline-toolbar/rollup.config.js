import build from '../../rollup.config';
import { dependencies } from './package.json';

export default build('slate-inline-toolbar', Object.keys(dependencies));
