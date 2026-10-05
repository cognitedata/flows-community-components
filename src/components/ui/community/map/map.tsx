import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { Badge, Loader } from '@cognite/aura/components';
import { cn } from '@cognite/aura/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as MapLibreGL from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  type ComponentProps,
  type ReactNode,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';

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
  coastline: string;
  border: string;
};

type MapGeoJSON = MapLibreGL.GeoJSONSourceSpecification['data'];

type MapGeography = {
  land: MapGeoJSON;
  lakes?: MapGeoJSON;
  borders?: MapGeoJSON;
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
  geography?: MapGeography;
  blank?: boolean;
  projection?: MapLibreGL.ProjectionSpecification;
  viewport?: Partial<MapViewport>;
  onViewportChange?: (viewport: MapViewport) => void;
  loading?: boolean;
} & Omit<MapLibreGL.MapOptions, 'container' | 'style' | 'attributionControl'>;

const naturalEarthUrl =
  'https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector@v5.1.2/geojson';

function createNaturalEarthGeography(scale: '10m' | '50m'): MapGeography {
  return {
    land: `${naturalEarthUrl}/ne_${scale}_land.geojson`,
    lakes: `${naturalEarthUrl}/ne_${scale}_lakes.geojson`,
    borders: `${naturalEarthUrl}/ne_${scale}_admin_0_boundary_lines_land.geojson`,
  };
}

const naturalEarth50m = createNaturalEarthGeography('50m');

const naturalEarth10m = createNaturalEarthGeography('10m');

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
  coastline: '#d4d4d8',
  border: '#a1a1aa',
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
      coastline: readColor('border', fallbackBaseColors.coastline),
      border: readColor('border-emphasized', fallbackBaseColors.border),
    },
    palette,
  };
}

function createGeographyStyle(
  geography: MapGeography,
  base: MapBaseColors = fallbackBaseColors
): MapLibreGL.StyleSpecification {
  const { land, lakes, borders } = geography;
  const layers: MapLibreGL.LayerSpecification[] = [
    {
      id: 'water',
      type: 'background',
      paint: { 'background-color': base.water },
    },
    {
      id: 'land',
      type: 'fill',
      source: 'land',
      paint: { 'fill-color': base.land },
    },
    {
      id: 'coastline',
      type: 'line',
      source: 'land',
      paint: { 'line-color': base.coastline, 'line-width': 0.75 },
    },
  ];
  const sources: MapLibreGL.StyleSpecification['sources'] = {
    land: { type: 'geojson', data: land },
  };

  if (lakes) {
    sources.lakes = { type: 'geojson', data: lakes };
    layers.push({
      id: 'lakes',
      type: 'fill',
      source: 'lakes',
      paint: { 'fill-color': base.water },
    });
  }

  if (borders) {
    sources.borders = { type: 'geojson', data: borders };
    layers.push({
      id: 'borders',
      type: 'line',
      source: 'borders',
      paint: { 'line-color': base.border, 'line-width': 0.75 },
    });
  }

  return { version: 8, sources, layers };
}

type PaintPropertyName = Parameters<MapLibreGL.Map['setPaintProperty']>[1];

const basemapPaint: [string, PaintPropertyName, keyof MapBaseColors][] = [
  ['water', 'background-color', 'water'],
  ['land', 'fill-color', 'land'],
  ['coastline', 'line-color', 'coastline'],
  ['lakes', 'fill-color', 'water'],
  ['borders', 'line-color', 'border'],
];

function applyBasemapColors(map: MapLibreGL.Map, base: MapBaseColors): void {
  for (const [layerId, property, color] of basemapPaint) {
    if (map.getLayer(layerId)) {
      map.setPaintProperty(layerId, property, base[color]);
    }
  }
}

function recolorBasemap(
  map: MapLibreGL.Map,
  {
    usesDefaultStyle,
    colors,
  }: { usesDefaultStyle: boolean; colors: MapColors | null }
): void {
  if (!usesDefaultStyle || !colors) return;
  applyBasemapColors(map, colors.base);
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
  blank: boolean,
  geography: MapGeography
): MapStyleOption {
  if (blank) return blankMapStyle;
  return styles?.[theme] ?? createGeographyStyle(geography);
}

function getStyleKey(style: MapStyleOption): string {
  return typeof style === 'string' ? style : JSON.stringify(style);
}

