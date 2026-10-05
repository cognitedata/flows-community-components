import { Loader } from '@cognite/aura/components';
import { cn } from '@cognite/aura/utils';
import * as MapLibreGL from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  type ReactNode,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useEffectEvent,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';

if (typeof window !== 'undefined' && !MapLibreGL.getWorkerUrl()) {
  MapLibreGL.setWorkerUrl(
    `https://unpkg.com/maplibre-gl@${MapLibreGL.getVersion()}/dist/maplibre-gl-worker.mjs`
  );
}

type Theme = 'light' | 'dark';

type MapStyleOption = string | MapLibreGL.StyleSpecification;

type MapRef = MapLibreGL.Map;

type MapViewport = {
  center: [number, number];
  zoom: number;
  bearing: number;
  pitch: number;
};

type MapContextValue = {
  map: MapLibreGL.Map | null;
  isLoaded: boolean;
  resolvedTheme: Theme;
};

type MapProps = {
  children?: ReactNode;
  className?: string;
  theme?: Theme;
  styles?: {
    light?: MapStyleOption;
    dark?: MapStyleOption;
  };
  blank?: boolean;
  projection?: MapLibreGL.ProjectionSpecification;
  viewport?: Partial<MapViewport>;
  onViewportChange?: (viewport: MapViewport) => void;
  loading?: boolean;
} & Omit<MapLibreGL.MapOptions, 'container' | 'style'>;

const defaultStyles: Record<Theme, MapStyleOption> = {
  dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
};

const blankMapStyle: MapLibreGL.StyleSpecification = {
  version: 8,
  sources: {},
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: { 'background-color': 'rgba(0, 0, 0, 0)' },
    },
  ],
};

function getDocumentTheme(): Theme | null {
  if (typeof document === 'undefined') return null;
  const root = document.documentElement;
  if (root.classList.contains('dark')) return 'dark';
  if (root.classList.contains('light')) return 'light';
  const dataTheme = root.dataset.theme;
  if (dataTheme === 'dark' || dataTheme === 'light') return dataTheme;
  return null;
}

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getThemeSnapshot(): Theme {
  return getDocumentTheme() ?? getSystemTheme();
}

function getServerThemeSnapshot(): Theme {
  return 'light';
}

function subscribeToTheme(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'data-theme'],
  });
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', onChange);
  return () => {
    observer.disconnect();
    mediaQuery.removeEventListener('change', onChange);
  };
}

function useResolvedTheme(themeProp?: Theme): Theme {
  const detectedTheme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );
  return themeProp ?? detectedTheme;
}

function resolveMapStyle(
  theme: Theme,
  styles: MapProps['styles'],
  blank: boolean
): MapStyleOption {
  if (styles) return styles[theme] ?? defaultStyles[theme];
  if (blank) return blankMapStyle;
  return defaultStyles[theme];
}

function getStyleKey(style: MapStyleOption): string {
  return typeof style === 'string' ? style : JSON.stringify(style);
}

function getViewport(map: MapLibreGL.Map): MapViewport {
  const center = map.getCenter();
  return {
    center: [center.lng, center.lat],
    zoom: map.getZoom(),
    bearing: map.getBearing(),
    pitch: map.getPitch(),
  };
}

const MapContext = createContext<MapContextValue | null>(null);

function useMap(): MapContextValue {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a <Map />');
  }
  return context;
}

function MapLoader(): ReactNode {
  return (
    <div
      data-slot="map-loader"
      className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-xs"
    >
      <Loader />
    </div>
  );
}

const Map = forwardRef<MapRef | null, MapProps>(
  (
    {
      children,
      className,
      theme: themeProp,
      styles,
      blank = false,
      projection,
      viewport,
      onViewportChange,
      loading = false,
      ...options
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mapInstance, setMapInstance] = useState<MapLibreGL.Map | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isStyleLoaded, setIsStyleLoaded] = useState(false);
    const internalUpdateRef = useRef(false);
    const resolvedTheme = useResolvedTheme(themeProp);
    const activeStyle = resolveMapStyle(resolvedTheme, styles, blank);
    const activeStyleKey = getStyleKey(activeStyle);
    const appliedStyleKeyRef = useRef(activeStyleKey);
    const isControlled =
      viewport !== undefined && onViewportChange !== undefined;

    const [initialOptions] = useState(() => ({
      ...options,
      ...viewport,
      style: activeStyle,
    }));

    const emitViewportChange = useEffectEvent((map: MapLibreGL.Map) => {
      onViewportChange?.(getViewport(map));
    });

    useImperativeHandle<MapRef | null, MapRef | null>(ref, () => mapInstance, [
      mapInstance,
    ]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const map = new MapLibreGL.Map({
        renderWorldCopies: false,
        attributionControl: { compact: true },
        ...initialOptions,
        container,
      });

      const handleLoad = () => setIsLoaded(true);
      const handleStyleLoad = () => setIsStyleLoaded(true);
      const handleMove = () => {
        if (internalUpdateRef.current) return;
        emitViewportChange(map);
      };

      map.on('load', handleLoad);
      map.on('style.load', handleStyleLoad);
      map.on('move', handleMove);
      setMapInstance(map);

      return () => {
        map.off('load', handleLoad);
        map.off('style.load', handleStyleLoad);
        map.off('move', handleMove);
        map.remove();
        setIsLoaded(false);
        setIsStyleLoaded(false);
        setMapInstance(null);
      };
    }, [initialOptions]);

    useEffect(() => {
      if (!mapInstance || !isControlled || !viewport) return;
      if (mapInstance.isMoving()) return;

      const current = getViewport(mapInstance);
      const next = {
        center: viewport.center ?? current.center,
        zoom: viewport.zoom ?? current.zoom,
        bearing: viewport.bearing ?? current.bearing,
        pitch: viewport.pitch ?? current.pitch,
      };

      if (
        next.center[0] === current.center[0] &&
        next.center[1] === current.center[1] &&
        next.zoom === current.zoom &&
        next.bearing === current.bearing &&
        next.pitch === current.pitch
      ) {
        return;
      }

      internalUpdateRef.current = true;
      mapInstance.jumpTo(next);
      internalUpdateRef.current = false;
    }, [mapInstance, isControlled, viewport]);

    useEffect(() => {
      if (!mapInstance || appliedStyleKeyRef.current === activeStyleKey) {
        return;
      }
      appliedStyleKeyRef.current = activeStyleKey;
      setIsStyleLoaded(false);
      mapInstance.setStyle(activeStyle, { diff: false });
    }, [mapInstance, activeStyle, activeStyleKey]);

    useEffect(() => {
      if (!mapInstance || !isStyleLoaded || !projection) return;
      mapInstance.setProjection(projection);
    }, [mapInstance, isStyleLoaded, projection]);

    const contextValue = useMemo(
      () => ({
        map: mapInstance,
        isLoaded: isLoaded && isStyleLoaded,
        resolvedTheme,
      }),
      [mapInstance, isLoaded, isStyleLoaded, resolvedTheme]
    );

    return (
      <MapContext.Provider value={contextValue}>
        <div
          ref={containerRef}
          data-slot="map"
          className={cn('relative h-full w-full', className)}
        >
          {(!isLoaded || loading) && <MapLoader />}
          {mapInstance && children}
        </div>
      </MapContext.Provider>
    );
  }
);

Map.displayName = 'Map';

export { type MapRef, type MapViewport, Map, useMap };
