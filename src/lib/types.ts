export interface ComponentExample {
  title: string;
  description: string;
  component: React.ComponentType;
  code: string;
  tags?: string[];
  difficulty?: "beginner" | "intermediate" | "advanced";
  notes?: string;
  category?: "usage" | "variants" | "advanced";
}

export type ComponentExamples = Record<string, ComponentExample>;

// API Reference types
export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface ComponentMeta {
  name: string;
  description: string;
  /** Component status - defaults to 'draft' if not specified */
  status?: ComponentStatusType;
  llmUsage?: string;
  importPath: string;
  apiReference?: {
    props: PropDefinition[];
  };
  relatedComponents?: string[];
  notes?: string[];
  codeExamples?: CodeExample[];
}

export interface CodeExample {
  /** Title of the code example */
  title: string;
  /** Optional description */
  description?: string;
  /** The actual code string */
  code: string;
}

export type ComponentStatusType =
  | "deprecated"
  | "planned"
  | "shadcn-ui"
  | "experimental"
  | "draft"
  | "in-progress-storybook"
  | "in-progress-code-review"
  | "in-progress-chromatic"
  | "in-progress-design-conformance"
  | "ready-for-ga"
  | "stable";

export interface StatusConfig {
  label: string;
  color: string; // hex color for light mode text
  colorDark: string; // hex color for dark mode text
  bgColor: string; // background hex for light mode
  bgColorDark: string; // background hex for dark mode
  borderColor: string; // border hex for light mode
  borderColorDark: string; // border hex for dark mode
}
