import { createFileRoute } from '@tanstack/react-router'
import Hero from "../../components/Hero.tsx";
// import Footer from "../../components/Footer.tsx";
import Testimonials from "../../components/Testimonials.tsx";


export const Route = createFileRoute('/_layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Hero />
      <Testimonials />
      {/*<Footer />*/}
    </>
  )
}
