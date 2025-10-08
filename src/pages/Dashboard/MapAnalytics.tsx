import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Filter, Download, ZoomIn, Layers } from 'lucide-react';
import { mockBuildings, campusCenter } from '../../lib/mockData';

declare global {
  interface Window {
    mappls?: typeof import('mappls-web-maps'); // fallback to any if types unavailable
    initMap?: () => void;
  }
}

export function MapAnalytics() {
  const [selectedType, setSelectedType] = useState<string>('');
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [usingLeaflet, setUsingLeaflet] = useState(false);
  const IIT_ROORKEE = { lat: 29.8673, lng: 77.8960 };

  const filteredBuildings = selectedType
    ? mockBuildings.filter((b) => b.type === selectedType)
    : mockBuildings;

  const colorForEmission = (tons: number) => {
    if (tons < 50) return '#10b981';
    if (tons < 150) return '#facc15';
    if (tons < 250) return '#f97316';
    return '#ef4444';
  };

  // Helper to load Mappls script if not present
  const loadMapplsScript = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (window.mappls) {
        resolve();
        return;
      }
      // Check if script already exists
      const existingScript = document.querySelector('script[src*="apis.mappls.com/advancedmaps/api"]');
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve());
        existingScript.addEventListener('error', () => reject('Failed to load Mappls SDK'));
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://apis.mappls.com/advancedmaps/api/a8f8dd8e7cee65671ddb34ed428cfc7e/map_sdk?layer=vector&v=3.0';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject('Failed to load Mappls SDK (network error)');
      document.head.appendChild(script);
    });
  }, []);

  // Load Leaflet JS/CSS dynamically for fallback
  const loadLeafletAssets = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if ((window as any).L) {
        resolve();
        return;
      }
      const existingCss = document.querySelector('link[href*="leaflet.css"]');
      if (!existingCss) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }
      const existingScript = document.querySelector('script[src*="leaflet.js"]');
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve());
        existingScript.addEventListener('error', () => reject(new Error('Failed to load Leaflet')));
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Leaflet'));
      document.head.appendChild(script);
    });
  }, []);

  // Wait helper to ensure window.mappls is attached after script load
  const waitForMapplsAttach = useCallback((timeout = 8000) => {
    return new Promise<void>((resolve, reject) => {
      const start = Date.now();
      const interval = 50;
      const tick = () => {
        const foundGlobal = (['mappls', 'Mappls', 'MapPLS', 'mapPls'] as const).find(k => (window as any)[k]);
        if (foundGlobal) {
          (window as any).mappls = (window as any)[foundGlobal];
          console.info(`Mappls global found as ${foundGlobal}`);
          resolve();
          return;
        }
        // Also accept the SDK's callback marker if it ran
        if ((window as any).__mappls_init_called) {
          console.info('Mappls SDK callback (initMap) ran prior to React mount');
          resolve();
          return;
        }
        if (Date.now() - start > timeout) {
          reject(new Error('Timed out waiting for Mappls to attach to window'));
          return;
        }
        setTimeout(tick, interval);
      };
      tick();
    });
  }, []);

  const cleanupMapplsScript = useCallback(() => {
    const scripts = Array.from(document.querySelectorAll('script[src*="apis.mappls.com/advancedmaps/api"]'));
    scripts.forEach(s => s.remove());
    try {
      // @ts-expect-error - clearing global if present
      delete (window as any).mappls;
    } catch {}
  }, []);

  const attemptInit = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadMapplsScript();
      await waitForMapplsAttach(8000);
      if (!mapRef.current) {
        if (!window.mappls) throw new Error('Mappls global missing after attach');
        console.debug('Mappls object keys:', Object.keys(window.mappls));
        try {
          // initialize mappls centered at IIT Roorkee (Mappls expects [lng, lat])
          console.log('Initializing Mappls at IIT Roorkee:', IIT_ROORKEE);
          const map = new window.mappls.Map('map-container', {
            // Mappls expects [lng, lat]
            center: [IIT_ROORKEE.lng, IIT_ROORKEE.lat],
            zoom: 15,
            zoomControl: true,
            hybrid: false
          });
          mapRef.current = map;
          try {
            // prefer load event if available
            if (typeof mapRef.current.on === 'function') {
              mapRef.current.on('load', () => {
                console.log('Mappls load event fired');
                try { mapRef.current.setCenter({ lat: IIT_ROORKEE.lat, lng: IIT_ROORKEE.lng }); } catch {}
                try { mapRef.current.setZoom(15); } catch {}
                setMapLoaded(true);
              });
            } else {
              // fallback immediate set
              try { mapRef.current.setCenter({ lat: IIT_ROORKEE.lat, lng: IIT_ROORKEE.lng }); } catch {}
              try { mapRef.current.setZoom(15); } catch {}
              setMapLoaded(true);
            }
          } catch (e) {
            console.warn('Error attaching Mappls load handler, proceeding:', e);
            try { mapRef.current.setCenter({ lat: IIT_ROORKEE.lat, lng: IIT_ROORKEE.lng }); } catch {}
            try { mapRef.current.setZoom(15); } catch {}
            setMapLoaded(true);
          }

            // Attach debug listeners if available
            try {
              if (typeof mapRef.current.on === 'function') {
                mapRef.current.on('load', () => console.info('Mappls map load event'));
                mapRef.current.on('tilesloaded', () => console.info('Mappls tilesloaded event'));
                mapRef.current.on('error', (e: any) => console.error('Mappls map error event:', e));
              }
            } catch (e) {
              console.debug('Failed to attach Mappls event listeners:', e);
            }

            // Log container computed style for debugging CSS/tile visibility
            try {
              const container = document.getElementById('map-container');
              if (container) {
                const cs = window.getComputedStyle(container);
                console.debug('map-container computedStyle:', {
                  width: cs.width,
                  height: cs.height,
                  display: cs.display,
                  visibility: cs.visibility,
                  zIndex: cs.zIndex
                });
              }
            } catch (e) {}

          // Wait briefly to detect tile rendering; if none detected, fallback to Leaflet
          const container = document.getElementById('map-container');
            if (container) {
                    // debug container size
                    console.log('Container rect:', container.getBoundingClientRect());
              // wait for layout and tiles
              setTimeout(() => {
                const hasTiles = Boolean(
                  container.querySelector('canvas, img, svg') || container.querySelector('[class*=tile]')
                );
              console.debug('Mappls tile detection hasTiles=', hasTiles);
              if (!hasTiles) {
                console.warn('Mappls tiles not detected — falling back to Leaflet');
                // destroy Mappls map and initialize Leaflet
                try { mapRef.current.remove(); } catch (e) {}
                mapRef.current = null;
                initLeafletFallback().catch((e) => {
                  setError(`Fallback initialization failed: ${e?.message ?? e}`);
                });
              }
            }, 5000);
          }
        } catch (err: any) {
          console.error('Mappls init threw, will try fallback:', err);
          // Try fallback
          await initLeafletFallback();
        }
      }
      setLoading(false);
    } catch (err: any) {
      const message = err?.message ?? String(err);
      setError(`Initialization failed: ${message}`);
      setLoading(false);
      console.error('Map initialization failed:', err);
    }
  }, [loadMapplsScript, waitForMapplsAttach]);

  // If the Mappls SDK uses the global callback, handle it by initializing when it fires
  useEffect(() => {
    (window as any).initMap = () => {
      console.log('window.initMap callback invoked');
      // schedule attemptInit after layout
      requestAnimationFrame(() => attemptInit());
    };
    return () => {
      try { delete (window as any).initMap; } catch {}
    };
  }, [attemptInit]);

  // Initialize Leaflet fallback
  const initLeafletFallback = useCallback(async () => {
    setUsingLeaflet(true);
    setLoading(true);
    setError(null);
    try {
      await loadLeafletAssets();
      const L = (window as any).L;
      if (!L) throw new Error('Leaflet library missing after load');
      // clean container
      const container = document.getElementById('map-container');
      if (container) container.innerHTML = '';
  const map = L.map('map-container').setView([IIT_ROORKEE.lat, IIT_ROORKEE.lng], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
      mapRef.current = map;
      setMapLoaded(true);
      setLoading(false);
    } catch (err: any) {
      setError(`Leaflet fallback failed: ${err?.message ?? String(err)}`);
      setLoading(false);
      console.error('Leaflet fallback error:', err);
      throw err;
    }
  }, [loadLeafletAssets]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => attemptInit());
    return () => {
      if (mapRef.current) {
        try { mapRef.current.remove(); } catch {}
        mapRef.current = null;
      }
      cancelAnimationFrame(raf);
    };
  }, [attemptInit]);

  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    const isLeaflet = usingLeaflet || Boolean((window as any).L && (mapRef.current as any).hasOwnProperty('getCenter'));

    // Clear previous markers
    try {
      markersRef.current.forEach((m: any) => {
        try { m.remove(); } catch {}
      });
    } catch (e) {
      console.warn('Error cleaning markers:', e);
    }
    markersRef.current = [];

    filteredBuildings.forEach((building) => {
      const color: string = colorForEmission(building.co2_tons);

      if (isLeaflet) {
        try {
          const L = (window as any).L;
          if (!L || !mapRef.current) return;
          const marker = L.circleMarker([building.lat, building.lng], {
            radius: 8,
            fillColor: color,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 1
          }).addTo(mapRef.current as any);
          const popupContent = `
            <div class="map-popup">
              <div class="map-popup-title">${building.name}</div>
              <div class="map-popup-sub">${building.type}</div>
              <div class="map-popup-body"><strong style="color:${color}">${building.co2_tons} t/yr</strong></div>
            </div>
          `;
          marker.bindPopup(popupContent, { className: 'map-popup-wrapper' });
          marker.on('click', () => setSelectedBuilding(building.id));
          markersRef.current.push(marker);
        } catch (err) {
          console.error('Leaflet marker error:', err);
        }
      } else {
        try {
          const el = document.createElement('div');
          el.className = 'custom-marker';
          el.style.cssText = `background-color: ${color}; width:24px; height:24px; border-radius:50%; border:3px solid white; box-shadow:0 2px 8px rgba(0,0,0,0.3); cursor:pointer;`;
          el.addEventListener('click', () => setSelectedBuilding(building.id));

          const marker = new window.mappls.Marker({
            map: mapRef.current,
            position: { lat: building.lat, lng: building.lng },
            fitbounds: false,
            icon: el
          });

          const popupContent = `
            <div class="map-popup">
              <div class="map-popup-title">${building.name}</div>
              <div class="map-popup-sub">${building.type}</div>
              <div class="map-popup-body"><strong style="color:${color}">${building.co2_tons} t/yr</strong></div>
            </div>
          `;
          const popup = new window.mappls.InfoWindow({
            map: mapRef.current,
            position: { lat: building.lat, lng: building.lng },
            content: popupContent,
            zIndex: 10000
          });
          el.addEventListener('click', () => popup.open());
          markersRef.current.push(marker);
        } catch (error) {
          console.error('Error adding Mappls marker:', error);
        }
      }
    });
  }, [filteredBuildings, mapLoaded, usingLeaflet]);

  useEffect(() => {
    if (!mapRef.current || !selectedBuilding) return;

    const building = mockBuildings.find((b) => b.id === selectedBuilding);
    if (building) {
      mapRef.current.setCenter({ lat: building.lat, lng: building.lng });
      mapRef.current.setZoom(17);
    }
  }, [selectedBuilding]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-[calc(100vh-10rem)]"
    >
      <div className="h-full flex">
        <div className="w-80 border-r border-white/10 bg-neutral-900/50 p-4 space-y-4 overflow-y-auto">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Map Controls</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-neutral-300 mb-2 block">Filter by Type</label>
                <select
                  value={selectedType}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-neutral-950 border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="">All Types</option>
                  <option value="academic">Academic</option>
                  <option value="residential">Residential</option>
                  <option value="lab">Lab</option>
                  <option value="administrative">Administrative</option>
                </select>
              </div>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-neutral-300">Show Heatmap</span>
                <input
                  type="checkbox"
                  checked={showHeatmap}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShowHeatmap(e.target.checked)}
                  className="accent-emerald-500"
                />
              </label>
              <button className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-sm text-white transition-colors">
                <Download className="h-4 w-4" />
                Export Map Data
              </button>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4">
            <h4 className="text-sm font-medium text-neutral-300 mb-3">Legend</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#10b981' }} />
                <span className="text-neutral-300">&lt; 50 tons/yr</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#facc15' }} />
                <span className="text-neutral-300">50-150 tons/yr</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#f97316' }} />
                <span className="text-neutral-300">150-250 tons/yr</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#ef4444' }} />
                <span className="text-neutral-300">&gt; 250 tons/yr</span>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4">
            <h4 className="text-sm font-medium text-neutral-300 mb-3">
              Buildings ({filteredBuildings.length})
            </h4>
            <div className="space-y-2">
              {filteredBuildings.map((building) => (
                <button
                  key={building.id}
                  onClick={() => setSelectedBuilding(building.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedBuilding === building.id
                      ? 'bg-emerald-600/20 border-emerald-500/30'
                      : 'bg-neutral-950/50 border-white/10 hover:bg-neutral-950/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white">{building.name}</span>
                    <span
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor: `${colorForEmission(building.co2_tons)}33`,
                        color: colorForEmission(building.co2_tons)
                      }}
                    >
                      {building.co2_tons} t
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-1 capitalize">
                    {building.type}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 relative bg-neutral-950">
          {/* Map loading and error states */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-950 z-10">
              <span className="text-white text-lg">Loading map...</span>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-950 z-10">
              <div className="text-center">
                <div className="text-red-400 text-lg mb-3">{error}</div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      // cleanup and retry
                      cleanupMapplsScript();
                      attemptInit();
                    }}
                    className="px-3 py-2 rounded bg-emerald-600 text-white"
                  >
                    Retry
                  </button>
                  <button
                    onClick={() => {
                      // show more diagnostics in console
                      console.info('window.mappls:', (window as any).mappls);
                      console.info('window.__mappls_init_called:', (window as any).__mappls_init_called);
                    }}
                    className="px-3 py-2 rounded border border-white/10 text-white"
                  >
                    Debug Info
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Map wrapper + container: ensure full height */}
          <div className="map-wrapper flex h-full relative">
            <div id="map-container" className="w-full h-full z-0 bg-white" />
          </div>
          {selectedBuilding && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 max-w-md w-full mx-4 rounded-xl border border-white/10 bg-neutral-900/95 backdrop-blur p-6 text-left"
            >
              {(() => {
                const building = mockBuildings.find((b) => b.id === selectedBuilding);
                if (!building) return null;
                return (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">
                          {building.name}
                        </h4>
                        <p className="text-sm text-neutral-400 capitalize">
                          {building.type}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedBuilding(null)}
                        className="text-neutral-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="rounded-lg border border-white/10 bg-neutral-950/50 p-3">
                        <div className="text-xs text-neutral-400 mb-1">Emissions</div>
                        <div className="text-lg font-semibold text-white">
                          {building.co2_tons} t/yr
                        </div>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-neutral-950/50 p-3">
                        <div className="text-xs text-neutral-400 mb-1">Energy</div>
                        <div className="text-lg font-semibold text-white">
                          {(building.energy_kwh / 1000).toFixed(0)}k kWh
                        </div>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-neutral-950/50 p-3">
                        <div className="text-xs text-neutral-400 mb-1">Occupants</div>
                        <div className="text-lg font-semibold text-white">
                          {building.occupants}
                        </div>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-neutral-950/50 p-3">
                        <div className="text-xs text-neutral-400 mb-1">Area</div>
                        <div className="text-lg font-semibold text-white">
                          {(building.area / 1000).toFixed(0)}k ft²
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {building.green && (
                        <span className="px-2 py-1 rounded bg-emerald-600/20 text-emerald-400 text-xs border border-emerald-500/30">
                          Green Certified
                        </span>
                      )}
                      {building.improved && (
                        <span className="px-2 py-1 rounded bg-sky-600/20 text-sky-400 text-xs border border-sky-500/30">
                          Recently Improved
                        </span>
                      )}
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
