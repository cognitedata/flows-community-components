import type { ComponentMeta } from '../../../../lib/types';

export const UserAvatarMetadata: ComponentMeta = {
  name: 'User Avatar',
  status: 'experimental',
  description:
    'Avatar and display name for a CDF user, resolved from an IAM identifier with a raw-id fallback.',
  llmUsage:
    'Use `<UserAvatar userIdentifier={id} />` inside a React Query provider and a `UserAvatarSdkProvider` (or pass a `lookup`). Shows initials and display name when the profile resolves, otherwise the raw identifier. For large lists, call `sdk.profiles.retrieve` once for the distinct ids and seed the cache with `queryClient.setQueryData(userProfileQueryKey(id), profile ?? null)` for each id before rendering; each avatar then reads from the cache and makes no request.',
  notes: [
    'Does not replace the Core Avatar.',
    'Does not list profiles; resolves one identifier.',
    'Does not surface an error state; failed lookups render the raw identifier.',
    'Does not render email or job title.',
    'Does not batch requests. Each instance resolves one id; to avoid one request per row, seed the React Query cache with `userProfileQueryKey(id)` after a single batched `profiles.retrieve`. Respect the API limit on ids per call, and cache nothing if the batch fails.',
  ],
};
