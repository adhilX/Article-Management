"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // If there is no token in the Redux store, redirect to login
    if (!token) {
      router.replace("/login");
    } else {
      setIsChecking(false);
    }
  }, [token, router]);

  if (isChecking) {
    return (
      <div className="flex-1 flex items-center justify-center pt-32 pb-32">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
      </div>
    );
  }

  return <>{children}</>;
}
