'use client';

interface FilterSidebarProps {
  children: React.ReactNode;
  mobileOpen: boolean;
  onClose: () => void;
}

export function FilterSidebar({ children, mobileOpen, onClose }: FilterSidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-72 bg-white shadow-xl
          transform transition-transform duration-300
          lg:static lg:z-auto lg:shadow-none lg:translate-x-0 lg:border-r lg:border-gray-100
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Mobile close button */}
        <div className="lg:hidden flex items-center justify-between px-4 pt-4 pb-2">
          <span className="font-semibold text-gray-900">Filters</span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </aside>
    </>
  );
}
