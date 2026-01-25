/**
 * Card Component
 *
 * A flexible card layout with header, content, actions dropdown, and footer slots.
 *
 * @example
 * import { Card, CardHeader, CardTitle, CardActions, CardContent } from '@/components/ui/aura/card';
 * import { DropdownMenuItem } from '@/components/ui/aura/dropdown-menu';
 *
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardActions>
 *       <DropdownMenuItem>Edit</DropdownMenuItem>
 *     </CardActions>
 *   </CardHeader>
 *   <CardContent>Content here</CardContent>
 * </Card>
 */
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardActions,
  CardDescription,
  CardContent,
} from "./card";
export { CardMetadata } from "./card.metadata";
