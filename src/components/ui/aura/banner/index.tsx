/**
 * Banner Component
 *
 * A banner component for displaying important messages with icon, title, status, and actions.
 *
 * @example
 * import { Banner, BannerTitle, BannerIcon } from '@/components/ui/aura/banner';
 *
 * <Banner>
 *   <BannerIcon icon={IconInfoCircle} />
 *   <BannerTitle>Important notice</BannerTitle>
 * </Banner>
 */
export {
  Banner,
  BannerIcon,
  BannerTitle,
  BannerStatus,
  BannerActions,
  BannerAction,
  BannerClose,
  BannerContext,
} from "./banner";
export type {
  BannerProps,
  BannerIconProps,
  BannerTitleProps,
  BannerStatusProps,
  BannerActionsProps,
  BannerActionProps,
  BannerCloseProps,
} from "./banner";
export { BannerMetadata } from "./banner.metadata";
