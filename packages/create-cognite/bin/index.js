#!/usr/bin/env node

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { spawn } = require("node:child_process");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("node:fs/promises");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("node:path");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const readline = require("node:readline");

const REQUIRED_DEPENDENCIES = [
  { name: "@tanstack/react-query", version: "^5.90.2" },
  { name: "recharts", version: "^3.2.1" },
  { name: "@cognite/sdk", version: "^10.2.0" },
  { name: "date-fns", version: "^4.1.0" },
  { name: "tailwind-merge", version: "^3.3.1" },
  { name: "tw-animate-css", version: "^1.3.8" },
  { name: "clsx", version: "^2.1.1" },
];

function promptForInput(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  let projectDir;
  let additionalArgs = [];

  if (args.length === 0 || args[0].startsWith("-")) {
    // No project name provided, prompt for one
    projectDir = await promptForInput("Project name: ");

    if (!projectDir) {
      console.error("Error: Project name is required");
      process.exit(1);
    }

    // Keep any flags that were provided
    additionalArgs = args;
  } else {
    // First arg is the project name
    projectDir = args[0];
    // Rest are additional args
    additionalArgs = args.slice(1);
  }

  const createArgs = ["create-vite@latest", projectDir, ...additionalArgs];
  await runCreateVite(createArgs);
  await addCogniteTemplates(projectDir);
}

function runCreateVite(cliArgs) {
  const command = process.platform === "win32" ? "npx.cmd" : "npx";

  return new Promise((resolve, reject) => {
    const child = spawn(command, cliArgs, { stdio: "inherit" });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0) {
        const error = new Error(`create-vite exited with code ${code}`);
        error.exitCode = code;
        return reject(error);
      }

      resolve();
    });
  });
}

async function addCogniteTemplates(projectDir) {
  const targetRoot = path.resolve(process.cwd(), projectDir);
  const templateRoot = path.resolve(__dirname, "..", "templates");

  try {
    await fs.access(targetRoot);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(
        `Expected to find the newly created project at "${projectDir}", but it was not found. ` +
          "Check the create-vite output for more details."
      );
    }

    throw error;
  }

  await ensureDependenciesInstalled(targetRoot);

  const srcDirectory = path.join(targetRoot, "src");
  const templateFiles = await collectTemplateFiles(templateRoot);

  await fs.mkdir(srcDirectory, { recursive: true });

  for (const relativePath of templateFiles) {
    const normalizedPath = normalizeRelativePath(relativePath);
    const source = path.join(templateRoot, relativePath);

    const pathSegments = normalizedPath.split("/");

    if (pathSegments[0] === "app" || pathSegments[0] === "lib") {
      const target = path.join(srcDirectory, ...pathSegments);
      const isGlobalsCss =
        pathSegments[0] === "app" &&
        pathSegments.length === 2 &&
        pathSegments[1] === "globals.css";

      if (isGlobalsCss) {
        await copyFileWithOverwrite(source, target);
      } else {
        await copyFileIfMissing(source, target);
      }

      continue;
    }

    const target = path.join(targetRoot, relativePath);
    await copyFileIfMissing(source, target);
  }

  console.log("\nCognite templates copied successfully.");
}

async function copyFileIfMissing(source, target) {
  await fs.mkdir(path.dirname(target), { recursive: true });

  try {
    await fs.access(target);
    console.warn(`Skipped existing ${path.relative(process.cwd(), target)}`);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }

    await fs.copyFile(source, target);
    console.log(`Added ${path.relative(process.cwd(), target)}`);
  }
}

async function copyFileWithOverwrite(source, target) {
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.copyFile(source, target);
  console.log(`Replaced ${path.relative(process.cwd(), target)}`);
}

async function collectTemplateFiles(rootDir) {
  const files = [];

  async function walk(currentDir) {
    const dirents = await fs.readdir(currentDir, { withFileTypes: true });

    for (const dirent of dirents) {
      const fullPath = path.join(currentDir, dirent.name);

      if (dirent.isDirectory()) {
        await walk(fullPath);
        continue;
      }

      if (dirent.isFile()) {
        files.push(path.relative(rootDir, fullPath));
      }
    }
  }

  await walk(rootDir);

  return files.sort((a, b) => a.localeCompare(b));
}

