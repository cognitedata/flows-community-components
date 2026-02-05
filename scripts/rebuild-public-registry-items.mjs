import fs from "node:fs";
import path from "node:path";

const REGISTRY_PATH = path.join(process.cwd(), "registry.json");
const OUTPUT_DIR = path.join(process.cwd(), "public", "r");

function readUtf8(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function stableStringify(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function buildRegistryItem(registryItem) {
  const out = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: registryItem.name,
    title: registryItem.title,
    description: registryItem.description ?? "",
    dependencies: registryItem.dependencies ?? [],
    registryDependencies: registryItem.registryDependencies ?? [],
    files: (registryItem.files ?? []).map((file) => {
      const absolutePath = path.join(process.cwd(), file.path);
      const content = readUtf8(absolutePath);
      return { ...file, content };
    }),
    type: registryItem.type,
  };

  if (registryItem.author) out.author = registryItem.author;
  if (registryItem.category) out.category = registryItem.category;

  return out;
}

function main() {
  const registry = JSON.parse(readUtf8(REGISTRY_PATH));
  const items = registry.items ?? [];

  ensureDir(OUTPUT_DIR);

  for (const item of items) {
    if (!item?.name) continue;
    const built = buildRegistryItem(item);
    const outPath = path.join(OUTPUT_DIR, `${item.name}.json`);
    fs.writeFileSync(outPath, stableStringify(built), "utf8");
  }
}

main();
