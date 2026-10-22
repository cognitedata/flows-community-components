import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { expect, within } from 'storybook/test';

import { UserAvatar, type UserProfileLookup } from './user-avatar';

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

const UNKNOWN_ID = 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0';
const FAILED_ID = 'f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0';

const stateRows: {
  state: string;
  userIdentifier: string;
  lookup: UserProfileLookup;
}[] = [
  {
    state: 'Named user',
    userIdentifier: 'user-123',
    lookup: async () => ({ displayName: 'Ada Lovelace' }),
  },
  {
    state: 'Service principal',
    userIdentifier: 'sp-123',
    lookup: async () => ({
      displayName: 'ci-deploy',
      identityType: 'SERVICE_PRINCIPAL',
    }),
  },
  {
    state: 'Unknown user',
    userIdentifier: UNKNOWN_ID,
    lookup: async () => null,
  },
  {
    state: 'Lookup failed',
    userIdentifier: FAILED_ID,
    lookup: async () => {
      throw new Error('Forbidden');
    },
  },
];

export const States: Story = {
  parameters: { layout: 'padded' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Ada Lovelace')).toBeInTheDocument();
    await expect(
      canvas.getByText('Service principal', { selector: 'td span' })
    ).toBeInTheDocument();
    await expect(canvas.getByText(UNKNOWN_ID)).toBeInTheDocument();
    await expect(canvas.getByText(FAILED_ID)).toBeInTheDocument();
  },
  render: () => (
    <table className="border-collapse text-sm">
      <tbody>
        {stateRows.map((row) => (
          <tr key={row.state} className="border-t first:border-t-0">
            <th className="p-2 pr-6 text-left font-normal text-muted-foreground">
              {row.state}
            </th>
            <td className="w-44 max-w-44 p-2">
              <UserAvatar
                userIdentifier={row.userIdentifier}
                lookup={row.lookup}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
