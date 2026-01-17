import CJS_COMPAT_NODE_URL_l8ikm81v3xk from 'node:url';
import CJS_COMPAT_NODE_PATH_l8ikm81v3xk from 'node:path';
import CJS_COMPAT_NODE_MODULE_l8ikm81v3xk from "node:module";

var __filename = CJS_COMPAT_NODE_URL_l8ikm81v3xk.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_l8ikm81v3xk.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_l8ikm81v3xk.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------

// src/preset.ts
var core = {
  builder: import.meta.resolve("@storybook/builder-vite"),
  renderer: import.meta.resolve("@storybook/react/preset")
}, viteFinal = async (config, { presets }) => {
  let plugins = [...config?.plugins ?? []], { reactDocgen: reactDocgenOption, reactDocgenTypescriptOptions } = await presets.apply(
    "typescript",
    {}
  ), typescriptPresent;
  try {
    import.meta.resolve("typescript"), typescriptPresent = !0;
  } catch {
    typescriptPresent = !1;
  }
  if (reactDocgenOption === "react-docgen-typescript" && typescriptPresent && plugins.push(
    (await import("@joshwooding/vite-plugin-react-docgen-typescript")).default({
      ...reactDocgenTypescriptOptions,
      // We *need* this set so that RDT returns default values in the same format as react-docgen
      savePropValueAsString: !0
    })
  ), typeof reactDocgenOption == "string") {
    let { reactDocgen } = await import("./_node-chunks/react-docgen-U3OSGAWA.js");
    plugins.unshift(
      // If react-docgen is specified, use it for everything, otherwise only use it for non-typescript files
      await reactDocgen({
        include: reactDocgenOption === "react-docgen" ? /\.(mjs|tsx?|jsx?)$/ : /\.(mjs|jsx?)$/
      })
    );
  }
  return { ...config, plugins };
};
export {
  core,
  viteFinal
};
