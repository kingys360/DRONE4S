import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';
import { mockBuildings } from '../../lib/mockData';

export function Simulation() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentHour, setCurrentHour] = useState(8);

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentHour(8);
  };

  const getCurrentLoad = () => {
    const hourFactor = currentHour >= 9 && currentHour <= 18 ? 1.2 : 0.6;
    return mockBuildings.reduce((sum, b) => sum + (b.co2_tons * hourFactor / 8760), 0);
  };

  const currentLoad = getCurrentLoad();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
    >
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-white mb-2">
          Live Simulation
        </h2>
        <p className="text-neutral-400">
          Real-time campus emissions throughout the day
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-white/10 bg-neutral-900/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Simulation Controls</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePlayPause}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                {isRunning ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Play
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm text-neutral-300">Time of Day</label>
                <span className="text-lg font-mono font-semibold text-emerald-400">
                  {String(currentHour).padStart(2, '0')}:00
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="23"
                value={currentHour}
                onChange={(e) => setCurrentHour(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-neutral-400 mt-1">
                <span>00:00</span>
                <span>12:00</span>
                <span>23:00</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm text-neutral-300">Simulation Speed</label>
                <span className="text-sm font-medium text-white">{speed}x</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-neutral-400 mt-1">
                <span>1x</span>
                <span>5x</span>
                <span>10x</span>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-neutral-950/50 p-4">
              <div className="text-sm text-neutral-400 mb-2">Current Emissions Rate</div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold tracking-tight text-white">
                  {currentLoad.toFixed(2)}
                </span>
                <span className="text-neutral-400">kg CO₂/hour</span>
              </div>
              <div className="mt-4 h-2 w-full rounded-full bg-neutral-800">
                <motion.div
                  animate={{ width: `${(currentLoad / 0.2) * 100}%` }}
                  className="h-2 rounded-full bg-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-white/10 bg-neutral-900/50 p-6"
          >
            <h4 className="text-sm font-medium text-neutral-300 mb-4">Active Buildings</h4>
            <div className="space-y-3">
              {mockBuildings.slice(0, 4).map((building) => {
                const isActive = currentHour >= 8 && currentHour <= 20;
                return (
                  <div
                    key={building.id}
                    className={`p-3 rounded-lg border transition-colors ${
                      isActive
                        ? 'bg-emerald-600/10 border-emerald-500/30'
                        : 'bg-neutral-950/50 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">{building.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        isActive ? 'bg-emerald-600/20 text-emerald-400' : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {isActive ? 'Active' : 'Idle'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-white/10 bg-neutral-900/50 p-6"
          >
            <h4 className="text-sm font-medium text-neutral-300 mb-4">Peak Hours</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-red-600/10 border border-red-500/30">
                <div>
                  <div className="text-sm font-medium text-white">Morning Peak</div>
                  <div className="text-xs text-neutral-400">09:00 - 12:00</div>
                </div>
                <TrendingUp className="h-5 w-5 text-red-400" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-amber-600/10 border border-amber-500/30">
                <div>
                  <div className="text-sm font-medium text-white">Evening Peak</div>
                  <div className="text-xs text-neutral-400">14:00 - 18:00</div>
                </div>
                <TrendingUp className="h-5 w-5 text-amber-400" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-600/10 border border-emerald-500/30">
                <div>
                  <div className="text-sm font-medium text-white">Off-Peak</div>
                  <div className="text-xs text-neutral-400">20:00 - 08:00</div>
                </div>
                <TrendingDown className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-white/10 bg-neutral-900/50 p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Building Activity Timeline</h3>
        <div className="grid grid-cols-24 gap-1 h-32">
          {Array.from({ length: 24 }).map((_, hour) => {
            const intensity = hour >= 8 && hour <= 20 ? 0.8 : 0.2;
            return (
              <div
                key={hour}
                className="relative group"
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${intensity * 100}%` }}
                  transition={{ delay: hour * 0.02 }}
                  className={`w-full rounded-t ${
                    hour === currentHour
                      ? 'bg-emerald-500'
                      : intensity > 0.5
                      ? 'bg-amber-500/60'
                      : 'bg-neutral-600/60'
                  } absolute bottom-0`}
                />
                <div className="absolute -bottom-6 left-0 text-xs text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {hour}h
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
