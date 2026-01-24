'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, BarChart3, TrendingUp } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navItems = [
  {
    name: 'Overview',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Merchants',
    href: '/admin/merchants',
    icon: Users,
  },
  {
    name: 'Global Bookings',
    href: '/admin/bookings',
    icon: BarChart3,
  },
  {
    name: 'Revenue Control',
    href: '/admin/revenue',
    icon: TrendingUp,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[#1A1830] border-r border-[#1A1830]/20 flex-col z-50 hidden lg:flex">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <span className="text-xl font-serif font-bold text-white">A</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white tracking-tight">Super Admin</h2>
            <p className="text-xs text-white/60">God View</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                    isActive
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium tracking-tight">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* System Health */}
      <div className="p-4 border-t border-white/10">
        <div className="p-4 rounded-xl bg-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75" />
            </div>
            <span className="text-xs font-medium text-white tracking-tight">System Health</span>
          </div>
          <p className="text-xs text-white/70 tracking-tight">Amadeus API: Connected</p>
        </div>
      </div>
    </aside>
  );
}
