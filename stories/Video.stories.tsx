import type { Meta, StoryObj } from '@storybook/react';
import TextField from '@mui/material/TextField';

import { Video } from './Video';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Video> = {
  title: 'Video plugin',
  component: Video,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Video>;

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    controls: true,
  },
};

export const CustomInput: Story = {
  args: {
    controls: true,
    renderInput: (props) => <TextField {...props} />,
  },
};