function normalizeRelativePath(relativePath) {
  return relativePath.split(path.sep).join("/");
}

function formatDependencySummary(dependencies) {
  return dependencies
    .map((dependency) =>
      dependency.version
        ? `${dependency.name}@${dependency.version}`
        : dependency.name
    )
    .join(", ");
}

async function ensureDependenciesInstalled(targetRoot) {
  const packageJsonPath = path.join(targetRoot, "package.json");
  let packageJson;

  try {
    const packageJsonContent = await fs.readFile(packageJsonPath, "utf8");
    packageJson = JSON.parse(packageJsonContent);
  } catch {
    console.warn(
      `\nUnable to read or parse ${path.relative(
        process.cwd(),
        packageJsonPath
      )}. Install ${formatDependencySummary(REQUIRED_DEPENDENCIES)} manually.`
    );
    return false;
  }

  const missingDependencies = REQUIRED_DEPENDENCIES.filter(
    (dependency) =>
      !(
        (packageJson.dependencies &&
          packageJson.dependencies[dependency.name]) ||
        (packageJson.devDependencies &&
          packageJson.devDependencies[dependency.name])
      )
  );

  if (missingDependencies.length === 0) {
    return false;
  }

  const packageManager = await detectPackageManager(packageJson, targetRoot);

  if (!packageManager) {
    console.warn(
      `\nCould not determine package manager for ${path.relative(
        process.cwd(),
        targetRoot
      )}. Install ${formatDependencySummary(missingDependencies)} manually.`
    );
    return false;
  }

  const dependencySummary = formatDependencySummary(missingDependencies);
  console.log(`\nInstalling ${dependencySummary} using ${packageManager}...`);
  await installDependencies(packageManager, targetRoot, missingDependencies);

  return true;
}

async function detectPackageManager(packageJson, targetRoot) {
  if (
    packageJson.packageManager &&
    typeof packageJson.packageManager === "string"
  ) {
    const [name] = packageJson.packageManager.split("@");

    if (name) {
      return name;
    }
  }

  const candidates = [
    { name: "pnpm", lockFile: "pnpm-lock.yaml" },
    { name: "yarn", lockFile: "yarn.lock" },
    { name: "bun", lockFile: "bun.lockb" },
    { name: "npm", lockFile: "package-lock.json" },
  ];

  for (const candidate of candidates) {
    const lockFilePath = path.join(targetRoot, candidate.lockFile);

    if (await pathExists(lockFilePath)) {
      return candidate.name;
    }
  }

  return null;
}

async function installDependencies(packageManager, cwd, dependencies) {
  const dependencySpecs = dependencies.map((dependency) =>
    dependency.version
      ? `${dependency.name}@${dependency.version}`
      : dependency.name
  );
  const { command, args } = getInstallCommand(packageManager, dependencySpecs);

  if (!command) {
    throw new Error(`Unsupported package manager: ${packageManager}`);
  }

  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", cwd });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0) {
        const error = new Error(
          `${packageManager} exited with code ${code} while installing ${dependencySpecs.join(
            ", "
          )}`
        );
        error.exitCode = code;
        return reject(error);
      }

      resolve();
    });
  });
}

function getInstallCommand(packageManager, dependencySpecs) {
  const normalized = normalizeCommand(packageManager);

  switch (packageManager) {
    case "npm":
      return { command: normalized, args: ["install", ...dependencySpecs] };
    case "pnpm":
      return { command: normalized, args: ["add", ...dependencySpecs] };
    case "yarn":
      return { command: normalized, args: ["add", ...dependencySpecs] };
    case "bun":
      return { command: normalized, args: ["add", ...dependencySpecs] };
    default:
      return { command: null, args: [] };
  }
}

function normalizeCommand(command) {
  if (process.platform === "win32" && command !== "bun") {
    return `${command}.cmd`;
  }

  return command;
}

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

main().catch((error) => {
  if (error && typeof error.exitCode === "number") {
    process.exit(error.exitCode);
  }

  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
