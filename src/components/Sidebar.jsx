'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { useUserProfile } from '@/app/hooks/useUserProfile';
import { useTaskProgress } from '@/app/hooks/useTaskProgress';
import { LEVELS } from '@/app/lib/data';
import { logout } from '@/app/lib/auth';
export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useAuth();
    const { profile } = useUserProfile();
    const { tasksChecked } = useTaskProgress();
    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };
    // Calculate overall progress
    let totalDone = 0, totalAll = 0;
    LEVELS.forEach(lv => {
        const lvDone = lv.tasks.filter(t => tasksChecked[t.id]).length;
        totalDone += lvDone;
        totalAll += lv.tasks.length;
    });
    const overallPct = totalAll ? Math.round(totalDone / totalAll * 100) : 0;
    const navItems = [
        { href: '/dashboard', label: 'Progress', icon: '📊', id: 'progress' },
        { href: '/dashboard?tab=entries', label: 'Growth Log', icon: '📓', id: 'entries' },
        { href: '/dashboard?tab=habits', label: 'Habits', icon: '🔥', id: 'habits' },
        { href: '/dashboard?tab=profile', label: 'Profile', icon: '👤', id: 'profile' },
    ];
    return (<aside className="fixed left-0 top-0 bottom-0 w-64 bg-dark-bg2 border-r border-dark-border flex flex-col overflow-y-auto z-50">
      {/* Logo */}
      <div className="p-6 border-b border-dark-border">
        <div className="text-xs font-mono text-accent-primary letter-spacing mb-2 opacity-70">
          ML JOURNEY
        </div>
        <h1 className="text-2xl font-bold">
          <span className="text-dark-text">Growth</span>
          <span className="text-accent-secondary"> Sheet</span>
        </h1>
      </div>

      {/* Stats Pills */}
      <div className="p-4 border-b border-dark-border grid grid-cols-3 gap-2">
        <div className="bg-dark-surface border border-dark-border rounded text-center p-2">
          <div className="font-mono text-lg font-bold text-accent-secondary">{totalDone}</div>
          <div className="text-xs text-dark-muted">Done</div>
        </div>
        <div className="bg-dark-surface border border-dark-border rounded text-center p-2">
          <div className="font-mono text-lg font-bold text-accent-secondary">{totalAll}</div>
          <div className="text-xs text-dark-muted">Total</div>
        </div>
        <div className="bg-dark-surface border border-dark-border rounded text-center p-2">
          <div className="font-mono text-lg font-bold text-accent-secondary">{overallPct}%</div>
          <div className="text-xs text-dark-muted">Pct</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-0">
        {navItems.map(item => (<Link key={item.id} href={item.href} className={`flex items-center gap-3 px-5 py-3 text-sm transition-all border-l-2 ${pathname === item.href || (item.id === 'progress' && pathname === '/dashboard')
                ? 'text-dark-text bg-accent-glow border-l-accent-primary'
                : 'text-dark-muted border-l-transparent hover:bg-dark-surface'}`}>
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>))}
      </nav>

      {/* Profile Section */}
      <div className="p-4 border-t border-dark-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-primary to-teal-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {profile.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-dark-text truncate">
              {profile.name}
            </div>
            <div className="text-xs text-dark-muted">{profile.role}</div>
          </div>
          <button onClick={handleLogout} className="text-dark-muted hover:text-dark-text transition-colors" title="Logout">
            ↤
          </button>
        </div>
      </div>
    </aside>);
}
