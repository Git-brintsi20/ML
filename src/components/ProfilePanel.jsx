'use client';
import { useState } from 'react';
import { useUserProfile } from '@/app/hooks/useUserProfile';
import { usePlatforms } from '@/app/hooks/usePlatforms';
import { LEVELS } from '@/app/lib/data';
import { useTaskProgress } from '@/app/hooks/useTaskProgress';
import { useGrowthEntries } from '@/app/hooks/useGrowthEntries';
export default function ProfilePanel() {
    const { profile, updateProfile, loading: profileLoading } = useUserProfile();
    const { platforms, updatePlatforms } = usePlatforms();
    const { tasksChecked } = useTaskProgress();
    const { entries } = useGrowthEntries();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: profile.name,
        initials: profile.initials,
        college: profile.college,
        role: profile.role,
        bio: profile.bio,
    });
    const [platformFormData, setPlatformFormData] = useState({
        kaggle: platforms.kaggle,
        github: platforms.github,
        hf: platforms.hf,
        linkedin: platforms.linkedin,
    });
    const [editingPlatform, setEditingPlatform] = useState(null);
    const handleSaveProfile = async () => {
        await updateProfile(formData);
        setIsEditing(false);
    };
    const handleSavePlatform = async (platform) => {
        await updatePlatforms({
            [platform]: platformFormData[platform],
        });
        setEditingPlatform(null);
    };
    // Calculate stats
    let totalDone = 0, totalAll = 0;
    const completedLevels = LEVELS.filter(l => l.tasks.every(t => tasksChecked[t.id])).length;
    LEVELS.forEach(l => {
        const lvDone = l.tasks.filter(t => tasksChecked[t.id]).length;
        totalDone += lvDone;
        totalAll += l.tasks.length;
    });
    if (profileLoading) {
        return <div className="text-dark-muted">Loading...</div>;
    }
    return (<div className="space-y-6">
      {/* Profile Edit */}
      <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Profile</h2>
          <button onClick={() => {
            if (isEditing) {
                setFormData({
                    name: profile.name,
                    initials: profile.initials,
                    college: profile.college,
                    role: profile.role,
                    bio: profile.bio,
                });
            }
            setIsEditing(!isEditing);
        }} className="px-4 py-2 rounded border border-dark-border hover:bg-dark-bg3 transition-colors text-sm">
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {isEditing ? (<form onSubmit={(e) => {
                e.preventDefault();
                handleSaveProfile();
            }} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-dark-muted mb-2">Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 bg-dark-bg2 border border-dark-border rounded text-dark-text focus:outline-none focus:border-accent-primary"/>
              </div>
              <div>
                <label className="block text-sm text-dark-muted mb-2">Initials</label>
                <input type="text" maxLength={2} value={formData.initials} onChange={(e) => setFormData({ ...formData, initials: e.target.value.toUpperCase() })} className="w-full px-3 py-2 bg-dark-bg2 border border-dark-border rounded text-dark-text focus:outline-none focus:border-accent-primary"/>
              </div>
            </div>

            <div>
              <label className="block text-sm text-dark-muted mb-2">Role</label>
              <input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full px-3 py-2 bg-dark-bg2 border border-dark-border rounded text-dark-text focus:outline-none focus:border-accent-primary"/>
            </div>

            <div>
              <label className="block text-sm text-dark-muted mb-2">College</label>
              <input type="text" value={formData.college} onChange={(e) => setFormData({ ...formData, college: e.target.value })} className="w-full px-3 py-2 bg-dark-bg2 border border-dark-border rounded text-dark-text focus:outline-none focus:border-accent-primary"/>
            </div>

            <div>
              <label className="block text-sm text-dark-muted mb-2">Bio</label>
              <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={3} className="w-full px-3 py-2 bg-dark-bg2 border border-dark-border rounded text-dark-text focus:outline-none focus:border-accent-primary resize-none"/>
            </div>

            <button type="submit" className="px-6 py-2 bg-accent-primary text-white rounded hover:opacity-90 transition-opacity">
              Save Profile
            </button>
          </form>) : (<div className="space-y-3">
            <div>
              <div className="text-sm text-dark-muted">Name</div>
              <div className="text-lg font-bold">{profile.name}</div>
            </div>
            <div>
              <div className="text-sm text-dark-muted">Role</div>
              <div className="text-lg">{profile.role}</div>
            </div>
            {profile.college && (<div>
                <div className="text-sm text-dark-muted">College</div>
                <div className="text-lg">{profile.college}</div>
              </div>)}
            {profile.bio && (<div>
                <div className="text-sm text-dark-muted">Bio</div>
                <div className="text-lg whitespace-pre-wrap">{profile.bio}</div>
              </div>)}
          </div>)}
      </div>

      {/* Platforms */}
      <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6">Platforms</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: 'kaggle', label: 'Kaggle', icon: '🗃' },
            { key: 'github', label: 'GitHub', icon: '💻' },
            { key: 'hf', label: 'Hugging Face', icon: '🤗' },
            { key: 'linkedin', label: 'LinkedIn', icon: '💼' },
        ].map(({ key, label, icon }) => (<div key={key} className="p-4 border border-dark-border rounded">
              {editingPlatform === key ? (<div className="space-y-2">
                  <input type="text" value={platformFormData[key]} onChange={(e) => setPlatformFormData({ ...platformFormData, [key]: e.target.value })} placeholder="URL" className="w-full px-3 py-2 bg-dark-bg2 border border-dark-border rounded text-dark-text focus:outline-none text-sm"/>
                  <div className="flex gap-2">
                    <button onClick={() => handleSavePlatform(key)} className="flex-1 px-2 py-1 bg-accent-primary text-white rounded text-sm hover:opacity-90">
                      Save
                    </button>
                    <button onClick={() => setEditingPlatform(null)} className="flex-1 px-2 py-1 bg-dark-bg3 border border-dark-border rounded text-sm hover:bg-dark-surface">
                      Cancel
                    </button>
                  </div>
                </div>) : (<button onClick={() => {
                    setEditingPlatform(key);
                    setPlatformFormData(platformFormData);
                }} className="w-full text-left hover:opacity-80 transition-opacity">
                  <div className="text-xl mb-1">{icon}</div>
                  <div className="font-bold text-sm">{label}</div>
                  {platformFormData[key] ? (<div className="text-xs text-green-400 truncate">
                      ✓ {platformFormData[key].replace('https://', '').substring(0, 20)}
                    </div>) : (<div className="text-xs text-accent-secondary">Add URL →</div>)}
                </button>)}
            </div>))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6">Journey Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-dark-bg3 border border-dark-border rounded p-4 text-center">
            <div className="font-mono text-2xl font-bold text-accent-secondary">{totalDone}</div>
            <div className="text-xs text-dark-muted mt-2">Tasks done</div>
          </div>
          <div className="bg-dark-bg3 border border-dark-border rounded p-4 text-center">
            <div className="font-mono text-2xl font-bold text-accent-secondary">{totalAll - totalDone}</div>
            <div className="text-xs text-dark-muted mt-2">Remaining</div>
          </div>
          <div className="bg-dark-bg3 border border-dark-border rounded p-4 text-center">
            <div className="font-mono text-2xl font-bold text-accent-secondary">{completedLevels}</div>
            <div className="text-xs text-dark-muted mt-2">Levels done</div>
          </div>
          <div className="bg-dark-bg3 border border-dark-border rounded p-4 text-center">
            <div className="font-mono text-2xl font-bold text-accent-secondary">{entries.length}</div>
            <div className="text-xs text-dark-muted mt-2">Log entries</div>
          </div>
        </div>
      </div>
    </div>);
}
