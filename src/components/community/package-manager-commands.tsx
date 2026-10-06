import { CodeBlock, CodeBlockCopyButton } from '@cognite/aura/components';
import { useSyncExternalStore } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DEFAULT_PACKAGE_MANAGER,
  PACKAGE_MANAGERS,
  type PackageManager,
  type PackageManagerCommands,
} from '@/lib/install-snippets';

const STORAGE_KEY = 'aura-package-manager';
const listeners = new Set<() => void>();

function isPackageManager(value: unknown): value is PackageManager {
  return PACKAGE_MANAGERS.includes(value as PackageManager);
}

function readPackageManager(): PackageManager {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isPackageManager(stored) ? stored : DEFAULT_PACKAGE_MANAGER;
  } catch {
    return DEFAULT_PACKAGE_MANAGER;
  }
}

function writePackageManager(manager: PackageManager) {
  try {
    window.localStorage.setItem(STORAGE_KEY, manager);
  } catch {
    // Storage unavailable (private mode); selection still applies in memory.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Selected package manager, shared by every command block on the page. */
function usePackageManager() {
  return useSyncExternalStore(
    subscribe,
    readPackageManager,
    () => DEFAULT_PACKAGE_MANAGER
  );
}

export function CommandBlock({ code }: { code: string }) {
  return (
    <CodeBlock code={code} language="bash">
      <CodeBlockCopyButton />
    </CodeBlock>
  );
}

/** Command for the selected package manager, without a tab bar. */
export function PackageManagerCommand({
  commands,
}: {
  commands: PackageManagerCommands;
}) {
  return <CommandBlock code={commands[usePackageManager()]} />;
}

export function PackageManagerCommandTabs({
  commands,
}: {
  commands: PackageManagerCommands;
}) {
  const manager = usePackageManager();

  return (
    <Tabs
      value={manager}
      onValueChange={(value) => {
        if (isPackageManager(value)) {
          writePackageManager(value);
        }
      }}
    >
      <TabsList>
        {PACKAGE_MANAGERS.map((pm) => (
          <TabsTrigger key={pm} value={pm}>
            {pm}
          </TabsTrigger>
        ))}
      </TabsList>
      {PACKAGE_MANAGERS.map((pm) => (
        <TabsContent key={pm} value={pm} className="mt-2">
          <CommandBlock code={commands[pm]} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
