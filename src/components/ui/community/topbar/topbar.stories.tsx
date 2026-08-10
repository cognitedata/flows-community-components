import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
} from '@cognite/aura/components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconHomeFilled,
  IconLayoutSidebar,
  IconPlus,
  IconShare,
} from '@tabler/icons-react';
import { expect, within } from 'storybook/test';

import {
  Topbar,
  TopbarAction,
  TopbarBreadcrumbs,
  TopbarCenter,
  TopbarLeft,
  TopbarRight,
} from './topbar';

const meta: Meta<typeof Topbar> = {
  title: 'Community/Topbar',
  component: Topbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Topbar>;

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole('button', { name: /toggle sidebar/i })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: /new item/i })
    ).toBeInTheDocument();
  },
  render: () => {
    return (
      <Topbar>
        <TopbarLeft>
          <Button variant="ghost" size="icon-sm" aria-label="Toggle sidebar">
            <IconLayoutSidebar className="h-4.5 w-4.5" />
          </Button>
          <TopbarBreadcrumbs>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" aria-label="Go to home">
                  <IconHomeFilled className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Projects</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </TopbarBreadcrumbs>
        </TopbarLeft>
        <TopbarCenter>
          <div className="text-sm font-medium">Project Dashboard</div>
        </TopbarCenter>
        <TopbarRight>
          <TopbarAction size="sm">
            <IconPlus />
            New item
          </TopbarAction>
          <TopbarAction variant="ghost" size="icon-sm" aria-label="Share">
            <IconShare className="h-4 w-4" />
          </TopbarAction>
        </TopbarRight>
      </Topbar>
    );
  },
};

export const Minimal: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole('link', { name: /go to home/i })
    ).toBeInTheDocument();
    await expect(canvas.getByText('Home')).toBeInTheDocument();
  },
  render: () => {
    return (
      <Topbar>
        <TopbarLeft>
          <TopbarBreadcrumbs>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" aria-label="Go to home">
                  <IconHomeFilled className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Home</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </TopbarBreadcrumbs>
        </TopbarLeft>
      </Topbar>
    );
  },
};
