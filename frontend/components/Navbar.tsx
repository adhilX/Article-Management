"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/slice/authSlice";

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Show if scrolling up or at the very top
      // Hide if scrolling down and moved past 100px
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
      
      setVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={`sticky top-0 z-50 w-full glass-panel border-b border-white/5 border-l-0 border-r-0 border-t-0 transition-transform duration-300 ${
      visible ? "translate-y-0" : "-translate-y-full shadow-none"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white font-bold group-hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all">
                A
              </div> */}
              <span className="font-bold text-xl tracking-tight text-white group-hover:opacity-80 transition-opacity hidden sm:block">
                Article Platform
              </span>
            </Link>

          </div>

          <div className="flex items-center space-x-4">
            {auth.token && (
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
      className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive
          ? "text-white bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
          : "text-slate-400 hover:text-white hover:bg-white/5"
        }`}
    >
      {children}
    </Link>
  );
}
