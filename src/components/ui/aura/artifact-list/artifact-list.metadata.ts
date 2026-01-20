import type { ComponentMeta } from '@/lib/component-examples';

/**
 * Artifact - List Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const ArtifactListMetadata: ComponentMeta = {
  name: 'ArtifactList',

  description:
    'A compositional list artifact widget component that displays key-value pairs or list items with header context.',

  llmUsage:
    'When showing lists of information or data summaries, compose `<ArtifactList>` with `<ArtifactListHeader>`, `<ArtifactListTitle>`, `<ArtifactListContent>`, and `<ArtifactListItem>` subcomponents. Use `<ListItemLabel>` and `<ListItemValue>` within items for key-value pairs, and `<ListItemIcon>` + `<ListItemTitle>` for icon/title rows.',

  importPath: '@/components/ui/aura/artifact-list/artifact-list',

  codeExamples: [
    {
      title: 'Basic List Artifact',
      description: 'A list widget showing key-value pairs with a header.',
      code: `import {
  ArtifactList,
  ArtifactListHeader,
  ArtifactListTitle,
  ArtifactListContent,
  ArtifactListItem,
} from "@/components/ui/aura/artifact-list/artifact-list"
import { ListItemLabel, ListItemValue } from "@/components/ui/aura/list"

export function BasicDemo() {
  return (
    <ArtifactList>
      <ArtifactListHeader>
        <ArtifactListTitle>System Information</ArtifactListTitle>
      </ArtifactListHeader>
      <ArtifactListContent>
        <ArtifactListItem>
          <ListItemLabel>Status</ListItemLabel>
          <ListItemValue>Active</ListItemValue>
        </ArtifactListItem>
        <ArtifactListItem>
          <ListItemLabel>Memory</ListItemLabel>
          <ListItemValue>4.2 GB</ListItemValue>
        </ArtifactListItem>
        <ArtifactListItem>
          <ListItemLabel>CPU</ListItemLabel>
          <ListItemValue>45%</ListItemValue>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  )
}`,
    },
    {
      title: 'Custom Styling',
      description: 'Override default styles with custom classes.',
      code: `import {
  ArtifactList,
  ArtifactListHeader,
  ArtifactListTitle,
  ArtifactListContent,
  ArtifactListItem,
} from "@/components/ui/aura/artifact-list/artifact-list"
import { ListItemLabel, ListItemValue } from "@/components/ui/aura/list"

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
          <ListItemLabel className="text-lg font-bold">Item 1</ListItemLabel>
          <ListItemValue className="text-base">Value 1</ListItemValue>
        </ArtifactListItem>
        <ArtifactListItem className="py-6">
          <ListItemLabel className="text-lg font-bold">Item 2</ListItemLabel>
          <ListItemValue className="text-base">Value 2</ListItemValue>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  )
}`,
    },
    {
      title: 'Minimal List',
      description: 'Simplest form with only list items, no header or footer.',
      code: `import {
  ArtifactList,
  ArtifactListContent,
  ArtifactListItem,
} from "@/components/ui/aura/artifact-list/artifact-list"
import { ListItemLabel, ListItemValue } from "@/components/ui/aura/list"

export function MinimalDemo() {
  return (
    <ArtifactList>
      <ArtifactListContent>
        <ArtifactListItem>
          <ListItemLabel>Key 1</ListItemLabel>
          <ListItemValue>Value 1</ListItemValue>
        </ArtifactListItem>
        <ArtifactListItem>
          <ListItemLabel>Key 2</ListItemLabel>
          <ListItemValue>Value 2</ListItemValue>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  )
}`,
    },
  ],
};
