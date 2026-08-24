# MUI → ShadCN Migration Prompts

These are reusable prompt templates for the mui-shadcn-app-migration skill.

Agents should:

- Fill in the placeholders (`<SNIPPET>`, `<CONTEXT>`, etc.).
- Use the simplest template that fits the situation.

## Prompt: rewrite_single_component_usage

Use this to rewrite one JSX usage of a MUI component to ShadCN in place.

```text
System:
You are migrating a large TypeScript/React monorepo from MUI UI components
to ShadCN UI components. You receive one JSX usage of a MUI component plus
mapping examples that show the intended ShadCN patterns.

Your job is to rewrite only that usage to ShadCN, preserving behavior, props,
and TypeScript correctness. Do not change unrelated code.

User:
File path:
<FILE_PATH>

MUI component and package:
<COMPONENT_NAME> from <MUI_PACKAGE>

Original JSX usage:

```tsx
<SNIPPET>
```

Surrounding context (do not modify unrelated lines):

```tsx
<CONTEXT_BEFORE_AFTER>
```

Relevant MUI → ShadCN mapping examples:

```tsx
<MAPPING_EXAMPLES>
```

Constraints:
- Preserve the file’s overall structure and logic.
- Use ShadCN components from `@/components/ui` and icons from
  `lucide-react` only when needed.
- Keep TypeScript types correct; do not introduce `any`.
- Adjust imports only as required for this usage (e.g. swap MUI imports
  for ShadCN imports, remove unused imports).
- Do not reformat or rewrite unrelated parts of the file.

Output:
- Output only the ShadCN-based replacement JSX for the original snippet.
- Do not include explanations or backticks around the output.
```

## Prompt: rewrite_file_with_multiple_usages (optional)

Use this when it is easier to rewrite several usages in the same file at once.

```text
System:
You are migrating React/TypeScript code from MUI UI components to ShadCN.
You receive a full file that uses several MUI components. You must rewrite
only the specified MUI usages to ShadCN, preserving behavior and types.

User:
File path:
<FILE_PATH>

File contents:

```tsx
<FULL_FILE_CONTENTS>
```

Components to migrate in this pass:
- <COMPONENT_1> from <MUI_PACKAGE_1>
- <COMPONENT_2> from <MUI_PACKAGE_2>

Relevant MUI → ShadCN mapping examples:

```tsx
<MAPPING_EXAMPLES>
```

Constraints:
- Only change usages of the components listed above.
- Replace their imports with ShadCN imports as needed.
- Remove now-unused MUI imports.
- Preserve other MUI usages and code for later batches.
- Do not introduce both MUI and ShadCN versions of the same component in
  a single file; if that would happen, convert all usages of that component
  in the file in this pass.
- Keep type correctness and avoid `any`.

Output:
- Output the full updated file contents (not a diff).
- Do not include explanations or backticks around the output.
```

## Prompt: self_repair_typescript_error

Use this to fix a specific TypeScript/ESLint error after a migration.

```text
System:
You are fixing TypeScript/ESLint errors in a React/TypeScript file after
migrating from MUI to ShadCN. You receive one error plus the relevant snippet.

Your job is to minimally fix the code so that the error is resolved, while
preserving behavior and avoiding new issues.

User:
File path:
<FILE_PATH>

Error:
<ERROR_MESSAGE>

Code snippet (including the faulty code and some surrounding lines):

```tsx
<FAULTY_SNIPPET>
```

Constraints:
- Make the smallest change that resolves the error.
- Do not reformat or rewrite unrelated code.
- Keep types strict; do not use `any` or unsafe casts.

Output:
- Output only the corrected version of the snippet.
- Do not include explanations or backticks around the output.
```

