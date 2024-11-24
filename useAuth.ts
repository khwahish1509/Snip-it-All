// hooks/useAuth.ts
'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuthProtected() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push('/login');
    }
  }, [session, status, router]);

  return { session, isLoading: status === "loading" };
}