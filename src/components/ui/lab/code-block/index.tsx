/**
 * Code Block Component
 *
 * A syntax-highlighted code block with copy and collapse functionality.
 *
 * @example
 * import { CodeBlock, CodeBlockCopyButton, CodeBlockCollapseButton } from '@cognite/aura-lab/code-block';
 */
export {
  CodeBlock,
  CodeBlockCopyButton,
  CodeBlockCollapseButton,
  // eslint-disable-next-line react-refresh/only-export-components
  highlightCode,
} from "./code-block";
export type {
  CodeBlockCopyButtonProps,
  CodeBlockCollapseButtonProps,
} from "./code-block";
export { CodeBlockMetadata } from "./code-block.metadata";
