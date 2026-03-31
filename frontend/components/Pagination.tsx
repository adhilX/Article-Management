import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  loading = false,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 pt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1 || loading}
        className="p-2 rounded-xl glass-panel border border-white/5 hover:border-white/20 disabled:opacity-30 disabled:hover:border-white/5 transition-all"
      >
        <ChevronLeft className="h-5 w-5 text-white" />
      </button>

      <div className="flex items-center gap-2">
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          // Show current page, first, last, and pages around current
          if (
            pageNum === 1 ||
            pageNum === totalPages ||
            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
          ) {
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                disabled={loading}
                className={`w-10 h-10 rounded-xl font-bold transition-all border ${currentPage === pageNum
                  ? "bg-blue-600 text-white border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  : "glass-panel text-slate-400 border-white/5 hover:border-white/20 hover:text-white"
                  }`}
              >
                {pageNum}
              </button>
            );
          } else if (
            pageNum === currentPage - 2 ||
            pageNum === currentPage + 2
          ) {
            return <span key={pageNum} className="text-slate-600 font-bold px-1">...</span>;
          }
          return null;
        })}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages || loading}
        className="p-2 rounded-xl glass-panel border border-white/5 hover:border-white/20 disabled:opacity-30 disabled:hover:border-white/5 transition-all"
      >
        <ChevronRight className="h-5 w-5 text-white" />
      </button>
    </div>
  );
}
