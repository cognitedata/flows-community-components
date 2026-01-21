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
  PaginationLink,
  PaginationItem,
  PaginationFirst,
  PaginationLast,
  PaginationPrevious,
  PaginationNext,
  paginationEllipsisVariants,
  paginationLinkVariants,
} from "./pagination";
export { PaginationMetadata } from "./pagination.metadata";
