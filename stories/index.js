import React from 'react';
import { storiesOf } from '@storybook/react';

import Gallery from './slate-gallery';

storiesOf('Slate editor gallery', module)
  .add('basic', () => <Gallery />);
