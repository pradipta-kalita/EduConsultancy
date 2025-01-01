import {Button} from '@/components/ui/button'
import {createFileRoute} from '@tanstack/react-router'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {blogQueryOptions} from "@/service/blogs.ts";
import { useSuspenseQuery} from "@tanstack/react-query";
import {Bookmark} from "lucide-react";
import {useEffect} from "react";
import {ShareButton} from "@/components/ShareButton.tsx";


export const Route = createFileRoute('/_layout/blogs/$id')({
  loader: async ({ params: { id }, context }) => {
    const data = await context.queryClient.ensureQueryData(blogQueryOptions(id));
    return {
      post: data,
    };
  },
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
  notFoundComponent: () => <div>Post not found</div>,
  component: RouteComponent,
});


function RouteComponent() {
  const { id } = Route.useParams();
  // Use `useSuspenseQuery` to access the cached post data using the queryKey ['blogs', id]
  const { data: post } = useSuspenseQuery(blogQueryOptions(id));
  useEffect(() => {
    // Dynamically update the title when the post data changes
    if (post?.title) {
      document.title = `${post.title} | Blog`;
    } else {
      document.title = "Loading... | Blog";
    }
  }, [post]);


  return (
      <article className="max-w-3xl mx-auto px-6 py-10 mt-24 bg-white rounded-lg ">
        <h1 className="text-3xl font-extrabold mb-6 leading-tight text-gray-900">{post.title}</h1>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt={post.author} />
              <AvatarFallback>{post.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-medium text-gray-800">{post.author}</h2>
              <time
                  dateTime={post.publishedAt}
                  className="text-sm text-gray-500"
              >
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <Bookmark className="h-5 w-5 text-gray-600" />
            </Button>
            <ShareButton url={window.location.href} title="Check out this awesome post!" />
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <img
              src={post.imageUrl ||"https://miro.medium.com/v2/resize:fit:720/format:webp/1*Z7FRbJlCIIcBgNT74dhKiA.png"}
              alt="Server Icon"
              className="rounded-lg shadow-sm border border-gray-200"
          />
        </div>

        <div className="prose prose-lg max-w-none leading-relaxed text-gray-700">
          <p className="first-letter:text-6xl first-letter:font-serif first-letter:text-gray-400 first-letter:mr-4 first-letter:float-left leading-8">
            {post.content}
          </p>
        </div>

      </article>
  );
}
