import { Avatar, AvatarFallback } from '@cognite/aura/components';
import type { CogniteClient } from '@cognite/sdk';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, type ReactNode } from 'react';

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

function useSDK(): CogniteClient {
  const sdk = useContext(SdkContext);
  if (!sdk) {
    throw new Error(
      'UserAvatar needs a lookup prop or a UserAvatarSdkProvider ancestor'
    );
  }
  return sdk;
}

export type UserProfileLookup = (
  userIdentifier: string
) => Promise<{ displayName?: string | null } | null>;

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
  className?: string;
};

function ResolvedUserAvatar({
  userIdentifier,
  lookup,
  className,
}: UserAvatarProps & { lookup: UserProfileLookup }) {
  const { data } = useUserProfile(userIdentifier, lookup);
  const displayName = data?.displayName?.trim();

  if (!displayName) {
    return <span className={className}>{userIdentifier}</span>;
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ''}`}>
      <Avatar sizes="xsm">
        <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
      </Avatar>
      <span>{displayName}</span>
    </span>
  );
}

function SdkUserAvatar(props: UserAvatarProps) {
  const sdk = useSDK();
  return (
    <ResolvedUserAvatar {...props} lookup={createUserProfileLookup(sdk)} />
  );
}

export function UserAvatar(props: UserAvatarProps) {
  if (props.lookup) {
    return <ResolvedUserAvatar {...props} lookup={props.lookup} />;
  }
  return <SdkUserAvatar {...props} />;
}
