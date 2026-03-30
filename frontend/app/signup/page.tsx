"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/authSlice";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setCredentials({ user: { name: name || "New User", email }, token: "demo-token" }));
    router.push("/dashboard");
  };

  return (
    <div className="flex-1 flex items-center justify-center -mt-16 sm:-mt-24">
      <div className="w-full max-w-md relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-30 animate-pulse"></div>
        <div className="glass-panel p-8 rounded-2xl relative z-10 text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-pink-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-2 text-white">Create Account</h2>
          <p className="text-slate-400 text-sm mb-8">Join to start writing articles</p>
          
          <form onSubmit={handleSignup} className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="glass-input" 
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input" 
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input" 
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full mt-6 py-3 text-sm tracking-wide bg-gradient-to-r from-pink-600 to-purple-600">
              Create Account
            </button>
          </form>
          
          <p className="mt-8 text-sm text-slate-400">
            Already have an account? <Link href="/login" className="text-pink-400 hover:text-pink-300 transition-colors font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
