export function Loader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 backdrop-blur-md flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-4 h-4 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-4 h-4 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
  );
}