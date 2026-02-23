import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconChevronRight,
  IconCircleArrowDown,
  IconHome,
  IconPencil,
  IconTag,
  IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

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
  parameters: {
    order: 1,
    docs: {
      description: {
        story: "Basic breadcrumb navigation showing a simple path with links and separators.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation");
    await expect(nav).toBeInTheDocument();
    const homeLink = canvas.getByText("Home");
    await expect(homeLink).toBeInTheDocument();
    await expect(homeLink).toHaveAttribute('href', '/');
    const projectsLink = canvas.getByText('Projects');
    await expect(projectsLink).toBeInTheDocument();
    const currentPage = canvas.getByText("Project Alpha");
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
  parameters: {
    order: 2,
    docs: {
      description: {
        story:
          'Current page can be a link by adding href to BreadcrumbPage. aria-current="page" is automatically added for accessibility.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const homeLink = canvas.getByText("Home");
    await expect(homeLink).toHaveAttribute("href", "/");

    const projectsLink = canvas.getByText("Projects");
    await expect(projectsLink).toHaveAttribute("href", "/projects");
    const currentPageLink = canvas.getByText("Project Alpha");
    await expect(currentPageLink).toHaveAttribute("href", "/projects/alpha");
    await expect(currentPageLink).toHaveAttribute("aria-current", "page");
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
  parameters: {
    order: 3,
    docs: {
      description: {
        story:
          "Breadcrumb with an ellipsis dropdown showing hidden navigation items. Click the ellipsis to reveal intermediate paths.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation");
    await expect(nav).toBeInTheDocument();
    const homeLink = canvas.getByText("Home");
    await expect(homeLink).toHaveAttribute("href", "/");

    const canvasLink = canvas.getByText("Canvas");
    await expect(canvasLink).toHaveAttribute("href", "/canvas");
    const ellipsisButton = canvasElement.querySelector('[data-slot="breadcrumb-ellipsis"] button');
    await expect(ellipsisButton).toBeInTheDocument();
    const currentPage = canvas.getByText("Test canvas");
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
  parameters: {
    order: 4,
    docs: {
      description: {
        story: "Breadcrumb with a static ellipsis indicator (not interactive).",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation");
    await expect(nav).toBeInTheDocument();
    const list = canvas.getByRole("list");
    await expect(list).toBeInTheDocument();
    const homeLink = canvas.getByText("Home");
    await expect(homeLink).toHaveAttribute("href", "/");

    const currentFolder = canvas.getByText("Current Folder");
    await expect(currentFolder).toBeInTheDocument();
    const currentPage = canvas.getByText("Document.pdf");
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
  parameters: {
    order: 5,
    docs: {
      description: {
        story:
          "Breadcrumb with an action dropdown on the current page. Click the current page to reveal available actions.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation");
    await expect(nav).toBeInTheDocument();
    const homeLink = canvas.getByText("Home");
    await expect(homeLink).toHaveAttribute("href", "/");

    const canvasLink = canvas.getByText("Canvas");
    await expect(canvasLink).toHaveAttribute("href", "/canvas");
    const pageButton = canvas.getByText("Test canvas").closest("button");
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
            <DropdownMenuContent align="start" className="w-72 p-0">
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

/**
 * Screenshot-matched breadcrumb example with overflow and page actions
 */
export const CanvasPageActionsWithOverflow: Story = {
  parameters: {
    order: 6,
    docs: {
      description: {
        story:
          "Breadcrumb example matching the canvas UI pattern: Home / ... / Canvas / Test canvas with actions on the current page.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const homeLink = canvas.getByText("Home");
    await expect(homeLink).toHaveAttribute("href", "/");

    const canvasLink = canvas.getByText("Canvas");
    await expect(canvasLink).toHaveAttribute("href", "/canvas");

    const currentPageButton = canvas.getByRole("button", { name: "Test canvas" });
    await expect(currentPageButton).toBeInTheDocument();
    await expect(currentPageButton).toHaveAttribute("aria-current", "page");
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
          <BreadcrumbLink href="/canvas">Canvas</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<BreadcrumbPageButton>Test canvas</BreadcrumbPageButton>}
            />
            <DropdownMenuContent align="start" className="w-72 p-0">
              <div className="p-1">
                <DropdownMenuItem className="p-2">
                  <IconPencil />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2">
                  <IconTag />
                  Add tags
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2">
                  <IconCircleArrowDown />
                  Download as PDF
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

/**
 * Short breadcrumb with only two levels
 */
export const Short: Story = {
  parameters: {
    order: 7,
    docs: {
      description: {
        story: "Minimal breadcrumb with just home and current page.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation");
    await expect(nav).toBeInTheDocument();
    const homeLink = canvas.getByText("Home");
    await expect(homeLink).toHaveAttribute("href", "/");
    const currentPage = canvas.getByText("Dashboard");
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
  parameters: {
    order: 8,
    docs: {
      description: {
        story: "Breadcrumb showing a deep navigation path with multiple levels.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const homeLink = canvas.getByText("Home");
    await expect(homeLink).toHaveAttribute("href", "/");

    const orgLink = canvas.getByText("Organization");
    await expect(orgLink).toHaveAttribute("href", "/organization");

    const teamsLink = canvas.getByText("Teams");
    await expect(teamsLink).toHaveAttribute("href", "/organization/teams");

    const engineeringLink = canvas.getByText("Engineering");
    await expect(engineeringLink).toHaveAttribute("href", "/organization/teams/engineering");

    const projectsLink = canvas.getByText("Projects");
    await expect(projectsLink).toHaveAttribute("href", "/organization/teams/engineering/projects");
    const currentPage = canvas.getByText("Q1 2024 Planning");
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
          <BreadcrumbLink href="/organization/teams/engineering">
            Engineering
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/organization/teams/engineering/projects">
            Projects
          </BreadcrumbLink>
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
  parameters: {
    order: 9,
    docs: {
      description: {
        story: "Breadcrumb using a custom chevron icon as separator.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation");
    await expect(nav).toBeInTheDocument();
    const homeLink = canvas.getByText("Home");
    await expect(homeLink).toHaveAttribute("href", "/");

    const projectsLink = canvas.getByText("Projects");
    await expect(projectsLink).toHaveAttribute("href", "/projects");
    const currentPage = canvas.getByText("Project Alpha");
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
  parameters: {
    order: 10,
    docs: {
      description: {
        story: "Breadcrumb with a home icon in the first item.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation");
    await expect(nav).toBeInTheDocument();
    const homeLink = canvas.getByText("Home");
    await expect(homeLink).toHaveAttribute("href", "/");
    const settingsLink = canvas.getByText("Settings");
    await expect(settingsLink).toHaveAttribute("href", "/settings");
    const currentPage = canvas.getByText("Profile");
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
  parameters: {
    order: 11,
    docs: {
      description: {
        story:
          "Interactive breadcrumb demo. Click breadcrumb links to navigate backwards, or use the buttons below to navigate to different sections and watch the breadcrumb update.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation");
    await expect(nav).toBeInTheDocument();
    const navLinks = within(nav).getAllByRole("link");
    await expect(navLinks.length).toBeGreaterThan(0);
    const buttons = canvas.getAllByRole("button");
    const settingsButton = buttons.find((btn) => btn.textContent?.includes("Settings"));
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
          <p className="text-xs text-muted-foreground w-full mb-1">
            Navigate to:
          </p>
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
  parameters: {
    order: 12,
    docs: {
      description: {
        story:
          "Visual comparison showing BreadcrumbLink (interactive) vs BreadcrumbPage (non-interactive) vs BreadcrumbPage in button wrapper (button interactive).",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const interactiveLink = canvas.getByText("Hover me");
    await expect(interactiveLink).toHaveAttribute("href", "/test");
    const nonInteractivePage = canvas.getByText("Try hovering");
    await expect(nonInteractivePage).toBeInTheDocument();
    await expect(nonInteractivePage).toHaveAttribute("aria-current", "page");
    const testCanvasElements = canvas.getAllByText("Test canvas");
    const dropdownButton = testCanvasElements[0]?.closest("button");
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
                  render={
                    <BreadcrumbPageButton>Test canvas</BreadcrumbPageButton>
                  }
                />
                <DropdownMenuContent align="start" className="w-72 p-0">
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
  parameters: {
    order: 13,
    docs: {
      description: {
        story: "Tests how breadcrumb wraps and behaves in a small container with a grey border.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation");
    await expect(nav).toBeInTheDocument();
    const homeLink = canvas.getByText("Home");
    await expect(homeLink).toHaveAttribute("href", "/");

    const projectsLink = canvas.getByText("Projects");
    await expect(projectsLink).toHaveAttribute("href", "/projects");

    const designLink = canvas.getByText("Design System");
    await expect(designLink).toHaveAttribute("href", "/projects/design");
    const currentPage = canvas.getByText("Components Library");
    await expect(currentPage).toBeInTheDocument();
  },
  render: () => (
    <div className="w-80 border border-muted-foreground/20 p-4 rounded">
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
            <BreadcrumbLink href="/projects/design">
              Design System
            </BreadcrumbLink>
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
  parameters: {
    order: 14,
    docs: {
      description: {
        story: "Tests breadcrumb with very long item names to see how text overflow is handled.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const homeLink = canvas.getByText("Home");
    await expect(homeLink).toBeInTheDocument();
    const longLink = canvas.getByText(
      'Department of Engineering and Technology Services'
    );
    await expect(longLink).toHaveAttribute('href', '/department');
    const longPage = canvas.getByText(
      'Enterprise Resource Planning System Implementation Project'
    );
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
  parameters: {
    order: 15,
    docs: {
      description: {
        story: "Tests breadcrumb with many items to see wrapping behavior across multiple lines.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const homeLink = canvas.getByText("Home");
    await expect(homeLink).toHaveAttribute("href", "/");

    const level1 = canvas.getByText("Level 1");
    await expect(level1).toHaveAttribute("href", "/level1");

    const level7 = canvas.getByText("Level 7");
    await expect(level7).toHaveAttribute("href", "/level7");
    const currentPage = canvas.getByText("Level 8");
    await expect(currentPage).toBeInTheDocument();
    await expect(currentPage).toHaveAttribute("aria-current", "page");
    const allLinks = canvas.getAllByRole("link");
    await expect(allLinks.length).toBe(9);
  },
  render: () => (
    <div className="w-full max-w-lg">
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
  parameters: {
    order: 16,
    docs: {
      description: {
        story: "Edge case with only a single breadcrumb item (just home).",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation");
    await expect(nav).toBeInTheDocument();
    const homePage = canvas.getByText("Home");
    await expect(homePage).toBeInTheDocument();
    await expect(homePage).toHaveAttribute("aria-current", "page");
    await expect(homePage.tagName).not.toBe("A");
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
  parameters: {
    order: 17,
    docs: {
      description: {
        story: "Edge case with an empty breadcrumb list.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation");
    await expect(nav).toBeInTheDocument();
    const list = canvas.getByRole("list");
    await expect(list).toBeInTheDocument();
    const links = canvas.queryAllByRole("link");
    await expect(links.length).toBe(0);
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList />
    </Breadcrumb>
  ),
};
export const SmallContainerManyLongItems: Story = {
  parameters: {
    order: 18,
    docs: {
      description: {
        story: "Worst case scenario: many items with long names in a very small container.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation");
    await expect(nav).toBeInTheDocument();
    const homeLink = canvas.getByText("Home");
    await expect(homeLink).toHaveAttribute("href", "/");
    const ellipsisButton = canvasElement.querySelector('[data-slot="breadcrumb-ellipsis"] button');
    await expect(ellipsisButton).toBeInTheDocument();
    const longLink = canvas.getByText("Frontend Development Team");
    await expect(longLink).toHaveAttribute("href", "/team");
    const currentPage = canvas.getByText("Component Library Documentation");
    await expect(currentPage).toBeInTheDocument();
    await expect(currentPage).toHaveAttribute('aria-current', 'page');
  },
  render: () => (
    <div className="w-64 border border-muted-foreground/20 p-3 rounded">
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
                <DropdownMenuItem
                  render={<a href="/organization">Organization Management</a>}
                />
                <DropdownMenuItem
                  render={<a href="/department">Engineering Department</a>}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbEllipsis>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/team">
              Frontend Development Team
            </BreadcrumbLink>
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
