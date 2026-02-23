import type { CodeExample } from './component-metadata.types';
import type { ComponentStatusType } from './component-status-config';

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
  apiReference?: {
    props: PropDefinition[];
  };
  relatedComponents?: string[];
  notes?: string[];
  codeExamples?: CodeExample[];
}
