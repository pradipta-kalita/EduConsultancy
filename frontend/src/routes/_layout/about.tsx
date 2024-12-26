import {createFileRoute, Link} from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <div className="bg-white pt-14">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              About EduConsultancy
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Empowering learners worldwide with expert guidance and quality resources
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600">
                At EduConsultancy, we're committed to revolutionizing education by providing personalized learning experiences and expert guidance.
                Our mission is to empower students and professionals alike to achieve their academic and career goals through innovative online
                courses and comprehensive educational resources.
              </p>
            </div>

            <div >
              <img
                  src="/images/hero-section/hero-image.jpg"
                  alt="Students learning"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Premium online courses crafted by industry experts</li>
                <li>Free, high-quality educational blogs and resources</li>
                <li>Personalized academic and career counseling</li>
                <li>Interactive learning experiences and community forums</li>
                <li>Cutting-edge educational technology and tools</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Approach</h2>
              <p className="text-gray-600">
                We believe in a holistic approach to education. Our team of experienced educators and industry professionals work tirelessly to create engaging content that not only imparts knowledge but also fosters critical thinking and practical skills. We combine traditional teaching methods with innovative technology to ensure an immersive and effective learning experience.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Why Choose EduConsult Pro?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert-Led Courses</h3>
                <p className="text-gray-600">Learn from industry leaders and experienced educators who bring real-world insights to your learning journey.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Learning</h3>
                <p className="text-gray-600">Access our courses and resources anytime, anywhere. Learn at your own pace and on your own schedule.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Support</h3>
                <p className="text-gray-600">Join a vibrant community of learners, share experiences, and grow together in your educational journey.</p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg text-gray-600">
              Join EduConsult Pro today and take the first step towards unlocking your full potential. Whether you're a student looking to excel in your studies or a professional aiming to upskill, we have the resources and expertise to guide you towards success.
            </p>
            <Link to='/courses' search={{
                page:1,
                size:9,
                order:'asc',
                sort:'title'
            }}>
              <button
                  className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition duration-300">
                Explore Our Courses
              </button>
            </Link>
          </div>
        </div>
      </div>
  )
}
