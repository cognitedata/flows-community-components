import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { MapLayoutTemplate } from './map-layout-template';
import { mapLayouts, mapSiteRows } from './map-layout-template.data';

const meta: Meta<typeof MapLayoutTemplate> = {
  title: 'Community/Map layout',
  component: MapLayoutTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof MapLayoutTemplate>;

const [leftRightPanels, rightPanel, gridRightPanel, gridFullWidth] = mapLayouts;

export const LeftPanelMapRightPanel: Story = {
  parameters: { order: 1, name: leftRightPanels.name },
  render: () => <MapLayoutTemplate layout={leftRightPanels.id} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const layers = canvas.getByLabelText('Layers');
    expect(layers).toBeVisible();
    expect(canvas.getByLabelText('Search layers')).toBeVisible();
    expect(canvas.queryByLabelText('Preview')).not.toBeInTheDocument();

    await userEvent.click(within(layers).getByText('Pumps'));
    expect(
      within(canvas.getByLabelText('Preview')).getByText('Pumps')
    ).toBeVisible();

    await userEvent.click(within(layers).getByText('Pumps'));
    expect(canvas.queryByLabelText('Preview')).not.toBeInTheDocument();

    const pumpCheckbox = canvas.getByRole('checkbox', {
      name: 'Select Pumps',
    });
    expect(pumpCheckbox).toBeChecked();
    await userEvent.click(pumpCheckbox);
    expect(pumpCheckbox).not.toBeChecked();
  },
};

export const MapWithRightPanel: Story = {
  parameters: { order: 2, name: rightPanel.name },
  render: () => <MapLayoutTemplate layout={rightPanel.id} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.queryByLabelText('Layers')).not.toBeInTheDocument();
    expect(canvas.queryByLabelText('Preview')).not.toBeInTheDocument();

    const marker = canvas.getByRole('button', { name: mapSiteRows[0].name });
    await userEvent.click(marker);
    expect(
      within(canvas.getByLabelText('Preview')).getByText('View details')
    ).toBeVisible();

    await userEvent.click(marker);
    expect(canvas.queryByLabelText('Preview')).not.toBeInTheDocument();
  },
};

export const HorizontalSplitGridPanel: Story = {
  parameters: { order: 3, name: gridRightPanel.name },
  render: () => <MapLayoutTemplate layout={gridRightPanel.id} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const table = canvas.getByRole('table', { name: 'Sites' });
    expect(table).toBeVisible();
    expect(canvas.queryByLabelText('Preview')).not.toBeInTheDocument();

    await userEvent.click(within(table).getByText(mapSiteRows[0].name));
    expect(
      within(canvas.getByLabelText('Preview')).getByText(mapSiteRows[0].name)
    ).toBeVisible();

    await userEvent.click(within(table).getByText(mapSiteRows[0].name));
    expect(canvas.queryByLabelText('Preview')).not.toBeInTheDocument();

    const selectAll = canvas.getByRole('checkbox', {
      name: 'Select all rows',
    });
    await userEvent.click(selectAll);
    expect(
      canvas.getByRole('checkbox', { name: `Select ${mapSiteRows[0].name}` })
    ).toBeChecked();
  },
};

export const HorizontalSplitFullWidth: Story = {
  parameters: { order: 4, name: gridFullWidth.name },
  render: () => <MapLayoutTemplate layout={gridFullWidth.id} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const table = canvas.getByRole('table', { name: 'Sites' });
    expect(table).toBeVisible();
    expect(canvas.queryByLabelText('Preview')).not.toBeInTheDocument();
    expect(within(table).getByText(mapSiteRows[0].name)).toBeVisible();
  },
};
