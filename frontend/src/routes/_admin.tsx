import {useAuth} from '@/auth/authContext';
import AppSidebar from '@/components/AppSidebar';
import {SidebarTrigger} from '@/components/SidebarTrigger';
import {SidebarProvider} from '@/components/ui/sidebar';
import {createFileRoute, Outlet, useRouter} from '@tanstack/react-router';
import {useEffect, useState} from 'react';
import {Loader} from "@/components/Loader.tsx";

export const Route = createFileRoute('/_admin')({
    component: RouteComponent,
});

function RouteComponent() {
    const {user, refreshToken} = useAuth();
    const [loading, setLoading] = useState(true);
    const {navigate} = useRouter();

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
                navigate({to: '/auth/login'});
            } else if (user.role !== 'ADMIN') {
                navigate({to: '/profile'});
            }
        }
    }, [user, loading, refreshToken, navigate]); // Add necessary dependencies to avoid infinite loops

    // Show loading state while checking user authentication status
    if (loading) {
        return <Loader/>;
    }

    return (
        <div className="flex flex-col min-h-screen h-full">
            <SidebarProvider>
                <AppSidebar/>

                <div className="p-4 flex-grow bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 min-h-screen">
                    <SidebarTrigger/>
                    <div className="p-6 flex flex-col gap-6">
                        <Outlet/>
                    </div>
                </div>
            </SidebarProvider>
        </div>

    );
}
