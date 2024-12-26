import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router';
import { useAuth } from "@/auth/authContext.tsx";
import { useEffect, useState } from "react";

export const Route = createFileRoute('/_layout/_protected')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, refreshToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const { navigate } = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      if (!user) {
        try {
          await refreshToken(); // Attempt to refresh token for unauthenticated users
        } catch (error) {
          console.log("Error refreshing token:", error);
        }
      }

      setLoading(false); // Update loading state once the check is complete
    };

    if (loading) {
      handleAuth();
    }

    // Only navigate after loading is complete
    if (!loading) {
      if (!user) {
        navigate({ to: '/auth/login' });
      } else if (user.role === 'ADMIN') {
        navigate({ to: '/admin' });
      } else if(user.role === 'STUDENT'){
        navigate({ to: '/profile' });
      }
    }
  }, [user, loading, refreshToken, navigate]); // Add necessary dependencies to avoid infinite loops

  // Show loading state while checking user authentication status
  if (loading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
}
