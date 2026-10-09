import { Avatar, AvatarFallback } from '@cognite/aura/components';
import { cn } from '@cognite/aura/utils';
import type { CogniteClient } from '@cognite/sdk';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useMemo, type ReactNode } from 'react';

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

export type UserProfileLookup = (userIdentifier: string) => Promise<{
  displayName?: string | null;
  identityType?: string | null;
} | null>;

type MissingItem = { userIdentifier?: string };

function getMissing(error: unknown): MissingItem[] {
  const missing = (error as { missing?: unknown } | null)?.missing;
  return Array.isArray(missing) ? (missing as MissingItem[]) : [];
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
        const missingIds = new Set(
          getMissing(error).map((item) => item.userIdentifier)
        );
        const remaining = pending.filter((id) => !missingIds.has(id));
        if (missingIds.size === 0 || remaining.length === pending.length) {
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
  lookup: UserProfileLookup
) {
  return useQuery({
    queryKey: ['user-avatar', 'profile', userIdentifier],
    queryFn: () => lookup(userIdentifier),
    enabled: userIdentifier.length > 0,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
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
}: UserAvatarProps & { lookup: UserProfileLookup }) {
  const { data } = useUserProfile(userIdentifier, lookup);
  const displayName =
    data?.identityType === 'SERVICE_PRINCIPAL'
      ? servicePrincipalLabel
      : data?.displayName?.trim();

  if (!displayName) {
    return <span className={className}>{userIdentifier}</span>;
  }

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <Avatar sizes="xsm">
        <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
      </Avatar>
      <span>{displayName}</span>
    </span>
  );
}

const noProfile: UserProfileLookup = async () => null;

function SdkUserAvatar(props: UserAvatarProps) {
  const sdk = useContext(SdkContext);
  const lookup = useMemo(
    () => (sdk ? createUserProfileLookup(sdk) : noProfile),
    [sdk]
  );
  return <ResolvedUserAvatar {...props} lookup={lookup} />;
}

export function UserAvatar(props: UserAvatarProps) {
  if (props.lookup) {
    return <ResolvedUserAvatar {...props} lookup={props.lookup} />;
  }
  return <SdkUserAvatar {...props} />;
}
