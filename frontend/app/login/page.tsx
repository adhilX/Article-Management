"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slice/authSlice";
import { useRouter } from "next/navigation";
import { loginUser } from "../../services/authServices";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      dispatch(setCredentials({
        user: { name: data.name, email: data.email },
        token: data.accessToken
      }));
      router.push("/");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center -mt-16 sm:-mt-24">
      <div className="w-full max-w-md relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl blur opacity-30 animate-pulse"></div>
        <div className="glass-panel p-8 rounded-2xl relative z-10 text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-2 text-white">Welcome back</h2>
          <p className="text-slate-400 text-sm mb-8">Sign in to manage your articles</p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs text-center">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input"
                placeholder="you@example.com"
                required
                disabled={loading}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-slate-300">Password</label>
                <a href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">Forgot?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input pr-10"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`btn-primary w-full mt-6 py-3 text-sm tracking-wide bg-gradient-to-r from-purple-600 to-pink-600 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-sm text-slate-400">
            Don't have an account? <Link href="/signup" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}