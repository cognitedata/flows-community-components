import { Avatar, AvatarFallback } from '@cognite/aura/components';
import { cn } from '@cognite/aura/utils';
import type { CogniteClient } from '@cognite/sdk';
import { useQuery } from '@tanstack/react-query';
import {
  createContext,
  useContext,
  useMemo,
  type ComponentProps,
  type ReactNode,
} from 'react';

const SERVICE_PRINCIPAL = 'SERVICE_PRINCIPAL';
const PROFILE_STALE_TIME_MS = 5 * 60 * 1000;

const SdkContext = createContext<CogniteClient | null>(null);

export function UserAvatarSdkProvider({
  sdk,
  children,
}: {
  sdk: CogniteClient;
  children: ReactNode;
}) {
  return <SdkContext.Provider value={sdk}>{children}</SdkContext.Provider>;
}

export type UserProfile = {
  displayName?: string | null;
  identityType?: string | null;
};

export type UserProfileLookup = (
  userIdentifier: string
) => Promise<UserProfile | null>;

function isReportedMissing(error: unknown, userIdentifier: string): boolean {
  if (typeof error !== 'object' || error === null || !('missing' in error)) {
    return false;
  }
  const { missing } = error;
  return (
    Array.isArray(missing) &&
    missing.some((item) => item?.userIdentifier === userIdentifier)
  );
}

export function createUserProfileLookup(sdk: CogniteClient): UserProfileLookup {
  return async (userIdentifier) => {
    try {
      const profiles = await sdk.profiles.retrieve([{ userIdentifier }]);
      return profiles.find((p) => p.userIdentifier === userIdentifier) ?? null;
    } catch (error) {
      if (isReportedMissing(error, userIdentifier)) {
        return null;
      }
      throw error;
    }
  };
}

export function userProfileQueryKey(userIdentifier: string) {
  return ['user-avatar', 'profile', userIdentifier] as const;
}

export function useUserProfile(
  userIdentifier: string,
  lookup: UserProfileLookup | undefined
) {
  return useQuery({
    queryKey: userProfileQueryKey(userIdentifier),
    queryFn: () => lookup?.(userIdentifier) ?? null,
    enabled: lookup !== undefined && userIdentifier.length > 0,
    retry: false,
    staleTime: PROFILE_STALE_TIME_MS,
  });
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => Array.from(word)[0]?.toUpperCase() ?? '')
    .join('');
}

type UserAvatarProps = {
  userIdentifier: string;
  size?: ComponentProps<typeof Avatar>['sizes'];
  lookup?: UserProfileLookup;
  servicePrincipalLabel?: string;
  className?: string;
};

export function UserAvatar({
  userIdentifier,
  size = 'xsm',
  lookup,
  servicePrincipalLabel = 'Service principal',
  className,
}: UserAvatarProps) {
  const sdk = useContext(SdkContext);
  const sdkLookup = useMemo(
    () => (sdk ? createUserProfileLookup(sdk) : undefined),
    [sdk]
  );
  const { data: profile } = useUserProfile(userIdentifier, lookup ?? sdkLookup);
  const label =
    profile?.identityType === SERVICE_PRINCIPAL
      ? servicePrincipalLabel
      : profile?.displayName?.trim();

  if (!label) {
    return <span className={className}>{userIdentifier}</span>;
  }

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <Avatar sizes={size}>
        <AvatarFallback>{getInitials(label)}</AvatarFallback>
      </Avatar>
      <span>{label}</span>
    </span>
  );
}
