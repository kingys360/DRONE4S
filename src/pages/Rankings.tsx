import { motion } from 'framer-motion';
import { Trophy, TrendingUp, TrendingDown, Award } from 'lucide-react';
import { mockBuildings } from '../lib/mockData';

export function Rankings() {
  const buildingsByType = mockBuildings.reduce((acc, building) => {
    if (!acc[building.type]) {
      acc[building.type] = [];
    }
    acc[building.type].push(building);
    return acc;
  }, {} as Record<string, typeof mockBuildings>);

  const departmentScores = Object.entries(buildingsByType).map(([type, buildings]) => {
    const totalEmissions = buildings.reduce((sum, b) => sum + b.co2_tons, 0);
    const avgEmissions = totalEmissions / buildings.length;
    const greenCount = buildings.filter(b => b.green).length;
    const score = Math.max(0, 100 - (avgEmissions / 2) + (greenCount * 10));

    return {
      type,
      buildings: buildings.length,
      totalEmissions,
      avgEmissions,
      greenCount,
      score: Math.round(score)
    };
  }).sort((a, b) => b.score - a.score);

  const getMedalColor = (rank: number) => {
    if (rank === 0) return 'text-yellow-400';
    if (rank === 1) return 'text-neutral-300';
    if (rank === 2) return 'text-amber-600';
    return 'text-neutral-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
    >
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-white mb-2">
          Department Rankings
        </h2>
        <p className="text-neutral-400">
          Sustainability performance across campus departments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {departmentScores.slice(0, 3).map((dept, index) => (
          <motion.div
            key={dept.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-xl border border-white/10 bg-neutral-900/50 p-6 hover:bg-neutral-900/70 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`h-12 w-12 rounded-full ${
                index === 0 ? 'bg-yellow-600/15 border-yellow-500/30' :
                index === 1 ? 'bg-neutral-600/15 border-neutral-500/30' :
                'bg-amber-600/15 border-amber-500/30'
              } border flex items-center justify-center`}>
                <Trophy className={`h-6 w-6 ${getMedalColor(index)}`} />
              </div>
              <div className="text-right">
                <div className="text-sm text-neutral-400">Rank</div>
                <div className="text-2xl font-bold text-white">#{index + 1}</div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white capitalize mb-2">
              {dept.type}
            </h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400">Score</span>
                <span className="font-semibold text-emerald-400">{dept.score}/100</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400">Buildings</span>
                <span className="text-white">{dept.buildings}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400">Green Certified</span>
                <span className="text-white">{dept.greenCount}</span>
              </div>
            </div>

            <div className="h-2 w-full rounded-full bg-neutral-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${dept.score}%` }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                className={`h-2 rounded-full ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-neutral-400' :
                  'bg-amber-600'
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-white/10 bg-neutral-900/50 overflow-hidden"
      >
        <div className="p-6 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">Full Rankings</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-950/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Buildings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Avg Emissions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Green Buildings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {departmentScores.map((dept, index) => (
                <tr key={dept.type} className="hover:bg-neutral-950/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">#{index + 1}</span>
                      {index < 3 && (
                        <Trophy className={`h-4 w-4 ${getMedalColor(index)}`} />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-white capitalize">
                      {dept.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-emerald-400">
                      {dept.score}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">
                    {dept.buildings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">
                    {dept.avgEmissions.toFixed(1)} t/yr
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 rounded bg-emerald-600/20 text-emerald-400 text-xs">
                      {dept.greenCount}/{dept.buildings}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {Math.random() > 0.5 ? (
                      <div className="flex items-center gap-1 text-emerald-400">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-xs">+{Math.floor(Math.random() * 15)}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-red-400">
                        <TrendingDown className="h-4 w-4" />
                        <span className="text-xs">-{Math.floor(Math.random() * 10)}%</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-white/10 bg-neutral-900/50 p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-emerald-400" />
            Most Improved
          </h3>
          <div className="space-y-3">
            {mockBuildings.filter(b => b.improved).slice(0, 3).map((building, index) => (
              <div
                key={building.id}
                className="p-3 rounded-lg bg-neutral-950/50 border border-emerald-500/20"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white">{building.name}</div>
                    <div className="text-xs text-neutral-400 capitalize">{building.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-emerald-400">-{15 + index * 5}%</div>
                    <div className="text-xs text-neutral-400">emissions</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-white/10 bg-neutral-900/50 p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-300">Overall Campus Score</span>
                <span className="text-sm font-semibold text-white">
                  {Math.round(departmentScores.reduce((sum, d) => sum + d.score, 0) / departmentScores.length)}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-neutral-800">
                <div className="h-2 rounded-full bg-emerald-500" style={{ width: '72%' }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-neutral-950/50 border border-white/10">
                <div className="text-xs text-neutral-400 mb-1">Green Buildings</div>
                <div className="text-lg font-semibold text-white">
                  {mockBuildings.filter(b => b.green).length}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-neutral-950/50 border border-white/10">
                <div className="text-xs text-neutral-400 mb-1">Improved YTD</div>
                <div className="text-lg font-semibold text-white">
                  {mockBuildings.filter(b => b.improved).length}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
