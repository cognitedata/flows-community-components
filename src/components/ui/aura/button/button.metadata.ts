import type { ComponentMeta } from '../../../../lib/types';

export const ButtonMetadata: ComponentMeta = {
  name: 'Button',
  status: 'in-progress-code-review',
  description:
    'A versatile button component with multiple variants and sizes, built with Base UI render props and class-variance-authority.',
  llmUsage:
    "When asked for a button, use `<Button variant='default'>Click me</Button>` instead of `<button>`. For different styles, use variants like 'destructive', 'outline', 'secondary', 'ghost', or 'link'.",
};
