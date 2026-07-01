"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function Pagination({ currentPage, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageUrl = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `/shop?${params.toString()}`;
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      router.push(createPageUrl(pageNumber));
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);
      
      if (startPage === 1) endPage = maxVisiblePages;
      if (endPage === totalPages) startPage = totalPages - maxVisiblePages + 1;
      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center mt-12 gap-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeftIcon size={20} />
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && handlePageChange(page)}
          disabled={typeof page !== 'number'}
          className={`w-10 h-10 rounded-md font-medium text-sm flex items-center justify-center transition-colors ${
            page === currentPage
              ? "bg-green-600 text-white"
              : typeof page === 'number'
              ? "border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-green-600"
              : "text-slate-400 cursor-default"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRightIcon size={20} />
      </button>
    </div>
  );
}
