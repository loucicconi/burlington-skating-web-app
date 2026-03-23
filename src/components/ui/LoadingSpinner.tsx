export function LoadingSpinner({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse">
      <div className="flex justify-between mb-3">
        <div className="h-5 bg-gray-200 rounded w-16" />
        <div className="h-5 bg-gray-200 rounded w-20" />
      </div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-1" />
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
      <div className="h-9 bg-gray-200 rounded w-28 ml-auto" />
    </div>
  );
}
