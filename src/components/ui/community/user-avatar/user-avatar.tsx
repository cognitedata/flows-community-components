import { Avatar, AvatarFallback } from '@cognite/aura/components';
import { cn } from '@cognite/aura/utils';
import type { CogniteClient } from '@cognite/sdk';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useMemo, type ReactNode } from 'react';

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

function getMissingIds(error: unknown): Set<string> {
  const missing =
    typeof error === 'object' && error !== null && 'missing' in error
      ? error.missing
      : undefined;
  const ids = new Set<string>();
  if (Array.isArray(missing)) {
    for (const item of missing) {
      if (typeof item?.userIdentifier === 'string') {
        ids.add(item.userIdentifier);
      }
    }
  }
  return ids;
}

export function createUserProfileLookup(sdk: CogniteClient): UserProfileLookup {
  return async (userIdentifier) => {
    let pending = [userIdentifier];
    while (pending.length > 0) {
      try {
        const profiles = await sdk.profiles.retrieve(
          pending.map((id) => ({ userIdentifier: id }))
        );
        return (
          profiles.find((p) => p.userIdentifier === userIdentifier) ?? null
        );
      } catch (error) {
        const missingIds = getMissingIds(error);
        const remaining = pending.filter((id) => !missingIds.has(id));
        if (remaining.length === pending.length) {
          throw error;
        }
        pending = remaining;
      }
    }
    return null;
  };
}

export function useUserProfile(
  userIdentifier: string,
  lookup: UserProfileLookup | undefined
) {
  return useQuery({
    queryKey: ['user-avatar', 'profile', userIdentifier],
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
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}

type UserAvatarProps = {
  userIdentifier: string;
  lookup?: UserProfileLookup;
  servicePrincipalLabel?: string;
  className?: string;
};

function ResolvedUserAvatar({
  userIdentifier,
  lookup,
  servicePrincipalLabel = 'Service principal',
  className,
}: UserAvatarProps) {
  const { data: profile } = useUserProfile(userIdentifier, lookup);
  const label =
    profile?.identityType === SERVICE_PRINCIPAL
      ? servicePrincipalLabel
      : profile?.displayName?.trim();

  if (!label) {
    return <span className={className}>{userIdentifier}</span>;
  }

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <Avatar sizes="xsm">
        <AvatarFallback>{getInitials(label)}</AvatarFallback>
      </Avatar>
      <span>{label}</span>
    </span>
  );
}

function SdkUserAvatar(props: UserAvatarProps) {
  const sdk = useContext(SdkContext);
  const lookup = useMemo(
    () => (sdk ? createUserProfileLookup(sdk) : undefined),
    [sdk]
  );
  return <ResolvedUserAvatar {...props} lookup={lookup} />;
}

export function UserAvatar(props: UserAvatarProps) {
  return props.lookup ? (
    <ResolvedUserAvatar {...props} />
  ) : (
    <SdkUserAvatar {...props} />
  );
}
