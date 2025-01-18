import {createFileRoute, Link, useNavigate} from '@tanstack/react-router'
import {useEffect, useState} from 'react'
import {ChevronDown, ChevronUp} from 'lucide-react'
import {courseQueryOptions} from '@/service/courses';
import {useSuspenseQuery} from '@tanstack/react-query';
import {useAuth} from '@/auth/authContext';
import {createOrderId, verifyOrder} from "@/service/courses.ts";
import {loadScript} from "@/utils/loadScript.ts";

export const Route = createFileRoute('/_layout/courses/$id')({
    loader: async ({params: {id}, context}) => {
        const data = await context.queryClient.ensureQueryData(courseQueryOptions(id));
        return {
            post: data, // Ensure you return the post object
        };
    },
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate();
    const {id} = Route.useParams();
    const {user} = useAuth();
    const [expandedWeek, setExpandedWeek] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Use `useSuspenseQuery` to access the cached post data using the queryKey ['blogs', id]
    const {data: fetchedCourse} = useSuspenseQuery(courseQueryOptions(id));

    useEffect(() => {
        // Dynamically update the title when the fetchedCourse data changes
        if (fetchedCourse?.title) {
            document.title = `${fetchedCourse.title} `;
        } else {
            document.title = "Loading... | Blog";
        }
    }, [fetchedCourse]);

    const handlePayment = async () => {
        try {
            setIsLoading(true);
            await loadScript();
            // Getting orderId from backend
            const orderId = await createOrderId(id);
            if (!orderId) {
                alert("Failed to create order. Please try again.");
                return;
            }
            console.log(orderId);
            setIsLoading(false);
            // Create Razorpay options
            const options = {
                key: import.meta.env.RAZORPAY_KEY_ID,
                amount: 150000,
                currency: "INR",
                name: "EduConsultancy",
                description: "Testing",
                order_id: orderId,
                handler: async function (response: any) {
                    // Handle payment success
                    console.log(response);
                    const result = await verifyOrder(response);
                    console.log(result);
                    navigate({to:"/"});
                    if (result.data.success) {
                        alert('Payment successful!');
                    } else {
                        alert('Payment verification failed. Please contact support.');
                    }
                },
                theme: {
                    color: "#3399cc"
                }
            };

            // Open Razorpay Checkout
            const razorpay = new (window as any).Razorpay(options);
            razorpay.on('payment.failed', function (response: any) {
                alert('Payment failed. Please try again.');
                console.error(response.error);
            });
            razorpay.open();
        } catch (error) {
            console.log(error);
            alert("Something went wrong. Please try again.");
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32">
            <main className="max-w-4xl mx-auto px-4 py-8">
                <img
                    src={fetchedCourse.imageUrl || "https://miro.medium.com/v2/resize:fit:720/format:webp/1*QnEHTb57iUU8KPQ-gBzw6w.png"}
                    alt={fetchedCourse.title}
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg shadow-md mb-8"
                />
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{fetchedCourse.title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                    <span className="mr-4">Instructor: {fetchedCourse.instructor}</span>
                    <span className="mr-4">|</span>
                    <span className="mr-4">Duration: {course.duration}</span>
                    <span className="mr-4">|</span>
                    <span>Level: {course.level}</span>
                </div>
                <p className="text-gray-700 mb-6">{fetchedCourse.description}</p>
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Topics</h2>
                    <ul className="list-disc list-inside">
                        {course.topics.map((topic, index) => (
                            <li key={index} className="text-gray-700 mb-2">{topic}</li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Syllabus</h2>
                    {course.syllabus.map((week) => (
                        <div key={week.week} className="mb-4">
                            <button
                                className="flex items-center justify-between w-full text-left"
                                onClick={() => setExpandedWeek(expandedWeek === week.week ? null : week.week)}
                            >
                                <h3 className="text-lg font-semibold text-gray-900">Week {week.week}: {week.title}</h3>
                                {expandedWeek === week.week ? <ChevronUp className="h-5 w-5"/> :
                                    <ChevronDown className="h-5 w-5"/>}
                            </button>
                            {expandedWeek === week.week && (
                                <p className="mt-2 text-gray-700">{week.content}</p>
                            )}
                        </div>
                    ))}
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enroll in this course</h2>
                        <p className="text-gray-600">Gain access to all course materials and start learning today!</p>
                    </div>
                    <div>
                        <span className="text-3xl font-bold text-indigo-600">₹{fetchedCourse.price.toFixed(2)}</span>
                        {user ? user?.role === "ADMIN" ?
                            (
                                <button
                                    onClick={handlePayment}
                                    className="ml-4 bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-300"
                                >
                                    Enroll Now
                                </button>
                            )
                            : (
                                <button
                                    onClick={handlePayment}
                                    className="ml-4 bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-300"
                                >
                                    {isLoading ? (
                                        <svg
                                            className="animate-spin h-5 w-5 mx-auto"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                            ></path>
                                        </svg>
                                    ) : (
                                        'Enroll Now'
                                    )}
                                </button>
                            ) : (
                            <Link to='/auth/login'>
                                <button

                                    className="ml-4 text-white font-bold bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 px-6 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
                                >
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

const course = {
    id: 1,
    duration: "6 weeks",
    level: "Advanced",
    topics: [
        "Advanced Hook Patterns",
        "State Management with Context and Reducers",
        "Performance Optimization Techniques",
        "Server-Side Rendering with Next.js",
        "Testing React Applications",
        "Deploying React Apps"
    ],
    syllabus: [
        {
            week: 1,
            title: "Advanced Hook Patterns",
            content: "Deep dive into useEffect, useCallback, and useMemo. Custom hook creation and best practices."
        },
        {
            week: 2,
            title: "State Management",
            content: "Explore Context API and useReducer for complex state management. Comparison with Redux."
        },
        {
            week: 3,
            title: "Performance Optimization",
            content: "Techniques for optimizing React apps including memoization, lazy loading, and code splitting."
        },
        {
            week: 4,
            title: "Server-Side Rendering",
            content: "Introduction to Next.js and implementing SSR in React applications."
        },
        {
            week: 5,
            title: "Testing React Applications",
            content: "Unit testing with Jest and React Testing Library. Integration and end-to-end testing strategies."
        },
        {
            week: 6,
            title: "Deployment and Best Practices",
            content: "Deploying React apps to various platforms. Best practices for production React applications."
        }
    ]
}


