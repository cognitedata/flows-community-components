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

type MapPaletteName =
  'aurora' | 'dusk' | 'fjord' | 'mountain' | 'nordic' | 'orange' | 'sky';

type MapPaletteColor = {
  highlight: string;
  fill: string;
};

type MapPalette = Record<MapPaletteName, MapPaletteColor>;

type MapBaseColors = {
  background: string;
  land: string;
  water: string;
  building: string;
  road: string;
  roadCasing: string;
  label: string;
  labelStrong: string;
};

type MapColors = {
  base: MapBaseColors;
  palette: MapPalette;
};

type MapContextValue = {
  map: MapLibreGL.Map | null;
  isLoaded: boolean;
  resolvedTheme: Theme;
  palette: MapPalette;
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
  dark: 'https://tiles.openfreemap.org/styles/dark',
  light: 'https://tiles.openfreemap.org/styles/positron',
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
    attributeFilter: ['class', 'data-theme', 'style'],
  });
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', onChange);
  return () => {
    observer.disconnect();
    mediaQuery.removeEventListener('change', onChange);
  };
}

function getTokenSnapshot(): string {
  const root = document.documentElement;
  return `${root.className}|${root.dataset.theme ?? ''}|${root.style.cssText}`;
}

function getServerTokenSnapshot(): string {
  return '';
}

const paletteNames: MapPaletteName[] = [
  'aurora',
  'dusk',
  'fjord',
  'mountain',
  'nordic',
  'orange',
  'sky',
];

const fallbackBaseColors: MapBaseColors = {
  background: '#ffffff',
  land: '#fafafa',
  water: '#e4e4e7',
  building: '#f4f4f5',
  road: '#d4d4d8',
  roadCasing: '#e4e4e7',
  label: '#71717a',
  labelStrong: '#09090b',
};

const fallbackPalette: MapPalette = {
  aurora: { highlight: '#047857', fill: '#d1fae5' },
  dusk: { highlight: '#6d28d9', fill: '#ede9fe' },
  fjord: { highlight: '#1d4ed8', fill: '#dbeafe' },
  mountain: { highlight: '#3f3f46', fill: '#f4f4f5' },
  nordic: { highlight: '#0f766e', fill: '#ccfbf1' },
  orange: { highlight: '#c2410c', fill: '#ffedd5' },
  sky: { highlight: '#0369a1', fill: '#e0f2fe' },
};

type Rgba = [number, number, number, number];

function toRgbaString([r, g, b, a]: Rgba): string {
  return `rgba(${r}, ${g}, ${b}, ${Math.round((a / 255) * 1000) / 1000})`;
}

