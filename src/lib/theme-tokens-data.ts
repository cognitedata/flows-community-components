export interface ThemeToken {
  /** CSS custom property name, without the leading `--`. */
  cssVar: string;
  label: string;
  /** What this specific token is used for — shown in a tooltip on hover. */
  description: string;
  light: string;
  dark: string;
}

export interface ThemeTokenGroup {
  id: string;
  title: string;
  /** One-sentence summary of what this whole category applies to. */
  description: string;
  tokens: ThemeToken[];
}

export const THEME_TOKEN_GROUPS: ThemeTokenGroup[] = [
  {
    id: "primary-brand",
    title: "Primary brand",
    description:
      "The most prominent brand color in the UI, used sparingly for buttons and key actions.",
    tokens: [
      {
        cssVar: "primary-bg",
        label: "Background",
        description:
          "Primary brand color used on buttons and key actions. It's the most prominent color in the UI, so use it sparingly to draw attention to the most important action on screen.",
        light: "#1e2022",
        dark: "#f8f9f9",
      },
      {
        cssVar: "primary-bg-hover",
        label: "Background hover",
        description: "Primary brand color used on hover states for buttons and key actions.",
        light: "#4c5257",
        dark: "#e2e4e6",
      },
      {
        cssVar: "primary-bg-fixed-dark",
        label: "Background (fixed dark)",
        description:
          "Used when primary background elements need to remain light in both light and dark mode; paired with background hover (fixed dark) and foreground (fixed dark).",
        light: "#f8f9f9",
        dark: "#f8f9f9",
      },
      {
        cssVar: "primary-bg-hover-fixed-dark",
        label: "Background hover (fixed dark)",
        description:
          "Used when primary background elements need to remain light in both light and dark mode; paired with background (fixed dark) and foreground (fixed dark).",
        light: "#e2e4e6",
        dark: "#e2e4e6",
      },
      {
        cssVar: "primary-fg",
        label: "Foreground",
        description: "Used for text and icons on top of primary background.",
        light: "#f2f3f4",
        dark: "#17191a",
      },
      {
        cssVar: "primary-fg-fixed-dark",
        label: "Foreground (fixed dark)",
        description:
          "Used when primary text and icon elements need to remain dark in both light and dark mode; paired with background (fixed dark) and background hover (fixed dark).",
        light: "#17191a",
        dark: "#17191a",
      },
    ],
  },
  {
    id: "secondary-brand",
    title: "Secondary brand",
    description:
      "A neutral or soft brand color used for secondary actions, like secondary buttons or switch backgrounds.",
    tokens: [
      {
        cssVar: "secondary-bg",
        label: "Background",
        description:
          "Secondary brand color (recommended to keep neutral or soft). Used for secondary actions, e.g. secondary buttons or switch backgrounds.",
        light: "#e2e4e6",
        dark: "#33373a",
      },
      {
        cssVar: "secondary-bg-hover",
        label: "Background hover",
        description: "The hover state for secondary background.",
        light: "#f2f3f4",
        dark: "#5c6369",
      },
      {
        cssVar: "secondary-bg-fixed-dark",
        label: "Background (fixed dark)",
        description:
          "Used when secondary background elements need to remain dark in both light and dark mode; paired with background hover (fixed dark) and foreground (fixed dark).",
        light: "#33373a",
        dark: "#33373a",
      },
      {
        cssVar: "secondary-bg-hover-fixed-dark",
        label: "Background hover (fixed dark)",
        description:
          "Used when secondary background elements need to remain dark in both light and dark mode; paired with background (fixed dark) and foreground (fixed dark).",
        light: "#5c6369",
        dark: "#5c6369",
      },
      {
        cssVar: "secondary-fg",
        label: "Foreground",
        description: "Secondary text and icon color used for subtitles or long descriptions.",
        light: "#33373a",
        dark: "#d5d8db",
      },
      {
        cssVar: "secondary-fg-fixed-dark",
        label: "Foreground (fixed dark)",
        description:
          "Used when secondary text and icon elements need to remain light in both light and dark mode; paired with background (fixed dark) and background hover (fixed dark).",
        light: "#d5d8db",
        dark: "#d5d8db",
      },
    ],
  },
  {
    id: "decorative",
    title: "Decorative",
    description:
      "Categorical accent colors for avatars, tags, and illustrations — not tied to semantic meaning.",
    tokens: [
      {
        cssVar: "decorative-fjord-bg",
        label: "Fjord background",
        description: "Sets the background color of a fjord decorative element.",
        light: "#ccd7f6",
        dark: "#a7bbef",
      },
      {
        cssVar: "decorative-fjord-bg-hover",
        label: "Fjord background hover",
        description: "Sets the background hover color of a fjord decorative element.",
        light: "#a7bbef",
        dark: "#ccd7f6",
      },
      {
        cssVar: "decorative-fjord-fg",
        label: "Fjord foreground",
        description: "Sets the foreground color of a fjord decorative element.",
        light: "#2a3655",
        dark: "#1f2638",
      },
      {
        cssVar: "decorative-nordic-bg",
        label: "Nordic background",
        description: "Sets the background color of a nordic decorative element.",
        light: "#b6ddd4",
        dark: "#81c5b6",
      },
      {
        cssVar: "decorative-nordic-bg-hover",
        label: "Nordic background hover",
        description: "Sets the background hover color of a nordic decorative element.",
        light: "#81c5b6",
        dark: "#b6ddd4",
      },
      {
        cssVar: "decorative-nordic-fg",
        label: "Nordic foreground",
        description: "Sets the foreground color of a nordic decorative element.",
        light: "#143c34",
        dark: "#132a26",
      },
      {
        cssVar: "decorative-aurora-bg",
        label: "Aurora background",
        description: "Sets the background color of an aurora decorative element.",
        light: "#d1e1b8",
        dark: "#afcc84",
      },
      {
        cssVar: "decorative-aurora-bg-hover",
        label: "Aurora background hover",
        description: "Sets the background hover color of an aurora decorative element.",
        light: "#afcc84",
        dark: "#d1e1b8",
      },
      {
        cssVar: "decorative-aurora-fg",
        label: "Aurora foreground",
        description: "Sets the foreground color of an aurora decorative element.",
        light: "#2f4017",
        dark: "#222c15",
      },
      {
        cssVar: "decorative-dusk-bg",
        label: "Dusk background",
        description: "Sets the background color of a dusk decorative element.",
        light: "#e3cfed",
        dark: "#d0ade0",
      },
      {
        cssVar: "decorative-dusk-bg-hover",
        label: "Dusk background hover",
        description: "Sets the background hover color of a dusk decorative element.",
        light: "#d0ade0",
        dark: "#e3cfed",
      },
      {
        cssVar: "decorative-dusk-fg",
        label: "Dusk foreground",
        description: "Sets the foreground color of a dusk decorative element.",
        light: "#422e4d",
        dark: "#2c2233",
      },
      {
        cssVar: "decorative-pink-bg",
        label: "Pink background",
        description: "Sets the background color of a pink decorative element.",
        light: "#f8c3d9",
        dark: "#f398bd",
      },
      {
        cssVar: "decorative-pink-bg-hover",
        label: "Pink background hover",
        description: "Sets the background hover color of a pink decorative element.",
        light: "#f398bd",
        dark: "#f8c3d9",
      },
      {
        cssVar: "decorative-pink-fg",
        label: "Pink foreground",
        description: "Sets the foreground color of a pink decorative element.",
        light: "#562238",
        dark: "#381b28",
      },
      {
        cssVar: "decorative-amber-bg",
        label: "Amber background",
        description: "Sets the background color of an amber decorative element.",
        light: "#edddad",
        dark: "#e0c573",
      },
      {
        cssVar: "decorative-amber-bg-hover",
        label: "Amber background hover",
        description: "Sets the background hover color of an amber decorative element.",
        light: "#e0c573",
        dark: "#edddad",
      },
      {
        cssVar: "decorative-amber-fg",
        label: "Amber foreground",
        description: "Sets the foreground color of an amber decorative element.",
        light: "#4b3c0d",
        dark: "#322a10",
      },
      {
        cssVar: "decorative-neutral-bg",
        label: "Neutral background",
        description: "Sets the background color of a neutral decorative element.",
        light: "#e2e4e6",
        dark: "#d5d8db",
      },
      {
        cssVar: "decorative-neutral-bg-hover",
        label: "Neutral background hover",
        description: "Sets the background hover color of a neutral decorative element.",
        light: "#b7bcc1",
        dark: "#e2e4e6",
      },
      {
        cssVar: "decorative-neutral-fg",
        label: "Neutral foreground",
        description: "Sets the foreground color of a neutral decorative element.",
        light: "#33373a",
        dark: "#33373a",
      },
    ],
  },
  {
    id: "data-visualization",
    title: "Data visualization",
    description: "Categorical and status-mapped series colors used in charts.",
    tokens: [
      {
        cssVar: "chart-gridlines",
        label: "Gridlines",
        description: "Color of chart gridlines.",
        light: "#e2e4e6",
        dark: "#26292c",
      },
      {
        cssVar: "chart-1",
        label: "Chart 1 (fjord)",
        description: "First-preference categorical series color for charts.",
        light: "#5f83e2",
        dark: "#5f83e2",
      },
      {
        cssVar: "chart-2",
        label: "Chart 2 (nordic)",
        description: "Second-preference categorical series color for charts.",
        light: "#1a967a",
        dark: "#1a967a",
      },
      {
        cssVar: "chart-3",
        label: "Chart 3 (aurora)",
        description: "Third-preference categorical series color for charts.",
        light: "#6ea220",
        dark: "#6ea220",
      },
      {
        cssVar: "chart-4",
        label: "Chart 4 (dusk)",
        description: "Fourth-preference categorical series color for charts.",
        light: "#a96ac7",
        dark: "#a96ac7",
      },
      {
        cssVar: "chart-5",
        label: "Chart 5 (amber)",
        description: "Fifth-preference categorical series color for charts.",
        light: "#c69500",
        dark: "#c69500",
      },
      {
        cssVar: "chart-success",
        label: "Chart success",
        description: "Used to communicate success in data visualization.",
        light: "#1c984a",
        dark: "#1c984a",
      },
      {
        cssVar: "chart-warning",
        label: "Chart warning",
        description: "Used to communicate warnings in data visualization.",
        light: "#d96a00",
        dark: "#d96a00",
      },
      {
        cssVar: "chart-destructive",
        label: "Chart destructive",
        description: "Used to communicate errors in data visualization.",
        light: "#f43d5c",
        dark: "#f43d5c",
      },
      {
        cssVar: "chart-info",
        label: "Chart info",
        description: "Used to communicate informational data in data visualization.",
        light: "#2e8ae8",
        dark: "#2e8ae8",
      },
      {
        cssVar: "chart-neutral",
        label: "Chart neutral",
        description: "Used to communicate neutral information in data visualization.",
        light: "#7c868e",
        dark: "#7c868e",
      },
    ],
  },
  {
    id: "heat-map",
    title: "Heat map",
    description: "Intensity scale used to represent density or magnitude on heat maps.",
    tokens: [
      {
        cssVar: "heat-map-intense",
        label: "Intense",
        description: "Highest emphasis or intensity/density on a heat map.",
        light: "#5372c3",
        dark: "#a7bbef",
      },
      {
        cssVar: "heat-map-strong",
        label: "Strong",
        description: "Strong intensity or density on a heat map.",
        light: "#7796e6",
        dark: "#7796e6",
      },
      {
        cssVar: "heat-map-moderate",
        label: "Moderate",
        description: "Moderate intensity or density on a heat map.",
        light: "#a7bbef",
        dark: "#4861a4",
      },
      {
        cssVar: "heat-map-mild",
        label: "Mild",
        description: "Mild intensity or density on a heat map.",
        light: "#e2e9fa",
        dark: "#2a3655",
      },
    ],
  },
  {
    id: "status",
    title: "Status",
    description:
      "Semantic colors that communicate success, warning, critical, info, and neutral states.",
    tokens: [
      {
        cssVar: "success-bg",
        label: "Success background",
        description: "Background of success status elements; paired with success foreground.",
        light: "#d6ecde",
        dark: "#132a1d",
      },
      {
        cssVar: "success-bg-hover",
        label: "Success background hover",
        description: "Background hover of success status elements.",
        light: "#b6dec5",
        dark: "#153d25",
      },
      {
        cssVar: "success-fg",
        label: "Success foreground",
        description: "Used for success status on text and icon; paired with success background.",
        light: "#19703a",
        dark: "#60b780",
      },
      {
        cssVar: "success-fg-strong",
        label: "Success foreground strong",
        description: "Used for success status on text and icon without a success background color.",
        light: "#1c984a",
        dark: "#60b780",
      },
      {
        cssVar: "warning-bg",
        label: "Warning background",
        description: "Background of warning status elements; paired with warning foreground.",
        light: "#f8e4d1",
        dark: "#352210",
      },
      {
        cssVar: "warning-bg-hover",
        label: "Warning background hover",
        description: "Background hover of warning status elements.",
        light: "#f3cfad",
        dark: "#512e0d",
      },
      {
        cssVar: "warning-fg",
        label: "Warning foreground",
        description: "Used for warning status on text and icon; paired with warning background.",
        light: "#9d5006",
        dark: "#e4974d",
      },
      {
        cssVar: "warning-fg-strong",
        label: "Warning foreground strong",
        description: "Used for warning status on text and icon without a warning background color.",
        light: "#d96a00",
        dark: "#e4974d",
      },
      {
        cssVar: "critical-bg",
        label: "Critical background",
        description: "Background of critical status elements; paired with critical foreground strong.",
        light: "#fddce2",
        dark: "#3a1a20",
      },
      {
        cssVar: "critical-bg-hover",
        label: "Critical background hover",
        description: "Background hover of critical status elements.",
        light: "#fbc1cb",
        dark: "#5a202a",
      },
      {
        cssVar: "critical-fg",
        label: "Critical foreground",
        description: "Used for critical status on text and icon; paired with critical background.",
        light: "#b03046",
        dark: "#f7778d",
      },
      {
        cssVar: "critical-fg-strong",
        label: "Critical foreground strong",
        description: "Used for critical status on text and icon without a critical background color.",
        light: "#f43d5c",
        dark: "#f7778d",
      },
      {
        cssVar: "info-bg",
        label: "Info background",
        description: "Background of informational status elements; paired with info foreground.",
        light: "#d9eafb",
        dark: "#162839",
      },
      {
        cssVar: "info-bg-hover",
        label: "Info background hover",
        description: "Background hover of informational status elements.",
        light: "#bcdaf8",
        dark: "#1a3857",
      },
      {
        cssVar: "info-fg",
        label: "Info foreground",
        description: "Used for informational status on text and icon; paired with info background.",
        light: "#2566a8",
        dark: "#6dadef",
      },
      {
        cssVar: "info-fg-strong",
        label: "Info foreground strong",
        description: "Used for informational status on text and icon without an info background color.",
        light: "#2e8ae8",
        dark: "#6dadef",
      },
      {
        cssVar: "neutral-bg",
        label: "Neutral background",
        description: "Background of neutral status elements; paired with neutral foreground.",
        light: "#e2e4e6",
        dark: "#1e2022",
      },
      {
        cssVar: "neutral-bg-hover",
        label: "Neutral background hover",
        description: "Background hover of neutral status elements.",
        light: "#d5d8db",
        dark: "#26292c",
      },
      {
        cssVar: "neutral-fg",
        label: "Neutral foreground",
        description: "Used for neutral status on text and icon; paired with neutral background.",
        light: "#4c5257",
        dark: "#a3aab0",
      },
      {
        cssVar: "neutral-fg-strong",
        label: "Neutral foreground strong",
        description: "Used for neutral status on text and icon without a neutral background color.",
        light: "#6c757c",
        dark: "#a3aab0",
      },
    ],
  },
  {
    id: "destructive",
    title: "Destructive",
    description: "Colors for destructive actions, like delete buttons.",
    tokens: [
      {
        cssVar: "destructive-bg",
        label: "Background",
        description: "Background color for a destructive button.",
        light: "#f43d5c",
        dark: "#f43d5c",
      },
      {
        cssVar: "destructive-bg-hover",
        label: "Background hover",
        description: "Background hover color for a destructive button.",
        light: "#d23751",
        dark: "#f7778d",
      },
      {
        cssVar: "destructive-fg",
        label: "Foreground",
        description: "Foreground color paired with destructive background.",
        light: "#f8f9f9",
        dark: "#f8f9f9",
      },
      {
        cssVar: "destructive-fg-strong",
        label: "Foreground strong",
        description: "Foreground color for destructive text and icon without a destructive background pairing.",
        light: "#f43d5c",
        dark: "#f7778d",
      },
    ],
  },
  {
    id: "link",
    title: "Link",
    description: "Colors for interactive text links.",
    tokens: [
      {
        cssVar: "link-fg",
        label: "Foreground",
        description: "Used for interactive links.",
        light: "#5f83e2",
        dark: "#7796e6",
      },
      {
        cssVar: "link-fg-hover",
        label: "Foreground hover",
        description: "Hover state for interactive links.",
        light: "#a7bbef",
        dark: "#ccd7f6",
      },
    ],
  },
  {
    id: "ring",
    title: "Ring",
    description: "Focus ring colors shown around inputs and interactive elements.",
    tokens: [
      {
        cssVar: "ring",
        label: "Default",
        description: "Used for focus states around inputs as the inner border.",
        light: "#5f83e2",
        dark: "#8fa8eb",
      },
      {
        cssVar: "ring-muted",
        label: "Muted",
        description: "Used for focus states around inputs as the outer border.",
        light: "#ccd7f6",
        dark: "#3c5085",
      },
      {
        cssVar: "ring-critical",
        label: "Critical",
        description: "Used for validation focus states around inputs as the inner border.",
        light: "#f43d5c",
        dark: "#f7778d",
      },
      {
        cssVar: "ring-critical-muted",
        label: "Critical muted",
        description: "Used for validation focus states around inputs as the outer border.",
        light: "#fbc1cb",
        dark: "#8e2a3b",
      },
    ],
  },
  {
    id: "border",
    title: "Border",
    description: "Border colors used to separate and outline surfaces.",
    tokens: [
      {
        cssVar: "border",
        label: "Default",
        description: "Default border color.",
        light: "#e2e4e6",
        dark: "#33373a",
      },
      {
        cssVar: "border-emphasized",
        label: "Emphasized",
        description: "Used to emphasize or to show active or hover states.",
        light: "#d5d8db",
        dark: "#5c6369",
      },
      {
        cssVar: "border-disabled",
        label: "Disabled",
        description: "Used for disabled borders on interactive elements.",
        light: "#f2f3f4",
        dark: "#26292c",
      },
    ],
  },
  {
    id: "base",
    title: "Base",
    description: "The lowest layer of the UI — the app's main background and default text color.",
    tokens: [
      {
        cssVar: "base-bg",
        label: "Background",
        description: "The main background of the app. The lowest layer of the UI.",
        light: "#ffffff",
        dark: "#17191a",
      },
      {
        cssVar: "base-bg-hover",
        label: "Background hover",
        description:
          "Applied as the hover background for interactive elements that have no background of their own by default (like ghost buttons or list rows) and sit directly on the base background.",
        light: "#f2f3f4",
        dark: "#26292c",
      },
      {
        cssVar: "base-bg-hover-fixed-dark",
        label: "Background hover (fixed dark)",
        description:
          "Applied as the hover background for interactive elements that are locked to dark mode, have no background of their own by default, and sit directly on the base background.",
        light: "#33373a",
        dark: "#33373a",
      },
      {
        cssVar: "base-bg-disabled",
        label: "Background disabled",
        description: "Used for all disabled interactive elements with backgrounds.",
        light: "#f2f3f4",
        dark: "#26292c",
      },
      {
        cssVar: "base-bg-disabled-fixed-dark",
        label: "Background disabled (fixed dark)",
        description:
          "Applied as the disabled background for interactive elements that have a background and are locked to dark mode, and sit directly on the base background.",
        light: "#33373a",
        dark: "#33373a",
      },
      {
        cssVar: "base-fg",
        label: "Foreground",
        description:
          "The default color for text and icons sitting on the base background, or when you need strong contrast and visual hierarchy.",
        light: "#17191a",
        dark: "#f8f9f9",
      },
      {
        cssVar: "base-fg-contrast",
        label: "Foreground contrast",
        description:
          "Flips between black and white as needed to stay legible against whatever background it's paired with, regardless of light or dark mode.",
        light: "#f8f9f9",
        dark: "#17191a",
      },
      {
        cssVar: "base-fg-disabled",
        label: "Foreground disabled",
        description: "The disabled color for text and icons, regardless of background.",
        light: "#b7bcc1",
        dark: "#5c6369",
      },
      {
        cssVar: "base-fg-disabled-fixed-dark",
        label: "Foreground disabled (fixed dark)",
        description:
          "Applied as the disabled foreground color for elements that are locked to dark mode, regardless of their background.",
        light: "#5c6369",
        dark: "#5c6369",
      },
    ],
  },
  {
    id: "medium",
    title: "Medium",
    description: "An alternate background for elements that need a bit more contrast, like inputs.",
    tokens: [
      {
        cssVar: "medium-bg",
        label: "Background",
        description:
          "An alternate to base background. Ideal for creating visual difference or for interactive elements that sit on top of base background and need a bit of contrast — commonly used for inputs.",
        light: "#f2f3f4",
        dark: "#26292c",
      },
      {
        cssVar: "medium-bg-hover",
        label: "Background hover",
        description: "Hover color for interactive elements that use medium background.",
        light: "#e2e4e6",
        dark: "#33373a",
      },
      {
        cssVar: "medium-fg",
        label: "Foreground",
        description:
          "A slightly softer text color, often paired with medium background but usable wherever less contrast and emphasis is needed for foreground elements.",
        light: "#33373a",
        dark: "#b7bcc1",
      },
      {
        cssVar: "medium-fg-hover",
        label: "Foreground hover",
        description:
          "Hover color for interactive foregrounds using medium foreground that don't have a background color — mainly used for text-only interactions.",
        light: "#7c868e",
        dark: "#7c868e",
      },
      {
        cssVar: "medium-fg-fixed-dark",
        label: "Foreground (fixed dark)",
        description: "Applied to medium foreground elements that are locked to dark mode.",
        light: "#b7bcc1",
        dark: "#b7bcc1",
      },
    ],
  },
  {
    id: "muted",
    title: "Muted",
    description:
      "The softest background and foreground layer, used for containers, side panels, and low-emphasis text.",
    tokens: [
      {
        cssVar: "muted-bg",
        label: "Background",
        description:
          "The third option for UI background layers, more commonly used for containers, side panels, or interactive elements where minimal visual difference is needed, or a persistent UI shell.",
        light: "#f8f9f9",
        dark: "#1e2022",
      },
      {
        cssVar: "muted-bg-hover",
        label: "Background hover",
        description: "Hover state background for muted background elements.",
        light: "#f2f3f4",
        dark: "#26292c",
      },
      {
        cssVar: "muted-fg",
        label: "Foreground",
        description:
          "Softest foreground color used for low emphasis, such as metadata or foreground elements in inactive states.",
        light: "#6c757c",
        dark: "#a3aab0",
      },
      {
        cssVar: "muted-fg-hover",
        label: "Foreground hover",
        description:
          "Used for foreground elements using muted foreground that have an interactive state without a background.",
        light: "#33373a",
        dark: "#e2e4e6",
      },
      {
        cssVar: "muted-fg-fixed-dark",
        label: "Foreground (fixed dark)",
        description:
          "Softest foreground color used for low emphasis, locked to dark mode.",
        light: "#a3aab0",
        dark: "#a3aab0",
      },
    ],
  },
  {
    id: "popover",
    title: "Popover",
    description:
      "Colors for elevated surfaces like dialogs and popovers that sit above the base UI with a drop shadow.",
    tokens: [
      {
        cssVar: "popover-bg",
        label: "Background",
        description:
          "Used for surfaces that appear highest in the UI layer and have a drop shadow behind, e.g. Dialog, Alert Dialog, Popover.",
        light: "#ffffff",
        dark: "#1e2022",
      },
      {
        cssVar: "popover-bg-hover",
        label: "Background hover",
        description: "Hover state paired with popover background.",
        light: "#f2f3f4",
        dark: "#26292c",
      },
      {
        cssVar: "popover-bg-fixed-dark",
        label: "Background (fixed dark)",
        description: "Used when popover background elements need to remain dark in both light and dark mode.",
        light: "#26292c",
        dark: "#26292c",
      },
      {
        cssVar: "popover-fg",
        label: "Foreground",
        description: "Used for foreground elements that sit on popover background.",
        light: "#17191a",
        dark: "#f2f3f4",
      },
      {
        cssVar: "popover-fg-fixed-dark",
        label: "Foreground (fixed dark)",
        description:
          "Used for foreground elements that sit on popover background, but locked to dark mode and paired with background (fixed dark).",
        light: "#ffffff",
        dark: "#ffffff",
      },
    ],
  },
  {
    id: "card",
    title: "Card",
    description: "Colors for card and container surfaces sitting on top of the main background.",
    tokens: [
      {
        cssVar: "card-bg",
        label: "Background",
        description: "Use for any card or container background sitting on top of the main background.",
        light: "#f8f9f9",
        dark: "#26292c",
      },
      {
        cssVar: "card-bg-hover",
        label: "Background hover",
        description: "Hover state for cards with card background.",
        light: "#f2f3f4",
        dark: "#33373a",
      },
      {
        cssVar: "card-fg",
        label: "Foreground",
        description: "Used for foregrounds that sit on top of card background.",
        light: "#17191a",
        dark: "#f2f3f4",
      },
    ],
  },
];
