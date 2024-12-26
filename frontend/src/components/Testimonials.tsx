type Testimonial = {
    id: number
    name: string
    role: string
    image: string
    quote: string
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "University Student",
        image: "/images/testimonials/testimonials01.png",
        quote: "The guidance I received from Edu Consultancy was invaluable. They helped me navigate the complex college application process and find the perfect university for my goals."
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "High School Senior",
        image: "/images/testimonials/testimonials02.jpg",
        quote: "Thanks to Edu Consultancy, I was able to improve my SAT scores significantly. Their personalized tutoring approach made all the difference in my college applications."
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Graduate Student",
        image: "/images/testimonials/testimonials03.jpg",
        quote: "Edu Consultancy's support in my graduate school applications was exceptional. Their insights into various programs helped me make an informed decision about my academic future."
    }
]

export default function Testimonials() {
    return (
        <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                    What Our Students Say
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
                        >
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                width={100}
                                height={100}
                                className="rounded-full mb-4 object-cover w-24 h-24"
                            />
                            <blockquote className="mb-4">
                                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                            </blockquote>
                            <div className="mt-auto">
                                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

