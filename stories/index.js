import React from 'react';
import { storiesOf } from '@storybook/react';

import './styles.css'

import image1 from '../public/image-1-1280x720.jpg';
import image2 from '../public/image-2-1280x720.jpg';
import image3 from '../public/image-3-1280x720.jpg';
import image4 from '../public/image-4-1280x720.jpg';
import image5 from '../public/image-5-1280x720.jpg';
import image6 from '../public/image-6-1280x720.jpg';
import image7 from '../public/image-7-1280x720.jpg';
import image8 from '../public/image-8-1280x720.jpg';
import image9 from '../public/image-9-1280x720.jpg';
import image10 from '../public/image-10-1280x720.jpg';

import Simple from './slate-gallery/simple';
import ReadOnly from './slate-gallery/readOnly';

storiesOf('Slate editor gallery', module)
  .add('Simple', () => <Simple />)
  .add('Read only: one image', () => (
    <ReadOnly
      images={[
        { src: image1 },
      ]}
    />
  ))
  .add('Read only: two images', () => (
    <ReadOnly
      images={[
        { src: image1 },
        { src: image2 },
      ]}
    />
  ))
  .add('Read only: three images', () => (
    <ReadOnly
      images={[
        { src: image1 },
        { src: image2 },
        { src: image3 },
      ]}
    />
  ))
  .add('Read only: four images', () => (
    <ReadOnly
      images={[
        { src: image1 },
        { src: image2 },
        { src: image3 },
        { src: image4 },
      ]}
    />
  ))
  .add('Read only: five images', () => (
    <ReadOnly
      images={[
        { src: image1 },
        { src: image2 },
        { src: image3 },
        { src: image4 },
        { src: image5 },
      ]}
    />
  ))
  .add('Read only: six images', () => (
    <ReadOnly
      images={[
        { src: image1 },
        { src: image2 },
        { src: image3 },
        { src: image4 },
        { src: image5 },
        { src: image6 },
      ]}
    />
  ))
  .add('Read only: seven images', () => (
    <ReadOnly
      images={[
        { src: image1 },
        { src: image2 },
        { src: image3 },
        { src: image4 },
        { src: image5 },
        { src: image6 },
        { src: image7 },
      ]}
    />
  ))
  .add('Read only: eight images', () => (
    <ReadOnly
      images={[
        { src: image1 },
        { src: image2 },
        { src: image3 },
        { src: image4 },
        { src: image5 },
        { src: image6 },
        { src: image7 },
        { src: image8 },
      ]}
    />
  ))
  .add('Read only: nine images', () => (
    <ReadOnly
      images={[
        { src: image1 },
        { src: image2 },
        { src: image3 },
        { src: image4 },
        { src: image5 },
        { src: image6 },
        { src: image7 },
        { src: image8 },
        { src: image9 },
      ]}
    />
  ))
  .add('Read only: ten images', () => (
    <ReadOnly
      images={[
        { src: image1 },
        { src: image2 },
        { src: image3 },
        { src: image4 },
        { src: image5 },
        { src: image6 },
        { src: image7 },
        { src: image8 },
        { src: image9 },
        { src: image10 },
      ]}
    />
  ))
  .add('Read only: custom image className', () => (
    <ReadOnly
      images={[
        { src: image1 },
        { src: image2 },
      ]}
      imageClassName="read-only-image"
    />
  ))
  .add('Read only: image wrapper custom className', () => (
    <ReadOnly
      images={[
        { src: image1 },
        { src: image2 },
        { src: image3 },
        { src: image4 },
        { src: image5 },
      ]}
      imageWrapperClassName="custom-image-wrapper"
    />
  ))
  .add('Read only: custom left className', () => (
    <ReadOnly
      images={[
        { src: image1 },
        { src: image2 },
        { src: image3 },
        { src: image4 },
        { src: image5 },
        { src: image6 },
        { src: image7 },
        { src: image8 },
        { src: image9 },
        { src: image10 },
      ]}
      leftClassName="custom-left"
    />
  ));
