## Community component checklist

- [ ] Component name and negative scope (what it does **not** do)
- [ ] Source noted (built with Aura / adapted external / modified Core)
- [ ] Uses Aura semantic tokens and `@cognite/aura` primitives where applicable
- [ ] Lives under `src/components/ui/community/<name>/`
- [ ] Includes `index.ts`, `<name>.metadata.ts`, and Storybook stories (`Community/...`)
- [ ] `pnpm run registry:build` regenerates `registry.json` and `public/r/`
- [ ] `pnpm lint` and `pnpm tsc -b` pass
- [ ] Assigned reviewer

## Summary

<!-- What does this contribution add or change? -->

## Test plan

- [ ] Storybook stories render for new/changed community components
- [ ] Install smoke (optional): `pnpm dlx shadcn@latest view @aura/<name>` against local `/r`
