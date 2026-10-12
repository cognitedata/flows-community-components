import type { ReactNode } from 'react';

import { MapLayoutTemplate } from './map-layout-template';

function MapRightPanel(): ReactNode {
  return <MapLayoutTemplate layout="right-panel" />;
}

MapRightPanel.displayName = 'MapRightPanel';

export { MapRightPanel };
