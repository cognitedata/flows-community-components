# Aura

> Cognite's AI-native design system inspired by fractal intelligence and adaptive by nature.

**⚠️ Active Development**: Aura is a prototype changing fast. For exploration and prototyping only, not production use.

**[Documentation](https://cognitedata.github.io/aura/)** • **[Components](https://cognitedata.github.io/aura/)** • **[GitHub](https://github.com/cognitedata/aura)**

## Quick Start

Create a new project with Aura:

```bash
npx cognite-create@latest
```

Or add to existing project:

```bash
npx shadcn add [component-name]
```

## Development

Start the development server:

```bash
pnpm dev
```

For cache issues, run:

```bash
pnpm clean:dev
```

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed setup and [PUBLISHING_WORKFLOW.md](PUBLISHING_WORKFLOW.md) for component publishing.

## What's Inside

**80+ React components** built for industrial AI applications:

- **Primitives**: Buttons, inputs, badges, cards, dialogs
- **AI Components**: Conversation, message, reasoning, chain-of-thought, artifacts
- **Data Visualization**: Charts, tables, node graphs
- **Layouts**: Sidebars, topbars, panels, templates

Built with React 19, Next.js 16, TypeScript, Tailwind CSS 4, and Radix UI.

## Publishing Components

Build and publish components to the registry:

```bash
pnpm registry:build
```

See [PUBLISHING_WORKFLOW.md](PUBLISHING_WORKFLOW.md) for the complete workflow.
