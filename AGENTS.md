# Cogs Design System - AI Assistant & Developer Guide

<!-- DOCUMENT_VERSION: 1.0.0 -->
<!-- LAST_UPDATED: 2024-12-24 -->
<!-- COGS_VERSION: 10.49.0 -->

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Quick Start Guide](#quick-start-guide)
3. [Development Environment Setup](#development-environment-setup)
4. [Design System Architecture](#design-system-architecture)
5. [Design Principles & Philosophy](#design-principles--philosophy)
6. [Design Tokens Deep Dive](#design-tokens-deep-dive)
7. [Component Library Guide](#component-library-guide)
8. [Patterns & Best Practices](#patterns--best-practices)
9. [Styling & Theming](#styling--theming)
10. [Performance Guidelines](#performance-guidelines)
11. [Testing](#testing)
12. [Migration & Upgrades](#migration--upgrades)
13. [Troubleshooting](#troubleshooting)
14. [AI Assistant Instructions](#ai-assistant-instructions)
15. [Quick Reference](#quick-reference)

## Executive Summary

The Cogs Design System is a comprehensive React-based component library developed by Cognite for building consistent, accessible, and performant user interfaces. It provides a complete set of UI components, design tokens, icons, and utilities optimized for Figma design workflows and frontend development.

### Key Packages

- **@cognite/cogs-core** (v10.49.0) - Core component library with 60+ production-ready components
- **@cognite/cogs-icons** (v10.49.0) - Comprehensive icon library with system, document, and themed icons
- **@cognite/cogs-utils** (v10.49.0) - Utility functions and hooks for enhanced functionality
- **@cognite/cogs.js** - Wrapper package that re-exports all core functionality
- **@cognite/cogs-lab** (v9.0.0-alpha) - Experimental components under active development

### Primary Use Cases

- Building enterprise applications with consistent UI/UX
- Rapid prototyping with design-development parity
- Creating accessible, WCAG-compliant interfaces
- Developing data-intensive applications with complex interactions

### Target Audience

- Frontend Engineers building React applications
- UI/UX Designers working in Figma
- Full-stack developers implementing Cognite products
- Technical teams requiring enterprise-grade components

## Quick Start Guide

### Prerequisites

- **Node.js**: v20.17.14 or higher
- **Package Manager**: Yarn 4.6.0+ (recommended) or npm 10+
- **React**: v18.3.1 or higher
- **TypeScript**: v5.7.3 (recommended for type safety)

### Installation

```bash
# Install the main package (includes core, icons, and utils)
yarn add @cognite/cogs.js

# Or install individual packages
yarn add @cognite/cogs-core @cognite/cogs-icons @cognite/cogs-utils

# For experimental components
yarn add @cognite/cogs-lab
```

### Basic Setup Example

```tsx
// App.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, Button } from '@cognite/cogs.js';
import '@cognite/cogs.js/dist/cogs.css'; // Import CSS styles

function App() {
  return (
    <ConfigProvider>
      <Button type="primary" onClick={() => console.log('Hello Cogs!')}>
        Get Started
      </Button>
    </ConfigProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
```

### First Component Usage

```tsx
import { Button, Colors, Flex, Input } from '@cognite/cogs.js';
import { SearchIcon } from '@cognite/cogs-icons';

function SearchBar() {
  return (
    <Flex gap={8} alignItems="center">
      <Input
        placeholder="Search..."
        icon={<SearchIcon />}
        fullWidth
        variant="outline"
      />
      <Button type="primary" size="medium">
        Search
      </Button>
    </Flex>
  );
}
```

## Development Environment Setup

### Complete Development Setup

1. **Create a new React project with TypeScript**:

```bash
# Using Vite (recommended)
yarn create vite my-cogs-app --template react-ts
cd my-cogs-app
yarn install

# Install Cogs
yarn add @cognite/cogs.js
```

2. **Configure TypeScript** (`tsconfig.json`):

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

3. **Update package.json**:

```json
{
  "name": "my-cogs-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "jest",
    "storybook": "storybook dev -p 6006"
  },
  "dependencies": {
    "@cognite/cogs.js": "^10.49.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.7.3",
    "vite": "^5.3.4",
    "@storybook/addon-essentials": "^8.2.8",
    "@storybook/react-vite": "^8.2.8",
    "storybook": "^8.2.8"
  }
}
```

4. **Setup main application entry** (`src/main.tsx`):

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from '@cognite/cogs.js';
import '@cognite/cogs.js/dist/cogs.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
```

### Storybook Integration

```bash
# Initialize Storybook
npx storybook@latest init

# Create a story file (Button.stories.tsx)
```

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@cognite/cogs.js';

const meta: Meta<typeof Button> = {
  title: 'Cogs/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    children: 'Secondary Button',
  },
};
```

### Testing Environment Setup

```bash
# Install testing dependencies
yarn add -D @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
```

Create `jest.config.ts`:

```typescript
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};
```

Create `src/setupTests.ts`:

```typescript
import '@testing-library/jest-dom';
```

## Design System Architecture

### Package Structure

```
cogs.js/
├── packages/
│   ├── core/                    # Core components library
│   │   ├── src/
│   │   │   ├── components/      # 60+ UI components
│   │   │   ├── tokens/          # Design tokens (colors, typography, etc.)
│   │   │   ├── styles/          # SCSS styles and mixins
│   │   │   └── util/            # Utility functions
│   │   └── dist/                # Built output
│   ├── icons/                   # Icon library
│   │   ├── src/
│   │   │   ├── system-icons/    # 800+ system icons
│   │   │   ├── document-icons/  # Document type icons
│   │   │   ├── illustrations/   # Complex illustrations
│   │   │   └── subapp-icons/    # Application-specific icons
│   │   └── dist/
│   ├── utils/                   # Utility library
│   │   ├── src/
│   │   │   ├── hooks/           # React hooks
│   │   │   ├── helpers/         # Helper functions
│   │   │   └── components/      # Utility components
│   │   └── dist/
│   ├── lab/                     # Experimental components
│   │   ├── src/
│   │   │   └── components/      # Alpha/beta components
│   │   └── dist/
│   └── cogs/                    # Wrapper package
│       └── src/
│           └── index.ts         # Re-exports all packages
├── examples/                    # Example applications
├── scripts/                     # Build and utility scripts
└── docs/                        # Documentation

```

### Module Organization

```typescript
// Core exports structure
export * from './components';    // All UI components
export * from './tokens';        // Design tokens
export * from './util';          // Utilities

// Icons exports structure  
export * from './system-icons';
export * from './document-icons';
export * from './illustrations';
export * from './subapp-icons';
export * from './utils';

// Utils exports structure
export * from './hooks';
export * from './helpers';
export * from './components';
```

### TypeScript Configuration

<!-- IMPORTANT -->
All Cogs packages are built with strict TypeScript configuration for maximum type safety:

```typescript
// Component props pattern
import type { CogsComponentProps } from '@cognite/cogs-utils';

export type ButtonProps = CogsComponentProps<
  'disabled' | 'loading' | 'icon',  // Common props
  never,                             // Required props
  CustomProps                        // Component-specific props
>;
```

### Build System

- **Bundler**: Rollup for optimal tree-shaking
- **Compilation**: TypeScript + Babel
- **Styles**: SCSS compiled to CSS
- **Module Formats**: ESM and CJS dual output
- **Development**: Nx for monorepo management

## Design Principles & Philosophy

### Core Design Principles

1. **Consistency First**
   - Unified visual language across all components
   - Predictable behavior patterns
   - Standardized spacing and sizing

2. **Accessibility by Default**
   - WCAG 2.1 AA compliance minimum
   - Keyboard navigation support
   - Screen reader optimization
   - Focus management

3. **Performance Optimized**
   - Tree-shakeable exports
   - Minimal runtime overhead
   - Lazy-loading capabilities
   - Optimized bundle sizes

4. **Developer Experience**
   - Comprehensive TypeScript support
   - Intuitive API design
   - Detailed documentation
   - Helpful error messages

### When to Use Cogs vs Custom Components

**Use Cogs Components When:**
- Building standard UI patterns
- Need consistent design language
- Require accessibility compliance
- Want rapid development

**Build Custom Components When:**
- Highly specialized functionality
- Unique visual requirements
- Performance-critical scenarios
- Domain-specific interactions

### Component Composition Patterns

```tsx
// Atomic composition
import { Flex, Card, Button, Text } from '@cognite/cogs.js';

function ComposedCard({ title, content, onAction }) {
  return (
    <Card>
      <Flex direction="column" gap={16}>
        <Text variant="h3">{title}</Text>
        <Text>{content}</Text>
        <Button type="primary" onClick={onAction}>
          Take Action
        </Button>
      </Flex>
    </Card>
  );
}

// Compound components
function DataTable() {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>Status</Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {/* Rows */}
      </Table.Body>
    </Table>
  );
}
```

### Responsive Design Approach

- **Mobile-first**: Components scale up from mobile
- **Breakpoints**: Consistent responsive breakpoints
- **Fluid sizing**: Relative units for flexibility
- **Container queries**: Component-level responsiveness

### Accessibility Standards

- **WCAG 2.1 Level AA**: Minimum compliance
- **ARIA attributes**: Proper semantic markup
- **Keyboard navigation**: Full keyboard support
- **Focus indicators**: Clear focus states
- **Color contrast**: 4.5:1 minimum ratio

## Design Tokens Deep Dive

### 6.1 Color Tokens

<!-- IMPORTANT -->
Color tokens provide semantic meaning and ensure consistency across the design system.

```typescript
import { Colors } from '@cognite/cogs.js';

// Primary semantic colors
Colors.blue90;       // #001d4a - Primary dark
Colors.blue60;       // #004d9e - Primary default
Colors.blue30;       // #4da1ff - Primary light

// Status colors
Colors.green60;      // #16b855 - Success
Colors.yellow60;     // #ffb636 - Warning
Colors.red60;        // #e83c3b - Danger/Error
Colors.blue60;       // #004d9e - Info

// Neutral colors
Colors.gray100;      // #000000 - Black
Colors.gray90;       // #1a1a1a - Dark gray
Colors.gray60;       // #737373 - Medium gray
Colors.gray30;       // #cccccc - Light gray
Colors.gray10;       // #f2f2f2 - Very light gray
Colors.white;        // #ffffff - White

// AI-specific colors
Colors.aiPurple90;   // #2d1858 - AI dark
Colors.aiPurple60;   // #6e41c6 - AI primary
Colors.aiPurple30;   // #b79ef3 - AI light
```

<!-- EXAMPLE -->
```tsx
// Using color tokens in components
import { Button, Colors } from '@cognite/cogs.js';

function StatusButton({ status }) {
  const getColor = () => {
    switch(status) {
      case 'success': return Colors.green60;
      case 'warning': return Colors.yellow60;
      case 'error': return Colors.red60;
      default: return Colors.blue60;
    }
  };

  return (
    <Button 
      style={{ backgroundColor: getColor() }}
      type="primary"
    >
      {status}
    </Button>
  );
}

// Theme-aware colors
function ThemedComponent() {
  return (
    <div style={{
      backgroundColor: Colors.gray10,
      color: Colors.gray90,
      borderColor: Colors.gray30
    }}>
      Content with semantic colors
    </div>
  );
}
```

### Gradients

```typescript
import { Gradients } from '@cognite/cogs.js';

// Available gradients
Gradients.blueGradient;     // Blue gradient for primary actions
Gradients.purpleGradient;   // Purple gradient for AI features
Gradients.successGradient;  // Green gradient for success states
```

### 6.2 Typography Tokens

Typography tokens define the text hierarchy and styling system.

```tsx
// Typography component usage
import { Typography } from '@cognite/cogs.js';

// Heading variants
<Typography variant="h1">Heading 1 - 32px</Typography>
<Typography variant="h2">Heading 2 - 24px</Typography>
<Typography variant="h3">Heading 3 - 20px</Typography>
<Typography variant="h4">Heading 4 - 18px</Typography>
<Typography variant="h5">Heading 5 - 16px</Typography>
<Typography variant="h6">Heading 6 - 14px</Typography>

// Body variants
<Typography variant="body">Body text - 14px</Typography>
<Typography variant="body-small">Small body - 12px</Typography>
<Typography variant="body-large">Large body - 16px</Typography>

// Special variants
<Typography variant="caption">Caption text - 12px</Typography>
<Typography variant="overline">OVERLINE TEXT - 12px</Typography>
<Typography variant="code">Code text - monospace</Typography>
```

Typography properties:
```typescript
// Font families
const fontFamilies = {
  primary: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  monospace: 'Consolas, Monaco, monospace'
};

// Font weights
const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700
};

// Line heights
const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75
};
```

### 6.3 Spacing Tokens

Spacing follows an 8px grid system for consistency:

```typescript
// Spacing scale (in pixels)
const spacing = {
  xxs: 2,   // Micro spacing
  xs: 4,    // Extra small
  sm: 8,    // Small (base unit)
  md: 16,   // Medium
  lg: 24,   // Large
  xl: 32,   // Extra large
  xxl: 48,  // Extra extra large
  xxxl: 64  // Maximum spacing
};

// Usage in components
<Flex gap={16}>           // 16px gap
  <Box padding={24}>      // 24px padding
    <Text marginBottom={8}>Text with margin</Text>
  </Box>
</Flex>
```

### 6.4 Other Tokens

#### Elevation/Shadow Tokens

```typescript
import { Elevations } from '@cognite/cogs.js';

// Elevation levels
Elevations.elevation1;  // Subtle shadow for cards
Elevations.elevation2;  // Medium shadow for dropdowns
Elevations.elevation3;  // Strong shadow for modals
Elevations.elevation4;  // Maximum shadow for tooltips

// Usage
<Card style={{ boxShadow: Elevations.elevation2 }}>
  Elevated content
</Card>
```

#### Border Radius Tokens

```scss
// Border radius scale
$radius-xs: 2px;   // Subtle rounding
$radius-sm: 4px;   // Small radius (default)
$radius-md: 8px;   // Medium radius
$radius-lg: 12px;  // Large radius
$radius-xl: 16px;  // Extra large
$radius-full: 9999px; // Fully rounded
```

#### Animation/Transition Tokens

```scss
// Transition durations
$duration-fast: 150ms;
$duration-normal: 250ms;
$duration-slow: 350ms;

// Easing functions
$ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
$ease-out: cubic-bezier(0.0, 0, 0.2, 1);
$ease-in: cubic-bezier(0.4, 0, 1, 1);
```

#### Breakpoint Tokens

```typescript
// Responsive breakpoints
const breakpoints = {
  xs: 0,      // Mobile portrait
  sm: 576,    // Mobile landscape
  md: 768,    // Tablet
  lg: 992,    // Desktop
  xl: 1200,   // Large desktop
  xxl: 1400   // Extra large desktop
};
```

## Component Library Guide

### 7.1 Component Categories

- **Forms**: Input, Select, Checkbox, Radio, Switch, Textarea, DatePicker
- **Navigation**: TopBar, Tabs, Breadcrumbs, Menu, Drawer
- **Feedback**: Modal, Tooltip, Popconfirm, Notification, Toast
- **Layout**: Flex, Grid, Card, Divider, CollapsablePanel
- **Data Display**: Table, List, Avatar, Tag, Badge, Status
- **Actions**: Button, Link, IconButton, Dropdown
- **Typography**: Typography, Text, Heading
- **Utility**: Skeleton, Loader, EmptyState, ErrorBoundary

### 7.2 Component Documentation Template

Each component follows this documentation structure:
- **Name & Import**: How to import the component
- **Purpose**: What the component does
- **Props Interface**: TypeScript definitions
- **Required vs Optional**: Clear prop requirements
- **Defaults**: Default prop values
- **Accessibility**: ARIA and keyboard support
- **Do's and Don'ts**: Best practices
- **Code Examples**: Multiple usage patterns
- **Related Components**: Similar/complementary components
- **Migration Notes**: Version-specific changes

### 7.3 Core Components

#### Button Component

```typescript
import { Button } from '@cognite/cogs.js';
import { DownloadIcon } from '@cognite/cogs-icons';
```

**Purpose**: Primary interactive element for user actions

**Props Interface**:
```typescript
interface ButtonProps {
  // Visual variants
  type?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 
         'ghost' | 'ghost-accent' | 'ghost-destructive';
  
  // Sizing
  size?: 'small' | 'medium' | 'large' | 'x-large';
  
  // States
  disabled?: boolean;
  loading?: boolean;
  toggled?: boolean;
  skeleton?: boolean;
  
  // Content
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPlacement?: 'left' | 'right';
  
  // Behavior
  onClick?: (event: React.MouseEvent) => void;
  href?: string;  // Renders as anchor tag
  htmlType?: 'button' | 'submit' | 'reset';
  
  // Layout
  fullWidth?: boolean;
  alignVertically?: 'top' | 'center' | 'bottom';
  
  // Advanced
  counterChip?: CounterChipProps;
  themeProps?: ThemeProps;
}
```

**Required Props**: `children` (button label)

**Default Values**:
- `type`: 'secondary'
- `size`: 'medium'
- `iconPlacement`: 'left'
- `htmlType`: 'button'

**Accessibility**:
- Full keyboard navigation (Enter/Space to activate)
- ARIA attributes supported
- Focus management
- Disabled state handling

**Do's**:
- Use descriptive, action-oriented labels
- Choose appropriate type for context
- Provide loading states for async actions
- Use icons to enhance clarity

**Don'ts**:
- Don't use vague labels like "Click here"
- Don't disable without clear reason
- Don't use multiple primary buttons
- Don't override native behavior

<!-- EXAMPLE -->
```tsx
// Basic usage
<Button type="primary" onClick={handleSave}>
  Save Changes
</Button>

// With icon and loading state
<Button 
  type="secondary"
  size="large"
  icon={<DownloadIcon />}
  loading={isDownloading}
  disabled={!hasPermission}
  onClick={handleDownload}
>
  Download Report
</Button>

// Full-width destructive action
<Button
  type="destructive"
  fullWidth
  onClick={handleDelete}
  data-testid="delete-button"
>
  Delete Account
</Button>

// Ghost button with counter
<Button
  type="ghost"
  toggled={isFiltered}
  counterChip={{ count: 3 }}
  onClick={toggleFilter}
>
  Filters
</Button>

// Link button
<Button
  type="tertiary"
  href="/documentation"
  target="_blank"
  icon={<ExternalLinkIcon />}
  iconPlacement="right"
>
  View Documentation
</Button>
```

**Related Components**: Link, IconButton, SegmentedControl

#### Input Component

```typescript
import { Input } from '@cognite/cogs.js';
```

**Purpose**: Text input field for user data entry

**Props Interface**:
```typescript
interface InputProps {
  // Visual variants
  variant?: 'outline' | 'solid' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  
  // States
  disabled?: boolean;
  status?: 'success' | 'warning' | 'error' | 'info';
  
  // Content
  value?: string;
  placeholder?: string;
  label?: string | LabelProps;
  helpText?: string;
  statusText?: string;
  
  // Enhancements
  icon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  clearable?: boolean;
  
  // Behavior
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
  
  // Layout
  fullWidth?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  
  // Advanced
  buttonProps?: ButtonProps;  // Action button
  shortcutKeys?: string[];    // Keyboard shortcuts
  hideSpinButtons?: boolean;  // For number inputs
}
```

<!-- EXAMPLE -->
```tsx
// Basic text input
<Input
  label="Email Address"
  type="email"
  placeholder="user@example.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

// With validation and help text
<Input
  label={{ text: "Password", required: true }}
  type="password"
  status={passwordError ? 'error' : undefined}
  statusText={passwordError}
  helpText="Must be at least 8 characters"
  value={password}
  onChange={handlePasswordChange}
/>

// Search input with icon and clear
<Input
  variant="ghost"
  icon={<SearchIcon />}
  placeholder="Search products..."
  clearable
  fullWidth
  value={searchQuery}
  onChange={handleSearch}
  shortcutKeys={['⌘', 'K']}
/>

// Number input with prefix/suffix
<Input
  label="Price"
  type="number"
  prefix="$"
  suffix="USD"
  step={0.01}
  min={0}
  value={price}
  onChange={(e) => setPrice(e.target.value)}
  hideSpinButtons
/>

// With action button
<Input
  label="Repository URL"
  value={repoUrl}
  onChange={setRepoUrl}
  buttonProps={{
    icon: <CopyIcon />,
    onClick: () => copyToClipboard(repoUrl)
  }}
/>
```

#### Select Component

```typescript
import { Select } from '@cognite/cogs.js';
```

**Purpose**: Dropdown selection from predefined options

**Props Interface**:
```typescript
interface SelectProps {
  options: Array<{
    value: string | number;
    label: string;
    disabled?: boolean;
    icon?: React.ReactNode;
  }>;
  
  value?: string | number | string[] | number[];
  placeholder?: string;
  
  // Multiple selection
  isMulti?: boolean;
  
  // Visual
  variant?: 'outline' | 'solid' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  
  // States
  disabled?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  
  // Behavior
  onChange?: (value: any) => void;
  onInputChange?: (inputValue: string) => void;
  
  // Layout
  fullWidth?: boolean;
  menuPlacement?: 'auto' | 'bottom' | 'top';
}
```

<!-- EXAMPLE -->
```tsx
// Basic select
<Select
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' }
  ]}
  value={country}
  onChange={setCountry}
  placeholder="Select a country"
/>

// Multi-select with search
<Select
  label="Tags"
  isMulti
  isSearchable
  isClearable
  options={tagOptions}
  value={selectedTags}
  onChange={setSelectedTags}
  placeholder="Select tags..."
/>

// With icons and disabled options
<Select
  label="Status"
  options={[
    { value: 'active', label: 'Active', icon: <CheckIcon /> },
    { value: 'pending', label: 'Pending', icon: <ClockIcon /> },
    { value: 'archived', label: 'Archived', icon: <ArchiveIcon />, disabled: true }
  ]}
  value={status}
  onChange={handleStatusChange}
/>
```

#### Checkbox Component

```typescript
import { Checkbox, CheckboxGroup } from '@cognite/cogs.js';
```

<!-- EXAMPLE -->
```tsx
// Single checkbox
<Checkbox
  label="I agree to the terms and conditions"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
  required
/>

// Checkbox group
<CheckboxGroup
  label="Select permissions"
  value={permissions}
  onChange={setPermissions}
  options={[
    { value: 'read', label: 'Read' },
    { value: 'write', label: 'Write' },
    { value: 'delete', label: 'Delete', disabled: true }
  ]}
/>

// Indeterminate state
<Checkbox
  label="Select all"
  checked={selectedItems.length === items.length}
  indeterminate={selectedItems.length > 0 && selectedItems.length < items.length}
  onChange={handleSelectAll}
/>
```

#### Modal Component

```typescript
import { Modal } from '@cognite/cogs.js';
```

**Purpose**: Overlay dialog for focused user interactions

<!-- EXAMPLE -->
```tsx
// Basic modal
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm Action"
  footer={
    <>
      <Button type="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button type="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </>
  }
>
  <p>Are you sure you want to proceed with this action?</p>
</Modal>

// Full-featured modal
<Modal
  isOpen={showModal}
  onClose={closeModal}
  title="Edit Profile"
  subtitle="Update your personal information"
  size="large"
  closeOnOverlayClick={false}
  showCloseButton
  footer={
    <Flex justify="space-between" fullWidth>
      <Button type="ghost-destructive" onClick={handleDelete}>
        Delete Profile
      </Button>
      <Flex gap={8}>
        <Button type="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="primary" onClick={handleSave} loading={isSaving}>
          Save Changes
        </Button>
      </Flex>
    </Flex>
  }
>
  <Form>
    {/* Form content */}
  </Form>
</Modal>
```

#### Card Component

```typescript
import { Card } from '@cognite/cogs.js';
```

<!-- EXAMPLE -->
```tsx
// Basic card
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

// Interactive card with hover state
<Card
  hoverable
  onClick={handleCardClick}
  padding={24}
  borderRadius="large"
>
  <Flex direction="column" gap={16}>
    <Avatar src={user.avatar} size="large" />
    <div>
      <Typography variant="h4">{user.name}</Typography>
      <Typography variant="body-small" color="gray60">
        {user.role}
      </Typography>
    </div>
  </Flex>
</Card>

// Card with sections
<Card>
  <Card.Header>
    <Typography variant="h3">Settings</Typography>
  </Card.Header>
  <Card.Body>
    {/* Settings controls */}
  </Card.Body>
  <Card.Footer>
    <Button type="primary">Save Settings</Button>
  </Card.Footer>
</Card>
```

#### Table Component

```typescript
import { Table } from '@cognite/cogs.js';
```

<!-- EXAMPLE -->
```tsx
// Basic table
<Table>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Email</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
      <Table.HeaderCell>Actions</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {users.map(user => (
      <Table.Row key={user.id}>
        <Table.Cell>{user.name}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>
          <StatusChip type={user.status} />
        </Table.Cell>
        <Table.Cell>
          <Button type="ghost" size="small" onClick={() => editUser(user)}>
            Edit
          </Button>
        </Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>

// Sortable table with pagination
<Table
  sortable
  onSort={handleSort}
  sortBy={sortBy}
  sortDirection={sortDirection}
>
  {/* Table content */}
</Table>
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>
```

#### Navigation Components

```tsx
// TopBar
<TopBar>
  <TopBar.Logo>
    <ProductLogo product="cognite" />
  </TopBar.Logo>
  <TopBar.Navigation>
    <Button type="ghost">Dashboard</Button>
    <Button type="ghost">Projects</Button>
    <Button type="ghost">Settings</Button>
  </TopBar.Navigation>
  <TopBar.Actions>
    <Avatar src={user.avatar} />
  </TopBar.Actions>
</TopBar>

// Tabs
<Tabs value={activeTab} onChange={setActiveTab}>
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="details">Details</Tabs.Tab>
    <Tabs.Tab value="settings">Settings</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview">
    {/* Overview content */}
  </Tabs.Panel>
  <Tabs.Panel value="details">
    {/* Details content */}
  </Tabs.Panel>
  <Tabs.Panel value="settings">
    {/* Settings content */}
  </Tabs.Panel>
</Tabs>

// Breadcrumbs
<Breadcrumbs>
  <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
  <Breadcrumbs.Item href="/projects">Projects</Breadcrumbs.Item>
  <Breadcrumbs.Item>Current Project</Breadcrumbs.Item>
</Breadcrumbs>
```

#### Form Components

```tsx
// Complete form example
<form onSubmit={handleSubmit}>
  <Flex direction="column" gap={16}>
    <Input
      label="Full Name"
      name="fullName"
      value={formData.fullName}
      onChange={handleChange}
      required
    />
    
    <Input
      label="Email"
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
    />
    
    <Select
      label="Department"
      name="department"
      value={formData.department}
      onChange={(value) => setFormData({...formData, department: value})}
      options={departmentOptions}
    />
    
    <RadioGroup
      label="Employment Type"
      name="employmentType"
      value={formData.employmentType}
      onChange={handleChange}
      options={[
        { value: 'full-time', label: 'Full Time' },
        { value: 'part-time', label: 'Part Time' },
        { value: 'contract', label: 'Contract' }
      ]}
    />
    
    <DatePicker
      label="Start Date"
      value={formData.startDate}
      onChange={(date) => setFormData({...formData, startDate: date})}
      minDate={new Date()}
    />
    
    <Textarea
      label="Additional Notes"
      name="notes"
      value={formData.notes}
      onChange={handleChange}
      rows={4}
      maxLength={500}
      showCount
    />
    
    <Switch
      label="Send welcome email"
      checked={formData.sendWelcomeEmail}
      onChange={(e) => setFormData({...formData, sendWelcomeEmail: e.target.checked})}
    />
    
    <Flex gap={8} justify="flex-end">
      <Button type="secondary" onClick={handleCancel}>
        Cancel
      </Button>
      <Button type="primary" htmlType="submit" loading={isSubmitting}>
        Submit
      </Button>
    </Flex>
  </Flex>
</form>
```

#### Feedback Components

```tsx
// Toast notifications
import { toast } from '@cognite/cogs.js';

// Success toast
toast.success('File uploaded successfully');

// Error toast with action
toast.error('Upload failed', {
  action: {
    label: 'Retry',
    onClick: () => retryUpload()
  }
});

// Tooltip
<Tooltip content="This action cannot be undone" placement="top">
  <Button type="destructive">Delete</Button>
</Tooltip>

// Popconfirm
<Popconfirm
  title="Delete this item?"
  description="This action cannot be undone."
  onConfirm={handleDelete}
  okText="Delete"
  okType="destructive"
>
  <Button type="ghost-destructive">Delete</Button>
</Popconfirm>
```

### 7.4 Icon System

The Cogs icon library provides 800+ icons across different categories:

```typescript
import { 
  // System icons
  SearchIcon,
  SettingsIcon,
  UserIcon,
  ChevronDownIcon,
  
  // Document icons
  PdfIcon,
  ExcelIcon,
  WordIcon,
  
  // Illustrations
  EmptyStateIllustration,
  ErrorIllustration,
  
  // Themed icons
  CogniteIcon,
  DataFusionIcon
} from '@cognite/cogs-icons';
```

**Icon Sizing**:
```tsx
// Icons inherit size from parent font-size
<SearchIcon /> // Default 16px

// Custom sizing
<SearchIcon style={{ fontSize: 24 }} />
<SearchIcon style={{ width: 32, height: 32 }} />

// With color
<SearchIcon style={{ color: Colors.blue60 }} />
```

**Icon Categories**:
- **System Icons**: UI and action icons (arrow, edit, delete, etc.)
- **Document Icons**: File type indicators
- **Subapp Icons**: Product-specific icons
- **Themed Icons**: Brand and product logos
- **Illustrations**: Large decorative graphics

<!-- EXAMPLE -->
```tsx
// Icon button
<IconButton 
  icon={<EditIcon />}
  onClick={handleEdit}
  aria-label="Edit item"
/>

// Icon in button
<Button icon={<DownloadIcon />}>
  Download
</Button>

// Status with icon
import { getStatusIcon } from '@cognite/cogs-icons/utils';

const StatusIcon = getStatusIcon(status);
<StatusIcon color={getStatusColor(status)} />

// Loading states
<Loader size="large" />
<Skeleton variant="text" width={200} />
<Skeleton variant="circular" width={40} height={40} />
```

## Patterns & Best Practices

### 8.1 Common UI Patterns

#### Form Validation Pattern

```tsx
import { useState } from 'react';
import { Input, Button, Form } from '@cognite/cogs.js';

function ValidatedForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (name, value) => {
    switch(name) {
      case 'email':
        return !value ? 'Email is required' : 
               !value.includes('@') ? 'Invalid email' : '';
      case 'password':
        return !value ? 'Password is required' :
               value.length < 8 ? 'Password too short' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(values).forEach(key => {
      newErrors[key] = validate(key, values[key]);
    });
    setErrors(newErrors);
    
    if (!Object.values(newErrors).some(error => error)) {
      // Submit form
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="email"
        label="Email"
        value={values.email || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        status={errors.email ? 'error' : undefined}
        statusText={errors.email}
      />
      
      <Input
        name="password"
        type="password"
        label="Password"
        value={values.password || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        status={errors.password ? 'error' : undefined}
        statusText={errors.password}
      />
      
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </form>
  );
}
```

#### Loading States Pattern

```tsx
function DataLoader() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Flex direction="column" gap={16}>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="rectangular" height={200} />
        <Skeleton variant="text" width="40%" />
      </Flex>
    );
  }

  if (error) {
    return (
      <EmptyState
        illustration={<ErrorIllustration />}
        title="Failed to load data"
        description={error.message}
        action={
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        }
      />
    );
  }

  return <DataDisplay data={data} />;
}
```

#### Error Handling Pattern

```tsx
import { ErrorBoundary, EmptyState } from '@cognite/cogs.js';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <EmptyState
      illustration={<ErrorIllustration />}
      title="Something went wrong"
      description={error.message}
      action={
        <Button onClick={resetErrorBoundary}>
          Try again
        </Button>
      }
    />
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.href = '/'}
    >
      <YourApp />
    </ErrorBoundary>
  );
}
```

#### Empty States Pattern

```tsx
function EmptyDataState({ onAction }) {
  return (
    <EmptyState
      illustration={<EmptyStateIllustration />}
      title="No data found"
      description="Get started by creating your first item"
      action={
        <Button type="primary" onClick={onAction}>
          Create Item
        </Button>
      }
    />
  );
}
```

#### Data Table Pattern

```tsx
function DataTable({ data, columns }) {
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const itemsPerPage = 10;

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>
              <Checkbox
                checked={selectedRows.length === data.length}
                indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                onChange={handleSelectAll}
              />
            </Table.HeaderCell>
            {columns.map(column => (
              <Table.HeaderCell
                key={column.key}
                sortable={column.sortable}
                onSort={() => handleSort(column.key)}
              >
                {column.label}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {paginatedData.map(row => (
            <Table.Row key={row.id} selected={selectedRows.includes(row.id)}>
              <Table.Cell>
                <Checkbox
                  checked={selectedRows.includes(row.id)}
                  onChange={() => toggleRowSelection(row.id)}
                />
              </Table.Cell>
              {columns.map(column => (
                <Table.Cell key={column.key}>
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
```

### 8.2 Code Patterns

#### Component Composition

```tsx
// Compose complex components from primitives
function SearchableList({ items, onSelect }) {
  const [search, setSearch] = useState('');
  
  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Flex direction="column" gap={8}>
      <Input
        icon={<SearchIcon />}
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        clearable
      />
      
      <Card maxHeight={300} overflow="auto">
        {filteredItems.length === 0 ? (
          <EmptyState
            title="No results"
            description="Try adjusting your search"
          />
        ) : (
          <List>
            {filteredItems.map(item => (
              <List.Item
                key={item.id}
                onClick={() => onSelect(item)}
                hoverable
              >
                {item.label}
              </List.Item>
            ))}
          </List>
        )}
      </Card>
    </Flex>
  );
}
```

#### State Management Patterns

```tsx
// useReducer for complex state
function ComplexForm() {
  const initialState = {
    values: {},
    errors: {},
    touched: {},
    isSubmitting: false
  };

  function formReducer(state, action) {
    switch(action.type) {
      case 'SET_VALUE':
        return {
          ...state,
          values: { ...state.values, [action.field]: action.value }
        };
      case 'SET_ERROR':
        return {
          ...state,
          errors: { ...state.errors, [action.field]: action.error }
        };
      case 'SET_TOUCHED':
        return {
          ...state,
          touched: { ...state.touched, [action.field]: true }
        };
      case 'SUBMIT_START':
        return { ...state, isSubmitting: true };
      case 'SUBMIT_END':
        return { ...state, isSubmitting: false };
      case 'RESET':
        return initialState;
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(formReducer, initialState);

  // Form handling logic...
}
```

#### Event Handling Patterns

```tsx
// Debounced search
import { useMemo, useCallback } from 'react';
import { debounce } from 'lodash';

function SearchComponent() {
  const [results, setResults] = useState([]);

  const debouncedSearch = useMemo(
    () => debounce(async (query) => {
      const data = await searchAPI(query);
      setResults(data);
    }, 300),
    []
  );

  const handleSearch = useCallback((e) => {
    const query = e.target.value;
    if (query) {
      debouncedSearch(query);
    } else {
      setResults([]);
    }
  }, [debouncedSearch]);

  return (
    <Input
      placeholder="Search..."
      onChange={handleSearch}
    />
  );
}
```

#### Ref Forwarding

```tsx
// Custom component with ref forwarding
const CustomInput = React.forwardRef((props, ref) => {
  return (
    <Input
      ref={ref}
      {...props}
      className={classNames('custom-input', props.className)}
    />
  );
});

// Usage
function ParentComponent() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <CustomInput ref={inputRef} />;
}
```

#### Custom Hooks

```tsx
// Custom hook for Cogs components
import { useState, useEffect } from 'react';

function useCogsTheme() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setTheme(e.matches ? 'dark' : 'light');
    
    mediaQuery.addEventListener('change', handleChange);
    setTheme(mediaQuery.matches ? 'dark' : 'light');
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return theme;
}

// Usage
function ThemedComponent() {
  const theme = useCogsTheme();
  
  return (
    <Card className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
      Content
    </Card>
  );
}
```

## Styling & Theming

### 9.1 CSS/SCSS Usage

#### Importing Styles

```tsx
// Import all Cogs styles
import '@cognite/cogs.js/dist/cogs.css';

// Import specific package styles
import '@cognite/cogs-core/dist/cogs-core.css';
import '@cognite/cogs-icons/dist/cogs-icons.css';

// Import without global overrides
import '@cognite/cogs-core/dist/cogs-without-global-overrides.css';

// Import without fonts (use your own)
import '@cognite/cogs-core/dist/cogs-without-fonts.css';
```

#### Overriding Styles Safely

```scss
// Use CSS modules for component-specific styles
.customButton {
  // Use Cogs CSS variables for consistency
  --cogs-button-padding: 12px 24px;
  --cogs-button-border-radius: 8px;
  
  // Override specific properties
  &.cogs-button {
    font-weight: 600;
    text-transform: uppercase;
  }
}
```

```tsx
// Apply custom styles
import styles from './CustomButton.module.scss';

<Button className={styles.customButton}>
  Custom Styled Button
</Button>
```

#### Using SCSS Mixins

```scss
@import '@cognite/cogs-core/src/styles/mixins';

.custom-component {
  // Use Cogs mixins
  @include cogs-elevation(2);
  @include cogs-transition(all);
  @include cogs-focus-visible;
  
  // Responsive mixins
  @include cogs-breakpoint(md) {
    padding: 24px;
  }
}
```

### 9.2 Theming

#### Theme Provider Setup

```tsx
import { ConfigProvider, createTheme } from '@cognite/cogs.js';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#004d9e',
      light: '#4da1ff',
      dark: '#001d4a',
    },
    secondary: {
      main: '#6e41c6',
      light: '#b79ef3',
      dark: '#2d1858',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
  },
  spacing: 8, // Base spacing unit
});

function App() {
  return (
    <ConfigProvider theme={customTheme}>
      <YourApp />
    </ConfigProvider>
  );
}
```

#### Creating Custom Themes

```typescript
// Define custom theme
const darkTheme = {
  mode: 'dark',
  colors: {
    background: '#1a1a1a',
    surface: '#2d2d2d',
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
  // Override component-specific styles
  components: {
    Button: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        primary: {
          backgroundColor: '#4da1ff',
          '&:hover': {
            backgroundColor: '#3d91ef',
          },
        },
      },
    },
  },
};
```

#### Dynamic Theme Switching

```tsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ConfigProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </ConfigProvider>
  );
}
```

#### Component-Level Theming

```tsx
// Use themeProps for component-specific theming
<Button
  themeProps={{
    backgroundColor: Colors.aiPurple60,
    color: Colors.white,
    hoverBackgroundColor: Colors.aiPurple70,
  }}
>
  AI-Themed Button
</Button>

// Apply inverted theme to sections
<Card inverted>
  <Typography inverted>
    This content uses inverted colors
  </Typography>
</Card>
```

## Performance Guidelines

### Bundle Size Optimization

```javascript
// Import only what you need
import { Button, Input } from '@cognite/cogs-core';
// Instead of
import * as Cogs from '@cognite/cogs.js';

// Tree-shake icons
import SearchIcon from '@cognite/cogs-icons/system-icons/SearchIcon';
// Instead of
import { SearchIcon } from '@cognite/cogs-icons';
```

### Tree Shaking Configuration

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    usedExports: true,
    sideEffects: false,
  },
  resolve: {
    alias: {
      '@cognite/cogs.js': '@cognite/cogs.js/dist/esm',
    },
  },
};

// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'cogs-core': ['@cognite/cogs-core'],
          'cogs-icons': ['@cognite/cogs-icons'],
        },
      },
    },
  },
};
```

### Lazy Loading Components

```tsx
import { lazy, Suspense } from 'react';

// Lazy load heavy components
const DataGrid = lazy(() => import('@cognite/cogs-lab/components/DataGrid'));
const RichTextEditor = lazy(() => import('@cognite/cogs-lab/components/RichTextEditor'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <DataGrid />
    </Suspense>
  );
}
```

### Memoization Strategies

```tsx
import { memo, useMemo, useCallback } from 'react';

// Memoize expensive components
const ExpensiveList = memo(({ items, onSelect }) => {
  return (
    <List>
      {items.map(item => (
        <List.Item key={item.id} onClick={() => onSelect(item)}>
          {item.label}
        </List.Item>
      ))}
    </List>
  );
}, (prevProps, nextProps) => {
  return prevProps.items === nextProps.items;
});

// Memoize computed values
function DataProcessor({ data }) {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      computed: expensiveComputation(item),
    }));
  }, [data]);

  const handleClick = useCallback((item) => {
    console.log('Selected:', item);
  }, []);

  return <ExpensiveList items={processedData} onSelect={handleClick} />;
}
```

### Image and Icon Optimization

```tsx
// Use SVG icons for scalability
import { SearchIcon } from '@cognite/cogs-icons';

// Lazy load illustrations
const EmptyIllustration = lazy(() => 
  import('@cognite/cogs-icons/illustrations/EmptyStateIllustration')
);

// Optimize image loading
<Avatar
  src="/user-avatar.jpg"
  loading="lazy"
  fallback={<UserIcon />}
/>
```

## Testing

### Unit Testing Cogs Components

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@cognite/cogs.js';

describe('Button Component', () => {
  test('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('shows loading state', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  test('respects disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Integration Testing

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfigProvider } from '@cognite/cogs.js';

function FormComponent() {
  // Form implementation
}

describe('Form Integration', () => {
  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    
    render(
      <ConfigProvider>
        <FormComponent onSubmit={onSubmit} />
      </ConfigProvider>
    );

    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
```

### Accessibility Testing

```tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Modal } from '@cognite/cogs.js';

expect.extend(toHaveNoViolations);

describe('Modal Accessibility', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(
      <Modal isOpen title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('manages focus correctly', () => {
    render(
      <Modal isOpen title="Test Modal">
        <button>First button</button>
        <button>Second button</button>
      </Modal>
    );

    // Check focus is trapped within modal
    expect(document.activeElement).toHaveAttribute('role', 'dialog');
  });
});
```

### Visual Regression Testing

```javascript
// .storybook/test-runner.js
module.exports = {
  async postRender(page, context) {
    // Take screenshot for visual regression
    await page.screenshot({ 
      path: `screenshots/${context.id}.png`,
      fullPage: true 
    });
  },
};
```

## Migration & Upgrades

### Version Compatibility Matrix

| Cogs Version | React Version | TypeScript | Node.js | Breaking Changes |
|--------------|--------------|------------|---------|------------------|
| 10.x         | 18.x         | 5.x        | 20+     | Major API changes |
| 9.x          | 17.x, 18.x   | 4.x, 5.x   | 18+     | Component props |
| 8.x          | 17.x         | 4.x        | 16+     | Style system |

### Migration from v9 to v10

```tsx
// v9 (old)
import { Button } from '@cognite/cogs.js';
<Button variant="primary" size="md">Click</Button>

// v10 (new)
import { Button } from '@cognite/cogs.js';
<Button type="primary" size="medium">Click</Button>

// Component prop changes
// v9: variant -> v10: type
// v9: size="md" -> v10: size="medium"
// v9: color prop -> v10: use themeProps
```

### Breaking Changes by Version

#### v10.0.0
- Renamed `variant` prop to `type` across components
- Standardized size values (sm/md/lg -> small/medium/large)
- Removed deprecated color prop
- New ConfigProvider required for theming

#### v9.0.0
- React 18 support added
- Legacy component removal
- SCSS variable naming changes

### Deprecation Warnings

```tsx
// Deprecated patterns
<Button color="primary" />  // Use type="primary"
<Input appearance="filled" /> // Use variant="solid"
<Card shadow={2} /> // Use elevation prop

// Modern patterns
<Button type="primary" />
<Input variant="solid" />
<Card elevation={2} />
```

## Troubleshooting

### Common Issues and Solutions

#### TypeScript Errors

```typescript
// Error: Property 'CogsComponentProps' does not exist
// Solution: Ensure proper imports
import type { CogsComponentProps } from '@cognite/cogs-utils';

// Error: Type conflicts with React 18
// Solution: Update @types/react
yarn add @types/react@^18 @types/react-dom@^18
```

#### Build Issues

```bash
# Error: Cannot find module '@cognite/cogs.js/dist/cogs.css'
# Solution: Ensure correct import path
import '@cognite/cogs.js/dist/cogs.css';

# Error: SCSS compilation fails
# Solution: Install sass dependency
yarn add -D sass
```

#### Styling Issues

```scss
// Issue: Styles not applying
// Solution: Import CSS before component usage
import '@cognite/cogs.js/dist/cogs.css';
import App from './App';

// Issue: Global style conflicts
// Solution: Use scoped imports
import '@cognite/cogs-core/dist/cogs-without-global-overrides.css';
```

#### Browser Compatibility

```javascript
// Issue: IE11 support needed
// Solution: Add polyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Issue: CSS variables not working
// Solution: Use PostCSS plugin for fallbacks
```

#### Performance Issues

```tsx
// Issue: Large bundle size
// Solution: Import specific components
import Button from '@cognite/cogs-core/components/button';
import Input from '@cognite/cogs-core/components/input';

// Issue: Slow rendering
// Solution: Use React.memo and virtualization
const MemoizedList = memo(LargeList);
```

## AI Assistant Instructions

<!-- AI_INSTRUCTIONS_START -->
When working with the Cogs.js Design System:

1. **ALWAYS import from the correct package**
   - Components from `@cognite/cogs-core` or `@cognite/cogs.js`
   - Icons from `@cognite/cogs-icons`
   - Utilities from `@cognite/cogs-utils`

2. **Use semantic color tokens instead of hardcoded colors**
   ```tsx
   // ✅ Correct
   import { Colors } from '@cognite/cogs.js';
   <div style={{ color: Colors.blue60 }} />
   
   // ❌ Wrong
   <div style={{ color: '#004d9e' }} />
   ```

3. **Follow the spacing token system (8px grid)**
   ```tsx
   // ✅ Correct
   <Flex gap={16} padding={24}>
   
   // ❌ Wrong
   <Flex gap={15} padding={20}>
   ```

4. **Prefer composition over customization**
   ```tsx
   // ✅ Correct
   <Card>
     <Flex direction="column" gap={16}>
       <Typography variant="h3">Title</Typography>
       <Typography>Content</Typography>
     </Flex>
   </Card>
   
   // ❌ Wrong
   <div className="custom-card">
   ```

5. **Check component props interface before usage**
   - Use TypeScript for type safety
   - Reference the documentation for available props
   - Don't assume props exist based on other libraries

6. **Use TypeScript for all Cogs implementations**
   ```tsx
   // ✅ Correct
   interface Props {
     items: Array<{ id: string; label: string }>;
     onSelect: (item: { id: string; label: string }) => void;
   }
   ```

7. **Follow accessibility guidelines**
   - Always provide aria-labels for icon-only buttons
   - Use semantic HTML elements
   - Ensure keyboard navigation works
   - Maintain proper focus management

8. **Import styles at the application root**
   ```tsx
   // In main.tsx or App.tsx
   import '@cognite/cogs.js/dist/cogs.css';
   ```

9. **Use the ConfigProvider for theming**
   ```tsx
   // Wrap your app with ConfigProvider
   <ConfigProvider>
     <App />
   </ConfigProvider>
   ```

10. **Handle loading and error states properly**
    ```tsx
    if (loading) return <Loader />;
    if (error) return <EmptyState illustration={<ErrorIllustration />} />;
    return <YourComponent />;
    ```

11. **Use built-in form validation patterns**
    - Leverage status and statusText props
    - Show validation on blur or submit
    - Provide helpful error messages

12. **Optimize bundle size**
    - Import only needed components
    - Use dynamic imports for large components
    - Enable tree-shaking in build config

<!-- AI_INSTRUCTIONS_END -->

## Quick Reference

### Component Import Cheatsheet

```typescript
// Core components
import { 
  Button, Input, Select, Checkbox, Radio, Switch,
  Modal, Drawer, Tooltip, Popconfirm,
  Card, Flex, Grid, Divider,
  Table, List, Avatar, Tag,
  Typography, Link, Breadcrumbs,
  Loader, Skeleton, EmptyState
} from '@cognite/cogs.js';

// Icons
import {
  SearchIcon, SettingsIcon, UserIcon,
  CheckIcon, CloseIcon, ChevronDownIcon,
  EditIcon, DeleteIcon, DownloadIcon
} from '@cognite/cogs-icons';

// Utils
import {
  useClickOutside, useDebounce, useLocalStorage,
  classNames, formatDate, truncateText
} from '@cognite/cogs-utils';
```

### Common Prop Patterns

```typescript
// Size props
size: 'small' | 'medium' | 'large'

// Type/Variant props
type: 'primary' | 'secondary' | 'tertiary' | 'destructive'
variant: 'outline' | 'solid' | 'ghost'

// State props
disabled: boolean
loading: boolean
error: boolean

// Layout props
fullWidth: boolean
gap: number (8px units)
padding: number
margin: number
```

### Token Quick Reference

| Token Type | Values | Usage |
|------------|--------|-------|
| Colors | `Colors.blue60`, `Colors.gray30` | Text, backgrounds, borders |
| Spacing | 4, 8, 16, 24, 32, 48 | Gap, padding, margin |
| Typography | h1-h6, body, caption | Text hierarchy |
| Elevation | 1, 2, 3, 4 | Shadow depth |
| Radius | 2, 4, 8, 12, 16 | Border radius |

### Keyboard Shortcuts

| Component | Key | Action |
|-----------|-----|--------|
| Button | Enter/Space | Activate |
| Modal | Escape | Close |
| Select | Arrow keys | Navigate options |
| Tabs | Arrow keys | Switch tabs |
| Menu | Arrow keys | Navigate items |

### Useful Snippets

```tsx
// Form with validation
const [values, setValues] = useState({});
const [errors, setErrors] = useState({});

const handleSubmit = (e) => {
  e.preventDefault();
  if (validate(values)) {
    submitForm(values);
  }
};

// Responsive grid
<Grid cols={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap={16}>
  {items.map(item => <Card key={item.id}>{item.content}</Card>)}
</Grid>

// Toast notifications
toast.success('Action completed');
toast.error('Something went wrong');
toast.info('New update available');

// Loading wrapper
{loading ? (
  <Skeleton count={3} />
) : (
  <YourContent />
)}

// Error boundary
<ErrorBoundary fallback={<ErrorState />}>
  <YourApp />
</ErrorBoundary>
```

---

<!-- DOCUMENT_END -->

This document serves as the authoritative guide for the Cogs.js Design System. For additional resources:
- [Storybook Documentation](https://cog.link/cogs-storybook-v10)
- [Zeroheight Design Specs](https://zeroheight.com/37d494d9d/p/179e93-cogs)
- [GitHub Repository](https://github.com/cognitedata/cogs.js)

Last updated: 2024-12-24 | Cogs Version: 10.49.0
