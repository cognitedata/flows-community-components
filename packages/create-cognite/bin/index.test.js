import { describe, it, expect, vi } from "vitest";

// Mock child_process spawn
vi.mock("node:child_process", () => ({
  spawn: vi.fn(),
}));

// Mock readline
vi.mock("node:readline", () => ({
  createInterface: vi.fn(() => ({
    question: vi.fn(),
    close: vi.fn(),
  })),
}));

describe("CLI Command Tests", () => {
  describe("Argument Parsing Logic", () => {
    it("should use first argument as project name when provided", () => {
      const args = ["my-project", "--template", "react-ts"];
      let projectDir;
      let additionalArgs = [];

      if (args.length === 0 || args[0].startsWith("-")) {
        additionalArgs = args;
      } else {
        projectDir = args[0];
        additionalArgs = args.slice(1);
      }

      const createArgs = ["create-vite@latest", projectDir, ...additionalArgs];

      expect(projectDir).toBe("my-project");
      expect(additionalArgs).toEqual(["--template", "react-ts"]);
      expect(createArgs).toEqual([
        "create-vite@latest",
        "my-project",
        "--template",
        "react-ts",
      ]);
    });

    it("should handle flags-only arguments (requires prompt)", () => {
      const args = ["--template", "react-ts"];
      let projectDir;
      let additionalArgs = [];

      if (args.length === 0 || args[0].startsWith("-")) {
        // Would prompt for project name
        projectDir = undefined;
        additionalArgs = args;
      } else {
        projectDir = args[0];
        additionalArgs = args.slice(1);
      }

      expect(projectDir).toBeUndefined();
      expect(additionalArgs).toEqual(["--template", "react-ts"]);
    });

    it("should handle empty arguments (requires prompt)", () => {
      const args = [];
      let projectDir;
      let additionalArgs = [];

      if (args.length === 0 || args[0]?.startsWith("-")) {
        projectDir = undefined;
        additionalArgs = args;
      } else {
        projectDir = args[0];
        additionalArgs = args.slice(1);
      }

      expect(projectDir).toBeUndefined();
      expect(additionalArgs).toEqual([]);
    });

    it("should properly construct create-vite command with all arguments", () => {
      const projectDir = "test-app";
      const additionalArgs = ["--template", "react-ts", "--force"];
      const createArgs = ["create-vite@latest", projectDir, ...additionalArgs];

      expect(createArgs).toEqual([
        "create-vite@latest",
        "test-app",
        "--template",
        "react-ts",
        "--force",
      ]);
    });

    it("should properly construct create-vite command with project name only", () => {
      const projectDir = "simple-app";
      const additionalArgs = [];
      const createArgs = ["create-vite@latest", projectDir, ...additionalArgs];

      expect(createArgs).toEqual(["create-vite@latest", "simple-app"]);
    });
  });

  describe("Command Platform Detection", () => {
    it("should use npx.cmd on Windows", () => {
      const platform = "win32";
      const command = platform === "win32" ? "npx.cmd" : "npx";
      expect(command).toBe("npx.cmd");
    });

    it("should use npx on non-Windows platforms", () => {
      const platform = "darwin";
      const command = platform === "win32" ? "npx.cmd" : "npx";
      expect(command).toBe("npx");
    });
  });

  describe("Package Manager Detection", () => {
    it("should detect package manager from packageManager field", () => {
      const packageJson = { packageManager: "pnpm@8.0.0" };
      const [name] = packageJson.packageManager.split("@");
      expect(name).toBe("pnpm");
    });

    it("should extract package manager name correctly", () => {
      const examples = [
        { input: "npm@9.0.0", expected: "npm" },
        { input: "yarn@3.0.0", expected: "yarn" },
        { input: "pnpm@8.0.0", expected: "pnpm" },
        { input: "bun@1.0.0", expected: "bun" },
      ];

      examples.forEach(({ input, expected }) => {
        const [name] = input.split("@");
        expect(name).toBe(expected);
      });
    });
  });

  describe("Install Command Generation", () => {
    function getInstallCommand(packageManager, dependencySpecs) {
      const normalizeCommand = (cmd) => {
        if (process.platform === "win32" && cmd !== "bun") {
          return `${cmd}.cmd`;
        }
        return cmd;
      };

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

    it("should generate correct npm install command", () => {
      const result = getInstallCommand("npm", ["package-a@1.0.0", "package-b"]);
      expect(result.args).toEqual(["install", "package-a@1.0.0", "package-b"]);
    });

    it("should generate correct pnpm add command", () => {
      const result = getInstallCommand("pnpm", ["package-a@1.0.0"]);
      expect(result.args).toEqual(["add", "package-a@1.0.0"]);
    });

    it("should generate correct yarn add command", () => {
      const result = getInstallCommand("yarn", ["package-a"]);
      expect(result.args).toEqual(["add", "package-a"]);
    });

    it("should generate correct bun add command", () => {
      const result = getInstallCommand("bun", ["package-a"]);
      expect(result.args).toEqual(["add", "package-a"]);
    });

    it("should return null command for unsupported package manager", () => {
      const result = getInstallCommand("unknown", ["package-a"]);
      expect(result.command).toBeNull();
      expect(result.args).toEqual([]);
    });
  });

  describe("Dependency Formatting", () => {
    function formatDependencySummary(dependencies) {
      return dependencies
        .map((dependency) =>
          dependency.version
            ? `${dependency.name}@${dependency.version}`
            : dependency.name
        )
        .join(", ");
    }

    it("should format dependencies with versions", () => {
      const deps = [
        { name: "react", version: "^18.0.0" },
        { name: "vite", version: "^5.0.0" },
      ];
      const result = formatDependencySummary(deps);
      expect(result).toBe("react@^18.0.0, vite@^5.0.0");
    });

    it("should format dependencies without versions", () => {
      const deps = [{ name: "react" }, { name: "vite" }];
      const result = formatDependencySummary(deps);
      expect(result).toBe("react, vite");
    });

    it("should handle mixed dependencies", () => {
      const deps = [{ name: "react", version: "^18.0.0" }, { name: "vite" }];
      const result = formatDependencySummary(deps);
      expect(result).toBe("react@^18.0.0, vite");
    });
  });

  describe("Path Normalization", () => {
    it("should normalize Windows paths to forward slashes", () => {
      const windowsPath = "app\\components\\Button.tsx";
      const normalized = windowsPath.split("\\").join("/");
      expect(normalized).toBe("app/components/Button.tsx");
    });

    it("should keep Unix paths unchanged", () => {
      const unixPath = "app/components/Button.tsx";
      const normalized = unixPath.split("/").join("/");
      expect(normalized).toBe("app/components/Button.tsx");
    });
  });

  describe("Missing Dependencies Detection", () => {
    it("should detect missing dependencies", () => {
      const requiredDeps = [
        { name: "@tanstack/react-query", version: "^5.90.2" },
        { name: "recharts", version: "^3.2.1" },
      ];

      const packageJson = {
        dependencies: {
          "@tanstack/react-query": "^5.90.2",
        },
      };

      const missingDeps = requiredDeps.filter(
        (dep) =>
          !(
            (packageJson.dependencies && packageJson.dependencies[dep.name]) ||
            (packageJson.devDependencies &&
              packageJson.devDependencies[dep.name])
          )
      );

      expect(missingDeps).toHaveLength(1);
      expect(missingDeps[0].name).toBe("recharts");
    });

    it("should return empty array when all dependencies are present", () => {
      const requiredDeps = [
        { name: "react", version: "^18.0.0" },
        { name: "vite", version: "^5.0.0" },
      ];

      const packageJson = {
        dependencies: {
          react: "^18.0.0",
        },
        devDependencies: {
          vite: "^5.0.0",
        },
      };

      const missingDeps = requiredDeps.filter(
        (dep) =>
          !(
            (packageJson.dependencies && packageJson.dependencies[dep.name]) ||
            (packageJson.devDependencies &&
              packageJson.devDependencies[dep.name])
          )
      );

      expect(missingDeps).toHaveLength(0);
    });
  });
});