function collapseAttribution(container: HTMLElement): void {
  const attribution = container.querySelector('.maplibregl-ctrl-attrib');
  if (!attribution?.classList.contains('maplibregl-compact')) return;
  attribution.classList.remove('maplibregl-compact-show');
  attribution.removeAttribute('open');
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
      geography = naturalEarth50m,
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
    const customStyle = styles?.[resolvedTheme];
    const activeStyle = useMemo(
      () => resolveMapStyle(resolvedTheme, styles, blank, geography),
      [resolvedTheme, styles, blank, geography]
    );
    const activeStyleKey = useMemo(
      () => getStyleKey(activeStyle),
      [activeStyle]
    );
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
    const usesDefaultStyle = !blank && !customStyle;
    const hasCustomStyle = !blank && customStyle !== undefined;

    const latestRef = useRef({ onViewportChange, usesDefaultStyle, colors });

    useLayoutEffect(() => {
      latestRef.current = { onViewportChange, usesDefaultStyle, colors };
    });

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      const resolved = resolveMapColors(container);
      latestRef.current = { ...latestRef.current, colors: resolved };
      setColors(resolved);
    }, [tokenSnapshot, resolvedTheme]);

    useImperativeHandle<MapRef | null, MapRef | null>(ref, () => mapInstance, [
      mapInstance,
    ]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const map = new MapLibreGL.Map({
        renderWorldCopies: false,
        ...initialOptions,
        attributionControl: false,
        container,
      });

      const handleLoad = () => {
        collapseAttribution(container);
        setIsLoaded(true);
      };
      const handleStyleLoad = () => {
        recolorBasemap(map, latestRef.current);
        setIsStyleLoaded(true);
      };
      const handleMove = () => {
        if (internalUpdateRef.current) return;
        latestRef.current.onViewportChange?.(getViewport(map));
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
      if (!mapInstance || !hasCustomStyle) return;
      const control = new MapLibreGL.AttributionControl({ compact: true });
      mapInstance.addControl(control);
      collapseAttribution(mapInstance.getContainer());
      return () => {
        mapInstance.removeControl(control);
      };
    }, [mapInstance, hasCustomStyle]);

    useEffect(() => {
      if (!mapInstance || !isStyleLoaded || !projection) return;
      mapInstance.setProjection(projection);
    }, [mapInstance, isStyleLoaded, projection]);

    useEffect(() => {
      if (!mapInstance || !isStyleLoaded) return;
      recolorBasemap(mapInstance, { usesDefaultStyle, colors });
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

type MapMarkerProps = {
  longitude: number;
  latitude: number;
  anchor?: MapLibreGL.PositionAnchor;
} & ComponentProps<'div'>;

function MapMarker({
  longitude,
  latitude,
  anchor = 'center',
  className,
  ...props
}: MapMarkerProps): ReactNode {
  const { map } = useMap();
  const [marker] = useState(
    () =>
      new MapLibreGL.Marker({
        element: document.createElement('div'),
        anchor,
      })
  );

  useEffect(() => {
    marker.setLngLat([longitude, latitude]);
  }, [marker, longitude, latitude]);

  useEffect(() => {
    if (!map) return;
    marker.addTo(map);
    return () => {
      marker.remove();
    };
  }, [marker, map]);

  return createPortal(
    <div
      data-slot="map-marker"
      className={cn('relative', className)}
      {...props}
    />,
    marker.getElement()
  );
}

const surfaceColors: Record<MapPaletteName, string> = {
  aurora: 'bg-decorative-background-aurora text-decorative-foreground-aurora',
  dusk: 'bg-decorative-background-dusk text-decorative-foreground-dusk',
  fjord: 'bg-decorative-background-fjord text-decorative-foreground-fjord',
  mountain:
    'bg-decorative-background-mountain text-decorative-foreground-mountain',
  nordic: 'bg-decorative-background-nordic text-decorative-foreground-nordic',
  orange: 'bg-decorative-background-orange text-decorative-foreground-orange',
  sky: 'bg-decorative-background-sky text-decorative-foreground-sky',
};

const solidColors: Record<MapPaletteName, string> = {
  aurora:
    'bg-decorative-foreground-aurora dark:bg-decorative-background-aurora',
  dusk: 'bg-decorative-foreground-dusk dark:bg-decorative-background-dusk',
  fjord: 'bg-decorative-foreground-fjord dark:bg-decorative-background-fjord',
  mountain: 'bg-decorative-foreground-mountain',
  nordic:
    'bg-decorative-foreground-nordic dark:bg-decorative-background-nordic',
  orange:
    'bg-decorative-foreground-orange dark:bg-decorative-background-orange',
  sky: 'bg-decorative-foreground-sky dark:bg-decorative-background-sky',
};

const mapPinVariants = cva(
  'flex size-9 rotate-45 items-center justify-center rounded-full rounded-br-none border-2 border-background shadow-md transition-transform group-data-selected/map-pin:scale-125 group-focus-visible/map-pin:outline-2 group-focus-visible/map-pin:outline-offset-2 group-focus-visible/map-pin:outline-border-active [&>svg]:size-4 [&>svg]:-rotate-45',
  {
    variants: { color: surfaceColors },
    defaultVariants: { color: 'fjord' },
  }
);

const mapMarkerDotVariants = cva('rounded-full', {
  variants: { color: solidColors },
  defaultVariants: { color: 'fjord' },
});

const mapMarkerDotSizeVariants = cva('relative flex', {
  variants: {
    size: {
      small: 'size-2.5',
      medium: 'size-3',
      large: 'size-3.5',
    },
  },
  defaultVariants: { size: 'medium' },
});

const mapOverlayVariants = cva('absolute z-10', {
  variants: {
    position: {
      'top-left': 'top-2 left-2',
      'top-right': 'top-2 right-2',
      'bottom-left': 'bottom-2 left-2',
      'bottom-right': 'right-2 bottom-2',
    },
  },
  defaultVariants: { position: 'top-left' },
});

const mapPanelClassName =
  'flex flex-wrap gap-x-3 gap-y-1 rounded-md border bg-background/80 px-2 py-1.5 text-xs shadow-sm backdrop-blur';

type MapPinProps = Omit<useRender.ComponentProps<'div'>, 'color'> &
  VariantProps<typeof mapPinVariants> & {
    selected?: boolean;
  };

function MapPin({
  className,
  color,
  selected = false,
  render,
  children,
  ...props
}: MapPinProps): ReactNode {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: cn('group/map-pin block pb-2 outline-none', className),
        children: (
          <span data-slot="map-pin-body" className={mapPinVariants({ color })}>
            {children}
          </span>
        ),
      },
      props
    ),
    render,
    state: {
      slot: 'map-pin',
      selected,
    },
    stateAttributesMapping: {
      selected: (value) => (value ? { 'data-selected': 'true' } : null),
    },
  });
}

