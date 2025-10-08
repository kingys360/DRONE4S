import { motion } from 'framer-motion';
import { Target, Eye, Award, TrendingUp, Users, MapPin } from 'lucide-react';

export function Project() {
  const features = [
    {
      icon: MapPin,
      title: 'Interactive Campus Map',
      description: 'Visualize carbon emissions across all campus buildings with real-time heatmaps and detailed analytics.'
    },
    {
      icon: TrendingUp,
      title: 'Live Simulations',
      description: 'Run time-based simulations to see how emissions change throughout the day and identify peak usage periods.'
    },
    {
      icon: Users,
      title: 'Community Engagement',
      description: 'Track personal commutes, participate in challenges, and contribute to campus sustainability goals.'
    },
    {
      icon: Award,
      title: 'Department Rankings',
      description: 'Compare sustainability performance across departments and celebrate improvements with transparent metrics.'
    }
  ];

  const milestones = [
    { year: '2024', event: 'Project Launch', description: 'Initial deployment covering all major campus buildings' },
    { year: '2024', event: '12% Emission Reduction', description: 'Achieved year-over-year reduction through data-driven initiatives' },
    { year: '2024', event: '5 Green Certifications', description: 'Buildings achieving LEED or equivalent green standards' },
    { year: '2025', event: 'Net Zero Target', description: 'Goal to achieve carbon neutrality across campus operations' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12"
    >
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-600/15 border border-emerald-500/30 mx-auto"
        >
          <Target className="h-8 w-8 text-emerald-400" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-semibold tracking-tight text-white"
        >
          Campus Carbon Footprint Mapper
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-neutral-400 max-w-3xl mx-auto"
        >
          A comprehensive platform designed to monitor, analyze, and reduce carbon emissions across
          IIT Roorkee campus. Our mission is to create a sustainable future through data-driven insights
          and community engagement.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-white/10 bg-neutral-900/50 p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Target className="h-6 w-6 text-emerald-400" />
            <h3 className="text-2xl font-semibold text-white">Our Mission</h3>
          </div>
          <p className="text-neutral-300 leading-relaxed">
            To empower the IIT Roorkee community with transparent, actionable data on campus carbon emissions,
            enabling informed decisions and fostering a culture of sustainability through innovative technology
            and collaborative engagement.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-white/10 bg-neutral-900/50 p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Eye className="h-6 w-6 text-emerald-400" />
            <h3 className="text-2xl font-semibold text-white">Our Vision</h3>
          </div>
          <p className="text-neutral-300 leading-relaxed">
            To establish IIT Roorkee as a model of carbon neutrality in higher education, inspiring other
            institutions to adopt data-driven sustainability practices and contribute to global climate action
            through measurable, impactful initiatives.
          </p>
        </motion.div>
      </div>

      <div>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-semibold text-white mb-6 text-center"
        >
          Key Features
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="rounded-xl border border-white/10 bg-neutral-900/50 p-6 hover:bg-neutral-900/70 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-emerald-600/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="rounded-xl border border-white/10 bg-neutral-900/50 p-8"
      >
        <h3 className="text-2xl font-semibold text-white mb-6">Milestones & Roadmap</h3>

        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-emerald-600/15 border border-emerald-500/30 flex items-center justify-center text-sm font-medium text-emerald-400 shrink-0">
                  {milestone.year}
                </div>
                {index < milestones.length - 1 && (
                  <div className="flex-1 w-0.5 bg-white/10 mt-2" />
                )}
              </div>
              <div className="flex-1 pb-6">
                <h4 className="text-lg font-semibold text-white mb-1">
                  {milestone.event}
                </h4>
                <p className="text-sm text-neutral-400">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
