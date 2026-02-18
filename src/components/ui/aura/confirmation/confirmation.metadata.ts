import type { ComponentMeta } from "../../../../lib/component-examples";

export const ConfirmationMetadata: ComponentMeta = {
  name: "Confirmation",
  status: "draft",
  description:
    "A confirmation dialog component for AI approval workflows, with support for request, accepted, and rejected states.",
  llmUsage:
    "Use `<Confirmation>` with `<ConfirmationRequest>`, `<ConfirmationAccepted>`, `<ConfirmationRejected>`, and `<ConfirmationActions>` for AI approval flows.",
};
