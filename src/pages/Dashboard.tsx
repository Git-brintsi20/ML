import { useSearchParams } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import Sidebar from '@/components/Sidebar'
import LevelsPanel from '@/components/LevelsPanel'
import GrowthLog from '@/components/GrowthLog'
import HabitsPanel from '@/components/HabitsPanel'
import ProfilePanel from '@/components/ProfilePanel'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab') || 'progress'

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0f]">
        <div className="text-[#6b6b8a]">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />

      <main className="ml-64 flex-1">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 bg-[#0a0a0f]/90 backdrop-blur border-b border-[#2a2a3f] px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#e8e8f0]">
                {tab === 'entries' && 'Growth Log'}
                {tab === 'habits' && 'Daily Habits'}
                {tab === 'profile' && 'Profile'}
                {tab === 'progress' && 'ML Learning Path'}
              </h1>
            </div>
            <div className="text-xs text-[#6b6b8a] font-mono">
              {user?.email}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {tab === 'progress' && <LevelsPanel />}
          {tab === 'entries' && <GrowthLog />}
          {tab === 'habits' && <HabitsPanel />}
          {tab === 'profile' && <ProfilePanel />}
        </div>
      </main>
    </div>
  )
}
