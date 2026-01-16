/**
 * Command Component
 *
 * A command menu component for searchable command palettes, built with cmdk.
 *
 * @example
 * import { Command, CommandInput, CommandList, CommandItem } from '@/components/ui/aura/command';
 *
 * <Command>
 *   <CommandInput placeholder="Search..." />
 *   <CommandList>
 *     <CommandItem>Item 1</CommandItem>
 *   </CommandList>
 * </Command>
 */
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from './command';
export { CommandMetadata } from './command.metadata';
