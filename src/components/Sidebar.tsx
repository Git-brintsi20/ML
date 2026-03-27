import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useUserProfile } from '@/hooks/useUserProfile'
import { useTaskProgress } from '@/hooks/useTaskProgress'
import { LEVELS } from '@/lib/data'
import { logout } from '@/lib/auth'

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { profile } = useUserProfile()
  const { tasksChecked } = useTaskProgress()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  // Calculate overall progress
  let totalDone = 0, totalAll = 0
  LEVELS.forEach(lv => {
    const lvDone = lv.tasks.filter(t => tasksChecked[t.id]).length
    totalDone += lvDone
    totalAll += lv.tasks.length
  })
  const overallPct = totalAll ? Math.round(totalDone / totalAll * 100) : 0

  const navItems = [
    { href: '/', label: 'Progress', icon: '📊', id: 'progress' },
    { href: '/?tab=entries', label: 'Growth Log', icon: '📓', id: 'entries' },
    { href: '/?tab=habits', label: 'Habits', icon: '🔥', id: 'habits' },
    { href: '/?tab=profile', label: 'Profile', icon: '👤', id: 'profile' },
  ]

  const currentTab = new URLSearchParams(location.search).get('tab') || 'progress'

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0f0f18] border-r border-[#2a2a3f] flex flex-col overflow-y-auto z-50">
      {/* Logo */}
      <div className="p-6 border-b border-[#2a2a3f]">
        <div className="text-xs font-mono text-[#7c6af7] tracking-widest mb-2 opacity-70">
          ML JOURNEY
        </div>
        <h1 className="text-2xl font-bold">
          <span className="text-[#e8e8f0]">Growth</span>
          <span className="text-[#a08cf7]"> Sheet</span>
        </h1>
      </div>

      {/* Stats Pills */}
      <div className="p-4 border-b border-[#2a2a3f] grid grid-cols-3 gap-2">
        <div className="bg-[#1a1a28] border border-[#2a2a3f] rounded text-center p-2">
          <div className="font-mono text-lg font-bold text-[#a08cf7]">{totalDone}</div>
          <div className="text-xs text-[#6b6b8a]">Done</div>
        </div>
        <div className="bg-[#1a1a28] border border-[#2a2a3f] rounded text-center p-2">
          <div className="font-mono text-lg font-bold text-[#a08cf7]">{totalAll}</div>
          <div className="text-xs text-[#6b6b8a]">Total</div>
        </div>
        <div className="bg-[#1a1a28] border border-[#2a2a3f] rounded text-center p-2">
          <div className="font-mono text-lg font-bold text-[#a08cf7]">{overallPct}%</div>
          <div className="text-xs text-[#6b6b8a]">Pct</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-0">
        {navItems.map(item => (
          <Link
            key={item.id}
            to={item.href}
            className={`flex items-center gap-3 px-5 py-3 text-sm transition-all border-l-2 ${
              currentTab === item.id
                ? 'text-[#e8e8f0] bg-[rgba(124,106,247,0.15)] border-l-[#7c6af7]'
                : 'text-[#6b6b8a] border-l-transparent hover:bg-[#1a1a28]'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Profile Section */}
      <div className="p-4 border-t border-[#2a2a3f]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7c6af7] to-[#2dd4bf] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {profile.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-[#e8e8f0] truncate">
              {profile.name}
            </div>
            <div className="text-xs text-[#6b6b8a]">{profile.role}</div>
          </div>
          <button
            onClick={handleLogout}
            className="text-[#6b6b8a] hover:text-[#e8e8f0] transition-colors"
            title="Logout"
          >
            ↤
          </button>
        </div>
      </div>
    </aside>
  )
}
