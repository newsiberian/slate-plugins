import type { Meta, StoryObj } from '@storybook/react';

import './styles.css';

import { CustomImage } from './slate-gallery/CustomImage';
import { CustomControls } from './slate-gallery/CustomControls';
import { CustomEditModal } from './slate-gallery/CustomEditModal';
import Gallery from './Gallery';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Gallery> = {
  title: 'Gallery plugin/Basic',
  component: Gallery,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Gallery>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

export const ControlsCustom: Story = {
  name: 'Controls custom component',
  args: {
    renderControls: (args) => <CustomControls {...args} />,
  },
};

export const ModalCustom: Story = {
  name: 'Custom modal component',
  args: {
    renderEditModal: (props) => <CustomEditModal {...props} />,
  },
};

export const ImageCustomStory: Story = {
  name: 'Custom image component',
  args: {
    renderImage: (args) => <CustomImage {...args} />,
  },
};
