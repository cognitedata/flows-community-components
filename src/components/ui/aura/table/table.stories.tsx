import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconInnerShadowTopLeft } from '@tabler/icons-react';
import { expect, within } from 'storybook/test';

import { Avatar, AvatarFallback } from '../avatar';
import { Badge } from '../badge';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

const meta: Meta<typeof Table> = {
  title: 'Primitives/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Table>;

type AssetRow = {
  name: string;
  status: 'Running' | 'Badge';
  badge: string;
  owner: string;
};

const assets: AssetRow[] = [
  {
    name: 'Pump health UT-654/111...',
    status: 'Running',
    badge: 'Troubleshooting',
    owner: 'PJ',
  },
  {
    name: 'WHM: 74-PH-8163/0091...',
    status: 'Badge',
    badge: 'RCA',
    owner: 'PJ',
  },
];

const longContentAssets: AssetRow[] = [
  {
    name: 'Compressor train diagnostics report for offshore production line and vibration anomaly correlation details',
    status: 'Running',
    badge: 'Investigation in progress with cross-team incident response',
    owner: 'Platform Operations Team',
  },
  {
    name: 'Hydraulic pressure variance analysis for wellhead module under transient startup conditions',
    status: 'Badge',
    badge: 'Root cause analysis pending final validation and review',
    owner: 'Reliability Engineering',
  },
];

export const Default: Story = {
  parameters: { order: 1 },
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Badge</TableHead>
          <TableHead>Owner</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assets.map((asset) => (
          <TableRow key={asset.name}>
            <TableCell>{asset.name}</TableCell>
            <TableCell>
              <Badge
                variant={asset.status === 'Running' ? 'inProgress' : 'error'}
                outline
              >
                <IconInnerShadowTopLeft className="size-3" />
                {asset.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant="mountain">{asset.badge}</Badge>
            </TableCell>
            <TableCell>
              <Avatar variant="fjord" sizes="xxsm">
                <AvatarFallback>{asset.owner}</AvatarFallback>
              </Avatar>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = await canvas.findByRole('table');
    await expect(table).toBeInTheDocument();
    const rows = await canvas.findAllByRole('row');
    await expect(rows).toHaveLength(3);
  },
};

export const LongContent: Story = {
  parameters: { order: 2 },
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Badge</TableHead>
          <TableHead>Owner</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {longContentAssets.map((asset) => (
          <TableRow key={asset.name}>
            <TableCell>{asset.name}</TableCell>
            <TableCell>{asset.status}</TableCell>
            <TableCell>{asset.badge}</TableCell>
            <TableCell>{asset.owner}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = await canvas.findByRole('table');
    await expect(table).toBeInTheDocument();
    const rows = await canvas.findAllByRole('row');
    await expect(rows).toHaveLength(3);
  },
};

export const EmptyState: Story = {
  parameters: { order: 3 },
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Badge</TableHead>
          <TableHead>Owner</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={4} className="h-12 text-center">
            No assets found.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Playground: Story = {
  parameters: { order: 99 },
  args: { className: '' },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Badge</TableHead>
          <TableHead>Owner</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assets.map((asset) => (
          <TableRow key={asset.name}>
            <TableCell className="font-medium">{asset.name}</TableCell>
            <TableCell>{asset.status}</TableCell>
            <TableCell>{asset.badge}</TableCell>
            <TableCell>{asset.owner}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
