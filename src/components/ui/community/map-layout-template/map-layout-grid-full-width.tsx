import type { ReactNode } from 'react';

import { MapLayoutTemplate } from './map-layout-template';

function MapGridFullWidth(): ReactNode {
  return <MapLayoutTemplate layout="grid-full-width" />;
}

MapGridFullWidth.displayName = 'MapGridFullWidth';

export { MapGridFullWidth };
