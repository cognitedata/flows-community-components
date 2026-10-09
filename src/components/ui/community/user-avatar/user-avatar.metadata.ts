import type { ComponentMeta } from '../../../../lib/types';

export const UserAvatarMetadata: ComponentMeta = {
  name: 'User Avatar',
  status: 'experimental',
  description:
    'Avatar and display name for a CDF user, resolved from an IAM identifier with a raw-id fallback.',
  llmUsage:
    'Use `<UserAvatar userIdentifier={id} />` inside a React Query provider and a `UserAvatarSdkProvider` (or pass a `lookup`). Shows initials and display name when the profile resolves, otherwise the raw identifier.',
  notes: [
    'Does not replace the Core Avatar.',
    'Does not list profiles; resolves one identifier.',
    'Does not surface an error state; failed lookups render the raw identifier.',
    'Does not render email or job title.',
  ],
};
