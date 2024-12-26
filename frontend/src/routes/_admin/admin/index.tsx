import { createFileRoute, useRouter } from '@tanstack/react-router'
import {useEffect} from "react";

export const Route = createFileRoute('/_admin/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
    const { state, navigate } = useRouter();

    // Use state.currentLocation to access the current path
    const currentPath = state.resolvedLocation.pathname;

    // Redirect only if the current path is not `/admin/dashboard`
    useEffect(() => {
        if (currentPath === '/admin') {
            navigate({ to: '/admin/dashboard' });
        }
    }, [currentPath, navigate]);

    return <div>Redirecting...</div>;
}

