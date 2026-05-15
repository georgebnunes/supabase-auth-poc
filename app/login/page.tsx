import GoogleLoginButton from './login-button'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { LogIn, Sparkles } from 'lucide-react'

export default async function LoginPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    return redirect('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030303] px-4 selection:bg-white/10">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-[400px]">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-3xl shadow-2xl">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="flex flex-col items-center">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-4 shadow-lg shadow-blue-500/20">
              <Sparkles className="h-full w-full text-white" />
            </div>

            <h1 className="mb-2 text-2xl font-bold tracking-tight text-white">
              Welcome back
            </h1>
            <p className="mb-10 text-center text-sm text-white/50">
              Sign in to your account to continue building your next big idea.
            </p>

            <div className="w-full space-y-4">
              <GoogleLoginButton />
              
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#030303] px-2 text-white/30 backdrop-blur-sm">
                    Secured by Supabase
                  </span>
                </div>
              </div>
              
              <p className="text-center text-xs text-white/40 leading-relaxed">
                By signing in, you agree to our{' '}
                <a href="#" className="text-white/60 hover:text-white transition-colors">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-8 text-center text-sm text-white/30">
          New here? <a href="#" className="text-white/60 hover:text-white transition-colors font-medium">Create an account</a>
        </p>
      </div>
    </div>
  )
}
