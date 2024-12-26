import {Link} from "@tanstack/react-router";

export default  function Hero() {
    return (
        <section className="bg-gradient-to-r from-white to-gray-100 pt-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-700 mb-4">
                            Transform Your Future with Expert Education Guidance
                        </h1>
                        <p className="text-xl text-gray-600 mb-6">
                            Unlock your potential and navigate the path to academic success with our personalized
                            consultancy services.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/courses"
                                search={{
                                    page:1,
                                    size:9,
                                    order:'asc',
                                    sort:'title'
                                }}
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-light hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Get Consultation
                            </Link>
                            <Link
                                to="/courses"
                                search={{
                                    page:1,
                                    size:9,
                                    order:'asc',
                                    sort:'title'
                                }}
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Our Courses
                            </Link>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <img
                            src="/images/hero-section/hero-image.jpg"
                            alt="Students receiving education consultancy"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </div>
        </section>


    );

}