function getRelativeLuminance([r, g, b]: Rgba): number {
  const [lr, lg, lb] = [r, g, b].map((channel) => {
    const value = channel / 255;
    return value <= 0.03928
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * (lr ?? 0) + 0.7152 * (lg ?? 0) + 0.0722 * (lb ?? 0);
}

function createTokenReader(
  element: HTMLElement
): ((token: string) => Rgba | null) | null {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) return null;
  const computed = getComputedStyle(element);

  return (token) => {
    const value = computed.getPropertyValue(`--${token}`).trim();
    if (!value) return null;
    context.clearRect(0, 0, 1, 1);
    context.fillStyle = value;
    context.fillRect(0, 0, 1, 1);
    const [r = 0, g = 0, b = 0, a = 0] = context.getImageData(0, 0, 1, 1).data;
    return [r, g, b, a];
  };
}

function resolveMapColors(element: HTMLElement): MapColors {
  const readToken = createTokenReader(element);
  if (!readToken) {
    return { base: fallbackBaseColors, palette: fallbackPalette };
  }

  const readColor = (token: string, fallback: string) => {
    const rgba = readToken(token);
    return rgba ? toRgbaString(rgba) : fallback;
  };

  const background = readToken('background');
  const backgroundLuminance = background ? getRelativeLuminance(background) : 1;

  const palette = { ...fallbackPalette };
  for (const name of paletteNames) {
    const foreground = readToken(`decorative-foreground-${name}`);
    const surface = readToken(`decorative-background-${name}`);
    if (!foreground || !surface) continue;
    const foregroundContrast = Math.abs(
      getRelativeLuminance(foreground) - backgroundLuminance
    );
    const surfaceContrast = Math.abs(
      getRelativeLuminance(surface) - backgroundLuminance
    );
    palette[name] =
      foregroundContrast >= surfaceContrast
        ? { highlight: toRgbaString(foreground), fill: toRgbaString(surface) }
        : { highlight: toRgbaString(surface), fill: toRgbaString(foreground) };
  }

  return {
    base: {
      background: background
        ? toRgbaString(background)
        : fallbackBaseColors.background,
      land: readColor('card-background', fallbackBaseColors.land),
      water: readColor('accent-background-strong', fallbackBaseColors.water),
      building: readColor('muted-background', fallbackBaseColors.building),
      road: readColor('border-emphasized', fallbackBaseColors.road),
      roadCasing: readColor('border', fallbackBaseColors.roadCasing),
      label: readColor('muted-foreground', fallbackBaseColors.label),
      labelStrong: readColor('foreground', fallbackBaseColors.labelStrong),
    },
    palette,
  };
}

const majorLabelPattern = /city|capital|country|state|continent/;

const casingPattern = /casing|_case/;

type PaintPropertyName = Parameters<MapLibreGL.Map['setPaintProperty']>[1];

function getBasemapPaint(
  layer: MapLibreGL.LayerSpecification,
  base: MapBaseColors
): [PaintPropertyName, string][] {
  const { id } = layer;
  switch (layer.type) {
    case 'background':
      return [['background-color', base.background]];
    case 'fill':
      if (id.startsWith('water')) return [['fill-color', base.water]];
      if (id.startsWith('building')) return [['fill-color', base.building]];
      return [['fill-color', base.land]];
    case 'line':
      if (id.startsWith('water')) return [['line-color', base.water]];
      if (casingPattern.test(id)) return [['line-color', base.roadCasing]];
      return [['line-color', base.road]];
    case 'symbol':
      return [
        [
          'text-color',
          majorLabelPattern.test(id) ? base.labelStrong : base.label,
        ],
        ['text-halo-color', base.background],
      ];
    default:
      return [];
  }
}

function applyBasemapColors(map: MapLibreGL.Map, base: MapBaseColors): void {
  for (const layer of map.getStyle().layers) {
    for (const [property, value] of getBasemapPaint(layer, base)) {
      map.setPaintProperty(layer.id, property, value);
    }
  }
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

    const tokenSnapshot = useSyncExternalStore(
      subscribeToTheme,
      getTokenSnapshot,
      getServerTokenSnapshot
    );
    const [colors, setColors] = useState<MapColors | null>(null);
    const usesDefaultStyle = !styles && !blank;

    const emitViewportChange = useEffectEvent((map: MapLibreGL.Map) => {
      onViewportChange?.(getViewport(map));
    });

    const recolorBasemap = useEffectEvent((map: MapLibreGL.Map) => {
      if (!usesDefaultStyle || !colors) return;
      applyBasemapColors(map, colors.base);
    });

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      setColors(resolveMapColors(container));
    }, [tokenSnapshot, resolvedTheme]);

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
      const handleStyleLoad = () => {
        recolorBasemap(map);
        setIsStyleLoaded(true);
      };
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

    useEffect(() => {
      if (!mapInstance || !isStyleLoaded) return;
      recolorBasemap(mapInstance);
    }, [mapInstance, isStyleLoaded, colors, usesDefaultStyle]);

    const palette = colors?.palette ?? fallbackPalette;

    const contextValue = useMemo(
      () => ({
        map: mapInstance,
        isLoaded: isLoaded && isStyleLoaded,
        resolvedTheme,
        palette,
      }),
      [mapInstance, isLoaded, isStyleLoaded, resolvedTheme, palette]
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

export {
  type MapPalette,
  type MapPaletteColor,
  type MapPaletteName,
  type MapRef,
  type MapViewport,
  Map,
  useMap,
};
