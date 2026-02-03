import type { ComponentMeta } from "@/lib/component-examples";

/**
 * Artifact - List Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const ArtifactListMetadata: ComponentMeta = {
  name: "ArtifactList",

  description:
    "A compositional list artifact widget component that displays timeline-style items with optional headers. Uses List primitives directly for item content.",

  llmUsage:
    "When showing list artifacts, compose `<ArtifactList>` with `<ArtifactListHeader>`, `<ArtifactListTitle>`, `<ArtifactListContent>`, and `<ArtifactListItem>`. Use List primitives (`<ListItemTitle>`, `<ListItemDescription>`, `<ListItemStatus>`, `<ListItemIcon>`) for item content. Set `variant` on `<ArtifactListItem>` to apply status colors/icons automatically.",

  importPath: "@cognite/aura-lab/artifact-list",

  codeExamples: [
    {
      title: "Basic List Artifact",
      description: "A list widget showing timeline items with a header.",
      code: `import {
  ArtifactList,
  ArtifactListHeader,
  ArtifactListTitle,
  ArtifactListContent,
  ArtifactListItem,
  ListItemDescription,
  ListItemStatus,
  ListItemTitle,
} from "@cognite/aura-lab/artifact-list"

export function BasicDemo() {
  return (
    <ArtifactList>
      <ArtifactListHeader>
        <ArtifactListTitle>System Tasks</ArtifactListTitle>
      </ArtifactListHeader>
      <ArtifactListContent>
        <ArtifactListItem variant="error">
          <ListItemTitle>Pump seal replacement</ListItemTitle>
          <ListItemStatus>Overdue</ListItemStatus>
          <ListItemDescription>
            P-401A requires new mechanical seal
          </ListItemDescription>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  )
}`,
    },
    {
      title: "Custom Icons",
      description: "Override default icons with custom ones.",
      code: `import {
  ArtifactList,
  ArtifactListContent,
  ArtifactListItem,
  ListItemDescription,
  ListItemIcon,
  ListItemTitle,
} from "@cognite/aura-lab/artifact-list"

export function CustomIconDemo() {
  return (
    <ArtifactList>
      <ArtifactListContent>
        <ArtifactListItem>
          <ListItemIcon className="text-muted-foreground">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="3" fill="currentColor" />
            </svg>
          </ListItemIcon>
          <ListItemTitle>Custom icon item</ListItemTitle>
          <ListItemDescription>With custom icon</ListItemDescription>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  )
}`,
    },
    {
      title: "Minimal List",
      description: "Simplest form with only list items, no header.",
      code: `import {
  ArtifactList,
  ArtifactListContent,
  ArtifactListItem,
  ListItemDescription,
  ListItemTitle,
} from "@cognite/aura-lab/artifact-list"

export function MinimalDemo() {
  return (
    <ArtifactList>
      <ArtifactListContent>
        <ArtifactListItem>
          <ListItemTitle>Key 1</ListItemTitle>
          <ListItemDescription>Value 1</ListItemDescription>
        </ArtifactListItem>
        <ArtifactListItem>
          <ListItemTitle>Key 2</ListItemTitle>
          <ListItemDescription>Value 2</ListItemDescription>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  )
}`,
    },
  ],
};
