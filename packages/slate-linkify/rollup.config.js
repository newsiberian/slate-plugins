import build from '../../rollup.config';
import { dependencies } from './package.json';

export default build('slate-linkify', Object.keys(dependencies));
