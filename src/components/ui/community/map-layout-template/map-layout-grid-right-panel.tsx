import type { ReactNode } from 'react';

import { MapLayoutTemplate } from './map-layout-template';

function MapGridRightPanel(): ReactNode {
  return <MapLayoutTemplate layout="grid-right-panel" />;
}

MapGridRightPanel.displayName = 'MapGridRightPanel';

export { MapGridRightPanel };
