export function LoadingSpinner({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="w-7 h-7 border-[3px] border-[#cce0f0] border-t-[#005596] rounded-full animate-spin" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-pulse">
      <div className="w-1 absolute left-0 top-0 bottom-0 bg-[#cce0f0] rounded-l-2xl" />
      <div className="pl-5 pr-4 pt-4 pb-4 space-y-3">
        <div className="space-y-2">
          <div className="h-4 bg-[#e6f0f8] rounded-lg w-3/4" />
          <div className="h-4 bg-[#e6f0f8] rounded-lg w-1/2" />
        </div>
        <div className="space-y-1.5">
          <div className="h-3 bg-slate-100 rounded w-2/3" />
          <div className="h-3 bg-slate-100 rounded w-3/4" />
        </div>
        <div className="flex items-center justify-between pt-1 border-t border-slate-50">
          <div className="h-5 bg-[#e6f7ee] rounded-full w-20" />
          <div className="h-4 bg-slate-100 rounded w-12" />
        </div>
      </div>
    </div>
  );
}
