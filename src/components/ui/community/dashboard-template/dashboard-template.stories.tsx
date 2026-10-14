import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { DashboardLayout } from './dashboard-layout';
import {
  dashboardLayouts,
  dashboardPageTitle,
  dashboardPrimaryAction,
  dashboardTabs,
  dashboardWorkOrders,
} from './dashboard-layouts.data';
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
  parameters: { order: 9 },
  render: () => <DashboardTemplate />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('Total Revenue')).toBeVisible();
    expect(canvas.getByText('1,250')).toBeVisible();
    expect(
      canvas.getByRole('table', { name: 'Document outline' })
    ).toBeVisible();

    expect(
      canvas.getByRole('checkbox', { name: 'Select Cover page' })
    ).toBeVisible();
    expect(canvas.getByText('Executive summary')).toBeVisible();
    const nextPage = canvas.getByRole('button', { name: 'Go to next page' });
    expect(nextPage).toBeVisible();
    await userEvent.click(nextPage);
    expect(canvas.getByText('Adaptive Communication Protocols')).toBeVisible();
  },
};

const [
  header,
  tabs,
  panelHeader,
  panelTabs,
  gridHeader,
  gridTabs,
  previewHeader,
  previewTabs,
] = dashboardLayouts;

const firstOrder = dashboardWorkOrders[0];

export const DashboardWithHeader: Story = {
  parameters: { order: 1, name: header.name },
  render: () => <DashboardLayout layout={header.id} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByRole('heading', { name: dashboardPageTitle })
    ).toBeVisible();
    expect(
      canvas.getByRole('button', { name: dashboardPrimaryAction })
    ).toBeVisible();
    expect(canvas.queryByRole('table', { name: 'Work orders' })).toBeNull();
  },
};

export const DashboardWithTabs: Story = {
  parameters: { order: 2, name: tabs.name },
  render: () => <DashboardLayout layout={tabs.id} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('tab', { name: dashboardTabs[1] })).toBeVisible();
    expect(
      canvas.queryByRole('button', { name: dashboardPrimaryAction })
    ).toBeNull();
  },
};

export const DashboardWithPanelHeader: Story = {
  parameters: { order: 3, name: panelHeader.name },
  render: () => <DashboardLayout layout={panelHeader.id} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const panel = within(
      canvas.getByRole('complementary', { name: 'Dashboard navigation' })
    );
    await userEvent.click(panel.getByText('Production'));
    expect(canvas.getByText('Production · tonnes per hour')).toBeVisible();
  },
};

export const DashboardWithPanelTabs: Story = {
  parameters: { order: 4, name: panelTabs.name },
  render: () => <DashboardLayout layout={panelTabs.id} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('tab', { name: dashboardTabs[0] })).toBeVisible();
    expect(
      canvas.getByRole('complementary', { name: 'Dashboard navigation' })
    ).toBeVisible();
  },
};

export const DashboardWithGridHeader: Story = {
  parameters: { order: 5, name: gridHeader.name },
  render: () => <DashboardLayout layout={gridHeader.id} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('table', { name: 'Work orders' })).toBeVisible();
    expect(
      canvas.getByRole('checkbox', { name: `Select ${firstOrder.name}` })
    ).toBeVisible();
  },
};

export const DashboardWithGridTabs: Story = {
  parameters: { order: 6, name: gridTabs.name },
  render: () => <DashboardLayout layout={gridTabs.id} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('tab', { name: dashboardTabs[2] })).toBeVisible();
    expect(canvas.getByRole('table', { name: 'Work orders' })).toBeVisible();
  },
};

export const DashboardWithPreviewHeader: Story = {
  parameters: { order: 7, name: previewHeader.name },
  render: () => <DashboardLayout layout={previewHeader.id} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.queryByRole('complementary', { name: 'Preview' })).toBeNull();
    const table = within(canvas.getByRole('table', { name: 'Work orders' }));
    await userEvent.click(table.getByText(firstOrder.name));
    const preview = within(
      canvas.getByRole('complementary', { name: 'Preview' })
    );
    expect(
      preview.getByRole('heading', { name: firstOrder.name })
    ).toBeVisible();
    await userEvent.click(table.getByText(firstOrder.name));
    expect(canvas.queryByRole('complementary', { name: 'Preview' })).toBeNull();
  },
};

export const DashboardWithPreviewTabs: Story = {
  parameters: { order: 8, name: previewTabs.name },
  render: () => <DashboardLayout layout={previewTabs.id} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.queryByRole('checkbox', { name: /Select / })).toBeNull();
    expect(canvas.getByRole('tab', { name: dashboardTabs[0] })).toBeVisible();
  },
};
