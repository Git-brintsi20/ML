import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn, signUp } from '@/lib/auth'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if already logged in
  if (!loading && user) {
    navigate('/')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (isSignUp) {
        await signUp(email, password)
      } else {
        await signIn(email, password)
      }
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-[#6b6b8a]">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#1a1a28] border border-[#2a2a3f] rounded-lg p-8">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="text-3xl font-bold mb-2">
              <span className="text-[#e8e8f0]">ML</span>
              <span className="text-[#a08cf7]"> Journey</span>
            </div>
            <p className="text-[#6b6b8a] text-sm font-mono">Growth Sheet</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[#e8e8f0] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-[#0f0f18] border border-[#2a2a3f] rounded-lg text-[#e8e8f0] placeholder-[#6b6b8a] focus:outline-none focus:border-[#7c6af7]"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-[#e8e8f0] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-[#0f0f18] border border-[#2a2a3f] rounded-lg text-[#e8e8f0] placeholder-[#6b6b8a] focus:outline-none focus:border-[#7c6af7]"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-gradient-to-r from-[#7c6af7] to-[#2dd4bf] text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {isLoading
                ? 'Loading...'
                : isSignUp
                ? 'Sign Up'
                : 'Sign In'}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-[#6b6b8a] text-sm">
              {isSignUp
                ? 'Already have an account? '
                : "Don't have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError('')
                }}
                className="text-[#a08cf7] hover:text-[#7c6af7] transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-[#141420] border border-[#2a2a3f] rounded-lg text-xs text-[#6b6b8a] space-y-1">
            <p>Demo email: <code className="font-mono text-[#a08cf7]">shiki2hustle@gmail.com</code></p>
            <p>For testing, use any password (min 6 chars)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
