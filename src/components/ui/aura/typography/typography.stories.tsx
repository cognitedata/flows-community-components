import { CodeBlock } from "@/components/ui/aura/code-block";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { getTypographyBySection, typographyPatterns, typographyScale } from "./typography";
const meta: Meta = {
  title: "Foundations/Typography",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};
export default meta;
type Story = StoryObj;
export const TextScale: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textVariants = getTypographyBySection("Text");
    await expect(textVariants.length).toBe(20);
    const sampleTexts = canvas.getAllByText("The quick brown fox jumps over the lazy dog.");
    await expect(sampleTexts.length).toBe(textVariants.length);
    await expect(canvas.getByText("xxs/normal")).toBeInTheDocument();
    await expect(canvas.getByText("5xl/medium")).toBeInTheDocument();
    await expect(canvas.getByText("text-base font-normal")).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-6" data-testid="text-scale">
      {getTypographyBySection("Text").map((t) => (
        <div
          key={`${t.name}-${t.fontWeight}`}
          className="border-b border-border pb-4 last:border-b-0"
          data-testid={`text-variant-${t.name}`}
        >
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">{t.name}</span>
            <code className="text-xs font-mono text-muted-foreground">{t.tailwindClass}</code>
          </div>
          <p className={t.tailwindClass}>The quick brown fox jumps over the lazy dog.</p>
          <p className="text-xs text-muted-foreground mt-2">
            {t.fontSize} / {t.lineHeight} · {t.usage}
          </p>
        </div>
      ))}
    </div>
  ),
};
export const MarketingScale: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const marketingVariants = getTypographyBySection("Marketing");
    await expect(marketingVariants.length).toBe(4);
    const sampleTexts = canvas.getAllByText("The quick brown fox jumps over the lazy dog.");
    await expect(sampleTexts.length).toBe(marketingVariants.length);
    await expect(canvas.getByText("font-marketing text-5xl font-bold")).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-6" data-testid="marketing-scale">
      {getTypographyBySection("Marketing").map((t) => (
        <div
          key={`${t.name}-${t.fontWeight}`}
          className="border-b border-border pb-4 last:border-b-0"
          data-testid={`marketing-variant-${t.name}`}
        >
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">{t.name}</span>
            <code className="text-xs font-mono text-muted-foreground">{t.tailwindClass}</code>
          </div>
          <p className={t.tailwindClass}>The quick brown fox jumps over the lazy dog.</p>
          <p className="text-xs text-muted-foreground mt-2">
            {t.fontSize} / {t.lineHeight} · {t.usage}
          </p>
        </div>
      ))}
    </div>
  ),
};
export const CodeScale: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const codeVariants = getTypographyBySection("Code");
    await expect(codeVariants.length).toBe(3);
    const sampleTexts = canvas.getAllByText('const greeting = "Hello, World!";');
    await expect(sampleTexts.length).toBe(codeVariants.length);
    await expect(canvas.getByText("font-mono text-sm font-medium")).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-6" data-testid="code-scale">
      {getTypographyBySection("Code").map((t) => (
        <div
          key={t.name}
          className="border-b border-border pb-4 last:border-b-0"
          data-testid={`code-variant-${t.name}`}
        >
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">{t.name}</span>
            <code className="text-xs font-mono text-muted-foreground">{t.tailwindClass}</code>
          </div>
          <p className={t.tailwindClass}>const greeting = &quot;Hello, World!&quot;;</p>
          <p className="text-xs text-muted-foreground mt-2">
            {t.fontSize} / {t.lineHeight} · {t.usage}
          </p>
        </div>
      ))}
    </div>
  ),
};
export const Hierarchy: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Page Title (4xl/medium)")).toBeInTheDocument();
    await expect(canvas.getByText(/Subtitle explaining the page purpose/)).toBeInTheDocument();
    await expect(canvas.getByText(/Body text that makes up/)).toBeInTheDocument();
    await expect(canvas.getByText(/Secondary information or metadata/)).toBeInTheDocument();
    await expect(canvas.getByText(/Fine print or label/)).toBeInTheDocument();
    const heading = canvas.getByRole("heading", {
      level: 1,
    });
    await expect(heading).toHaveTextContent("Page Title (4xl/medium)");
  },
  render: () => (
    <article className="max-w-2xl space-y-4" data-testid="hierarchy">
      <h1 className="text-4xl font-medium">Page Title (4xl/medium)</h1>
      <p className="text-lg text-muted-foreground">
        Subtitle explaining the page purpose (lg/normal, muted)
      </p>
      <p className="text-base font-normal">
        Body text that makes up the main content. This is what users read most, so it needs to be
        comfortable at extended lengths. The quick brown fox jumps over the lazy dog. Pack my box
        with five dozen liquor jugs.
      </p>
      <p className="text-sm text-muted-foreground">
        Secondary information or metadata (sm/normal, muted)
      </p>
      <p className="text-2xs font-medium uppercase tracking-wide">
        Fine print or label (xxs/medium)
      </p>
    </article>
  ),
};
export const PageHeaderPattern: Story = {
  name: "Pattern: Page Header",
  render: () => (
    <header className="space-y-2 border-b border-border pb-6">
      <h1 className="text-4xl font-medium">Settings</h1>
      <p className="text-lg font-normal text-muted-foreground">
        Manage your account settings and preferences.
      </p>
    </header>
  ),
};
export const CardPattern: Story = {
  name: "Pattern: Card",
  render: () => (
    <div className="rounded-lg border border-border p-6 max-w-sm space-y-2">
      <h3 className="text-lg font-medium">Project Alpha</h3>
      <p className="text-sm text-muted-foreground">
        A brief description that explains what this project is about and its current status.
      </p>
      <p className="text-2xs font-normal text-muted-foreground">Updated 3 hours ago · 12 members</p>
    </div>
  ),
};
export const ListItemPattern: Story = {
  name: "Pattern: List Item",
  render: () => (
    <div className="max-w-md divide-y divide-border">
      {[
        {
          title: "Design Review",
          secondary: "Due tomorrow",
        },
        {
          title: "API Integration",
          secondary: "In progress",
        },
        {
          title: "User Testing",
          secondary: "Scheduled for next week",
        },
      ].map((item) => (
        <div key={item.title} className="flex flex-col py-3">
          <span className="text-base font-medium">{item.title}</span>
          <span className="text-sm font-normal text-muted-foreground">{item.secondary}</span>
        </div>
      ))}
    </div>
  ),
};
export const FormFieldPattern: Story = {
  name: "Pattern: Form Field",
  render: () => (
    <div className="space-y-6 max-w-sm">
      <div className="space-y-1.5">
        <label htmlFor="email-address" className="text-sm font-medium">
          Email address
        </label>
        <input
          id="email-address"
          type="email"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-base font-normal placeholder:text-muted-foreground"
          placeholder="you@example.com"
        />
        <p className="text-xs text-muted-foreground">
          We&apos;ll never share your email with anyone else.
        </p>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="password-input" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password-input"
          type="password"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-base font-normal"
          placeholder="••••••••"
        />
        <p className="text-xs text-muted-foreground">Must be at least 8 characters long.</p>
      </div>
    </div>
  ),
};
export const ArticleBodyPattern: Story = {
  name: "Pattern: Article Body",
  render: () => (
    <article className="max-w-prose space-y-6">
      <header>
        <h1 className="text-3xl font-medium">Getting Started with Aura</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Published on January 7, 2026 · 5 min read
        </p>
      </header>

      <p className="text-base font-normal leading-relaxed">
        Aura is a design system built for modern web applications. It provides a comprehensive set
        of components, patterns, and guidelines that help teams build consistent, accessible user
        interfaces.
      </p>

      <h2 className="text-2xl font-medium pt-4">Installation</h2>
      <p className="text-base font-normal leading-relaxed">
        Getting started is straightforward. Install the package using your preferred package manager
        and import the components you need.
      </p>

      <h3 className="text-xl font-medium pt-2">Prerequisites</h3>
      <p className="text-base font-normal leading-relaxed">
        Before you begin, make sure you have Node.js 18 or later installed on your machine.
        You&apos;ll also need a React project set up with Tailwind CSS.
      </p>

      <figure className="py-4">
        <div className="bg-muted rounded-lg h-48 flex items-center justify-center">
          <span className="text-muted-foreground">Image placeholder</span>
        </div>
        <figcaption className="text-sm text-muted-foreground mt-2 text-center">
          Figure 1: The Aura component library in action
        </figcaption>
      </figure>
    </article>
  ),
};
export const MarketingHeroPattern: Story = {
  name: "Pattern: Marketing Hero",
  render: () => (
    <div className="text-center space-y-6 max-w-3xl mx-auto py-16">
      <h1 className="font-marketing text-5xl font-bold">Build faster with Aura</h1>
      <p className="text-xl font-normal text-muted-foreground max-w-2xl mx-auto">
        A design system that scales with your product and delights your users. Ship beautiful
        interfaces in half the time.
      </p>
      <div className="flex items-center justify-center gap-4 pt-4">
        <button
          type="button"
          className="rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground"
        >
          Get Started
        </button>
        <button
          type="button"
          className="rounded-md border border-border px-6 py-3 text-base font-medium"
        >
          Learn More
        </button>
      </div>
    </div>
  ),
};
export const DataTablePattern: Story = {
  name: "Pattern: Data Table",
  render: () => (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-xs font-medium uppercase text-muted-foreground text-left px-4 py-3">
              Name
            </th>
            <th className="text-xs font-medium uppercase text-muted-foreground text-left px-4 py-3">
              Status
            </th>
            <th className="text-xs font-medium uppercase text-muted-foreground text-left px-4 py-3">
              Last Updated
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {[
            {
              name: "Project Alpha",
              status: "Active",
              date: "Jan 7, 2026",
            },
            {
              name: "Project Beta",
              status: "Draft",
              date: "Jan 5, 2026",
            },
            {
              name: "Project Gamma",
              status: "Archived",
              date: "Dec 28, 2025",
            },
          ].map((row) => (
            <tr key={row.name}>
              <td className="text-sm font-normal px-4 py-3">{row.name}</td>
              <td className="text-sm font-normal px-4 py-3">{row.status}</td>
              <td className="text-sm font-normal text-muted-foreground px-4 py-3">{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
export const AIChatResponsePattern: Story = {
  name: "Pattern: AI Chat Response",
  render: () => (
    <div className="max-w-prose bg-muted/30 rounded-lg p-6">
      <div>
        <h2 className="text-lg font-medium tracking-tightest mt-4 mb-1">Using the API</h2>
        <p className="text-base font-normal leading-7 tracking-tightest mt-2 mb-3">
          To get started, you&apos;ll need to authenticate with your API key. Here&apos;s a quick
          overview:
        </p>
        <ul className="ml-8.25 mb-3 pt-2 pl-0 pb-0 list-disc text-base font-normal tracking-tightest">
          <li className="py-0">Generate an API key from your dashboard</li>
          <li className="py-0">
            Include it in the{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              Authorization
            </code>{" "}
            header
          </li>
          <li className="py-0">Make requests to the API endpoint</li>
        </ul>
        <blockquote className="my-3 pr-2 pl-2 border-l border-l-border text-sm text-muted-foreground font-normal tracking-tight not-italic">
          <p className="text-base font-normal leading-7 tracking-tightest mt-2 mb-3">
            Keep your API keys secure and never commit them to version control.
          </p>
        </blockquote>
        <hr className="my-4 border-border" />
        <h3 className="text-base font-medium tracking-tighter mt-4 mb-1">Example Request</h3>
        <p className="text-base font-normal leading-7 tracking-tightest mt-2 mb-3">
          Here&apos;s how to make your first request using{" "}
          <strong className="font-medium">fetch</strong> or <em className="italic">curl</em>. The
          API returns JSON responses with proper error handling.
        </p>
        <p className="text-base font-normal leading-7 tracking-tightest mt-2 mb-3">
          For more details, visit the{" "}
          <a
            className="text-foreground-link no-underline hover:underline underline-offset-4"
            href="https://example.com"
          >
            full documentation
          </a>
          .
        </p>
      </div>
    </div>
  ),
};
export const DocumentationPagePattern: Story = {
  name: "Pattern: Documentation Page",
  render: () => (
    <article className="max-w-3xl mx-auto py-8">
      <h1 className="text-4xl font-medium mt-0 mb-4">Getting Started</h1>
      <p className="text-base font-normal leading-7 mt-0 mb-4">
        This guide will walk you through the basics of setting up and using our platform. Follow
        each section carefully to ensure a smooth setup process.
      </p>

      <h2 className="text-2xl font-medium mt-8 mb-2">Installation</h2>
      <p className="text-base font-normal leading-7 mt-0 mb-4">
        First, install the required dependencies using your package manager. We support npm, yarn,
        and pnpm.
      </p>
      <ul className="ml-6 mb-4 list-disc text-base font-normal">
        <li>Node.js 18 or higher</li>
        <li>npm, yarn, or pnpm</li>
        <li>A modern browser (Chrome, Firefox, Safari, or Edge)</li>
      </ul>

      <h3 className="text-xl font-medium mt-6 mb-2">Configuration</h3>
      <p className="text-base font-normal leading-7 mt-0 mb-4">
        Create a configuration file in your project root. This file controls how the application
        behaves in different environments.
      </p>

      <blockquote className="my-4 pl-4 border-l-2 border-l-border text-base text-muted-foreground italic">
        Remember to add your config file to{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold not-italic">
          .gitignore
        </code>{" "}
        if it contains sensitive information.
      </blockquote>

      <h4 className="text-lg font-medium mt-4 mb-1">Environment Variables</h4>
      <p className="text-base font-normal leading-7 mt-0 mb-4">
        Set up your environment variables in a{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          .env
        </code>{" "}
        file. Never commit this file to your repository.
      </p>

      <h2 className="text-2xl font-medium mt-8 mb-2">Next Steps</h2>
      <p className="text-base font-normal leading-7 mt-0 mb-4">
        Once you&apos;ve completed the installation, you can proceed to configure your first
        project. Check out our tutorials for hands-on examples.
      </p>
      <ol className="ml-6 mb-4 list-decimal text-base font-normal">
        <li>Complete the quick start tutorial</li>
        <li>Explore the component library</li>
        <li>Review best practices and patterns</li>
      </ol>
    </article>
  ),
};
export const FullPageExample: Story = {
  name: "Example: Full Page",
  parameters: {
    layout: "fullscreen",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Build beautiful interfaces faster")).toBeInTheDocument();
    await expect(
      canvas.getByText("The complete design system for modern applications")
    ).toBeInTheDocument();
    await expect(canvas.getByText("Trusted by thousands of developers")).toBeInTheDocument();
    await expect(canvas.getByText("Documentation")).toBeInTheDocument();
    await expect(canvas.getByText("Everything you need")).toBeInTheDocument();
    await expect(canvas.getByText("Getting Started Guide")).toBeInTheDocument();
    await expect(canvas.getByText("Core Concepts")).toBeInTheDocument();
    await expect(canvas.getByText(/All components are fully accessible/)).toBeInTheDocument();
    await expect(canvas.getByText("Usage Analytics")).toBeInTheDocument();
    await expect(canvas.getByText("Downloads")).toBeInTheDocument();
    await expect(canvas.getByText("2.4M")).toBeInTheDocument();
    await expect(canvas.getByText(/Small \(14px\)/)).toBeInTheDocument();
    await expect(canvas.getByText(/Medium \(16px\)/)).toBeInTheDocument();
    await expect(canvas.getByText(/Large \(18px\)/)).toBeInTheDocument();
    await expect(canvas.getByText("Recent Updates")).toBeInTheDocument();
    await expect(canvas.getByRole("table")).toBeInTheDocument();
    await expect(canvas.getByTestId("subscribe-form")).toBeInTheDocument();
    await expect(canvas.getByPlaceholderText("you@example.com")).toBeInTheDocument();
    await expect(canvas.getByText("© 2026 Aura Design System")).toBeInTheDocument();
    await expect(canvas.getByText("GitHub")).toBeInTheDocument();
    await expect(typographyScale.length).toBe(27);
  },
  render: () => (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-muted/30">
        <div className="max-w-5xl mx-auto px-8 py-16 text-center space-y-6">
          <p className="text-2xs font-medium uppercase tracking-widest text-muted-foreground">
            Introducing Aura 2.0
          </p>
          <h1 className="font-marketing text-5xl font-bold">Build beautiful interfaces faster</h1>
          <p className="font-marketing text-3xl font-medium text-muted-foreground">
            The complete design system for modern applications
          </p>
          <p className="font-marketing text-2xl font-medium text-muted-foreground/80 max-w-2xl mx-auto">
            Typography, components, and patterns that scale with your product.
          </p>
        </div>
      </header>

      <section className="border-b border-border bg-muted/10 py-12">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <h2 className="font-marketing text-4xl font-bold mb-4">
            Trusted by thousands of developers
          </h2>
          <p className="text-xl font-normal text-muted-foreground">
            Join the community building with Aura
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-8 py-12">
        <div className="space-y-8 mb-16">
          <div className="space-y-2">
            <h1 className="text-5xl font-medium">Documentation</h1>
            <p className="text-5xl font-normal text-muted-foreground">Everything you need</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-medium">Getting Started Guide</h2>
            <p className="text-4xl font-normal text-muted-foreground">Learn the fundamentals</p>
          </div>
        </div>

        <section className="mb-12 rounded-lg border border-border p-6">
          <h2 className="text-3xl font-medium mb-2">Usage Analytics</h2>
          <p className="text-3xl font-normal text-muted-foreground mb-6">
            Component adoption metrics
          </p>
          <div className="grid grid-cols-4 gap-6">
            {[
              {
                label: "Downloads",
                value: "2.4M",
                change: "+12%",
              },
              {
                label: "Active Projects",
                value: "18.2K",
                change: "+8%",
              },
              {
                label: "Contributors",
                value: "342",
                change: "+24%",
              },
              {
                label: "Components",
                value: "127",
                change: "+6%",
              },
            ].map((metric) => (
              <div key={metric.label} className="text-center">
                <p className="text-xs font-normal text-muted-foreground mb-1">{metric.label}</p>
                <p className="text-2xl font-medium">{metric.value}</p>
                <p className="text-xs font-normal text-muted-foreground">
                  {metric.change} this month
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-3 gap-12">
          <div className="col-span-2 space-y-8">
            <article className="space-y-6">
              <section className="space-y-4">
                <h2 className="text-2xl font-medium">Core Concepts</h2>
                <p className="text-2xl font-normal text-muted-foreground">
                  Understanding the foundations
                </p>
                <p className="text-base font-normal leading-relaxed">
                  Aura provides a complete set of primitives for building modern user interfaces.
                  The system includes typography scales, colour tokens, spacing utilities, and
                  pre-built components that work together seamlessly.
                </p>
                <p className="text-base font-medium leading-relaxed">
                  Important: All components are fully accessible and follow WAI-ARIA guidelines.
                  This ensures your applications work for everyone.
                </p>
                <p className="text-base font-normal leading-relaxed">
                  Whether you&apos;re building a dashboard, marketing site, or complex application,
                  Aura gives you the foundations to move quickly while maintaining consistency.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-medium">Installation</h3>
                <p className="text-xl font-normal text-muted-foreground">Quick setup guide</p>
                <p className="text-sm font-normal text-muted-foreground">
                  Install the package using your preferred package manager:
                </p>
                <CodeBlock code="pnpm add @aura/ui @aura/tokens" language="bash" />
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-medium">Typography Scale</h3>
                <p className="text-base font-normal leading-relaxed">
                  The typography system uses three font families to create visual hierarchy and
                  establish context:
                </p>
                <ul className="space-y-2 text-base font-normal">
                  <li>
                    <span className="font-medium">Inter</span>
                    <span className="text-muted-foreground">
                      {" "}
                      — Primary text for UI elements and body copy
                    </span>
                  </li>
                  <li>
                    <span className="font-medium">Space Grotesk</span>
                    <span className="text-muted-foreground">
                      {" "}
                      — Marketing headlines and display text
                    </span>
                  </li>
                  <li>
                    <span className="font-mono text-sm font-medium">Source Code Pro</span>
                    <span className="text-muted-foreground">
                      {" "}
                      — Code blocks and technical content
                    </span>
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-medium">Code Examples</h3>
                <p className="text-sm font-normal text-muted-foreground">
                  Code blocks at different sizes for various contexts:
                </p>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Small (14px) — Inline snippets
                    </p>
                    <div className="rounded-md bg-muted p-3">
                      <code className="font-mono text-sm font-medium">
                        const Button = forwardRef&lt;HTMLButtonElement, Props&gt;()
                      </code>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Medium (16px) — Standard code blocks
                    </p>
                    <div className="rounded-md bg-muted p-3">
                      <code className="font-mono text-base font-medium">
                        import {"{ Button }"} from &apos;@aura/ui&apos;
                      </code>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Large (18px) — Presentations and demos
                    </p>
                    <div className="rounded-md bg-muted p-3">
                      <code className="font-mono text-lg font-medium">
                        &lt;Button variant=&quot;primary&quot;&gt;Click me&lt;/Button&gt;
                      </code>
                    </div>
                  </div>
                </div>
              </section>
            </article>

            <section className="space-y-4">
              <h2 className="text-2xl font-medium">Recent Updates</h2>
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-xs font-medium uppercase text-muted-foreground text-left px-4 py-3">
                        Component
                      </th>
                      <th className="text-xs font-medium uppercase text-muted-foreground text-left px-4 py-3">
                        Version
                      </th>
                      <th className="text-xs font-medium uppercase text-muted-foreground text-left px-4 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="text-sm font-medium px-4 py-3">Button</td>
                      <td className="text-sm font-normal px-4 py-3">2.1.0</td>
                      <td className="text-sm font-normal text-muted-foreground px-4 py-3">
                        Stable
                      </td>
                    </tr>
                    <tr>
                      <td className="text-sm font-medium px-4 py-3">Typography</td>
                      <td className="text-sm font-normal px-4 py-3">2.0.0</td>
                      <td className="text-sm font-normal text-muted-foreground px-4 py-3">New</td>
                    </tr>
                    <tr>
                      <td className="text-sm font-medium px-4 py-3">Modal</td>
                      <td className="text-sm font-normal px-4 py-3">1.8.3</td>
                      <td className="text-sm font-normal text-muted-foreground px-4 py-3">Beta</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="rounded-lg border border-border p-6 space-y-3">
              <h3 className="text-lg font-medium">Quick Links</h3>
              <p className="text-lg font-normal text-muted-foreground">Jump to a section</p>
              <nav className="space-y-2">
                <a
                  href="/components"
                  className="block text-sm font-normal text-muted-foreground hover:text-foreground"
                >
                  Components
                </a>
                <a
                  href="/primitives"
                  className="block text-sm font-normal text-muted-foreground hover:text-foreground"
                >
                  Primitives
                </a>
                <a
                  href="/tokens"
                  className="block text-sm font-normal text-muted-foreground hover:text-foreground"
                >
                  Tokens
                </a>
                <a
                  href="/patterns"
                  className="block text-sm font-normal text-muted-foreground hover:text-foreground"
                >
                  Patterns
                </a>
              </nav>
            </div>

            <div
              className="rounded-lg border border-border p-6 space-y-4"
              data-testid="subscribe-form"
            >
              <div>
                <h3 className="text-lg font-medium">Subscribe</h3>
                <p className="text-sm font-normal text-muted-foreground">
                  Get notified when we release updates.
                </p>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="subscribe-email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="subscribe-email"
                  type="email"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-base font-normal placeholder:text-muted-foreground"
                  placeholder="you@example.com"
                />
                <p className="text-xs font-normal text-muted-foreground">
                  No spam, unsubscribe anytime.
                </p>
              </div>
              <button
                type="button"
                className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Subscribe
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-2xs font-medium uppercase tracking-wide text-muted-foreground">
                Last updated
              </p>
              <p className="text-sm font-normal">January 7, 2026</p>
              <p className="text-2xs font-normal text-muted-foreground">
                Version 2.0.0 · MIT License
              </p>
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="max-w-5xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <p className="text-sm font-normal text-muted-foreground">© 2026 Aura Design System</p>
            <nav className="flex items-center gap-6">
              <a
                href="https://github.com"
                className="text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                GitHub
              </a>
              <a
                href="https://discord.com"
                className="text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                Discord
              </a>
              <a
                href="https://twitter.com"
                className="text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                Twitter
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  ),
};
export const TailwindClassReference: Story = {
  name: "Reference: All Classes",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByRole("table");
    await expect(table).toBeInTheDocument();
    await expect(canvas.getByText("Section")).toBeInTheDocument();
    await expect(canvas.getByText("Name")).toBeInTheDocument();
    await expect(canvas.getByText("Tailwind Class")).toBeInTheDocument();
    await expect(canvas.getByText("Usage")).toBeInTheDocument();
    const rows = canvas.getAllByRole("row");
    await expect(rows.length).toBe(typographyScale.length + 1);
    await expect(canvas.getAllByText("Text").length).toBeGreaterThan(0);
    await expect(canvas.getAllByText("Marketing").length).toBeGreaterThan(0);
    await expect(canvas.getAllByText("Code").length).toBeGreaterThan(0);
    await expect(canvas.getByText("text-2xs font-normal")).toBeInTheDocument();
    await expect(canvas.getByText("font-marketing text-5xl font-bold")).toBeInTheDocument();
    await expect(canvas.getByText("font-mono text-lg font-medium")).toBeInTheDocument();
  },
  render: () => (
    <div className="overflow-x-auto" data-testid="tailwind-reference">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 pr-4 font-medium">Section</th>
            <th className="text-left py-2 pr-4 font-medium">Name</th>
            <th className="text-left py-2 pr-4 font-medium">Tailwind Class</th>
            <th className="text-left py-2 font-medium">Usage</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {typographyScale.map((t) => (
            <tr key={t.tailwindClass}>
              <td className="py-2 pr-4 text-muted-foreground">{t.section}</td>
              <td className="py-2 pr-4">{t.name}</td>
              <td className="py-2 pr-4">
                <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">
                  {t.tailwindClass}
                </code>
              </td>
              <td className="py-2 text-muted-foreground">{t.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
export const PatternReference: Story = {
  name: "Reference: All Patterns",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const patternCount = Object.keys(typographyPatterns).length;
    await expect(patternCount).toBe(10);
    await expect(canvas.getByText("Page Header")).toBeInTheDocument();
    await expect(canvas.getByText("Section Header")).toBeInTheDocument();
    await expect(canvas.getByText("Card")).toBeInTheDocument();
    await expect(canvas.getByText("List Item")).toBeInTheDocument();
    await expect(canvas.getByText("Form Field")).toBeInTheDocument();
    await expect(canvas.getByText("Article Body")).toBeInTheDocument();
    await expect(canvas.getByText("Marketing Hero")).toBeInTheDocument();
    await expect(canvas.getByText("Data Table")).toBeInTheDocument();
    await expect(canvas.getByText("AI Chat Response")).toBeInTheDocument();
    await expect(canvas.getByText("Documentation Page")).toBeInTheDocument();
    await expect(canvas.getAllByText("title:").length).toBeGreaterThan(0);
    await expect(canvas.getAllByText("Elements").length).toBe(patternCount);
  },
  render: () => (
    <div className="space-y-8" data-testid="pattern-reference">
      {Object.entries(typographyPatterns).map(([key, pattern]) => (
        <div
          key={key}
          className="border-b border-border pb-8 last:border-b-0"
          data-testid={`pattern-${key}`}
        >
          <h3 className="text-lg font-medium mb-1">{pattern.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{pattern.description}</p>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Elements
            </p>
            <div className="flex flex-wrap gap-2">
              {pattern.elements.map((el) => (
                <div key={el.role} className="text-xs bg-muted px-2 py-1 rounded">
                  <span className="font-medium">{el.role}:</span>{" "}
                  <code className="font-mono">{el.class}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};
