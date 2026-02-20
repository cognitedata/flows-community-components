import { setProjectAnnotations } from '@storybook/react';

import * as preview from './preview';

if (typeof window !== 'undefined') {
  (window as Window & { __STORYBOOK_TEST__?: boolean }).__STORYBOOK_TEST__ = true;
}

setProjectAnnotations(preview);
