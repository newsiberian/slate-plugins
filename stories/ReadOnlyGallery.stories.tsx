import type { Meta, StoryObj } from '@storybook/react';

import './styles.css';

import { CustomImage } from './slate-gallery/CustomImage';
import ImageLightbox from './slate-gallery/ImageLightbox';
import ReadOnly from './slate-gallery/readOnly';

import image1 from './assets/image-1-1280x720.jpg';
import image2 from './assets/image-2-1280x720.jpg';
import image3 from './assets/image-3-1280x720.jpg';
import image4 from './assets/image-4-1280x720.jpg';
import image5 from './assets/image-5-1280x720.jpg';
import image6 from './assets/image-6-1280x720.jpg';
import image7 from './assets/image-7-1280x720.jpg';
import image8 from './assets/image-8-1280x720.jpg';
import image9 from './assets/image-9-1280x720.jpg';
import image10 from './assets/image-10-1280x720.jpg';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ReadOnly> = {
  title: 'Gallery plugin/Read only',
  component: ReadOnly,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ReadOnly>;

export const One: Story = {
  name: 'One image',
  args: {
    images: [{ src: image1 }],
  },
};

export const Two: Story = {
  name: 'Two images',
  args: {
    images: [
      { src: image1, description: 'Deep space' },
      { src: image2, description: 'Another space view' },
    ],
  },
};

export const Three: Story = {
  name: 'Three images',
  args: {
    images: [{ src: image1 }, { src: image2 }, { src: image3 }],
  },
};

export const Four: Story = {
  name: 'Four images',
  args: {
    images: [
      { src: image1 },
      { src: image2 },
      { src: image3 },
      { src: image4 },
    ],
  },
};

export const Five: Story = {
  name: 'Five images',
  args: {
    images: [
      { src: image1 },
      { src: image2 },
      { src: image3 },
      { src: image4 },
      { src: image5 },
    ],
  },
};

export const Six: Story = {
  name: 'Six images',
  args: {
    images: [
      { src: image1 },
      { src: image2 },
      { src: image3 },
      { src: image4 },
      { src: image5 },
      { src: image6 },
    ],
  },
};

export const Seven: Story = {
  name: 'Seven images',
  args: {
    images: [
      { src: image1 },
      { src: image2 },
      { src: image3 },
      { src: image4 },
      { src: image5 },
      { src: image6 },
      { src: image7 },
    ],
  },
};

export const Eight: Story = {
  name: 'Eight images',
  args: {
    images: [
      { src: image1 },
      { src: image2 },
      { src: image3 },
      { src: image4 },
      { src: image5 },
      { src: image6 },
      { src: image7 },
      { src: image8 },
    ],
  },
};

export const Nine: Story = {
  name: 'Nine images',
  args: {
    images: [
      { src: image1 },
      { src: image2 },
      { src: image3 },
      { src: image4 },
      { src: image5 },
      { src: image6 },
      { src: image7 },
      { src: image8 },
      { src: image9 },
    ],
  },
};

export const Ten: Story = {
  name: 'Ten images',
  args: {
    images: [
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
    ],
  },
};

export const ExtraFunc: Story = {
  name: 'With renderExtra function',
  args: {
    images: [
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
    ],
    renderExtra: (args) => <ImageLightbox {...args} />,
  },
};

export const CustomImageStory: Story = {
  name: 'Custom image',
  args: {
    images: [
      { src: image1, description: 'Deep space' },
      { src: image2, description: 'Another space view' },
      { src: image3 },
    ],
    renderImage: (args) => <CustomImage {...args} />,
  },
};

export const CustomImageClassName: Story = {
  name: 'Custom image className',
  args: {
    images: [{ src: image1 }, { src: image2 }],
    imageClassName: 'read-only-image',
  },
};

export const ImageWrapperCustomClassName: Story = {
  name: 'Image wrapper custom className',
  args: {
    images: [
      { src: image1 },
      { src: image2 },
      { src: image3 },
      { src: image4 },
      { src: image5 },
    ],
    imageWrapperClassName: 'custom-image-wrapper',
  },
};

export const CustomLeftClassName: Story = {
  name: 'Custom left className',
  args: {
    images: [
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
    ],
    leftClassName: 'custom-left',
  },
};

export const CustomGridClassName: Story = {
  name: 'Custom grid className',
  args: {
    images: [
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
    ],
    gridClassName: 'grid',
  },
};
