import { motion } from 'framer-motion';
import { Clock, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';
import { mockBuildings } from '../../lib/mockData';

const recommendations = [
  {
    id: '1',
    building: mockBuildings[0],
    recommendation: 'Install rooftop solar panels to offset 20% of energy consumption',
    priority: 'high',
    status: 'pending',
    estimatedSavings: 52,
    createdAt: new Date('2024-10-01')
  },
  {
    id: '2',
    building: mockBuildings[1],
    recommendation: 'Upgrade to LED lighting throughout the facility',
    priority: 'medium',
    status: 'in_progress',
    estimatedSavings: 25,
    createdAt: new Date('2024-09-28')
  },
  {
    id: '3',
    building: mockBuildings[3],
    recommendation: 'Optimize lab ventilation schedules to reduce off-hour energy use',
    priority: 'high',
    status: 'completed',
    estimatedSavings: 42,
    createdAt: new Date('2024-09-15')
  },
  {
    id: '4',
    building: mockBuildings[4],
    recommendation: 'Install motion sensors in hallways and common areas',
    priority: 'low',
    status: 'pending',
    estimatedSavings: 15,
    createdAt: new Date('2024-09-10')
  },
  {
    id: '5',
    building: mockBuildings[2],
    recommendation: 'Implement smart HVAC controls with occupancy sensing',
    priority: 'medium',
    status: 'completed',
    estimatedSavings: 38,
    createdAt: new Date('2024-08-22')
  }
];

export function History() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30';
      case 'in_progress':
        return 'bg-sky-600/20 text-sky-400 border-sky-500/30';
      default:
        return 'bg-neutral-600/20 text-neutral-400 border-neutral-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-600/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-amber-600/20 text-amber-400 border-amber-500/30';
      default:
        return 'bg-neutral-600/20 text-neutral-400 border-neutral-500/30';
    }
  };

  const stats = {
    total: recommendations.length,
    pending: recommendations.filter(r => r.status === 'pending').length,
    inProgress: recommendations.filter(r => r.status === 'in_progress').length,
    completed: recommendations.filter(r => r.status === 'completed').length,
    totalSavings: recommendations
      .filter(r => r.status === 'completed')
      .reduce((sum, r) => sum + r.estimatedSavings, 0)
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
          Recommendations History
        </h2>
        <p className="text-neutral-400">
          Track all sustainability recommendations and their implementation status
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-white/10 bg-neutral-900/50 p-6"
        >
          <div className="text-sm text-neutral-400 mb-2">Total Recommendations</div>
          <div className="text-3xl font-semibold tracking-tight text-white">
            {stats.total}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-xl border border-white/10 bg-neutral-900/50 p-6"
        >
          <div className="text-sm text-neutral-400 mb-2">Completed</div>
          <div className="text-3xl font-semibold tracking-tight text-emerald-400">
            {stats.completed}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-white/10 bg-neutral-900/50 p-6"
        >
          <div className="text-sm text-neutral-400 mb-2">In Progress</div>
          <div className="text-3xl font-semibold tracking-tight text-sky-400">
            {stats.inProgress}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl border border-white/10 bg-neutral-900/50 p-6"
        >
          <div className="text-sm text-neutral-400 mb-2">CO₂ Saved (t/yr)</div>
          <div className="text-3xl font-semibold tracking-tight text-white">
            {stats.totalSavings}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-white/10 bg-neutral-900/50 overflow-hidden"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">All Recommendations</h3>
          <div className="flex items-center gap-2">
            <select className="px-3 py-2 rounded-md bg-neutral-950 border border-white/10 text-sm text-white">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select className="px-3 py-2 rounded-md bg-neutral-950 border border-white/10 text-sm text-white">
              <option value="">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-white/10">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + index * 0.05 }}
              className="p-6 hover:bg-neutral-950/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-base font-medium text-white">
                      {rec.building.name}
                    </h4>
                    <span className={`px-2 py-1 rounded text-xs border ${getPriorityColor(rec.priority)}`}>
                      {rec.priority}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(rec.status)}`}>
                      {rec.status.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-300 mb-3">
                    {rec.recommendation}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-neutral-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {rec.createdAt.toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Est. Savings: {rec.estimatedSavings} t CO₂/yr
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {rec.status === 'completed' ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  ) : rec.status === 'in_progress' ? (
                    <div className="h-6 w-6 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-neutral-400" />
                  )}

                  <button className="px-3 py-1 rounded-md bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-xs text-white transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
