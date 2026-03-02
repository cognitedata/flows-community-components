import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconInnerShadowTopLeft } from '@tabler/icons-react';
import { expect, within } from 'storybook/test';

import { Avatar, AvatarFallback } from '../avatar';
import { Badge } from '../badge';

import {
  Table,
  TableBody,
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

export const Default: Story = {
  parameters: { order: 1 },
  render: () => {
    const assets = [
      {
        name: 'Pump health UT-654/111',
        status: 'Running',
        badge: 'Troubleshooting',
        owner: 'PJ',
      },
      {
        name: 'WHM: 74-PH-8163/0091',
        status: 'Badge',
        badge: 'RCA',
        owner: 'PJ',
      },
    ];

    return (
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
    );
  },
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
  render: () => {
    const longContentAssets = [
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

    return (
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
    );
  },
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

export const MissingValues: Story = {
  parameters: { order: 4 },
  render: () => (
    <Table aria-label="Assets with missing values">
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
          <TableCell>Separator Vessel A</TableCell>
          <TableCell>Running</TableCell>
          <TableCell>-</TableCell>
          <TableCell>PJ</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>-</TableCell>
          <TableCell>Badge</TableCell>
          <TableCell>RCA</TableCell>
          <TableCell>-</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = await canvas.findByRole('table', {
      name: 'Assets with missing values',
    });
    await expect(table).toBeInTheDocument();
    await expect(canvas.getAllByText('-')).toHaveLength(3);
  },
};

export const SpecialCharacters: Story = {
  parameters: { order: 5 },
  render: () => (
    <Table aria-label="Assets with special characters">
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
          <TableCell>PT-101 / "West #2"</TableCell>
          <TableCell>Running</TableCell>
          <TableCell>Ops + QA</TableCell>
          <TableCell>AJ</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>WT-44 (Zone A)</TableCell>
          <TableCell>Badge</TableCell>
          <TableCell>RCA &amp; follow-up</TableCell>
          <TableCell>ML</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = await canvas.findByRole('table', {
      name: 'Assets with special characters',
    });
    await expect(table).toBeInTheDocument();
    await expect(canvas.getByText('PT-101 / "West #2"')).toBeInTheDocument();
    await expect(canvas.getByText('RCA & follow-up')).toBeInTheDocument();
  },
};

export const VeryNarrowContainer: Story = {
  parameters: { order: 6 },
  render: () => {
    const longContentAssets = [
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

    return (
      <div className="w-48">
        <Table aria-label="Assets in very narrow container">
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
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = await canvas.findByRole('table', {
      name: 'Assets in very narrow container',
    });
    await expect(table).toBeInTheDocument();
    const rows = await canvas.findAllByRole('row');
    await expect(rows).toHaveLength(3);
    await expect(canvas.getByText('Name')).toHaveAttribute('title', 'Name');
    await expect(
      canvas.getByText(
        'Compressor train diagnostics report for offshore production line and vibration anomaly correlation details'
      )
    ).toHaveAttribute(
      'title',
      'Compressor train diagnostics report for offshore production line and vibration anomaly correlation details'
    );
  },
};

export const Playground: Story = {
  parameters: { order: 99 },
  args: { className: '', 'aria-label': 'Asset status table' },
  argTypes: {
    className: {
      control: 'text',
      table: { category: 'Display' },
    },
    children: {
      table: { category: 'Content' },
      control: false,
    },
    'aria-label': {
      control: 'text',
      table: { category: 'Accessibility' },
    },
    onClick: {
      action: 'click',
      table: { category: 'Events' },
    },
    onKeyDown: {
      action: 'keyDown',
      table: { category: 'Events' },
    },
  },
  render: (args) => {
    const assets = [
      {
        name: 'Pump health UT-654/111',
        status: 'Running',
        badge: 'Troubleshooting',
        owner: 'PJ',
      },
      {
        name: 'WHM: 74-PH-8163/0091',
        status: 'Badge',
        badge: 'RCA',
        owner: 'PJ',
      },
    ];

    return (
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
    );
  },
};
