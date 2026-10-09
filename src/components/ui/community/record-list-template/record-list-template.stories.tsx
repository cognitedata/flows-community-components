import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { RecordListTemplate } from './record-list-template';
import {
  recordListLayouts,
  recordListPageTitle,
  recordListTabs,
} from './record-list-template.data';

const meta: Meta<typeof RecordListTemplate> = {
  title: 'Community/Record list',
  component: RecordListTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof RecordListTemplate>;

const [
  fullWidthHeader,
  fullWidthTabs,
  leftPanelHeader,
  leftPanelTabs,
  rightPanelHeader,
  rightPanelTabs,
] = recordListLayouts;

export const FullWidthGridHeader: Story = {
  parameters: { order: 1, name: fullWidthHeader.name },
  render: () => <RecordListTemplate layout={fullWidthHeader.id} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByRole('heading', { name: recordListPageTitle })
    ).toBeVisible();
    expect(canvas.getByRole('table', { name: 'Record list' })).toBeVisible();
    expect(canvas.getByText('Charge pump P-101A')).toBeVisible();
    expect(canvas.getByText('Alarm')).toBeVisible();

    await userEvent.click(
      canvas.getByRole('checkbox', { name: 'Select all rows' })
    );
    expect(
      canvas.getByRole('checkbox', { name: 'Select row 1' })
    ).toBeChecked();
    await waitFor(() => expect(canvas.getByRole('toolbar')).toBeVisible(), {
      timeout: 1000,
    });
    expect(within(canvas.getByRole('toolbar')).getByText('5')).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: 'Clear' }));
    expect(
      canvas.getByRole('checkbox', { name: 'Select row 1' })
    ).not.toBeChecked();

    await userEvent.click(canvas.getByRole('tab', { name: 'Cards' }));
    expect(
      canvas.getByRole('heading', { name: recordListPageTitle })
    ).toBeVisible();
    expect(
      within(canvas.getByRole('list', { name: 'Assets' })).getAllByRole(
        'heading'
      )
    ).toHaveLength(5);
    expect(canvas.queryByRole('table', { name: 'Record list' })).toBeNull();
  },
};

export const FullWidthGridTabs: Story = {
  parameters: { order: 2, name: fullWidthTabs.name },
  render: () => <RecordListTemplate layout={fullWidthTabs.id} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tab = canvas.getByRole('tab', { name: recordListTabs[1] });

    await userEvent.click(tab);
    expect(tab).toHaveAttribute('aria-selected', 'true');
    expect(
      canvas.queryByRole('heading', { name: recordListPageTitle })
    ).toBeNull();

    await userEvent.click(canvas.getByRole('tab', { name: 'Cards' }));
    expect(tab).toHaveAttribute('aria-selected', 'true');
    expect(
      canvas.queryByRole('heading', { name: recordListPageTitle })
    ).toBeNull();
    expect(
      within(canvas.getByRole('list', { name: 'Assets' })).getAllByRole(
        'heading'
      )
    ).toHaveLength(5);
  },
};

