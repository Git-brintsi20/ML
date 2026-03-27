'use client';
import { useState } from 'react';
import { useGrowthEntries } from '@/app/hooks/useGrowthEntries';
export default function GrowthLog() {
    const { entries, addEntry, deleteEntry, loading } = useGrowthEntries();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState('');
    const [type, setType] = useState('learning');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const typeEmoji = {
        learning: '📚',
        build: '⚙',
        internship: '🏢',
        win: '🏆',
        blocker: '🚧',
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim())
            return;
        setIsSubmitting(true);
        try {
            const entry = {
                title: title.trim(),
                body: body.trim(),
                tags: tags.split(',').map(t => t.trim()).filter(Boolean),
                type,
                date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
                createdAt: Date.now(),
            };
            await addEntry(entry);
            setTitle('');
            setBody('');
            setTags('');
            setType('learning');
            setIsModalOpen(false);
        }
        catch (err) {
            console.error('Failed to add entry:', err);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    if (loading) {
        return <div className="text-dark-muted">Loading...</div>;
    }
    return (<div className="space-y-6">
      {/* Add Entry Button */}
      <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 bg-gradient-to-r from-accent-primary to-teal-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
        + New Entry
      </button>

      {/* Modal */}
      {isModalOpen && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-surface border border-dark-border rounded-lg max-w-md w-full p-6">
            <h2 className="text-lg font-bold mb-4">Add Growth Entry</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-dark-muted mb-2">Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 bg-dark-bg2 border border-dark-border rounded text-dark-text focus:outline-none focus:border-accent-primary">
                  <option value="learning">Learning</option>
                  <option value="build">Build</option>
                  <option value="internship">Internship</option>
                  <option value="win">Win</option>
                  <option value="blocker">Blocker</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-dark-muted mb-2">Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What did you learn/build?" className="w-full px-3 py-2 bg-dark-bg2 border border-dark-border rounded text-dark-text placeholder-dark-muted focus:outline-none focus:border-accent-primary"/>
              </div>

              <div>
                <label className="block text-sm text-dark-muted mb-2">Details</label>
                <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="More details..." rows={4} className="w-full px-3 py-2 bg-dark-bg2 border border-dark-border rounded text-dark-text placeholder-dark-muted focus:outline-none focus:border-accent-primary resize-none"/>
              </div>

              <div>
                <label className="block text-sm text-dark-muted mb-2">Tags</label>
                <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Comma separated" className="w-full px-3 py-2 bg-dark-bg2 border border-dark-border rounded text-dark-text placeholder-dark-muted focus:outline-none focus:border-accent-primary"/>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 bg-dark-bg3 border border-dark-border rounded hover:bg-dark-surface transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting || !title.trim()} className="flex-1 px-4 py-2 bg-accent-primary text-white rounded hover:opacity-90 disabled:opacity-50 transition-opacity">
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>)}

      {/* Entries List */}
      {entries.length === 0 ? (<div className="text-center py-12 text-dark-muted">
          <div className="text-4xl mb-2">📓</div>
          <p>No entries yet. Document your learnings, wins, blockers, and internship moments.</p>
        </div>) : (<div className="space-y-4">
          {entries.map(entry => (<div key={entry.id} className="bg-dark-surface border border-dark-border rounded-lg p-4 hover:border-accent-primary transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="text-xs text-dark-muted mb-1">{entry.date}</div>
                  <h3 className="text-lg font-bold">
                    {typeEmoji[entry.type]} {entry.title}
                  </h3>
                </div>
                <button onClick={() => deleteEntry(entry.id)} className="text-dark-muted hover:text-red-400 transition-colors text-lg" title="Delete">
                  ✕
                </button>
              </div>

              {entry.body && (<p className="text-dark-text mb-3 whitespace-pre-wrap">{entry.body}</p>)}

              {entry.tags.length > 0 && (<div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-dark-bg3 border border-dark-border rounded text-xs font-mono text-accent-secondary">
                    {entry.type.toUpperCase()}
                  </span>
                  {entry.tags.map(tag => (<span key={tag} className="px-2 py-1 bg-dark-bg3 border border-dark-border rounded text-xs text-dark-muted">
                      {tag}
                    </span>))}
                </div>)}
            </div>))}
        </div>)}
    </div>);
}
