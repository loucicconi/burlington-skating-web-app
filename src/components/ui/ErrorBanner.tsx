interface ErrorBannerProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorBanner({ message = 'Something went wrong.', onRetry }: ErrorBannerProps) {
  return (
    <div className="mx-4 mt-4 p-3.5 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3">
      <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      </div>
      <p className="text-sm text-red-700 flex-1">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="text-xs font-semibold text-red-600 hover:text-red-800 underline">
          Retry
        </button>
      )}
    </div>
  );
}
