import { describe, expect, it } from 'vitest';

import { getHelperTextToRender } from './confirmation.utils';

describe('getHelperTextToRender', () => {
  it.each([
    {
      title: 'renders string helperText during approval-requested',
      state: 'approval-requested',
      helperText: 'Only allow tools that you trust',
      expected: 'Only allow tools that you trust',
    },
    {
      title: 'renders empty string helperText during approval-requested',
      state: 'approval-requested',
      helperText: '',
      expected: '',
    },
    {
      title: 'renders 0 helperText during approval-requested',
      state: 'approval-requested',
      helperText: 0,
      expected: 0,
    },
    {
      title: 'renders false helperText during approval-requested',
      state: 'approval-requested',
      helperText: false,
      expected: false,
    },
    {
      title: 'returns null when helperText is undefined',
      state: 'approval-requested',
      helperText: undefined,
      expected: null,
    },
    {
      title: 'returns null when helperText is null',
      state: 'approval-requested',
      helperText: null,
      expected: null,
    },
    {
      title: 'returns null during approval-responded',
      state: 'approval-responded',
      helperText: 'Only allow tools that you trust',
      expected: null,
    },
    {
      title: 'returns null during output-denied',
      state: 'output-denied',
      helperText: 'Only allow tools that you trust',
      expected: null,
    },
    {
      title: 'returns null during output-available',
      state: 'output-available',
      helperText: 'Only allow tools that you trust',
      expected: null,
    },
    {
      title: 'returns null during input-streaming',
      state: 'input-streaming',
      helperText: 'Only allow tools that you trust',
      expected: null,
    },
    {
      title: 'returns null during input-available',
      state: 'input-available',
      helperText: 'Only allow tools that you trust',
      expected: null,
    },
  ] as const)('$title', ({ state, helperText, expected }) => {
    expect(getHelperTextToRender(state, helperText)).toBe(expected);
  });
});
