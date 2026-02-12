import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getPages = (current: number, total: number): (number | '...')[] => {
  const pages: (number | '...')[] = [];

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  pages.push(1);

  if (current > 4) pages.push('...');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 3) pages.push('...');

  pages.push(total);

  return pages;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (totalPages <= 1) return null;

  const pages = getPages(currentPage, totalPages);

  return (
    <div className="pagination-container">
      <button
        className="pag-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        PREV
      </button>

      <div className="pag-numbers">
        {pages.map((item, index) =>
          item === '...' ? (
            <span key={`dots-${index}`} className="pag-dots">...</span>
          ) : (
            <button
              key={item}
              className={`pag-num ${currentPage === item ? 'active' : ''}`}
              onClick={() => onPageChange(item)}
            >
              {item.toString().padStart(2, '0')}
            </button>
          )
        )}
      </div>

      <button
        className="pag-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        NEXT
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
