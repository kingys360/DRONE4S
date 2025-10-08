import { motion } from 'framer-motion';
import { TrendingDown, Building2, Zap, Leaf, AlertTriangle } from 'lucide-react';
import { mockBuildings } from '../../lib/mockData';

export function Overview() {
  const totalEmissions = mockBuildings.reduce((sum, b) => sum + b.co2_tons, 0);
  const totalEnergy = mockBuildings.reduce((sum, b) => sum + b.energy_kwh, 0);
  const greenBuildings = mockBuildings.filter(b => b.green).length;
  const highEmitters = mockBuildings.filter(b => b.co2_tons > 150).length;

  const stats = [
    {
      label: 'Total Emissions',
      value: `${totalEmissions.toLocaleString()} t`,
      change: '-12%',
      trend: 'down',
      icon: TrendingDown,
      color: 'emerald'
    },
    {
      label: 'Total Buildings',
      value: mockBuildings.length.toString(),
      change: '',
      trend: 'neutral',
      icon: Building2,
      color: 'sky'
    },
    {
      label: 'Energy Consumption',
      value: `${(totalEnergy / 1000000).toFixed(1)}M kWh`,
      change: '-8%',
      trend: 'down',
      icon: Zap,
      color: 'amber'
    },
    {
      label: 'Green Buildings',
      value: greenBuildings.toString(),
      change: `+${greenBuildings}`,
      trend: 'up',
      icon: Leaf,
      color: 'emerald'
    }
  ];

  const topEmitters = mockBuildings
    .slice()
    .sort((a, b) => b.co2_tons - a.co2_tons)
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
    >
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-white mb-2">
          Campus Overview
        </h2>
        <p className="text-neutral-400">
          Real-time carbon footprint metrics for IIT Roorkee campus
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border border-white/10 bg-neutral-900/50 p-6 hover:bg-neutral-900/70 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`h-10 w-10 rounded-lg bg-${stat.color}-600/15 border border-${stat.color}-500/30 flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 text-${stat.color}-400`} />
                </div>
                {stat.change && (
                  <span className={`text-xs px-2 py-1 rounded-md ${
                    stat.trend === 'down' ? 'bg-emerald-600/15 text-emerald-400' : 'bg-sky-600/15 text-sky-400'
                  }`}>
                    {stat.change}
                  </span>
                )}
              </div>
              <div className="text-sm text-neutral-400 mb-1">{stat.label}</div>
              <div className="text-2xl font-semibold tracking-tight text-white">
                {stat.value}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-white/10 bg-neutral-900/50 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Top Emitters</h3>
            <div className="flex items-center gap-2 text-sm text-red-400">
              <AlertTriangle className="h-4 w-4" />
              {highEmitters} high emitters
            </div>
          </div>
          <div className="space-y-3">
            {topEmitters.map((building, index) => (
              <div
                key={building.id}
                className="flex items-center justify-between p-3 rounded-lg bg-neutral-950/50 border border-white/10 hover:bg-neutral-950/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-md bg-neutral-800 border border-white/10 flex items-center justify-center text-neutral-400 text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      {building.name}
                    </div>
                    <div className="text-xs text-neutral-400">{building.type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-red-400">
                    {building.co2_tons} t
                  </div>
                  <div className="text-xs text-neutral-400">CO₂/yr</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-white/10 bg-neutral-900/50 p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            Emission Distribution by Type
          </h3>
          <div className="space-y-4">
            {['academic', 'residential', 'lab', 'administrative'].map((type) => {
              const typeBuildings = mockBuildings.filter(b => b.type === type);
              const typeEmissions = typeBuildings.reduce((sum, b) => sum + b.co2_tons, 0);
              const percentage = (typeEmissions / totalEmissions) * 100;

              return (
                <div key={type}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neutral-300 capitalize">{type}</span>
                    <span className="text-sm font-medium text-white">
                      {typeEmissions.toFixed(0)} t ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-neutral-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="h-2 rounded-full bg-emerald-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-white/10 bg-neutral-900/50 p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Recent Improvements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockBuildings.filter(b => b.improved).map((building) => (
            <div
              key={building.id}
              className="p-4 rounded-lg bg-neutral-950/50 border border-emerald-500/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-300">Improved</span>
              </div>
              <div className="text-white font-medium mb-1">{building.name}</div>
              <div className="text-sm text-neutral-400">
                Current: {building.co2_tons} t/yr
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
