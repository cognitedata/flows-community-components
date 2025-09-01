# Prompt for Creating AGENTS.md for Cogs.js Design System

## Objective
Create a comprehensive AGENTS.md file for the cogs.js repository that serves as an authoritative guide for AI coding assistants (Cursor, Claude Code, GitHub Copilot) and junior developers working with the Cogs Design System.

## Context
The cogs.js repository is a React-based design system developed by Cognite, used for building consistent user interfaces in Figma and frontend applications. The primary users are designers and frontend engineers. The repository contains multiple packages including core components, icons, utilities, and experimental components.

## Requirements

### Document Structure & Format
- Use clear hierarchical sections with descriptive headers
- Include a table of contents at the beginning
- Use code blocks with appropriate language syntax highlighting
- Provide inline code comments for complex examples
- Use consistent formatting and naming conventions throughout
- Include semantic HTML-like tags for AI parsing (e.g., `<!-- IMPORTANT -->`, `<!-- EXAMPLE -->`, `<!-- WARNING -->`)

### Content Sections Required

#### 1. Executive Summary
- Brief overview of Cogs Design System (2-3 sentences)
- Key packages and their purposes (@cognite/cogs-core, @cognite/cogs-icons, @cognite/cogs-utils, @cognite/cogs-lab)
- Primary use cases and target audience

#### 2. Quick Start Guide
- Prerequisites (Node.js version, package manager)
- Installation commands for different packages
- Basic setup example with minimal configuration
- First component usage example with imports

#### 3. Development Environment Setup
- Complete development environment setup instructions
- Required dependencies and versions
- Configuration files needed (tsconfig.json, package.json examples)
- Local development server setup
- Storybook integration instructions
- Testing environment setup

#### 4. Design System Architecture
- Package structure explanation with directory tree
- Module organization and export patterns
- TypeScript configuration and type definitions
- SCSS/CSS architecture and theming approach
- Build system overview

#### 5. Design Principles & Philosophy
- Core design principles (consistency, accessibility, performance)
- When to use Cogs vs custom components
- Component composition patterns
- Responsive design approach
- Accessibility standards (WCAG compliance level)

#### 6. Design Tokens Deep Dive

##### 6.1 Color Tokens
- Complete color token reference with hex values
- Semantic color usage (primary, secondary, danger, success, etc.)
- Theme variations (light/dark mode if applicable)
- AI gradients and special colors
- Code examples showing proper token usage:
  ```tsx
  import { Colors } from '@cognite/cogs-core';
  // Show usage in components
  ```

##### 6.2 Typography Tokens
- Font families, sizes, weights, line heights
- Typography scale and hierarchy
- Text component usage patterns
- Responsive typography guidelines
- Code examples for each typography variant

##### 6.3 Spacing Tokens
- Spacing scale (4px, 8px, 12px, etc.)
- Layout spacing vs component spacing
- Grid system if applicable
- Margin and padding conventions
- Code examples demonstrating proper spacing

##### 6.4 Other Tokens
- Elevation/shadow tokens
- Border radius tokens
- Animation/transition tokens
- Breakpoint tokens for responsive design

#### 7. Component Library Guide

##### 7.1 Component Categories
- List all component categories (Forms, Navigation, Feedback, Layout, etc.)
- Brief description of each category's purpose

##### 7.2 Component Documentation Template
For EACH component, provide:
- Component name and import statement
- Purpose and use cases
- Props interface with TypeScript definitions
- Required vs optional props
- Default prop values
- Accessibility considerations
- Do's and Don'ts
- At least 3 code examples showing:
  - Basic usage
  - Advanced configuration
  - Common patterns
- Related components
- Migration notes if applicable

##### 7.3 Core Components (Prioritize most common)
Detail these essential components with full examples:
- Button (all variants: primary, secondary, destructive, etc.)
- Input fields (text, number, password, etc.)
- Select/Dropdown
- Checkbox and Radio
- Modal/Dialog
- Card
- Table
- Navigation components
- Form components
- Feedback components (alerts, toasts, etc.)

