/**
 * Pagination Component
 *
 * A pagination component for navigating multi-page content.
 *
 * @example
 * import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/aura/pagination';
 *
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationLink href="#">1</PaginationLink>
 *     </PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 */
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationSelectTrigger,
  PaginationLink,
  PaginationItem,
  PaginationFirst,
  PaginationLast,
  PaginationPrevious,
  PaginationNext,
  PaginationStatus,
  paginationEllipsisVariants,
  paginationLinkVariants,
  paginationStatusVariants,
} from "./pagination";
export { PaginationMetadata } from "./pagination.metadata";
