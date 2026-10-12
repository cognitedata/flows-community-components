import type { ReactNode } from 'react';

import { MapLayoutTemplate } from './map-layout-template';

function MapLeftRightPanels(): ReactNode {
  return <MapLayoutTemplate layout="left-right-panels" />;
}

MapLeftRightPanels.displayName = 'MapLeftRightPanels';

export { MapLeftRightPanels };
