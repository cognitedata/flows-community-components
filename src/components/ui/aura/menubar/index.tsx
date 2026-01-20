/**
 * Menubar Component
 *
 * A horizontal menu bar component built on Radix Menubar primitives.
 *
 * @example
 * import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from '@/components/ui/aura/menubar';
 *
 * <Menubar>
 *   <MenubarMenu>
 *     <MenubarTrigger>File</MenubarTrigger>
 *     <MenubarContent>
 *       <MenubarItem>New</MenubarItem>
 *     </MenubarContent>
 *   </MenubarMenu>
 * </Menubar>
 */
export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "./menubar";
export { MenubarMetadata } from "./menubar.metadata";
