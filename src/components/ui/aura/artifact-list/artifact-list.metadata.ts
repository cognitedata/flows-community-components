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
    "A compositional list artifact widget component that displays timeline-style items with optional headers.",

  llmUsage:
    "When showing list artifacts, compose `<ArtifactList>` with `<ArtifactListHeader>`, `<ArtifactListTitle>`, `<ArtifactListContent>` (or `<ArtifactListOrdered>`/`<ArtifactListDescription>`), and `<ArtifactListItem>`. Use `<ListItemIcon>` (optional) with `<ArtifactListItemTitle>`, `<ArtifactListItemDescription>`, and `<ArtifactListItemStatus>` to align icon, title, description, and status. Set `variant` on `<ArtifactListItem>` to apply status colors/icons.",

  importPath: "@/components/ui/aura/artifact-list",

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
  ArtifactListItemDescription,
  ArtifactListItemStatus,
  ArtifactListItemTitle,
} from "@/components/ui/aura/artifact-list"
import { ListItemIcon } from "@/components/ui/aura/list"

export function BasicDemo() {
  return (
    <ArtifactList>
      <ArtifactListHeader>
        <ArtifactListTitle>System Tasks</ArtifactListTitle>
      </ArtifactListHeader>
      <ArtifactListContent>
        <ArtifactListItem variant="error">
          <ListItemIcon />
          <ArtifactListItemTitle>Pump seal replacement</ArtifactListItemTitle>
          <ArtifactListItemStatus>Overdue</ArtifactListItemStatus>
          <ArtifactListItemDescription>
            P-401A requires new mechanical seal
          </ArtifactListItemDescription>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  )
}`,
    },
    {
      title: "Custom Styling",
      description: "Override default styles with custom classes.",
      code: `import {
  ArtifactList,
  ArtifactListHeader,
  ArtifactListTitle,
  ArtifactListContent,
  ArtifactListItem,
  ArtifactListItemDescription,
  ArtifactListItemTitle,
} from "@/components/ui/aura/artifact-list"
import { ListItemIcon } from "@/components/ui/aura/list"

export function CustomStyleDemo() {
  return (
    <ArtifactList>
      <ArtifactListHeader>
        <ArtifactListTitle className="text-lg">
          Custom Styled List
        </ArtifactListTitle>
      </ArtifactListHeader>
      <ArtifactListContent>
        <ArtifactListItem className="py-6">
          <ListItemIcon />
          <ArtifactListItemTitle className="text-lg font-bold">
            Item 1
          </ArtifactListItemTitle>
          <ArtifactListItemDescription className="text-base">
            Value 1
          </ArtifactListItemDescription>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  )
}`,
    },
    {
      title: "Minimal List",
      description: "Simplest form with only list items, no header or footer.",
      code: `import {
  ArtifactList,
  ArtifactListContent,
  ArtifactListItem,
  ArtifactListItemDescription,
  ArtifactListItemTitle,
} from "@/components/ui/aura/artifact-list"

export function MinimalDemo() {
  return (
    <ArtifactList>
      <ArtifactListContent>
        <ArtifactListItem>
          <ArtifactListItemTitle>Key 1</ArtifactListItemTitle>
          <ArtifactListItemDescription>Value 1</ArtifactListItemDescription>
        </ArtifactListItem>
        <ArtifactListItem>
          <ArtifactListItemTitle>Key 2</ArtifactListItemTitle>
          <ArtifactListItemDescription>Value 2</ArtifactListItemDescription>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  )
}`,
    },
  ],
};
