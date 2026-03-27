

import { useHabits } from '@/hooks/useHabits';
import { HABITS } from '@/lib/data';

function getWeekKey(): string {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const mon = new Date(d.setDate(diff));
  return mon.toISOString().slice(0, 10);
}

export default function HabitsPanel() {
  const { habitData, toggleHabit, loading } = useHabits();
  const weekKey = getWeekKey();
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  if (loading) {
    return <div className="text-dark-muted">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-dark-muted">
        Week of {new Date(weekKey).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </div>

      <div className="space-y-4">
        {HABITS.map(habit => {
          const count = days.filter(d => habitData[`${weekKey}_${habit.id}_${d}`]).length;
          return (
            <div key={habit.id} className="bg-dark-surface border border-dark-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">{habit.name}</h3>
                <div className="font-mono font-bold text-accent-secondary">
                  {count > 0 ? `${count}/7 🔥` : '0/7'}
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {days.map((day, idx) => {
                  const key = `${weekKey}_${habit.id}_${day}`;
                  const isHit = habitData[key];
                  return (
                    <button
                      key={day}
                      onClick={() => toggleHabit(habit.id, day, weekKey)}
                      className="flex flex-col items-center gap-1 p-2 rounded border border-dark-border hover:border-accent-primary transition-colors"
                      title={dayLabels[idx]}
                    >
                      <div className={`w-10 h-10 rounded flex items-center justify-center font-bold transition-all ${
                        isHit
                          ? 'bg-accent-primary text-dark-bg'
                          : 'bg-dark-bg3 text-dark-muted hover:bg-dark-border'
                      }`}>
                        {isHit ? '✓' : ''}
                      </div>
                      <div className="text-xs text-dark-muted">{dayLabels[idx]}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
