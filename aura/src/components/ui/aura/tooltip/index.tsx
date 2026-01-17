/**
 * Tooltip Component
 *
 * A popup that displays information related to an element
 * when the element receives keyboard focus or mouse hover,
 * built on Radix Tooltip primitives.
 *
 * @example
 * import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/aura/tooltip';
 *
 * <Tooltip>
 *   <TooltipTrigger>Hover me</TooltipTrigger>
 *   <TooltipContent>Tooltip text</TooltipContent>
 * </Tooltip>
 */
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './tooltip';
export { TooltipMetadata } from './tooltip.metadata';
