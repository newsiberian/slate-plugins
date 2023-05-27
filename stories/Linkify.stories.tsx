import type { Meta, StoryObj } from '@storybook/react';
import Link from '@mui/material/Link';

import { Linkify } from './Linkify';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Linkify> = {
  title: 'Linkify plugin',
  component: Linkify,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Linkify>;

export const CustomComponent: Story = {
  args: {
    renderComponent: (props) => <Link {...props} />,
  },
};