type MapMarkerLabelProps = Omit<ComponentProps<typeof Badge>, 'variant'> & {
  color?: MapPaletteName;
};

function MapMarkerLabel({
  color = 'fjord',
  className,
  ...props
}: MapMarkerLabelProps): ReactNode {
  return (
    <Badge
      data-slot="map-marker-label"
      variant={color}
      className={cn('shadow-sm', className)}
      {...props}
    />
  );
}

type MapMarkerDotProps = Omit<ComponentProps<'span'>, 'color'> &
  VariantProps<typeof mapMarkerDotVariants> &
  VariantProps<typeof mapMarkerDotSizeVariants> & {
    pulse?: boolean;
  };

function MapMarkerDot({
  color,
  size,
  pulse = false,
  className,
  ...props
}: MapMarkerDotProps): ReactNode {
  return (
    <span
      data-slot="map-marker-dot"
      className={cn(mapMarkerDotSizeVariants({ size }), className)}
      {...props}
    >
      {pulse && (
        <span
          className={cn(
            'absolute inset-0 animate-ping opacity-60 motion-reduce:hidden',
            mapMarkerDotVariants({ color })
          )}
        />
      )}
      <span
        className={cn(
          'relative size-full border-2 border-background shadow-sm',
          mapMarkerDotVariants({ color })
        )}
      />
    </span>
  );
}

type MapOverlayProps = useRender.ComponentProps<'div'> &
  VariantProps<typeof mapOverlayVariants>;

function MapOverlay({
  className,
  position,
  render,
  ...props
}: MapOverlayProps): ReactNode {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      { className: cn(mapOverlayVariants({ position }), className) },
      props
    ),
    render,
    state: { slot: 'map-overlay' },
  });
}

type MapLegendProps = ComponentProps<'ul'> &
  VariantProps<typeof mapOverlayVariants>;

function MapLegend({
  className,
  position,
  ...props
}: MapLegendProps): ReactNode {
  return (
    <ul
      data-slot="map-legend"
      className={cn(
        mapOverlayVariants({ position }),
        mapPanelClassName,
        className
      )}
      {...props}
    />
  );
}

type MapLegendItemProps = Omit<ComponentProps<'li'>, 'color'> & {
  color?: MapPaletteName;
};

function MapLegendItem({
  color,
  className,
  children,
  ...props
}: MapLegendItemProps): ReactNode {
  return (
    <li
      data-slot="map-legend-item"
      className={cn('flex items-center gap-1.5', className)}
      {...props}
    >
      <MapMarkerDot color={color} size="small" aria-hidden />
      {children}
    </li>
  );
}

type MapViewportInfoProps = ComponentProps<'dl'> &
  VariantProps<typeof mapOverlayVariants> & {
    viewport: MapViewport;
  };

function MapViewportInfo({
  viewport,
  className,
  position,
  ...props
}: MapViewportInfoProps): ReactNode {
  const entries = [
    { label: 'lng', value: viewport.center[0].toFixed(3) },
    { label: 'lat', value: viewport.center[1].toFixed(3) },
    { label: 'zoom', value: viewport.zoom.toFixed(1) },
    { label: 'bearing', value: `${viewport.bearing.toFixed(1)}°` },
    { label: 'pitch', value: `${viewport.pitch.toFixed(1)}°` },
  ];

  return (
    <dl
      data-slot="map-viewport-info"
      className={cn(
        mapOverlayVariants({ position }),
        mapPanelClassName,
        'font-mono',
        className
      )}
      {...props}
    >
      {entries.map(({ label, value }) => (
        <div key={label} className="flex gap-1">
          <dt className="text-muted-foreground">{label}:</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export {
  type MapGeography,
  type MapPalette,
  type MapPaletteColor,
  type MapPaletteName,
  type MapRef,
  type MapViewport,
  Map,
  MapLegend,
  MapLegendItem,
  MapMarker,
  MapMarkerDot,
  MapMarkerLabel,
  MapOverlay,
  MapPin,
  MapViewportInfo,
  naturalEarth10m,
  naturalEarth50m,
  useMap,
};
