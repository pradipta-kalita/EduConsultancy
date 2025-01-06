import * as React from 'react'
import {createRootRouteWithContext, Outlet} from '@tanstack/react-router'
import {QueryClient} from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient;
}>()({
    component: RootComponent,
})

function RootComponent() {
    return (
        <React.Fragment>
            <Outlet/>
        </React.Fragment>
    )
}
