import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Trophy,
  MessageSquare,
  Info,
  Search,
  Menu,
  X,
  HelpCircle,
  Share2
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/rankings', label: 'Department Rankings', icon: Trophy },
  { path: '/chat', label: 'Chat', icon: MessageSquare },
  { path: '/about', label: 'About', icon: Info }
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="backdrop-blur supports-[backdrop-filter]:bg-neutral-900/70 bg-neutral-900/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-emerald-600/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-semibold tracking-tight">
                  C
                </div>
                <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-white hidden md:block">
                  Campus Carbon Footprint
                </h1>
              </Link>

              <nav className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                        active
                          ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-300'
                          : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-9 pr-3 py-2 rounded-md bg-neutral-900 border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus:border-emerald-600 text-sm placeholder:text-neutral-400"
                />
              </div>

              <button
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-900 border border-white/10 hover:bg-neutral-800 hover:border-neutral-700 transition-colors"
                aria-label="Help"
              >
                <HelpCircle className="h-4 w-4 text-neutral-300" />
              </button>

              <button
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-900 border border-white/10 hover:bg-neutral-800 hover:border-neutral-700 transition-colors"
                aria-label="Share"
              >
                <Share2 className="h-4 w-4 text-neutral-300" />
              </button>

              <div className="h-8 w-8 rounded-full bg-[url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center border border-white/10" />
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-md bg-neutral-900 border border-white/10 hover:bg-neutral-800"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-neutral-200" />
              ) : (
                <Menu className="h-5 w-5 text-neutral-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-50">
          <div className="absolute inset-0 bg-black/70" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64 bg-neutral-900 border-r border-white/10 p-4">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      active
                        ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-300'
                        : 'text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