export const LeftPanelGridHeader: Story = {
  parameters: { order: 3, name: leftPanelHeader.name },
  render: () => <RecordListTemplate layout={leftPanelHeader.id} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const panel = within(
      canvas.getByRole('complementary', { name: 'Equipment' })
    );

    expect(panel.getAllByRole('button')).toHaveLength(7);
    expect(canvas.getAllByRole('row')).toHaveLength(6);

    await userEvent.click(panel.getByRole('button', { name: 'Hydrotreater' }));
    expect(panel.getByRole('button', { name: 'Hydrotreater' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(canvas.getAllByRole('row')).toHaveLength(3);

    await userEvent.click(canvas.getByRole('tab', { name: 'Cards' }));
    expect(
      canvas.getByRole('complementary', { name: 'Equipment' })
    ).toBeVisible();
    expect(
      canvas.getByRole('heading', { name: recordListPageTitle })
    ).toBeVisible();
    expect(
      within(canvas.getByRole('list', { name: 'Assets' })).getAllByRole(
        'heading'
      )
    ).toHaveLength(2);
    expect(canvas.queryByRole('table', { name: 'Record list' })).toBeNull();
  },
};

export const LeftPanelGridTabs: Story = {
  parameters: { order: 4, name: leftPanelTabs.name },
  render: () => <RecordListTemplate layout={leftPanelTabs.id} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tab = canvas.getByRole('tab', { name: recordListTabs[2] });

    await userEvent.click(tab);
    expect(tab).toHaveAttribute('aria-selected', 'true');
    expect(
      canvas.getByRole('complementary', { name: 'Equipment' })
    ).toBeVisible();

    await userEvent.click(canvas.getByRole('tab', { name: 'Cards' }));
    expect(tab).toHaveAttribute('aria-selected', 'true');
    expect(
      canvas.getByRole('complementary', { name: 'Equipment' })
    ).toBeVisible();
    expect(
      canvas.queryByRole('heading', { name: recordListPageTitle })
    ).toBeNull();
    expect(
      within(canvas.getByRole('list', { name: 'Assets' })).getAllByRole(
        'heading'
      )
    ).toHaveLength(5);
  },
};

export const RightPanelGridHeader: Story = {
  parameters: { order: 5, name: rightPanelHeader.name },
  render: () => <RecordListTemplate layout={rightPanelHeader.id} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.queryByRole('checkbox', { name: 'Select all rows' })
    ).toBeNull();
    expect(
      canvas.getByRole('complementary', { name: 'Preview' })
    ).toBeVisible();
    expect(
      canvas.getByRole('heading', { name: 'Charge pump P-101A' })
    ).toBeVisible();

    await userEvent.click(canvas.getAllByRole('row')[2]);
    expect(
      canvas.getByRole('heading', { name: 'Overhead condenser E-102' })
    ).toBeVisible();

    await userEvent.click(canvas.getAllByRole('row')[2]);
    expect(canvas.queryByRole('complementary', { name: 'Preview' })).toBeNull();

    await userEvent.click(canvas.getAllByRole('row')[3]);
    expect(
      canvas.getByRole('heading', { name: 'Reflux drum V-103' })
    ).toBeVisible();

    await userEvent.click(canvas.getByRole('tab', { name: 'Cards' }));
    expect(
      canvas.getByRole('complementary', { name: 'Preview' })
    ).toBeVisible();
    expect(
      canvas.getByRole('heading', { name: recordListPageTitle })
    ).toBeVisible();
    expect(
      canvas.getByRole('heading', { name: 'Reflux drum V-103' })
    ).toBeVisible();
    expect(
      within(canvas.getByRole('list', { name: 'Assets' })).getAllByRole(
        'heading'
      )
    ).toHaveLength(5);
  },
};

export const RightPanelGridTabs: Story = {
  parameters: { order: 6, name: rightPanelTabs.name },
  render: () => <RecordListTemplate layout={rightPanelTabs.id} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tab = canvas.getByRole('tab', { name: recordListTabs[3] });

    await userEvent.click(tab);
    expect(tab).toHaveAttribute('aria-selected', 'true');
    expect(
      canvas.getByRole('heading', { name: 'Charge pump P-101A' })
    ).toBeVisible();

    await userEvent.click(canvas.getAllByRole('row')[2]);
    expect(
      canvas.getByRole('heading', { name: 'Overhead condenser E-102' })
    ).toBeVisible();

    await userEvent.click(canvas.getByRole('tab', { name: 'Cards' }));
    expect(tab).toHaveAttribute('aria-selected', 'true');
    expect(
      canvas.getByRole('complementary', { name: 'Preview' })
    ).toBeVisible();
    expect(
      canvas.getByRole('heading', { name: 'Overhead condenser E-102' })
    ).toBeVisible();
    expect(
      canvas.queryByRole('heading', { name: recordListPageTitle })
    ).toBeNull();
    expect(
      within(canvas.getByRole('list', { name: 'Assets' })).getAllByRole(
        'heading'
      )
    ).toHaveLength(5);
  },
};
