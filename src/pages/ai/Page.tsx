import { CatalogIndex } from "@/pages/components/CatalogIndex";

const components = [
  { name: "Code block", description: "Syntax-highlighted code display" },
  { name: "Confirmation", description: "AI action confirmation prompt" },
  { name: "Conversation", description: "Chat message container" },
  { name: "Inline Citation", description: "Reference link within text" },
  { name: "Loader", description: "AI processing indicator" },
  { name: "Message", description: "Chat message bubble" },
  { name: "Prompt input", description: "AI query input field" },
  { name: "Reasoning", description: "AI thinking process display" },
  { name: "Shimmer", description: "Loading placeholder animation" },
  { name: "Sources", description: "Reference source list" },
  { name: "Suggestion", description: "AI prompt suggestions" },
  { name: "Tool", description: "AI tool call display" },
];

export default function AIPage() {
  return (
    <CatalogIndex
      title="Components"
      description="All available AI element components"
      storageKey="aura.ai.viewMode"
      sections={[
        {
          id: "ai-components",
          items: components.map((component) => {
            const slug = component.name.toLowerCase().replace(/\s+/g, "-");
            return {
              id: slug,
              name: component.name,
              description: component.description,
              href: `/ai/${slug}`,
              progressStatus: "untracked",
            };
          }),
        },
      ]}
    />
  );
}
