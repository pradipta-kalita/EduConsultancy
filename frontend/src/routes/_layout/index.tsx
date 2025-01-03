import {createFileRoute} from '@tanstack/react-router'
import Hero from "../../components/Hero.tsx";
// import Footer from "../../components/Footer.tsx";
import Testimonials from "../../components/Testimonials.tsx";
import {useEffect, useState} from 'react';
import {Loader} from "@/components/Loader.tsx";

export const Route = createFileRoute('/_layout/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100);

        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            {
                isLoading ? <Loader/> :
                    <>
                        <Hero/>
                        <Testimonials/>
                        {/*<Footer />*/}
                    </>
            }
        </>
    )
}
