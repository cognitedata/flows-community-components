import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { DashboardTemplate } from './dashboard-template';

const meta: Meta<typeof DashboardTemplate> = {
  title: 'Community/Dashboard',
  component: DashboardTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof DashboardTemplate>;

export const Basic: Story = {
  parameters: { order: 1 },
  render: () => <DashboardTemplate />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('Total Revenue')).toBeVisible();
    expect(canvas.getByText('$1,250.00')).toBeVisible();
    expect(
      canvas.getByRole('table', { name: 'Document outline' })
    ).toBeVisible();

    expect(canvas.getByText('Cover page')).toBeVisible();
    expect(canvas.getByRole('link', { name: 'Go to next page' })).toBeVisible();
    await userEvent.click(
      canvas.getByRole('link', { name: 'Go to next page' })
    );
    expect(canvas.getByText('Adaptive Communication Protocols')).toBeVisible();
  },
};
