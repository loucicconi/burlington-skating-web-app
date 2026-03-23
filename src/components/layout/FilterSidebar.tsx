'use client';

interface FilterSidebarProps {
  children: React.ReactNode;
  mobileOpen: boolean;
  onClose: () => void;
}

export function FilterSidebar({ children, mobileOpen, onClose }: FilterSidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-72 flex flex-col
          bg-[#001829] shadow-2xl
          transform transition-transform duration-300 ease-in-out
          lg:static lg:z-auto lg:translate-x-0 lg:shadow-none
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Mobile close */}
        <div className="lg:hidden flex items-center justify-between px-5 pt-5 pb-3">
          <span className="font-semibold text-white text-sm">Filters</span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-[#002a3f] hover:bg-[#003355] flex items-center justify-center text-[#4d8ab5] hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </aside>
    </>
  );
}
