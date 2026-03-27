'use client';
import { useState } from 'react';
import { useTaskProgress } from '@/app/hooks/useTaskProgress';
import { LEVELS } from '@/app/lib/data';
export default function LevelsPanel() {
    const { tasksChecked, toggleTaskStatus, loading } = useTaskProgress();
    const [expandedLevels, setExpandedLevels] = useState(new Array(LEVELS.length).fill(true));
    const toggleLevelExpand = (index) => {
        const newExpanded = [...expandedLevels];
        newExpanded[index] = !newExpanded[index];
        setExpandedLevels(newExpanded);
    };
    // Calculate stats
    let totalDone = 0, totalAll = 0;
    const levelStats = LEVELS.map(lv => {
        const lvDone = lv.tasks.filter(t => tasksChecked[t.id]).length;
        const lvAll = lv.tasks.length;
        totalDone += lvDone;
        totalAll += lvAll;
        return { done: lvDone, all: lvAll, pct: lvAll ? Math.round(lvDone / lvAll * 100) : 0 };
    });
    const overallPct = totalAll ? Math.round(totalDone / totalAll * 100) : 0;
    const getTypeLabel = (type) => {
        const labels = {
            yt: 'YT VIDEO',
            build: 'BUILD',
            read: 'READ',
            concept: 'CONCEPT',
        };
        return labels[type] || type;
    };
    const getTypeColor = (type) => {
        const colors = {
            yt: 'bg-red-500/20 text-red-300',
            build: 'bg-blue-500/20 text-blue-300',
            read: 'bg-amber-500/20 text-amber-300',
            concept: 'bg-purple-500/20 text-purple-300',
        };
        return colors[type] || 'bg-gray-500/20 text-gray-300';
    };
    if (loading) {
        return <div className="text-dark-muted">Loading...</div>;
    }
    return (<div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Overall Progress</h2>
          <div className="text-3xl font-bold font-mono text-accent-secondary">{overallPct}%</div>
        </div>
        <div className="h-2 bg-dark-bg3 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-accent-primary to-teal-500 transition-all duration-500" style={{ width: `${overallPct}%` }}/>
        </div>
        <div className="mt-3 text-sm text-dark-muted font-mono">
          {totalDone} / {totalAll} tasks completed
        </div>
      </div>

      {/* Levels */}
      <div className="space-y-4">
        {LEVELS.map((level, levelIdx) => (<div key={levelIdx} className="border border-dark-border rounded-lg overflow-hidden">
            {/* Level Header */}
            <button onClick={() => toggleLevelExpand(levelIdx)} className="w-full px-6 py-4 bg-dark-surface hover:bg-dark-surface2 transition-colors flex items-center gap-4">
              <span className="text-2xl">{level.badge}</span>
              <div className="flex-1 text-left">
                <div className="font-bold">{level.name}</div>
                <div className="text-sm text-dark-muted">{level.sub}</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-accent-secondary">
                  {levelStats[levelIdx].done}/{levelStats[levelIdx].all}
                </div>
                <div className="text-xs text-dark-muted">{levelStats[levelIdx].pct}%</div>
              </div>
              <span className="text-dark-muted ml-2">
                {expandedLevels[levelIdx] ? '▼' : '▶'}
              </span>
            </button>

            {/* Level Progress Bar */}
            <div className="px-6 py-2 bg-dark-bg3 border-b border-dark-border">
              <div className="h-1 bg-dark-border rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent-primary to-teal-500 transition-all" style={{ width: `${levelStats[levelIdx].pct}%` }}/>
              </div>
            </div>

            {/* Tasks */}
            {expandedLevels[levelIdx] && (<div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-dark-bg3 border-b border-dark-border">
                    <tr className="divide-x divide-dark-border">
                      <th className="px-4 py-3 text-left text-dark-muted font-semibold" style={{ width: '40px' }}>✓</th>
                      <th className="px-4 py-3 text-left text-dark-muted font-semibold" style={{ width: '90px' }}>Type</th>
                      <th className="px-4 py-3 text-left text-dark-muted font-semibold">Task</th>
                      <th className="px-4 py-3 text-left text-dark-muted font-semibold" style={{ width: '120px' }}>Domain</th>
                      <th className="px-4 py-3 text-left text-dark-muted font-semibold">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-border">
                    {level.tasks.map(task => (<tr key={task.id} className={`divide-x divide-dark-border hover:bg-dark-surface2 transition-colors ${tasksChecked[task.id] ? 'opacity-60' : ''}`}>
                        <td className="px-4 py-3">
                          <button onClick={() => toggleTaskStatus(task.id)} className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${tasksChecked[task.id]
                        ? 'bg-accent-primary border-accent-primary text-dark-bg'
                        : 'border-dark-border hover:border-accent-primary'}`}>
                            {tasksChecked[task.id] && '✓'}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${getTypeColor(task.type)}`}>
                            {getTypeLabel(task.type)}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium text-dark-text max-w-96">
                          {task.label}
                        </td>
                        <td className="px-4 py-3 text-dark-muted text-xs whitespace-nowrap">
                          {task.domain}
                        </td>
                        <td className="px-4 py-3 text-dark-muted text-xs max-w-xs">
                          {task.detail}
                        </td>
                      </tr>))}
                  </tbody>
                </table>
              </div>)}
          </div>))}
      </div>
    </div>);
}
