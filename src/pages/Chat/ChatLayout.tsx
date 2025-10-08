import { Outlet, Link, useLocation } from 'react-router-dom';
import { MessageSquare, History } from 'lucide-react';
import { motion } from 'framer-motion';

const tabs = [
  { path: '/chat', label: 'Chat', icon: MessageSquare },
  { path: '/chat/history', label: 'Recommendations History', icon: History }
];

export function ChatLayout() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col h-full">
      <div className="bg-neutral-900/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto">
            <span className="text-sm text-neutral-400 mr-2">Chat /</span>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = isActive(tab.path);
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-emerald-600/20 text-emerald-300'
                      : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                  {active && (
                    <motion.div
                      layoutId="chat-tab"
                      className="absolute inset-0 border border-emerald-500/30 rounded-md"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="flex-1"
      >
        <Outlet />
      </motion.div>
    </div>
  );
}