##### 7.4 Icon System
- How to import and use icons
- Available icon categories
- Icon sizing and styling
- Custom icon integration
- Code examples for different icon use cases

#### 8. Patterns & Best Practices

##### 8.1 Common UI Patterns
- Form validation patterns
- Loading states
- Error handling
- Empty states
- Data tables with sorting/filtering
- Search interfaces
- Navigation patterns

##### 8.2 Code Patterns
- Component composition examples
- State management within Cogs components
- Event handling patterns
- Ref forwarding examples
- Custom hooks usage

#### 9. Styling & Theming

##### 9.1 CSS/SCSS Usage
- How to import Cogs styles
- Overriding default styles safely
- Using SCSS mixins and variables
- CSS-in-JS considerations

##### 9.2 Theming
- Theme provider setup
- Creating custom themes
- Dynamic theme switching
- Component-level theming

#### 10. Performance Guidelines
- Bundle size optimization
- Tree shaking configuration
- Lazy loading components
- Memoization strategies
- Image and icon optimization

#### 11. Testing
- Unit testing Cogs components
- Integration testing patterns
- Accessibility testing
- Visual regression testing with Storybook

#### 12. Migration & Upgrades
- Version compatibility matrix
- Breaking changes by version
- Migration guides for major versions
- Deprecation warnings and alternatives

#### 13. Troubleshooting
- Common issues and solutions
- TypeScript errors and fixes
- Build and compilation issues
- Browser compatibility notes
- Performance debugging

#### 14. AI Assistant Instructions
Special section with explicit instructions for AI models:
```markdown
<!-- AI_INSTRUCTIONS_START -->
When using Cogs.js components:
1. Always import from the correct package (@cognite/cogs-core for components)
2. Use semantic color tokens instead of hardcoded colors
3. Follow the spacing token system for consistency
4. Prefer composition over customization
5. Check component props interface before usage
6. Use TypeScript for type safety
7. Follow accessibility guidelines for all implementations
<!-- AI_INSTRUCTIONS_END -->
```

#### 15. Quick Reference
- Component import cheatsheet
- Common prop patterns
- Token quick reference table
- Keyboard shortcuts
- Useful snippets

### Example Quality Requirements

Each code example must:
1. Be complete and runnable (include all imports)
2. Follow TypeScript best practices
3. Include comments explaining key concepts
4. Show both simple and complex use cases
5. Demonstrate proper error handling where applicable
6. Be formatted consistently

### Example Structure Template:
```tsx
// Basic Example
import { Button } from '@cognite/cogs-core';

function MyComponent() {
  return (
    <Button 
      type="primary"
      size="medium"
      onClick={() => console.log('Clicked')}
    >
      Click me
    </Button>
  );
}

// Advanced Example with all props
import { Button, Colors } from '@cognite/cogs-core';
import { PlaceholderIcon } from '@cognite/cogs-icons';

function AdvancedButtonExample() {
  return (
    <Button
      type="primary"
      size="large"
      icon={<PlaceholderIcon />}
      iconPlacement="left"
      disabled={false}
      loading={false}
      fullWidth={true}
      onClick={(e) => {
        e.preventDefault();
        // Handle click
      }}
      aria-label="Submit form"
      data-testid="submit-button"
    >
      Submit
    </Button>
  );
}
```

## Success Criteria

The AGENTS.md file will be considered successful when:
1. An AI model can understand and correctly implement any Cogs component without additional documentation
2. A junior developer can set up and use the design system within 30 minutes
3. All code examples are error-free and follow best practices
4. The document serves as the single source of truth for Cogs.js usage
5. It reduces the need for external documentation lookups by 90%

## Additional Notes
- Prioritize clarity over brevity
- Use consistent terminology throughout
- Include version numbers where relevant
- Add timestamps for time-sensitive information
- Consider adding a glossary for technical terms
- Include links to Storybook examples where available
- Reference the Zeroheight documentation for design specifications

## Deliverable
A single AGENTS.md file that is:
- Self-contained and comprehensive
- Optimized for AI parsing and understanding
- Structured for quick navigation and reference
- Rich with practical, production-ready examples
- Maintainable and easy to update
