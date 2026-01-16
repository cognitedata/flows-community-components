/**
 * Context Menu Component
 *
 * A right-click context menu built on Radix Context Menu primitives.
 *
 * @example
 * import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from '@/components/ui/aura/context-menu';
 *
 * <ContextMenu>
 *   <ContextMenuTrigger>Right click here</ContextMenuTrigger>
 *   <ContextMenuContent>
 *     <ContextMenuItem>Action 1</ContextMenuItem>
 *   </ContextMenuContent>
 * </ContextMenu>
 */
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from './context-menu';
export { ContextMenuMetadata } from './context-menu.metadata';
