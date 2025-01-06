import {createFileRoute, Outlet} from '@tanstack/react-router'
import Navbar from "../components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";

export const Route = createFileRoute('/_layout')({
    component: RouteComponent,
})

function RouteComponent() {
    return (<>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>)
}
