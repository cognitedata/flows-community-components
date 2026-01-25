/**
 * Card Component
 *
 * A flexible card layout with header, icon, content, actions dropdown, and footer slots.
 *
 * @example
 * import { Card, CardHeader, CardIcon, CardTitle, CardHeaderRight, CardActions, CardContent } from '@/components/ui/aura/card';
 * import { DropdownMenuItem } from '@/components/ui/aura/dropdown-menu';
 *
 * <Card>
 *   <CardHeader>
 *     <CardIcon>
 *       <Badge variant="mountain"><IconCube /></Badge>
 *     </CardIcon>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *     <CardHeaderRight>
 *       <CardActions>
 *         <DropdownMenuItem>Edit</DropdownMenuItem>
 *       </CardActions>
 *     </CardHeaderRight>
 *   </CardHeader>
 *   <CardContent>Content here</CardContent>
 * </Card>
 *
 * @example Custom header right element
 * <CardHeader>
 *   <CardTitle>Title</CardTitle>
 *   <CardHeaderRight>
 *     <Badge variant="fjord">Custom</Badge>
 *   </CardHeaderRight>
 * </CardHeader>
 */
export {
  Card,
  CardHeader,
  CardIcon,
  CardHeaderRight,
  CardFooter,
  CardTitle,
  CardActions,
  CardDescription,
  CardContent,
} from "./card";
export { CardMetadata } from "./card.metadata";
