import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { expect, within } from 'storybook/test';

import { UserAvatar } from './user-avatar';

const queryClient = new QueryClient();

const meta: Meta<typeof UserAvatar> = {
  title: 'Community/User Avatar',
  component: UserAvatar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UserAvatar>;

export const NamedUser: Story = {
  args: {
    userIdentifier: 'user-123',
    lookup: async () => ({ displayName: 'Ada Lovelace' }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Ada Lovelace')).toBeInTheDocument();
    await expect(canvas.getByText('AL')).toBeInTheDocument();
  },
};

export const LargerSize: Story = {
  args: {
    userIdentifier: 'user-123',
    size: 'default',
    lookup: async () => ({ displayName: 'Ada Lovelace' }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Ada Lovelace')).toBeInTheDocument();
    await expect(canvas.getByText('AL')).toBeInTheDocument();
  },
};

export const ServicePrincipal: Story = {
  args: {
    userIdentifier: 'sp-123',
    lookup: async () => ({
      displayName: 'my-service-account',
      identityType: 'SERVICE_PRINCIPAL',
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      await canvas.findByText('Service principal')
    ).toBeInTheDocument();
    await expect(
      canvas.queryByText('my-service-account')
    ).not.toBeInTheDocument();
  },
};

export const MissingUser: Story = {
  args: {
    userIdentifier: 'unknown-user-id',
    lookup: async () => null,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('unknown-user-id')).toBeInTheDocument();
  },
};

export const NoSdkProvider: Story = {
  args: { userIdentifier: 'no-provider-id' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('no-provider-id')).toBeInTheDocument();
  },
};

export const LookupFailure: Story = {
  args: {
    userIdentifier: 'forbidden-user-id',
    lookup: async () => {
      throw new Error('Forbidden');
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('forbidden-user-id')).toBeInTheDocument();
  },
};
