import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';
import {
  IconChevronRight,
  IconCircleArrowDown,
  IconHome,
  IconPencil,
  IconTag,
  IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbEllipsisButton,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbPageButton,
  BreadcrumbSeparator,
} from './breadcrumb';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/aura/dropdown-menu';
const meta: Meta<typeof Breadcrumb> = {
  title: 'Primitives/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      table: {
        category: 'Display',
      },
    },
    children: {
      control: false,
      table: {
        category: 'Display',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<typeof Breadcrumb>;
export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation');
    await expect(nav).toBeInTheDocument();
    const homeLink = canvas.getByText('Home');
    await expect(homeLink).toBeInTheDocument();
    await expect(homeLink).toHaveAttribute('href', '/');
    const projectsLink = canvas.getByText('Projects');
    await expect(projectsLink).toBeInTheDocument();
    const currentPage = canvas.getByText('Project Alpha');
    await expect(currentPage).toBeInTheDocument();
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Project Alpha</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
export const CurrentPageLinked: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const homeLink = canvas.getByText('Home');
    await expect(homeLink).toHaveAttribute('href', '/');
    const projectsLink = canvas.getByText('Projects');
    await expect(projectsLink).toHaveAttribute('href', '/projects');
    const currentPageLink = canvas.getByText('Project Alpha');
    await expect(currentPageLink).toHaveAttribute('href', '/projects/alpha');
    await expect(currentPageLink).toHaveAttribute('aria-current', 'page');
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage href="/projects/alpha">Project Alpha</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
export const WithEllipsisDropdown: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation');
    await expect(nav).toBeInTheDocument();
    const homeLink = canvas.getByText('Home');
    await expect(homeLink).toHaveAttribute('href', '/');
    const canvasLink = canvas.getByText('Canvas');
    await expect(canvasLink).toHaveAttribute('href', '/canvas');
    const ellipsisButton = canvasElement.querySelector('[data-slot="breadcrumb-ellipsis"] button');
    await expect(ellipsisButton).toBeInTheDocument();
    const currentPage = canvas.getByText('Test canvas');
    await expect(currentPage).toBeInTheDocument();
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbEllipsis>
          <DropdownMenu>
            <DropdownMenuTrigger render={<BreadcrumbEllipsisButton />} />
            <DropdownMenuContent align="start">
              <DropdownMenuItem render={<a href="/projects">Projects</a>} />
              <DropdownMenuItem render={<a href="/teams">Teams</a>} />
              <DropdownMenuItem render={<a href="/workspaces">Workspaces</a>} />
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbEllipsis>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/canvas">Canvas</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Test canvas</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
export const StaticEllipsis: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation');
    await expect(nav).toBeInTheDocument();
    const list = canvas.getByRole('list');
    await expect(list).toBeInTheDocument();
    const homeLink = canvas.getByText('Home');
    await expect(homeLink).toHaveAttribute('href', '/');
    const currentFolder = canvas.getByText('Current Folder');
    await expect(currentFolder).toBeInTheDocument();
    const currentPage = canvas.getByText('Document.pdf');
    await expect(currentPage).toBeInTheDocument();
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbEllipsis />
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/current">Current Folder</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Document.pdf</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
export const WithPageActions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation');
    await expect(nav).toBeInTheDocument();
    const homeLink = canvas.getByText('Home');
    await expect(homeLink).toHaveAttribute('href', '/');
    const canvasLink = canvas.getByText('Canvas');
    await expect(canvasLink).toHaveAttribute('href', '/canvas');
    const pageButton = canvas.getByText('Test canvas').closest('button');
    await expect(pageButton).toBeInTheDocument();
    await expect(pageButton).toHaveAttribute('aria-current', 'page');
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/canvas">Canvas</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<BreadcrumbPageButton>Test canvas</BreadcrumbPageButton>}
            />
            <DropdownMenuContent align="start" className="w-[280px] p-0">
              <div className="p-1">
                <DropdownMenuItem className="p-2">
                  <IconPencil /> Rename
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2">
                  <IconTag /> Add tags
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2">
                  <IconCircleArrowDown /> Download as PDF
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" className="p-2">
                  <IconTrash />
                  Delete
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
export const Short: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation');
    await expect(nav).toBeInTheDocument();
    const homeLink = canvas.getByText('Home');
    await expect(homeLink).toHaveAttribute('href', '/');
    const currentPage = canvas.getByText('Dashboard');
    await expect(currentPage).toBeInTheDocument();
    await expect(currentPage).toHaveAttribute('aria-current', 'page');
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Dashboard</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
export const LongPath: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const homeLink = canvas.getByText('Home');
    await expect(homeLink).toHaveAttribute('href', '/');
    const orgLink = canvas.getByText('Organization');
    await expect(orgLink).toHaveAttribute('href', '/organization');
    const teamsLink = canvas.getByText('Teams');
    await expect(teamsLink).toHaveAttribute('href', '/organization/teams');
    const engineeringLink = canvas.getByText('Engineering');
    await expect(engineeringLink).toHaveAttribute('href', '/organization/teams/engineering');
    const projectsLink = canvas.getByText('Projects');
    await expect(projectsLink).toHaveAttribute('href', '/organization/teams/engineering/projects');
    const currentPage = canvas.getByText('Q1 2024 Planning');
    await expect(currentPage).toBeInTheDocument();
    await expect(currentPage).toHaveAttribute('aria-current', 'page');
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/organization">Organization</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/organization/teams">Teams</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/organization/teams/engineering">Engineering</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/organization/teams/engineering/projects">Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Q1 2024 Planning</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
export const CustomSeparator: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation');
    await expect(nav).toBeInTheDocument();
    const homeLink = canvas.getByText('Home');
    await expect(homeLink).toHaveAttribute('href', '/');
    const projectsLink = canvas.getByText('Projects');
    await expect(projectsLink).toHaveAttribute('href', '/projects');
    const currentPage = canvas.getByText('Project Alpha');
    await expect(currentPage).toBeInTheDocument();
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <IconChevronRight className="size-4 text-muted-foreground" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <IconChevronRight className="size-4 text-muted-foreground" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Project Alpha</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
export const WithIcon: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation');
    await expect(nav).toBeInTheDocument();
    const homeLink = canvas.getByText('Home');
    await expect(homeLink).toHaveAttribute('href', '/');
    const settingsLink = canvas.getByText('Settings');
    await expect(settingsLink).toHaveAttribute('href', '/settings');
    const currentPage = canvas.getByText('Profile');
    await expect(currentPage).toBeInTheDocument();
    await expect(currentPage).toHaveAttribute('aria-current', 'page');
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-1">
            <IconHome className="size-4" />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/settings">Settings</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Profile</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation');
    await expect(nav).toBeInTheDocument();
    const navLinks = within(nav).getAllByRole('link');
    await expect(navLinks.length).toBeGreaterThan(0);
    const buttons = canvas.getAllByRole('button');
    const settingsButton = buttons.find((btn) => btn.textContent?.includes('Settings'));
    if (settingsButton) {
      await userEvent.click(settingsButton);
    }
    await waitFor(() => {
      const updatedLinks = within(nav).queryAllByRole('link');
      expect(updatedLinks.length).toBeGreaterThanOrEqual(1);
    });
  },
  render: function InteractiveBreadcrumb() {
    const [path, setPath] = useState(['Home', 'Projects', 'Project Alpha']);
    const handleNavigate = (index: number) => {
      setPath(path.slice(0, index + 1));
    };
    const navigationOptions = [
      {
        label: 'Home',
        path: ['Home'],
      },
      {
        label: 'Projects',
        path: ['Home', 'Projects'],
      },
      {
        label: 'Project Alpha',
        path: ['Home', 'Projects', 'Project Alpha'],
      },
      {
        label: 'Settings',
        path: ['Home', 'Settings'],
      },
      {
        label: 'Profile',
        path: ['Home', 'Settings', 'Profile'],
      },
      {
        label: 'Teams',
        path: ['Home', 'Teams'],
      },
      {
        label: 'Engineering',
        path: ['Home', 'Teams', 'Engineering'],
      },
      {
        label: 'Deep Path',
        path: ['Home', 'Organization', 'Teams', 'Engineering', 'Projects'],
      },
    ];
    return (
      <div className="flex flex-col gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            {path.map((item, index) => (
              <div key={item} className="contents">
                <BreadcrumbItem>
                  {index === path.length - 1 ? (
                    <BreadcrumbPage>{item}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigate(index);
                      }}
                    >
                      {item}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < path.length - 1 && <BreadcrumbSeparator />}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          <p className="text-xs text-muted-foreground w-full mb-1">Navigate to:</p>
          {navigationOptions.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => setPath(option.path)}
              className="text-xs px-2 py-1 rounded border hover:bg-accent"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  },
};
export const StyleComparison: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const interactiveLink = canvas.getByText('Hover me');
    await expect(interactiveLink).toHaveAttribute('href', '/test');
    const nonInteractivePage = canvas.getByText('Try hovering');
    await expect(nonInteractivePage).toBeInTheDocument();
    await expect(nonInteractivePage).toHaveAttribute('aria-current', 'page');
    const testCanvasElements = canvas.getAllByText('Test canvas');
    const dropdownButton = testCanvasElements[0]?.closest('button');
    await expect(dropdownButton).toBeInTheDocument();
    await expect(dropdownButton).toHaveAttribute('aria-current', 'page');
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-xs text-muted-foreground mb-2">
          BreadcrumbLink - Interactive with hover states
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/test">Hover me</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div>
        <div className="text-xs text-muted-foreground mb-2">
          BreadcrumbPage - Non-interactive, no hover state
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Try hovering</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div>
        <div className="text-xs text-muted-foreground mb-2">
          BreadcrumbPageButton - Interactive button for current page
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/canvas">Canvas</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<BreadcrumbPageButton>Test canvas</BreadcrumbPageButton>}
                />
                <DropdownMenuContent align="start" className="w-[280px] p-0">
                  <div className="p-1">
                    <DropdownMenuItem className="p-2">
                      <IconPencil /> Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-2">
                      <IconTag /> Add tags
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" className="p-2">
                      <IconTrash />
                      Delete
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  ),
};
export const ConstrainedContainer: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation');
    await expect(nav).toBeInTheDocument();
    const homeLink = canvas.getByText('Home');
    await expect(homeLink).toHaveAttribute('href', '/');
    const projectsLink = canvas.getByText('Projects');
    await expect(projectsLink).toHaveAttribute('href', '/projects');
    const designLink = canvas.getByText('Design System');
    await expect(designLink).toHaveAttribute('href', '/projects/design');
    const currentPage = canvas.getByText('Components Library');
    await expect(currentPage).toBeInTheDocument();
  },
  render: () => (
    <div className="w-[300px] border border-muted-foreground/20 p-4 rounded">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/projects/design">Design System</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Components Library</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
};
export const LongItemNames: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const homeLink = canvas.getByText('Home');
    await expect(homeLink).toBeInTheDocument();
    const longLink = canvas.getByText('Department of Engineering and Technology Services');
    await expect(longLink).toHaveAttribute('href', '/department');
    const longPage = canvas.getByText('Enterprise Resource Planning System Implementation Project');
    await expect(longPage).toBeInTheDocument();
    await expect(longPage).toHaveAttribute('aria-current', 'page');
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/department">
            Department of Engineering and Technology Services
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            Enterprise Resource Planning System Implementation Project
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
export const ManyItems: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const homeLink = canvas.getByText('Home');
    await expect(homeLink).toHaveAttribute('href', '/');
    const level1 = canvas.getByText('Level 1');
    await expect(level1).toHaveAttribute('href', '/level1');
    const level7 = canvas.getByText('Level 7');
    await expect(level7).toHaveAttribute('href', '/level7');
    const currentPage = canvas.getByText('Level 8');
    await expect(currentPage).toBeInTheDocument();
    await expect(currentPage).toHaveAttribute('aria-current', 'page');
    const allLinks = canvas.getAllByRole('link');
    await expect(allLinks.length).toBe(9);
  },
  render: () => (
    <div className="w-[500px]">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/level1">Level 1</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/level2">Level 2</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/level3">Level 3</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/level4">Level 4</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/level5">Level 5</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/level6">Level 6</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/level7">Level 7</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Level 8</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
};
export const SingleItem: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation');
    await expect(nav).toBeInTheDocument();
    const homePage = canvas.getByText('Home');
    await expect(homePage).toBeInTheDocument();
    await expect(homePage).toHaveAttribute('aria-current', 'page');
    await expect(homePage.tagName).not.toBe('A');
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>Home</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
export const Empty: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation');
    await expect(nav).toBeInTheDocument();
    const list = canvas.getByRole('list');
    await expect(list).toBeInTheDocument();
    const links = canvas.queryAllByRole('link');
    await expect(links.length).toBe(0);
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList />
    </Breadcrumb>
  ),
};
export const SmallContainerManyLongItems: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation');
    await expect(nav).toBeInTheDocument();
    const homeLink = canvas.getByText('Home');
    await expect(homeLink).toHaveAttribute('href', '/');
    const ellipsisButton = canvasElement.querySelector('[data-slot="breadcrumb-ellipsis"] button');
    await expect(ellipsisButton).toBeInTheDocument();
    const longLink = canvas.getByText('Frontend Development Team');
    await expect(longLink).toHaveAttribute('href', '/team');
    const currentPage = canvas.getByText('Component Library Documentation');
    await expect(currentPage).toBeInTheDocument();
    await expect(currentPage).toHaveAttribute('aria-current', 'page');
  },
  render: () => (
    <div className="w-[250px] border border-muted-foreground/20 p-3 rounded">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbEllipsis>
            <DropdownMenu>
              <DropdownMenuTrigger render={<BreadcrumbEllipsisButton />} />
              <DropdownMenuContent>
                <DropdownMenuItem render={<a href="/organization">Organization Management</a>} />
                <DropdownMenuItem render={<a href="/department">Engineering Department</a>} />
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbEllipsis>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/team">Frontend Development Team</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Component Library Documentation</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
};
