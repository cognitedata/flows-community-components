/**
 * Select Component
 *
 * A select dropdown component built on Radix Select primitives.
 *
 * @example
 * import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@cognite/aura/select';
 *
 * <Select>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Select..." />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="1">Option 1</SelectItem>
 *   </SelectContent>
 * </Select>
 */
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";
export { SelectMetadata } from "./select.metadata";
