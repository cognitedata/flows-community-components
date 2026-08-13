import { Link } from 'react-router-dom';

import {
  Callout,
  CategoryHeading,
  ColorSwatch,
  ContentList,
  ContentSection,
  DoDontGrid,
  ModeTokenTable,
  SubHeading,
} from '@/components/foundations/content-primitives';

function toHex(value: string) {
  if (!value.startsWith('rgba')) return value;
  const parts = value.match(/[\d.]+/g);
  if (!parts) return value;
  const [r, g, b, a] = parts.map(Number);
  const byteToHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${byteToHex(r)}${byteToHex(g)}${byteToHex(b)}${byteToHex(Math.round(a * 255))}`.toUpperCase();
}

function swatch(value: string) {
  const hex = toHex(value);
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <ColorSwatch color={hex} />
      <code>{hex}</code>
    </span>
  );
}

function tokenRows(rows: [string, string, string][]) {
  return rows.map(([token, hex, usage]) => [
    <code key={token}>{token}</code>,
    swatch(hex),
    usage,
  ]);
}

function rampRows(rows: [string, string][]) {
  return rows.map(([token, hex]) => [
    <code key={token}>{token}</code>,
    swatch(hex),
  ]);
}

const BASE_LIGHT: [string, string, string][] = [
  [
    '--base-background',
    '#FFFFFF',
    'The main background of the app. The lowest layer of the UI.',
  ],
  [
    '--base-background-hover',
    '#F2F3F4',
    'Applied as the hover background for interactive elements that have no background of their own by default (like ghost buttons or list rows) and sit directly on the base background.',
  ],
  [
    '--base-background-hover-fixed-dark',
    '#33373A',
    'Applied as the hover background for interactive elements that are locked to dark mode, have no background of their own by default (like ghost buttons or list rows), and sit directly on the base background.',
  ],
  [
    '--base-background-disabled',
    '#F2F3F4',
    'Used for all disabled interactive elements with backgrounds.',
  ],
  [
    '--base-background-disabled-fixed-dark',
    '#33373A',
    'Applied as the disabled background for interactive elements that have a background and are locked to dark mode, and sit directly on the base background.',
  ],
  [
    '--base-background-overlay',
    'rgba(124, 134, 142, 0.55)',
    'Background between dialogs and UI to help focus attention on the dialog.',
  ],
  [
    '--base-foreground',
    '#17191A',
    'The default color for text and icons sitting on base-background or when you need strong contrast and visual hierarchy.',
  ],
  [
    '--base-foreground-contrast',
    '#F8F9F9',
    "Foreground-contrast provides a text/icon color that flips between black and white as needed to stay legible against whatever background it's paired with, regardless of light or dark mode.",
  ],
  [
    '--base-foreground-disabled',
    '#B7BCC1',
    'The disabled color for text and icons, regardless of background.',
  ],
  [
    '--base-foreground-disabled-fixed-dark',
    '#5C6369',
    'Applied as the disabled foreground color for elements that are locked to dark mode, regardless of their background.',
  ],
];

const BASE_DARK: [string, string, string][] = [
  [
    '--base-background',
    '#17191A',
    'The main background of the app. The lowest layer of the UI.',
  ],
  [
    '--base-background-hover',
    '#26292C',
    'Applied as the hover background for interactive elements that have no background of their own by default (like ghost buttons or list rows) and sit directly on the base background.',
  ],
  [
    '--base-background-hover-fixed-dark',
    '#33373A',
    'Applied as the hover background for interactive elements that are locked to dark mode, have no background of their own by default (like ghost buttons or list rows), and sit directly on the base background.',
  ],
  [
    '--base-background-disabled',
    '#26292C',
    'Used for all disabled interactive elements with backgrounds.',
  ],
  [
    '--base-background-disabled-fixed-dark',
    '#33373A',
    'Applied as the disabled background for interactive elements that have a background and are locked to dark mode, and sit directly on the base background.',
  ],
  [
    '--base-background-overlay',
    'rgba(124, 134, 142, 0.55)',
    'Background between dialogs and UI to help focus attention on the dialog.',
  ],
  [
    '--base-foreground',
    '#F8F9F9',
    'The default color for text and icons sitting on base-background or when you need strong contrast and visual hierarchy.',
  ],
  [
    '--base-foreground-contrast',
    '#17191A',
    "Foreground-contrast provides a text/icon color that flips between black and white as needed to stay legible against whatever background it's paired with, regardless of light or dark mode.",
  ],
  [
    '--base-foreground-disabled',
    '#5C6369',
    'The disabled color for text and icons, regardless of background.',
  ],
  [
    '--base-foreground-disabled-fixed-dark',
    '#5C6369',
    'Applied as the disabled foreground color for elements that are locked to dark mode, regardless of their background.',
  ],
];

const MUTED_LIGHT: [string, string, string][] = [
  [
    '--muted-background',
    '#F8F9F9',
    'The third option for UI background layers, but more commonly used for containers or interactive elements where minimal visual difference is needed or persistent UI shell.',
  ],
  [
    '--muted-background-hover',
    '#F2F3F4',
    'Hover state background for muted-background elements.',
  ],
  [
    '--muted-foreground',
    '#6C757C',
    'Softest foreground color used for low emphasis such as metadata or foreground elements in inactive states.',
  ],
  [
    '--muted-foreground-hover',
    '#33373A',
    'Used for foreground elements using muted-foreground that have an interactive state without a background.',
  ],
  [
    '--muted-foreground-fixed-dark',
    '#A3AAB0',
    'Softest foreground color used for low emphasis such as metadata or foreground elements in inactive states but locked to dark mode.',
  ],
];

const MUTED_DARK: [string, string, string][] = [
  [
    '--muted-background',
    '#1E2022',
    'The third option for UI background layers, but more commonly used for containers or interactive elements where minimal visual difference is needed or persistent UI shell.',
  ],
  [
    '--muted-background-hover',
    '#26292C',
    'Hover state background for muted-background elements.',
  ],
  [
    '--muted-foreground',
    '#A3AAB0',
    'Softest foreground color used for low emphasis such as metadata or foreground elements in inactive states.',
  ],
  [
    '--muted-foreground-hover',
    '#E2E4E6',
    'Used for foreground elements using muted-foreground that have an interactive state without a background.',
  ],
  [
    '--muted-foreground-fixed-dark',
    '#A3AAB0',
    'Softest foreground color used for low emphasis such as metadata or foreground elements in inactive states but locked to dark mode.',
  ],
];

const MEDIUM_LIGHT: [string, string, string][] = [
  [
    '--medium-background',
    '#F2F3F4',
    'An alternate to base-background. Ideal for where you want to create some visual difference or interactive elements that sit on top of base-background and need a bit of contrast. Commonly used for inputs.',
  ],
  [
    '--medium-background-hover',
    '#E2E4E6',
    'Hover color for interactive elements that use medium-background.',
  ],
  [
    '--medium-foreground',
    '#33373A',
    'A slightly softer text color, often paired with medium-background but can be used in any context when less contrast and emphasis is needed for foreground elements.',
  ],
  [
    '--medium-foreground-hover',
    '#7C868E',
    'Hover color for interactive foregrounds using medium-foreground but do not have a background color — mainly used for text-only interactions without a background.',
  ],
  [
    '--medium-foreground-fixed-dark',
    '#B7BCC1',
    'Applied to medium-foreground elements for elements that are locked to dark mode.',
  ],
];

const MEDIUM_DARK: [string, string, string][] = [
  [
    '--medium-background',
    '#26292C',
    'An alternate to base-background. Ideal for where you want to create some visual difference or interactive elements that sit on top of base-background and need a bit of contrast. Commonly used for inputs.',
  ],
  [
    '--medium-background-hover',
    '#33373A',
    'Hover color for interactive elements that use medium-background.',
  ],
  [
    '--medium-foreground',
    '#B7BCC1',
    'A slightly softer text color, often paired with medium-background but can be used in any context when less contrast and emphasis is needed for foreground elements.',
  ],
  [
    '--medium-foreground-hover',
    '#7C868E',
    'Hover color for interactive foregrounds using medium-foreground but do not have a background color — mainly used for text-only interactions without a background.',
  ],
  [
    '--medium-foreground-fixed-dark',
    '#B7BCC1',
    'Applied to medium-foreground elements for elements that are locked to dark mode.',
  ],
];

const PRIMARY_LIGHT: [string, string, string][] = [
  [
    '--primary-background',
    '#1E2022',
    "Primary brand color used on buttons and key actions. It's the most prominent color in the UI, so use it sparingly to draw attention to the most important action on screen.",
  ],
  [
    '--primary-background-hover',
    '#4C5257',
    "Primary brand color used on hover states for buttons and key actions. It's the most prominent color in the UI, so use it sparingly to draw attention to the most important action on screen.",
  ],
  [
    '--primary-background-fixed-dark',
    '#F8F9F9',
    'Used when primary background elements need to remain light in both light and dark mode; paired with primary-background-fixed-dark-hover and primary-foreground-fixed-dark. This is a fixed dark mode theme.',
  ],
  [
    '--primary-background-hover-fixed-dark',
    '#E2E4E6',
    'Used when primary background elements need to remain light in both light and dark mode; paired with primary-background-fixed-dark and primary-foreground-fixed-dark. This is a fixed dark mode theme.',
  ],
  [
    '--primary-foreground',
    '#F2F3F4',
    'Used for text and icons on top of primary-background.',
  ],
  [
    '--primary-foreground-fixed-dark',
    '#17191A',
    'Used when primary text and icon elements need to remain dark in both light and dark mode; paired with primary-background-fixed-dark and primary-background-fixed-dark-hover. This is a fixed dark mode theme.',
  ],
];

const PRIMARY_DARK: [string, string, string][] = [
  [
    '--primary-background',
    '#F8F9F9',
    "Primary brand color used on buttons and key actions. It's the most prominent color in the UI, so use it sparingly to draw attention to the most important action on screen.",
  ],
  [
    '--primary-background-hover',
    '#E2E4E6',
    "Primary brand color used on hover states for buttons and key actions. It's the most prominent color in the UI, so use it sparingly to draw attention to the most important action on screen.",
  ],
  [
    '--primary-background-fixed-dark',
    '#F8F9F9',
    'Used when primary background elements need to remain light in both light and dark mode; paired with primary-background-fixed-dark-hover and primary-foreground-fixed-dark. This is a fixed dark mode theme.',
  ],
  [
    '--primary-background-hover-fixed-dark',
    '#E2E4E6',
    'Used when primary background elements need to remain light in both light and dark mode; paired with primary-background-fixed-dark and primary-foreground-fixed-dark. This is a fixed dark mode theme.',
  ],
  [
    '--primary-foreground',
    '#17191A',
    'Used for text and icons on top of primary-background.',
  ],
  [
    '--primary-foreground-fixed-dark',
    '#17191A',
    'Used when primary text and icon elements need to remain dark in both light and dark mode; paired with primary-background-fixed-dark and primary-background-fixed-dark-hover. This is a fixed dark mode theme.',
  ],
];

const SECONDARY_LIGHT: [string, string, string][] = [
  [
    '--secondary-background',
    '#E2E4E6',
    'Secondary brand color (recommended to keep neutral or soft color). Used for secondary actions, e.g. secondary buttons or switch background.',
  ],
  [
    '--secondary-background-hover',
    '#F2F3F4',
    'The hover state for secondary-background.',
  ],
  [
    '--secondary-background-fixed-dark',
    '#33373A',
    'Used when secondary background elements need to remain dark in both light and dark mode; paired with secondary-background-fixed-dark-hover and secondary-foreground-fixed-dark. This is a fixed dark mode theme.',
  ],
  [
    '--secondary-background-hover-fixed-dark',
    '#5C6369',
    'Used when secondary background elements need to remain dark in both light and dark mode; paired with secondary-background-fixed-dark and secondary-foreground-fixed-dark. This is a fixed dark mode theme.',
  ],
  [
    '--secondary-foreground',
    '#33373A',
    'Secondary text and icon colors used for subtitles or long descriptions.',
  ],
  [
    '--secondary-foreground-fixed-dark',
    '#D5D8DB',
    'Used when secondary text and icon elements need to remain light in both light and dark mode; paired with secondary-background-fixed-dark and secondary-background-fixed-dark-hover. This is a fixed dark mode theme.',
  ],
];

const SECONDARY_DARK: [string, string, string][] = [
  [
    '--secondary-background',
    '#33373A',
    'Secondary brand color (recommended to keep neutral or soft color). Used for secondary actions, e.g. secondary buttons or switch background.',
  ],
  [
    '--secondary-background-hover',
    '#5C6369',
    'The hover state for secondary-background.',
  ],
  [
    '--secondary-background-fixed-dark',
    '#33373A',
    'Used when secondary background elements need to remain dark in both light and dark mode; paired with secondary-background-fixed-dark-hover and secondary-foreground-fixed-dark. This is a fixed dark mode theme.',
  ],
  [
    '--secondary-background-hover-fixed-dark',
    '#5C6369',
    'Used when secondary background elements need to remain dark in both light and dark mode; paired with secondary-background-fixed-dark and secondary-foreground-fixed-dark. This is a fixed dark mode theme.',
  ],
  [
    '--secondary-foreground',
    '#D5D8DB',
    'Secondary text and icon colors used for subtitles or long descriptions.',
  ],
  [
    '--secondary-foreground-fixed-dark',
    '#D5D8DB',
    'Used when secondary text and icon elements need to remain light in both light and dark mode; paired with secondary-background-fixed-dark and secondary-background-fixed-dark-hover. This is a fixed dark mode theme.',
  ],
];

const POPOVER_LIGHT: [string, string, string][] = [
  [
    '--popover-background',
    '#FFFFFF',
    'Used for surfaces that appear highest in the UI layer and have a drop shadow behind, e.g. Dialog, Alert dialog, Popover.',
  ],
  [
    '--popover-background-hover',
    '#F2F3F4',
    'Hover state paired with popover-background.',
  ],
  [
    '--popover-background-fixed-dark',
    '#26292C',
    'Used when popover background elements need to remain dark in both light and dark mode.',
  ],
  [
    '--popover-foreground',
    '#17191A',
    'Used for foreground elements that sit on popover-background.',
  ],
  [
    '--popover-foreground-fixed-dark',
    '#FFFFFF',
    'Used for foreground elements that sit on popover-background, but locked to dark mode and paired with popover-background-fixed-dark.',
  ],
];

const POPOVER_DARK: [string, string, string][] = [
  [
    '--popover-background',
    '#1E2022',
    'Used for surfaces that appear highest in the UI layer and have a drop shadow behind, e.g. Dialog, Alert dialog, Popover.',
  ],
  [
    '--popover-background-hover',
    '#26292C',
    'Hover state paired with popover-background.',
  ],
  [
    '--popover-background-fixed-dark',
    '#26292C',
    'Used when popover background elements need to remain dark in both light and dark mode.',
  ],
  [
    '--popover-foreground',
    '#F2F3F4',
    'Used for foreground elements that sit on popover-background.',
  ],
  [
    '--popover-foreground-fixed-dark',
    '#FFFFFF',
    'Used for foreground elements that sit on popover-background, but locked to dark mode and paired with popover-background-fixed-dark.',
  ],
];

const CARD_LIGHT: [string, string, string][] = [
  [
    '--card-background',
    '#F8F9F9',
    'Use for any card or container background sitting on top of the main background.',
  ],
  [
    '--card-background-hover',
    '#F2F3F4',
    'Hover state for cards with card-background.',
  ],
  [
    '--card-foreground',
    '#17191A',
    'Used for foregrounds that sit on top of card-background.',
  ],
];

const CARD_DARK: [string, string, string][] = [
  [
    '--card-background',
    '#26292C',
    'Use for any card or container background sitting on top of the main background.',
  ],
  [
    '--card-background-hover',
    '#33373A',
    'Hover state for cards with card-background.',
  ],
  [
    '--card-foreground',
    '#F2F3F4',
    'Used for foregrounds that sit on top of card-background.',
  ],
];

const DESTRUCTIVE_LIGHT: [string, string, string][] = [
  [
    '--destructive-background',
    '#F43D5C',
    'Background color for destructive button.',
  ],
  [
    '--destructive-background-hover',
    '#D23751',
    'Background hover color for destructive button.',
  ],
  [
    '--destructive-foreground',
    '#F8F9F9',
    'Foreground color paired with destructive-background.',
  ],
  [
    '--destructive-foreground-strong',
    '#F43D5C',
    'Foreground color for destructive text and icon without destructive-background pairing.',
  ],
];

const DESTRUCTIVE_DARK: [string, string, string][] = [
  [
    '--destructive-background',
    '#F43D5C',
    'Background color for destructive button.',
  ],
  [
    '--destructive-background-hover',
    '#F7778D',
    'Background hover color for destructive button.',
  ],
  [
    '--destructive-foreground',
    '#F8F9F9',
    'Foreground color paired with destructive-background.',
  ],
  [
    '--destructive-foreground-strong',
    '#F7778D',
    'Foreground color for destructive text and icon without destructive-background pairing.',
  ],
];

const LINK_LIGHT: [string, string, string][] = [
  ['--link-foreground', '#5F83E2', 'Used for interactive links.'],
  ['--link-foreground-hover', '#A7BBEF', 'Hover state for interactive links.'],
];

const LINK_DARK: [string, string, string][] = [
  ['--link-foreground', '#7796E6', 'Used for interactive links.'],
  ['--link-foreground-hover', '#CCD7F6', 'Hover state for interactive links.'],
];

const BORDER_LIGHT: [string, string, string][] = [
  ['--border-default', '#E2E4E6', 'Default border color.'],
  [
    '--border-emphasized',
    '#D5D8DB',
    'Used for emphasize or to show active or hover states.',
  ],
  [
    '--border-disabled',
    '#F2F3F4',
    'Used for disabled borders on interactive elements.',
  ],
];

const BORDER_DARK: [string, string, string][] = [
  ['--border-default', '#33373A', 'Default border color.'],
  [
    '--border-emphasized',
    '#5C6369',
    'Used for emphasize or to show active or hover states.',
  ],
  [
    '--border-disabled',
    '#26292C',
    'Used for disabled borders on interactive elements.',
  ],
];

const RING_LIGHT: [string, string, string][] = [
  [
    '--ring-default',
    '#5F83E2',
    'Used for focus states around inputs as the inner border.',
  ],
  [
    '--ring-muted',
    '#CCD7F6',
    'Used for focus states around inputs as the outer border.',
  ],
  [
    '--ring-destructive-default',
    '#F43D5C',
    'Used for validation focus states around inputs as the inner border.',
  ],
  [
    '--ring-destructive-muted',
    '#FBC1CB',
    'Used for validation focus states around inputs as the outer border.',
  ],
];

const RING_DARK: [string, string, string][] = [
  [
    '--ring-default',
    '#8FA8EB',
    'Used for focus states around inputs as the inner border.',
  ],
  [
    '--ring-muted',
    '#3C5085',
    'Used for focus states around inputs as the outer border.',
  ],
  [
    '--ring-destructive-default',
    '#F7778D',
    'Used for validation focus states around inputs as the inner border.',
  ],
  [
    '--ring-destructive-muted',
    '#8E2A3B',
    'Used for validation focus states around inputs as the outer border.',
  ],
];

const SUCCESS_LIGHT: [string, string, string][] = [
  [
    '--success-background',
    '#D6ECDE',
    'Background of success status elements; paired with success-foreground.',
  ],
  [
    '--success-background-hover',
    '#B6DEC5',
    'Background hover of success status elements.',
  ],
  [
    '--success-foreground',
    '#19703A',
    'Used for success status on text and icon; paired with success-background.',
  ],
  [
    '--success-foreground-strong',
    '#1C984A',
    'Used for success status on text and icon without a success-background color.',
  ],
];

const SUCCESS_DARK: [string, string, string][] = [
  [
    '--success-background',
    '#132A1D',
    'Background of success status elements; paired with success-foreground.',
  ],
  [
    '--success-background-hover',
    '#153D25',
    'Background hover of success status elements.',
  ],
  [
    '--success-foreground',
    '#60B780',
    'Used for success status on text and icon; paired with success-background.',
  ],
  [
    '--success-foreground-strong',
    '#60B780',
    'Used for success status on text and icon without a success-background color.',
  ],
];

const WARNING_LIGHT: [string, string, string][] = [
  [
    '--warning-background',
    '#F8E4D1',
    'Background of warning status elements; paired with warning-foreground.',
  ],
  [
    '--warning-background-hover',
    '#F3CFAD',
    'Background hover of warning status elements.',
  ],
  [
    '--warning-foreground',
    '#9D5006',
    'Used for warning status on text and icon; paired with warning-background.',
  ],
  [
    '--warning-foreground-strong',
    '#D96A00',
    'Used for warning status on text and icon without a warning-background color.',
  ],
];

const WARNING_DARK: [string, string, string][] = [
  [
    '--warning-background',
    '#352210',
    'Background of warning status elements; paired with warning-foreground.',
  ],
  [
    '--warning-background-hover',
    '#512E0D',
    'Background hover of warning status elements.',
  ],
  [
    '--warning-foreground',
    '#E4974D',
    'Used for warning status on text and icon; paired with warning-background.',
  ],
  [
    '--warning-foreground-strong',
    '#E4974D',
    'Used for warning status on text and icon without a warning-background color.',
  ],
];

const CRITICAL_LIGHT: [string, string, string][] = [
  [
    '--critical-background',
    '#FDDCE2',
    'Background of critical status elements; paired with critical-foreground-strong.',
  ],
  [
    '--critical-background-hover',
    '#FBC1CB',
    'Background hover of critical status elements.',
  ],
  [
    '--critical-foreground',
    '#B03046',
    'Used for critical status on text and icon; paired with critical-background.',
  ],
  [
    '--critical-foreground-strong',
    '#F43D5C',
    'Used for critical status on text and icon without a critical-background color.',
  ],
];

const CRITICAL_DARK: [string, string, string][] = [
  [
    '--critical-background',
    '#3A1A20',
    'Background of critical status elements; paired with critical-foreground-strong.',
  ],
  [
    '--critical-background-hover',
    '#5A202A',
    'Background hover of critical status elements.',
  ],
  [
    '--critical-foreground',
    '#F7778D',
    'Used for critical status on text and icon; paired with critical-background.',
  ],
  [
    '--critical-foreground-strong',
    '#F7778D',
    'Used for critical status on text and icon without a critical-background color.',
  ],
];

const INFO_LIGHT: [string, string, string][] = [
  [
    '--info-background',
    '#D9EAFB',
    'Background of informational status elements; paired with info-foreground.',
  ],
  [
    '--info-background-hover',
    '#BCDAF8',
    'Background hover of informational status elements.',
  ],
  [
    '--info-foreground',
    '#2566A8',
    'Used for informational status on text and icon; paired with info-background.',
  ],
  [
    '--info-foreground-strong',
    '#2E8AE8',
    'Used for informational status on text and icon without an info-background color.',
  ],
];

const INFO_DARK: [string, string, string][] = [
  [
    '--info-background',
    '#162839',
    'Background of informational status elements; paired with info-foreground.',
  ],
  [
    '--info-background-hover',
    '#1A3857',
    'Background hover of informational status elements.',
  ],
  [
    '--info-foreground',
    '#6DADEF',
    'Used for informational status on text and icon; paired with info-background.',
  ],
  [
    '--info-foreground-strong',
    '#6DADEF',
    'Used for informational status on text and icon without an info-background color.',
  ],
];

const NEUTRAL_LIGHT: [string, string, string][] = [
  [
    '--neutral-background',
    '#E2E4E6',
    'Background of neutral status elements; paired with neutral-foreground.',
  ],
  [
    '--neutral-background-hover',
    '#D5D8DB',
    'Background hover of neutral status elements.',
  ],
  [
    '--neutral-foreground',
    '#4C5257',
    'Used for neutral status on text and icon; paired with neutral-background.',
  ],
  [
    '--neutral-foreground-strong',
    '#6C757C',
    'Used for neutral status on text and icon without a neutral-background color.',
  ],
];

const NEUTRAL_DARK: [string, string, string][] = [
  [
    '--neutral-background',
    '#1E2022',
    'Background of neutral status elements; paired with neutral-foreground.',
  ],
  [
    '--neutral-background-hover',
    '#26292C',
    'Background hover of neutral status elements.',
  ],
  [
    '--neutral-foreground',
    '#A3AAB0',
    'Used for neutral status on text and icon; paired with neutral-background.',
  ],
  [
    '--neutral-foreground-strong',
    '#A3AAB0',
    'Used for neutral status on text and icon without a neutral-background color.',
  ],
];

const DECORATIVE_LIGHT: [string, string, string][] = [
  [
    '--decorative-1-background',
    '#CCD7F6',
    'Sets the background color of an element.',
  ],
  [
    '--decorative-1-background-hover',
    '#A7BBEF',
    'Sets the background hover color of an element.',
  ],
  [
    '--decorative-1-foreground',
    '#2A3655',
    'Sets the foreground color of an element.',
  ],
  [
    '--decorative-2-background',
    '#B6DDD4',
    'Sets the background color of an element.',
  ],
  [
    '--decorative-2-background-hover',
    '#81C5B6',
    'Sets the background hover color of an element.',
  ],
  [
    '--decorative-2-foreground',
    '#143C34',
    'Sets the foreground color of an element.',
  ],
  [
    '--decorative-3-background',
    '#D1E1B8',
    'Sets the background color of an element.',
  ],
  [
    '--decorative-3-background-hover',
    '#AFCC84',
    'Sets the background hover color of an element.',
  ],
  [
    '--decorative-3-foreground',
    '#2F4017',
    'Sets the foreground color of an element.',
  ],
  [
    '--decorative-4-background',
    '#E3CFED',
    'Sets the background color of an element.',
  ],
  [
    '--decorative-4-background-hover',
    '#D0ADE0',
    'Sets the background hover color of an element.',
  ],
  [
    '--decorative-4-foreground',
    '#422E4D',
    'Sets the foreground color of an element.',
  ],
  [
    '--decorative-5-background',
    '#F8C3D9',
    'Sets the background color of an element.',
  ],
  [
    '--decorative-5-background-hover',
    '#F398BD',
    'Sets the background hover color of an element.',
  ],
  [
    '--decorative-5-foreground',
    '#562238',
    'Sets the foreground color of an element.',
  ],
  [
    '--decorative-6-background',
    '#EDDDAD',
    'Sets the background color of an element.',
  ],
  [
    '--decorative-6-background-hover',
    '#E0C573',
    'Sets the background hover color of an element.',
  ],
  [
    '--decorative-6-foreground',
    '#4B3C0D',
    'Sets the foreground color of an element.',
  ],
  [
    '--decorative-7-background',
    '#E2E4E6',
    'Sets the background color of an element.',
  ],
  [
    '--decorative-7-background-hover',
    '#B7BCC1',
    'Sets the background hover color of an element.',
  ],
  [
    '--decorative-7-foreground',
    '#33373A',
    'Sets the foreground color of an element.',
  ],
];

const DECORATIVE_DARK: [string, string, string][] = [
  [
    '--decorative-1-background',
    '#A7BBEF',
    'Sets the background color of an element.',
  ],
  [
    '--decorative-1-background-hover',
    '#CCD7F6',
    'Sets the background hover color of an element.',
  ],
  [
    '--decorative-1-foreground',
    '#1F2638',
    'Sets the foreground color of an element.',
  ],
  [
    '--decorative-2-background',
    '#81C5B6',
    'Sets the background color of an element.',
  ],
  [
    '--decorative-2-background-hover',
    '#B6DDD4',
    'Sets the background hover color of an element.',
  ],
  [
    '--decorative-2-foreground',
    '#132A26',
    'Sets the foreground color of an element.',
  ],
  [
    '--decorative-3-background',
    '#AFCC84',
    'Sets the background color of an element.',
  ],
  [
    '--decorative-3-background-hover',
    '#D1E1B8',
    'Sets the background hover color of an element.',
  ],
  [
    '--decorative-3-foreground',
    '#222C15',
    'Sets the foreground color of an element.',
  ],
  [
    '--decorative-4-background',
    '#D0ADE0',
    'Sets the background color of an element.',
  ],
  [
    '--decorative-4-background-hover',
    '#E3CFED',
    'Sets the background hover color of an element.',
  ],
  [
    '--decorative-4-foreground',
    '#2C2233',
    'Sets the foreground color of an element.',
  ],
  [
    '--decorative-5-background',
    '#F398BD',
    'Sets the background color of an element.',
  ],
  [
    '--decorative-5-background-hover',
    '#F8C3D9',
    'Sets the background hover color of an element.',
  ],
  [
    '--decorative-5-foreground',
    '#381B28',
    'Sets the foreground color of an element.',
  ],
  [
    '--decorative-6-background',
    '#E0C573',
    'Sets the background color of an element.',
  ],
  [
    '--decorative-6-background-hover',
    '#EDDDAD',
    'Sets the background hover color of an element.',
  ],
  [
    '--decorative-6-foreground',
    '#322A10',
    'Sets the foreground color of an element.',
  ],
  [
    '--decorative-7-background',
    '#D5D8DB',
    'Sets the background color of an element.',
  ],
  [
    '--decorative-7-background-hover',
    '#E2E4E6',
    'Sets the background hover color of an element.',
  ],
  [
    '--decorative-7-foreground',
    '#33373A',
    'Sets the foreground color of an element.',
  ],
];

function chartRows(hex: string, alphas: [string, number][]) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return alphas.map(
    ([suffix, a]) =>
      [suffix, `rgba(${r}, ${g}, ${b}, ${a})`] as [string, string]
  );
}

function buildChartGroup(name: string, hex: string): [string, string][] {
  return chartRows(hex, [
    ['450', 0.85],
    ['400', 0.7],
    ['300', 0.55],
    ['200', 0.32],
    ['100', name === 'neutral' ? 0.2 : 0.18],
    ['50', name === 'neutral' ? 0.1 : 0.07],
  ]).map(([suffix, rgba]) => [`--chart-${name}-${suffix}`, rgba]);
}

const CHART_LIGHT: [string, string][] = [
  ['--chart-gridlines', '#E2E4E6'],
  ['--chart-1-450', 'rgba(95, 131, 226, 0.85)'],
  ['--chart-1-400', 'rgba(95, 131, 226, 0.7)'],
  ['--chart-1-300', 'rgba(95, 131, 226, 0.55)'],
  ['--chart-1-200', 'rgba(95, 131, 226, 0.32)'],
  ['--chart-1-100', 'rgba(95, 125, 239, 0.18)'],
  ['--chart-1-50', 'rgba(95, 125, 239, 0.08)'],
  ['--chart-2-450', 'rgba(26, 150, 122, 0.85)'],
  ['--chart-2-400', 'rgba(26, 150, 122, 0.7)'],
  ['--chart-2-300', 'rgba(26, 150, 122, 0.55)'],
  ['--chart-2-200', 'rgba(26, 150, 122, 0.32)'],
  ['--chart-2-100', 'rgba(26, 150, 122, 0.18)'],
  ['--chart-2-50', 'rgba(26, 150, 122, 0.07)'],
  ['--chart-3-450', 'rgba(110, 162, 32, 0.85)'],
  ['--chart-3-400', 'rgba(110, 162, 32, 0.7)'],
  ['--chart-3-300', 'rgba(110, 162, 32, 0.55)'],
  ['--chart-3-200', 'rgba(110, 162, 32, 0.32)'],
  ['--chart-3-100', 'rgba(110, 162, 32, 0.18)'],
  ['--chart-3-50', 'rgba(110, 162, 32, 0.07)'],
  ['--chart-4-450', 'rgba(169, 106, 199, 0.85)'],
  ['--chart-4-400', 'rgba(169, 106, 199, 0.7)'],
  ['--chart-4-300', 'rgba(169, 106, 199, 0.55)'],
  ['--chart-4-200', 'rgba(169, 106, 199, 0.32)'],
  ['--chart-4-100', 'rgba(169, 106, 199, 0.18)'],
  ['--chart-4-50', 'rgba(183, 101, 196, 0.07)'],
  ['--chart-5-450', 'rgba(198, 149, 0, 0.85)'],
  ['--chart-5-400', 'rgba(198, 149, 0, 0.7)'],
  ['--chart-5-300', 'rgba(198, 149, 0, 0.55)'],
  ['--chart-5-200', 'rgba(198, 149, 0, 0.32)'],
  ['--chart-5-100', 'rgba(198, 149, 0, 0.18)'],
  ['--chart-5-50', 'rgba(198, 149, 0, 0.07)'],
  ...buildChartGroup('success', '#1C984A'),
  ...buildChartGroup('warning', '#D96A00'),
  ...buildChartGroup('destructive', '#F43D5C'),
  ...buildChartGroup('info', '#2E8AE8'),
  ['--chart-neutral-450', 'rgba(124, 134, 142, 0.85)'],
  ['--chart-neutral-400', 'rgba(124, 134, 142, 0.7)'],
  ['--chart-neutral-300', 'rgba(124, 134, 142, 0.55)'],
  ['--chart-neutral-200', 'rgba(124, 134, 142, 0.32)'],
  ['--chart-neutral-100', 'rgba(124, 134, 142, 0.2)'],
  ['--chart-neutral-50', 'rgba(124, 134, 142, 0.1)'],
];

const CHART_DARK: [string, string][] = [
  ['--chart-gridlines', '#26292C'],
  ...CHART_LIGHT.slice(1),
];

const HEAT_MAP_LIGHT: [string, string][] = [
  ['--heat-map-intense', '#5372C3'],
  ['--heat-map-strong', '#7796E6'],
  ['--heat-map-moderate', '#A7BBEF'],
  ['--heat-map-mild', '#E2E9FA'],
];

const HEAT_MAP_DARK: [string, string][] = [
  ['--heat-map-intense', '#A7BBEF'],
  ['--heat-map-strong', '#7796E6'],
  ['--heat-map-moderate', '#4861A4'],
  ['--heat-map-mild', '#2A3655'],
];

const SHADOW_LIGHT: [string, string][] = [
  ['--shadow-sm', 'rgba(0, 0, 0, 0.04)'],
  ['--shadow-md', 'rgba(0, 0, 0, 0.05)'],
  ['--shadow-lg', 'rgba(0, 0, 0, 0.06)'],
  ['--shadow-xl', 'rgba(0, 0, 0, 0.1)'],
];

const SHADOW_DARK: [string, string][] = [
  ['--shadow-sm', 'rgba(0, 0, 0, 0.2)'],
  ['--shadow-md', 'rgba(0, 0, 0, 0.3)'],
  ['--shadow-lg', 'rgba(0, 0, 0, 0.4)'],
  ['--shadow-xl', 'rgba(0, 0, 0, 0.6)'],
];

const THEME_GROUPS: {
  title: string;
  description: string;
  columns: string[];
  light: [string, string, string?][];
  dark: [string, string, string?][];
}[] = [
  {
    title: 'Base',
    description:
      'The default neutral layer. Used for page backgrounds, primary text, disabled states, and overlays. Start here for any neutral UI.',
    columns: ['Token', 'Value', 'Usage'],
    light: BASE_LIGHT,
    dark: BASE_DARK,
  },
  {
    title: 'Muted',
    description:
      'One step of contrast from Base — slightly darker in light mode, slightly lighter in dark mode. Used for subtle containers, sidebars, and shell elements that need separation from the page. For text, used for the lowest-priority content: metadata, captions, timestamps.',
    columns: ['Token', 'Value', 'Usage'],
    light: MUTED_LIGHT,
    dark: MUTED_DARK,
  },
  {
    title: 'Medium',
    description:
      'A further step of contrast from Muted. Used for inputs, fields, and interactive surfaces that need to read clearly on top of the page. For text, used for secondary content such as descriptions and long-form body copy.',
    columns: ['Token', 'Value', 'Usage'],
    light: MEDIUM_LIGHT,
    dark: MEDIUM_DARK,
  },
  {
    title: 'Primary (brand)',
    description:
      'The primary brand color (black for Cognite). Reserved for emphasis and interaction — main CTAs, and selected/active states in components like checkboxes, tabs, radio buttons, and switches. Do not use for general neutral UI. If you need black or dark gray structurally, use Base, not Primary.',
    columns: ['Token', 'Value', 'Usage'],
    light: PRIMARY_LIGHT,
    dark: PRIMARY_DARK,
  },
  {
    title: 'Secondary (brand)',
    description:
      "The secondary brand color (gray for Cognite). Use for secondary CTAs and toggled/selected states — toggle buttons, selected list items, selected cards. Same rule as Primary: don't use it for general layout grays; use Muted or Medium for that.",
    columns: ['Token', 'Value', 'Usage'],
    light: SECONDARY_LIGHT,
    dark: SECONDARY_DARK,
  },
  {
    title: 'Popover',
    description:
      'Surface and foreground tokens for contained content in popovers, which are floating, elevated layers (menus, tooltips, dialogs). Highest in the stack; pair with shadow tokens.',
    columns: ['Token', 'Value', 'Usage'],
    light: POPOVER_LIGHT,
    dark: POPOVER_DARK,
  },
  {
    title: 'Card',
    description:
      'Surface and foreground tokens for contained content in cards, which are a distinct surface, but not floating on the page.',
    columns: ['Token', 'Value', 'Usage'],
    light: CARD_LIGHT,
    dark: CARD_DARK,
  },
  {
    title: 'Destructive',
    description: 'Used for irreversible or destructive actions.',
    columns: ['Token', 'Value', 'Usage'],
    light: DESTRUCTIVE_LIGHT,
    dark: DESTRUCTIVE_DARK,
  },
  {
    title: 'Link',
    description: 'Used for hyperlinks that link to external pages.',
    columns: ['Token', 'Value', 'Usage'],
    light: LINK_LIGHT,
    dark: LINK_DARK,
  },
  {
    title: 'Border',
    description:
      'Dividers and outlines used for page content separation, containers and inputs.',
    columns: ['Token', 'Value', 'Usage'],
    light: BORDER_LIGHT,
    dark: BORDER_DARK,
  },
  {
    title: 'Ring',
    description:
      'Focus indicators for keyboard navigation, including validation states.',
    columns: ['Token', 'Value', 'Usage'],
    light: RING_LIGHT,
    dark: RING_DARK,
  },
  {
    title: 'Success',
    description: 'Indicates a positive, stable, or successful state.',
    columns: ['Token', 'Value', 'Usage'],
    light: SUCCESS_LIGHT,
    dark: SUCCESS_DARK,
  },
  {
    title: 'Warning',
    description: 'Indicates an abnormal or warning state.',
    columns: ['Token', 'Value', 'Usage'],
    light: WARNING_LIGHT,
    dark: WARNING_DARK,
  },
  {
    title: 'Critical',
    description: 'Indicates a negative, urgent, or critical state.',
    columns: ['Token', 'Value', 'Usage'],
    light: CRITICAL_LIGHT,
    dark: CRITICAL_DARK,
  },
  {
    title: 'Info',
    description:
      'Indicates a benign informational state such as running, active, published, or in progress.',
    columns: ['Token', 'Value', 'Usage'],
    light: INFO_LIGHT,
    dark: INFO_DARK,
  },
  {
    title: 'Neutral',
    description: 'Indicates a neutral or archived state.',
    columns: ['Token', 'Value', 'Usage'],
    light: NEUTRAL_LIGHT,
    dark: NEUTRAL_DARK,
  },
  {
    title: 'Decorative',
    description:
      'Decorative colors are primarily used for badges, alerts, and other decorative visual elements. They do not convey semantic meaning, so semantic status colors should be avoided in these contexts. To support easy re-theming, decorative colors are named 1–7 rather than being tied to specific color names such as Blue or Orange — this keeps them independent of their visual appearance and makes it easier to update themes without renaming tokens.',
    columns: ['Token', 'Value', 'Usage'],
    light: DECORATIVE_LIGHT,
    dark: DECORATIVE_DARK,
  },
  {
    title: 'Chart',
    description:
      'Chart colors are for data visualizations and should be used in numerical order, starting with --chart-1, then --chart-2, and so on.',
    columns: ['Token', 'Value'],
    light: CHART_LIGHT,
    dark: CHART_DARK,
  },
  {
    title: 'Heat map',
    description:
      'Heat map colors communicate intensity, magnitude, or density. They use a sequential progression from lower to higher values, helping users quickly identify patterns, concentrations, and outliers in data visualizations.',
    columns: ['Token', 'Value'],
    light: HEAT_MAP_LIGHT,
    dark: HEAT_MAP_DARK,
  },
  {
    title: 'Shadow',
    description:
      'Shadow colors define the tint and opacity used to create depth and elevation. They provide consistent visual separation between surfaces while maintaining a cohesive appearance across themes.',
    columns: ['Token', 'Value'],
    light: SHADOW_LIGHT,
    dark: SHADOW_DARK,
  },
];

function makeRamp(
  name: string,
  base: [string, string][],
  alpha: [string, string][]
) {
  return { name, base, alpha };
}

const RAMPS = [
  makeRamp(
    'Mountain',
    [
      ['--mountain-white', '#FFFFFF'],
      ['--mountain-10', '#F9FAFA'],
      ['--mountain-50', '#F1F2F3'],
      ['--mountain-100', '#E4E6E8'],
      ['--mountain-200', '#D4D7D9'],
      ['--mountain-300', '#BBC0C4'],
      ['--mountain-400', '#A5ABB1'],
      ['--mountain-450', '#8B949A'],
      ['--mountain-500', '#7C868E'],
      ['--mountain-600', '#5E666D'],
      ['--mountain-650', '#52595F'],
      ['--mountain-700', '#40464A'],
      ['--mountain-800', '#2D3134'],
      ['--mountain-900', '#212426'],
      ['--mountain-950', '#191B1D'],
      ['--mountain-black', '#111213'],
    ],
    [
      ['--mountain-50', 'rgba(124, 134, 142, 0.1)'],
      ['--mountain-100', 'rgba(124, 134, 142, 0.2)'],
      ['--mountain-200', 'rgba(124, 134, 142, 0.32)'],
      ['--mountain-300', 'rgba(124, 134, 142, 0.5)'],
      ['--mountain-400', 'rgba(124, 134, 142, 0.68)'],
      ['--mountain-450', 'rgba(124, 134, 142, 0.88)'],
      ['--mountain-600', 'rgba(109, 118, 126, 0.8)'],
      ['--mountain-650', 'rgba(109, 118, 126, 0.7)'],
      ['--mountain-700', 'rgba(109, 118, 126, 0.55)'],
      ['--mountain-800', 'rgba(109, 118, 126, 0.4)'],
      ['--mountain-900', 'rgba(109, 118, 126, 0.25)'],
      ['--mountain-950', 'rgba(109, 118, 126, 0.1)'],
    ]
  ),
  makeRamp(
    'Fjord',
    [
      ['--fjord-50', '#EFF2FD'],
      ['--fjord-100', '#DFE5FC'],
      ['--fjord-200', '#CCD5FA'],
      ['--fjord-300', '#AEBDF7'],
      ['--fjord-400', '#93A7F4'],
      ['--fjord-450', '#728DF1'],
      ['--fjord-500', '#5F7DEF'],
      ['--fjord-600', '#2F55EA'],
      ['--fjord-650', '#1742E7'],
      ['--fjord-700', '#1234B6'],
      ['--fjord-800', '#0D2582'],
      ['--fjord-900', '#0A1C61'],
      ['--fjord-950', '#050F33'],
    ],
    [
      ['--fjord-50', 'rgba(95, 125, 239, 0.1)'],
      ['--fjord-100', 'rgba(95, 125, 239, 0.2)'],
      ['--fjord-200', 'rgba(95, 125, 239, 0.32)'],
      ['--fjord-300', 'rgba(95, 125, 239, 0.5)'],
      ['--fjord-400', 'rgba(95, 125, 239, 0.68)'],
      ['--fjord-450', 'rgba(95, 125, 239, 0.88)'],
      ['--fjord-600', 'rgba(72, 106, 237, 0.8)'],
      ['--fjord-650', 'rgba(72, 106, 237, 0.7)'],
      ['--fjord-700', 'rgba(72, 106, 237, 0.55)'],
      ['--fjord-800', 'rgba(72, 106, 237, 0.4)'],
      ['--fjord-900', 'rgba(72, 106, 237, 0.25)'],
      ['--fjord-950', 'rgba(72, 106, 237, 0.1)'],
    ]
  ),
  makeRamp(
    'Nordic',
    [
      ['--nordic-50', '#DAF9F2'],
      ['--nordic-100', '#B4F2E5'],
      ['--nordic-200', '#7FE9D2'],
      ['--nordic-300', '#25D7B0'],
      ['--nordic-400', '#21C09D'],
      ['--nordic-450', '#1CA587'],
      ['--nordic-500', '#1A967A'],
      ['--nordic-600', '#14735E'],
      ['--nordic-650', '#116452'],
      ['--nordic-700', '#0D4E40'],
      ['--nordic-800', '#0A372D'],
      ['--nordic-900', '#072922'],
      ['--nordic-950', '#041511'],
    ],
    [
      ['--nordic-50', 'rgba(26, 150, 122, 0.1)'],
      ['--nordic-100', 'rgba(26, 150, 122, 0.2)'],
      ['--nordic-200', 'rgba(26, 150, 122, 0.32)'],
      ['--nordic-300', 'rgba(26, 150, 122, 0.5)'],
      ['--nordic-400', 'rgba(26, 150, 122, 0.68)'],
      ['--nordic-450', 'rgba(26, 150, 122, 0.88)'],
      ['--nordic-600', 'rgba(23, 132, 108, 0.8)'],
      ['--nordic-650', 'rgba(23, 132, 108, 0.7)'],
      ['--nordic-700', 'rgba(23, 132, 108, 0.55)'],
      ['--nordic-800', 'rgba(23, 132, 108, 0.4)'],
      ['--nordic-900', 'rgba(23, 132, 108, 0.25)'],
      ['--nordic-950', 'rgba(23, 132, 108, 0.1)'],
    ]
  ),
  makeRamp(
    'Aurora',
    [
      ['--aurora-50', '#E7F9C6'],
      ['--aurora-100', '#CFF38D'],
      ['--aurora-200', '#ABE938'],
      ['--aurora-300', '#90D217'],
      ['--aurora-400', '#81BC14'],
      ['--aurora-450', '#6EA112'],
      ['--aurora-500', '#649210'],
      ['--aurora-600', '#4D700C'],
      ['--aurora-650', '#43610B'],
      ['--aurora-700', '#344C08'],
      ['--aurora-800', '#253606'],
      ['--aurora-900', '#1B2804'],
      ['--aurora-950', '#0E1402'],
    ],
    [
      ['--aurora-50', 'rgba(100, 146, 16, 0.1)'],
      ['--aurora-100', 'rgba(100, 146, 16, 0.2)'],
      ['--aurora-200', 'rgba(100, 146, 16, 0.32)'],
      ['--aurora-300', 'rgba(100, 146, 16, 0.5)'],
      ['--aurora-400', 'rgba(100, 146, 16, 0.68)'],
      ['--aurora-450', 'rgba(100, 146, 16, 0.88)'],
      ['--aurora-600', 'rgba(88, 129, 14, 0.8)'],
      ['--aurora-650', 'rgba(88, 129, 14, 0.7)'],
      ['--aurora-700', 'rgba(88, 129, 14, 0.55)'],
      ['--aurora-800', 'rgba(88, 129, 14, 0.4)'],
      ['--aurora-900', 'rgba(88, 129, 14, 0.25)'],
      ['--aurora-950', 'rgba(88, 129, 14, 0.1)'],
    ]
  ),
  makeRamp(
    'Dusk',
    [
      ['--dusk-50', '#F8EFF9'],
      ['--dusk-100', '#F1E1F3'],
      ['--dusk-200', '#E8CEEC'],
      ['--dusk-300', '#DBB1E1'],
      ['--dusk-400', '#CF97D7'],
      ['--dusk-450', '#C078CB'],
      ['--dusk-500', '#B765C4'],
      ['--dusk-600', '#9940A6'],
      ['--dusk-650', '#853790'],
      ['--dusk-700', '#682C71'],
      ['--dusk-800', '#4A1F50'],
      ['--dusk-900', '#37173C'],
      ['--dusk-950', '#1C0C1F'],
    ],
    [
      ['--dusk-50', 'rgba(183, 101, 196, 0.1)'],
      ['--dusk-100', 'rgba(183, 101, 196, 0.2)'],
      ['--dusk-200', 'rgba(183, 101, 196, 0.32)'],
      ['--dusk-300', 'rgba(183, 101, 196, 0.5)'],
      ['--dusk-400', 'rgba(183, 101, 196, 0.68)'],
      ['--dusk-450', 'rgba(183, 101, 196, 0.88)'],
      ['--dusk-600', 'rgba(173, 78, 187, 0.8)'],
      ['--dusk-650', 'rgba(173, 78, 187, 0.7)'],
      ['--dusk-700', 'rgba(173, 78, 187, 0.55)'],
      ['--dusk-800', 'rgba(173, 78, 187, 0.4)'],
      ['--dusk-900', 'rgba(173, 78, 187, 0.25)'],
      ['--dusk-950', 'rgba(173, 78, 187, 0.1)'],
    ]
  ),
  makeRamp(
    'Sky',
    [
      ['--sky-50', '#DBF7FF'],
      ['--sky-100', '#B7EFFE'],
      ['--sky-200', '#84E4FE'],
      ['--sky-300', '#25CFFD'],
      ['--sky-400', '#02B9EA'],
      ['--sky-450', '#029FC9'],
      ['--sky-500', '#0290B6'],
      ['--sky-600', '#016E8C'],
      ['--sky-650', '#01607A'],
      ['--sky-700', '#014B60'],
      ['--sky-800', '#013644'],
      ['--sky-900', '#002832'],
      ['--sky-950', '#00151A'],
    ],
    [
      ['--sky-50', 'rgba(2, 144, 182, 0.1)'],
      ['--sky-100', 'rgba(2, 144, 182, 0.2)'],
      ['--sky-200', 'rgba(2, 144, 182, 0.32)'],
      ['--sky-300', 'rgba(2, 144, 182, 0.5)'],
      ['--sky-400', 'rgba(2, 144, 182, 0.68)'],
      ['--sky-450', 'rgba(2, 144, 182, 0.88)'],
      ['--sky-600', 'rgba(1, 127, 161, 0.8)'],
      ['--sky-650', 'rgba(1, 127, 161, 0.7)'],
      ['--sky-700', 'rgba(1, 127, 161, 0.55)'],
      ['--sky-800', 'rgba(1, 127, 161, 0.4)'],
      ['--sky-900', 'rgba(1, 127, 161, 0.25)'],
      ['--sky-950', 'rgba(1, 127, 161, 0.1)'],
    ]
  ),
  makeRamp(
    'Orange',
    [
      ['--orange-50', '#FEEFE6'],
      ['--orange-100', '#FDE0CF'],
      ['--orange-200', '#FCCDB0'],
      ['--orange-300', '#FBAE7E'],
      ['--orange-400', '#F98F4E'],
      ['--orange-450', '#F7640A'],
      ['--orange-500', '#E15A07'],
      ['--orange-600', '#AD4506'],
      ['--orange-650', '#963C05'],
      ['--orange-700', '#762F04'],
      ['--orange-800', '#542203'],
      ['--orange-900', '#3E1902'],
      ['--orange-950', '#210D01'],
    ],
    [
      ['--orange-50', 'rgba(225, 90, 7, 0.1)'],
      ['--orange-100', 'rgba(225, 90, 7, 0.2)'],
      ['--orange-200', 'rgba(225, 90, 7, 0.32)'],
      ['--orange-300', 'rgba(225, 90, 7, 0.5)'],
      ['--orange-400', 'rgba(225, 90, 7, 0.68)'],
      ['--orange-450', 'rgba(225, 90, 7, 0.88)'],
      ['--orange-600', 'rgba(199, 80, 6, 0.8)'],
      ['--orange-650', 'rgba(199, 80, 6, 0.7)'],
      ['--orange-700', 'rgba(199, 80, 6, 0.55)'],
      ['--orange-800', 'rgba(199, 80, 6, 0.4)'],
      ['--orange-900', 'rgba(199, 80, 6, 0.25)'],
      ['--orange-950', 'rgba(199, 80, 6, 0.1)'],
    ]
  ),
  makeRamp(
    'Yellow',
    [
      ['--yellow-50', '#FFF4A2'],
      ['--yellow-100', '#FFE834'],
      ['--yellow-200', '#F3D700'],
      ['--yellow-300', '#D8BF00'],
      ['--yellow-400', '#C1AB00'],
      ['--yellow-450', '#A69300'],
      ['--yellow-500', '#968500'],
      ['--yellow-600', '#736600'],
      ['--yellow-650', '#645900'],
      ['--yellow-700', '#4E4500'],
      ['--yellow-800', '#373100'],
      ['--yellow-900', '#292400'],
      ['--yellow-950', '#151200'],
    ],
    [
      ['--yellow-50', 'rgba(150, 133, 0, 0.1)'],
      ['--yellow-100', 'rgba(150, 133, 0, 0.2)'],
      ['--yellow-200', 'rgba(150, 133, 0, 0.32)'],
      ['--yellow-300', 'rgba(150, 133, 0, 0.5)'],
      ['--yellow-400', 'rgba(150, 133, 0, 0.68)'],
      ['--yellow-450', 'rgba(150, 133, 0, 0.88)'],
      ['--yellow-600', 'rgba(133, 118, 0, 0.8)'],
      ['--yellow-650', 'rgba(133, 118, 0, 0.7)'],
      ['--yellow-700', 'rgba(133, 118, 0, 0.55)'],
      ['--yellow-800', 'rgba(133, 118, 0, 0.4)'],
      ['--yellow-900', 'rgba(133, 118, 0, 0.25)'],
      ['--yellow-950', 'rgba(133, 118, 0, 0.1)'],
    ]
  ),
  makeRamp(
    'Pink',
    [
      ['--pink-50', '#FDEEF4'],
      ['--pink-100', '#FBDEEA'],
      ['--pink-200', '#F9CADD'],
      ['--pink-300', '#F5A9C8'],
      ['--pink-400', '#F28BB4'],
      ['--pink-450', '#ED6199'],
      ['--pink-500', '#E94487'],
      ['--pink-600', '#C4175C'],
      ['--pink-650', '#AB1451'],
      ['--pink-700', '#881040'],
      ['--pink-800', '#620B2E'],
      ['--pink-900', '#490823'],
      ['--pink-950', '#280513'],
    ],
    [
      ['--pink-50', 'rgba(233, 68, 135, 0.1)'],
      ['--pink-100', 'rgba(233, 68, 135, 0.2)'],
      ['--pink-200', 'rgba(233, 68, 135, 0.32)'],
      ['--pink-300', 'rgba(233, 68, 135, 0.5)'],
      ['--pink-400', 'rgba(233, 68, 135, 0.68)'],
      ['--pink-450', 'rgba(233, 68, 135, 0.88)'],
      ['--pink-600', 'rgba(225, 26, 106, 0.8)'],
      ['--pink-650', 'rgba(225, 26, 106, 0.7)'],
      ['--pink-700', 'rgba(225, 26, 106, 0.55)'],
      ['--pink-800', 'rgba(225, 26, 106, 0.4)'],
      ['--pink-900', 'rgba(225, 26, 106, 0.25)'],
      ['--pink-950', 'rgba(225, 26, 106, 0.1)'],
    ]
  ),
  makeRamp(
    'Gray',
    [
      ['--gray-50', '#F0F2F9'],
      ['--gray-100', '#E2E5F4'],
      ['--gray-200', '#D0D6ED'],
      ['--gray-300', '#B5BEE2'],
      ['--gray-400', '#9DA9D9'],
      ['--gray-450', '#818FCE'],
      ['--gray-500', '#7081C7'],
      ['--gray-600', '#4A5FB8'],
      ['--gray-650', '#3F52A3'],
      ['--gray-700', '#32417F'],
      ['--gray-800', '#232E5A'],
      ['--gray-900', '#1A2242'],
      ['--gray-950', '#0D1122'],
    ],
    [
      ['--gray-50', 'rgba(112, 129, 199, 0.1)'],
      ['--gray-100', 'rgba(112, 129, 199, 0.2)'],
      ['--gray-200', 'rgba(112, 129, 199, 0.32)'],
      ['--gray-300', 'rgba(112, 129, 199, 0.5)'],
      ['--gray-400', 'rgba(112, 129, 199, 0.68)'],
      ['--gray-450', 'rgba(112, 129, 199, 0.88)'],
      ['--gray-600', 'rgba(93, 112, 192, 0.8)'],
      ['--gray-650', 'rgba(93, 112, 192, 0.7)'],
      ['--gray-700', 'rgba(93, 112, 192, 0.55)'],
      ['--gray-800', 'rgba(93, 112, 192, 0.4)'],
      ['--gray-900', 'rgba(93, 112, 192, 0.25)'],
      ['--gray-950', 'rgba(93, 112, 192, 0.1)'],
    ]
  ),
  makeRamp(
    'Red',
    [
      ['--red-50', '#FEEEF1'],
      ['--red-100', '#FDDEE4'],
      ['--red-200', '#FCCAD2'],
      ['--red-300', '#FAA9B7'],
      ['--red-400', '#F8899C'],
      ['--red-450', '#F65E78'],
      ['--red-500', '#F43D5C'],
      ['--red-600', '#CB0B2C'],
      ['--red-650', '#B20A26'],
      ['--red-700', '#8D081F'],
      ['--red-800', '#660616'],
      ['--red-900', '#4E0411'],
      ['--red-950', '#2C0209'],
    ],
    [
      ['--red-50', 'rgba(244, 61, 92, 0.1)'],
      ['--red-100', 'rgba(244, 61, 92, 0.2)'],
      ['--red-200', 'rgba(244, 61, 92, 0.32)'],
      ['--red-300', 'rgba(244, 61, 92, 0.5)'],
      ['--red-400', 'rgba(244, 61, 92, 0.68)'],
      ['--red-450', 'rgba(244, 61, 92, 0.88)'],
      ['--red-600', 'rgba(233, 13, 50, 0.8)'],
      ['--red-650', 'rgba(233, 13, 50, 0.7)'],
      ['--red-700', 'rgba(233, 13, 50, 0.55)'],
      ['--red-800', 'rgba(233, 13, 50, 0.4)'],
      ['--red-900', 'rgba(233, 13, 50, 0.25)'],
      ['--red-950', 'rgba(233, 13, 50, 0.1)'],
    ]
  ),
  makeRamp(
    'Amber',
    [
      ['--amber-50', '#FFF1D0'],
      ['--amber-100', '#FFE3A2'],
      ['--amber-200', '#FFD062'],
      ['--amber-300', '#FCB100'],
      ['--amber-400', '#E19E00'],
      ['--amber-450', '#C18800'],
      ['--amber-500', '#AF7B00'],
      ['--amber-600', '#865E00'],
      ['--amber-650', '#755200'],
      ['--amber-700', '#5B4000'],
      ['--amber-800', '#412D00'],
      ['--amber-900', '#302200'],
      ['--amber-950', '#181100'],
    ],
    [
      ['--amber-50', 'rgba(175, 123, 0, 0.1)'],
      ['--amber-100', 'rgba(175, 123, 0, 0.2)'],
      ['--amber-200', 'rgba(175, 123, 0, 0.32)'],
      ['--amber-300', 'rgba(175, 123, 0, 0.5)'],
      ['--amber-400', 'rgba(175, 123, 0, 0.68)'],
      ['--amber-450', 'rgba(175, 123, 0, 0.88)'],
      ['--amber-600', 'rgba(155, 109, 0, 0.8)'],
      ['--amber-650', 'rgba(155, 109, 0, 0.7)'],
      ['--amber-700', 'rgba(155, 109, 0, 0.55)'],
      ['--amber-800', 'rgba(155, 109, 0, 0.4)'],
      ['--amber-900', 'rgba(155, 109, 0, 0.25)'],
      ['--amber-950', 'rgba(155, 109, 0, 0.1)'],
    ]
  ),
  makeRamp(
    'Green',
    [
      ['--green-50', '#DDF9E7'],
      ['--green-100', '#BBF3D0'],
      ['--green-200', '#8BEAAE'],
      ['--green-300', '#34DA71'],
      ['--green-400', '#24C45E'],
      ['--green-450', '#1FA851'],
      ['--green-500', '#1C984A'],
      ['--green-600', '#157538'],
      ['--green-650', '#136631'],
      ['--green-700', '#0F5026'],
      ['--green-800', '#0A381B'],
      ['--green-900', '#082A14'],
      ['--green-950', '#04160A'],
    ],
    [
      ['--green-50', 'rgba(28, 152, 74, 0.1)'],
      ['--green-100', 'rgba(28, 152, 74, 0.2)'],
      ['--green-200', 'rgba(28, 152, 74, 0.32)'],
      ['--green-300', 'rgba(28, 152, 74, 0.5)'],
      ['--green-400', 'rgba(28, 152, 74, 0.68)'],
      ['--green-450', 'rgba(28, 152, 74, 0.88)'],
      ['--green-600', 'rgba(25, 135, 65, 0.8)'],
      ['--green-650', 'rgba(25, 135, 65, 0.7)'],
      ['--green-700', 'rgba(25, 135, 65, 0.55)'],
      ['--green-800', 'rgba(25, 135, 65, 0.4)'],
      ['--green-900', 'rgba(25, 135, 65, 0.25)'],
      ['--green-950', 'rgba(25, 135, 65, 0.1)'],
    ]
  ),
  makeRamp(
    'Blue',
    [
      ['--blue-50', '#E6F4FF'],
      ['--blue-100', '#CEEAFF'],
      ['--blue-200', '#AEDCFF'],
      ['--blue-300', '#7CC6FF'],
      ['--blue-400', '#4CB2FF'],
      ['--blue-450', '#0B95FF'],
      ['--blue-500', '#0086ED'],
      ['--blue-600', '#0067B6'],
      ['--blue-650', '#005A9F'],
      ['--blue-700', '#00477D'],
      ['--blue-800', '#003259'],
      ['--blue-900', '#002542'],
      ['--blue-950', '#001423'],
    ],
    [
      ['--blue-50', 'rgba(0, 134, 237, 0.1)'],
      ['--blue-100', 'rgba(0, 134, 237, 0.2)'],
      ['--blue-200', 'rgba(0, 134, 237, 0.32)'],
      ['--blue-300', 'rgba(0, 134, 237, 0.5)'],
      ['--blue-400', 'rgba(0, 134, 237, 0.68)'],
      ['--blue-450', 'rgba(0, 134, 237, 0.88)'],
      ['--blue-600', 'rgba(0, 119, 210, 0.8)'],
      ['--blue-650', 'rgba(0, 119, 210, 0.7)'],
      ['--blue-700', 'rgba(0, 119, 210, 0.55)'],
      ['--blue-800', 'rgba(0, 119, 210, 0.4)'],
      ['--blue-900', 'rgba(0, 119, 210, 0.25)'],
      ['--blue-950', 'rgba(0, 119, 210, 0.1)'],
    ]
  ),
] as { name: string; base: [string, string][]; alpha: [string, string][] }[];

const RAMP_DESCRIPTIONS: Record<string, string> = {
  Mountain: 'Neutral base palette for text, surfaces, and borders.',
  Fjord: 'Primary decorative color used for charts.',
  Nordic: 'Primary decorative color used for charts and Atlas AI.',
  Aurora: 'Primary decorative color used for charts and decorative elements.',
  Dusk: 'Primary decorative color used for charts and decorative elements.',
  Sky: 'Secondary decorative color used for badges, avatars, and illustrations.',
  Orange:
    'Secondary decorative color used for badges, avatars, and illustrations.',
  Yellow:
    'Secondary decorative color used for badges, avatars, and illustrations.',
  Pink: 'Secondary decorative color used for badges, avatars, and illustrations.',
  Gray: 'Used for focus states and secondary decorative elements.',
  Red: 'Maps to semantic status colors for destructive actions and critical alerts.',
  Amber: 'Maps to semantic status colors for warnings.',
  Green: 'Maps to semantic status colors for success.',
  Blue: 'Maps to semantic status colors for information.',
};

export function ColorTokensContent() {
  return (
    <>
      <ContentSection title="The two layers">
        <p>
          Aura&apos;s color system is built in two layers.{' '}
          <strong className="text-foreground">Color ramps</strong> are the raw
          palette, which are sequential scales of tints and shades for each hue.{' '}
          <strong className="text-foreground">Tokens</strong> are semantic names
          that map to a specific ramp step and swap their value between light
          and dark mode automatically.
        </p>
        <p>
          This separation is what makes theming work. When a user switches
          themes, every token resolves to a different ramp step. To extend or
          customize color tokens in a consuming app, see{' '}
          <Link
            to="/documentation/custom-theming"
            className="text-link-fg hover:text-link-fg-hover hover:underline"
          >
            Custom theming
          </Link>{' '}
          in the Documentation section.
        </p>

        <SubHeading>Layer 1 — Color ramps</SubHeading>
        <p>
          Ramps are the source material. Each hue has a sequential scale (for
          example <code>--fjord-50</code> through <code>--fjord-950</code>)
          covering the full range of tints and shades. Alpha variants are
          semi-transparent overlays built from the ramp&apos;s base color,
          primarily intended for charts and data visualization.
        </p>
        <p>
          Ramps exist so tokens have something to point to.{' '}
          <strong className="text-foreground">
            You should rarely reference ramp values directly in product UI.
          </strong>{' '}
          The only valid exceptions are:
        </p>
        <ContentList
          items={[
            'A color must stay visually constant across both themes (use a fixed token instead if one exists)',
            'You are building a custom marketing or illustration surface where no semantic token fits and theming is not a concern',
          ]}
        />

        <SubHeading>Layer 2 — Tokens</SubHeading>
        <p>
          Tokens are named CSS custom properties that resolve to a ramp step.
          They are the vocabulary product UI speaks. A token like{' '}
          <code>--background</code> points to <code>--mountain-white</code> in
          light mode and <code>--mountain-950</code> in dark mode — the name
          stays the same, the value changes with the theme.
        </p>
      </ContentSection>

      <ContentSection title="Fixed tokens">
        <p>
          Fixed tokens are the deliberate exception to the theming rule. They
          resolve to the{' '}
          <strong className="text-foreground">
            same value in both light and dark mode
          </strong>{' '}
          — they do not flip with the theme. Unlike theme-adaptive surfaces,
          fixed colors stay consistent across light and dark mode — keeping
          these elements from becoming too stark against an inverted background.
        </p>
        <Callout variant="warning">
          Fixed tokens are not a workaround for theming. If you find yourself
          reaching for them outside of persistent chrome, it is a sign the
          design needs revisiting. Overusing fixed tokens breaks the light/dark
          contract for users.
        </Callout>
      </ContentSection>

      <ContentSection title="Light and dark theming">
        <p>
          Every token has a light mode value and a dark mode value. The token
          name never changes — only what it resolves to. This means:
        </p>
        <ContentList
          items={[
            'Product code never needs dark: overrides for tokens',
            'Switching themes is handled entirely by the system',
            'Contrast has been verified for both themes for every token',
          ]}
        />

        <SubHeading>How ramp steps map across themes</SubHeading>
        <p>
          As a general pattern, light mode uses lighter ramp steps for surfaces
          and darker steps for text. Dark mode inverts this.
        </p>
      </ContentSection>

      <ContentSection title="Dos and don'ts">
        <DoDontGrid
          dos={[
            <>
              Use tokens as named. Token names reflect their intended use and
              have been contrast-tested in both themes. Using{' '}
              <code>--destructive-foreground</code> for something that
              isn&apos;t destructive, or <code>--info-background</code> as a
              decorative accent, undermines both the visual language and
              accessibility guarantees.
            </>,
          ]}
          donts={[
            "Use raw hex values. Raw hex values don't respond to theme changes. A hardcoded #FFFFFF looks correct in light mode and breaks in dark mode. Always use a token.",
            "Adjust opacity manually. Manual opacity adjustments (opacity: 0.5, custom rgba() values) bypass the token system and produce colors that aren't theme-tested. Use alpha tokens from the ramp instead.",
            'Use semantic tokens decoratively. Semantic tokens — info, success, warning, destructive — exist to communicate system states. Using a green semantic background as a decorative accent trains users to ignore real success states. Use decorative tokens for visual differentiation that carries no status meaning.',
          ]}
        />
      </ContentSection>

      <ContentSection title="Theme tokens">
        <p>
          Theme tokens are organized by semantic role. Each token uses a{' '}
          <code>--group-property</code> naming convention and resolves to
          different values in light and dark mode automatically.
        </p>
        {THEME_GROUPS.map((group) => (
          <div key={group.title} className="pt-2">
            <CategoryHeading>{group.title}</CategoryHeading>
            <p>{group.description}</p>
            <ModeTokenTable
              columns={group.columns}
              modes={[
                {
                  label: 'Light',
                  rows: tokenRows(group.light as [string, string, string][]),
                },
                {
                  label: 'Dark',
                  rows: tokenRows(group.dark as [string, string, string][]),
                },
              ]}
            />
          </div>
        ))}
      </ContentSection>

      <ContentSection title="Color ramps">
        <p>
          Color ramps are sequential scales of tints and shades for a single hue
          (for example, <code>--mountain-50</code> through{' '}
          <code>--mountain-950</code>). Themed tokens map to specific steps on
          these ramps and swap their values between light and dark mode — so{' '}
          <code>--background</code> points to <code>--mountain-white</code> in
          light mode and <code>--mountain-950</code> in dark mode.
        </p>
        <p>
          <strong className="text-foreground">
            Use themed tokens, not raw ramp values
          </strong>{' '}
          — unless a color must stay constant across both themes, or you are
          building a custom marketing or illustration surface where no semantic
          token fits.
        </p>
        <p>
          Alpha values are semi-transparent overlays built from the ramp&apos;s
          base color. They are primarily intended for charts and data
          visualizations and are intentionally more muted. Light theme alphas
          map from 50–450 with 500 as the base; dark theme alphas map from
          600–950 with 550 as the base.
        </p>
        {RAMPS.map((ramp) => (
          <div key={ramp.name} className="pt-2">
            <CategoryHeading>{ramp.name}</CategoryHeading>
            <p>{RAMP_DESCRIPTIONS[ramp.name]}</p>
            <ModeTokenTable
              columns={['Token', 'Value']}
              modes={[
                { label: 'Default', rows: rampRows(ramp.base) },
                { label: 'Alpha', rows: rampRows(ramp.alpha) },
              ]}
            />
          </div>
        ))}
      </ContentSection>
    </>
  );
}
