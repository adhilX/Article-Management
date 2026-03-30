"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  
  // Note: We might not be hydrated fully immediately, but for UI we assume generic state mapping
  const auth = useSelector((state: RootState) => state.auth);
  
  // Example dummy login toggle for pure UI demonstration
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 border-l-0 border-r-0 border-t-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold group-hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-all">
                A
              </div>
              <span className="font-bold text-xl tracking-tight text-white group-hover:opacity-80 transition-opacity hidden sm:block">
                Article Platform
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              <NavLink href="/dashboard" currentPath={pathname}>Dashboard</NavLink>
              <NavLink href="/create" currentPath={pathname}>Write</NavLink>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {auth.token ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-400 hidden sm:block">
                  {auth.user?.name || "Author"}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Log in
                </Link>
                <Link href="/signup" className="text-sm font-medium btn-primary py-1.5 px-4 rounded-full text-white">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, currentPath, children }: { href: string; currentPath: string; children: React.ReactNode }) {
  const isActive = currentPath.startsWith(href) && href !== "/" || currentPath === href;
  
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
        isActive 
        ? "text-white bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" 
        : "text-slate-400 hover:text-white hover:bg-white/5"
      }`}
    >
      {children}
    </Link>
  );
}
