import {
  Badge,
  Button,
  CodeBlock,
  CodeBlockCopyButton,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
} from '@cognite/aura/components';
import { Link, Navigate, useParams } from 'react-router-dom';

import { StoriesRenderer } from '@/components/stories-renderer';
import {
  getCommunityComponent,
  getCommunityInstallCommands,
} from '@/lib/community-catalog';
import { getStatusLabel } from '@/lib/component-status';

export default function CommunityComponentPage() {
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? getCommunityComponent(slug) : undefined;

  if (!item || !slug) {
    return <Navigate to="/community" replace />;
  }

  const installCommands = getCommunityInstallCommands(slug);

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            {item.name}
          </h1>
          <Badge variant="gray" outline>
            {getStatusLabel(item.status)}
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground">{item.description}</p>
        {item.notes?.map((note) => (
          <p key={note} className="text-sm text-muted-foreground">
            {note}
          </p>
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Installation
        </h2>
        <Tabs defaultValue="pnpm">
          <TabsList>
            <TabsTrigger value="pnpm">pnpm</TabsTrigger>
            <TabsTrigger value="npm">npm</TabsTrigger>
            <TabsTrigger value="yarn">yarn</TabsTrigger>
            <TabsTrigger value="bun">bun</TabsTrigger>
          </TabsList>
          {(
            [
              ['pnpm', installCommands.pnpm],
              ['npm', installCommands.npm],
              ['yarn', installCommands.yarn],
              ['bun', installCommands.bun],
            ] as const
          ).map(([manager, command]) => (
            <TabsPanel key={manager} value={manager} className="mt-4">
              <CodeBlock code={command} language="bash">
                <CodeBlockCopyButton />
              </CodeBlock>
            </TabsPanel>
          ))}
        </Tabs>
        <p className="text-sm text-muted-foreground">
          Requires the <code className="text-foreground">@aura</code> registry
          in your <code className="text-foreground">components.json</code>. See{' '}
          <Link
            to="/community/installation"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            installation
          </Link>
          .
        </p>
      </section>

      {item.llmUsage ? (
        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Usage
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {item.llmUsage}
          </p>
        </section>
      ) : null}

      <section className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Examples
        </h2>
        <StoriesRenderer slug={slug} />
        <Button
          variant="outline"
          render={
            <a
              href={item.storybookPath}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Storybook
            </a>
          }
        />
      </section>
    </div>
  );
}
