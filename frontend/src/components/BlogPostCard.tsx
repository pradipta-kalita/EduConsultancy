import {Link} from "@tanstack/react-router";
import {BlogSummary} from "@/types/blogTypes.ts";

export function BlogPostCard({ post }: { post: BlogSummary }) {
    // Format the publication date for readability
    const formattedDate = new Date(post.publishedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <article className="py-8 border-b border-gray-200">
            <div className="flex items-center space-x-1 text-xs">
                {post.author}
            </div>
            <div className="flex justify-between items-start mt-2">
                <div className="flex-1 pr-8">
                    <Link to="/blogs/$id" params={{id: post.id}} className="block group">
                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-gray-700">
                            {post.title}
                        </h2>
                        <p className="mt-2 text-gray-600 line-clamp-3">{post.summary}</p>
                    </Link>
                    <div className="flex items-center mt-4 text-sm text-gray-600">
                        <span>{formattedDate}</span>
                        <span className="mx-2">·</span>
                        <span>5 min read</span> {/* Static data */}
                        <span className="mx-2">·</span>
                        <span className="flex items-center">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16h6"
                />
              </svg>
              12 comments {/* Static data */}
            </span>
                    </div>
                </div>
                <Link to="/blogs/$id" className="block flex-shrink-0" params={{id: post.id}}>
                    <img
                        src={post.imageUrl || "https://miro.medium.com/v2/resize:fit:720/format:webp/1*Z7FRbJlCIIcBgNT74dhKiA.png"} // Static placeholder image
                        alt={post.title}
                        width={112}
                        height={112}
                        className="w-28 h-28 object-cover"
                    />
                </Link>
            </div>
        </article>
    );
}
