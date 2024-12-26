import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useQuery } from "@tanstack/react-query";
import { fetchAllTags } from "@/service/blogs.ts";
import {Link} from "@tanstack/react-router";

export default function CategoryNav() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    const { error, data, isLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: fetchAllTags,
    });

    const scroll = (direction: 'left' | 'right') => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = direction === 'left' ? -200 : 200;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const checkScroll = () => {
        const container = scrollContainerRef.current;
        if (container) {
            setShowLeftArrow(container.scrollLeft > 0);
            setShowRightArrow(
                container.scrollLeft < container.scrollWidth - container.clientWidth
            );
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScroll);
            // Run the check after data is loaded
            checkScroll();
        }
        return () => container?.removeEventListener('scroll', checkScroll);
    }, [data]); // Re-run when data is loaded

    if (error) {
        return (
            <div>
                There was some sort of error. Please try again.
            </div>
        );
    }

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    if (!isLoading && data?.length === 0) {
        return <p>No tags available</p>;
    }

    return (
        <nav className="border-b border-gray-200">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center h-12 relative">
                    <div className="relative flex-grow max-w-3xl overflow-hidden">
                        {showLeftArrow && (
                            <button
                                onClick={() => scroll('left')}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-md z-10"
                                aria-label="Scroll left"
                            >
                                <ChevronLeft className="h-5 w-5 text-gray-600" />
                            </button>
                        )}
                        <div
                            ref={scrollContainerRef}
                            className="flex space-x-4 overflow-x-auto scrollbar-hide px-6"
                        >
                            {data?.map((category) => (
                                <Link to='/tags/$id/blogs' params={{id: category.id}}>
                                    <button
                                        key={category.id}
                                        className="text-sm text-gray-600 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-100 whitespace-nowrap"
                                    >
                                        {category.tagName}
                                    </button>
                                </Link>
                            ))}
                        </div>
                        {showRightArrow && (
                            <button
                                onClick={() => scroll('right')}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-md z-10"
                                aria-label="Scroll right"
                            >
                                <ChevronRight className="h-5 w-5 text-gray-600" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
