import React from 'react';
import { storiesOf } from '@storybook/react';

import Simple from './slate-gallery/simple';
import ReadOnly from './slate-gallery/readOnly';

storiesOf('Slate editor gallery', module)
  .add('Simple', () => <Simple />)
  .add('Read only', () => <ReadOnly />)
  // .add('With image', () => <Gallery />);
