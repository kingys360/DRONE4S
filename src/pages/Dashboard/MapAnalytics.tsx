import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Filter, Download, ZoomIn, Layers } from 'lucide-react';
import { mockBuildings, campusCenter } from '../../lib/mockData';

declare global {
  interface Window {
    mappls: any;
    initMap: () => void;
  }
}

export function MapAnalytics() {
  const [selectedType, setSelectedType] = useState<string>('');
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const filteredBuildings = selectedType
    ? mockBuildings.filter((b) => b.type === selectedType)
    : mockBuildings;

  const colorForEmission = (tons: number) => {
    if (tons < 50) return '#10b981';
    if (tons < 150) return '#facc15';
    if (tons < 250) return '#f97316';
    return '#ef4444';
  };

  useEffect(() => {
    window.initMap = () => {
      if (window.mappls && !mapRef.current) {
        try {
          const map = new window.mappls.Map('map-container', {
            center: [campusCenter.lng, campusCenter.lat],
            zoom: 15,
            zoomControl: true,
            hybrid: false
          });

          mapRef.current = map;
          setMapLoaded(true);
        } catch (error) {
          console.error('Error initializing map:', error);
        }
      }
    };

    if (window.mappls) {
      window.initMap();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !window.mappls) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    filteredBuildings.forEach((building) => {
      const color = colorForEmission(building.co2_tons);

      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.cssText = `
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        cursor: pointer;
        transition: transform 0.2s;
      `;

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.2)';
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
      });

      el.addEventListener('click', () => {
        setSelectedBuilding(building.id);
      });

      try {
        const marker = new window.mappls.Marker({
          map: mapRef.current,
          position: { lat: building.lat, lng: building.lng },
          fitbounds: false,
          icon: el
        });

        const popup = new window.mappls.InfoWindow({
          map: mapRef.current,
          position: { lat: building.lat, lng: building.lng },
          content: `
            <div style="padding: 8px; min-width: 200px;">
              <div style="font-weight: 600; color: #111827; margin-bottom: 4px;">${building.name}</div>
              <div style="font-size: 12px; color: #6b7280; text-transform: capitalize; margin-bottom: 8px;">${building.type}</div>
              <div style="font-size: 13px; color: #374151;">
                <strong style="color: ${color};">${building.co2_tons} tons/yr</strong> CO₂
              </div>
            </div>
          `
        });

        el.addEventListener('click', () => {
          popup.open();
        });

        markersRef.current.push(marker);
      } catch (error) {
        console.error('Error adding marker:', error);
      }
    });
  }, [filteredBuildings, mapLoaded]);

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
                  onChange={(e) => setSelectedType(e.target.value)}
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
                  onChange={(e) => setShowHeatmap(e.target.checked)}
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
          <div id="map-container" className="absolute inset-0" />

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
