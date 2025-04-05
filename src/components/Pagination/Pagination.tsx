import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight
} from 'react-icons/md';
import useUrl from '../../hooks/useUrl';
import classNames from 'classnames';

type PropsType = {
  className?: string;
  totalPages: number;
};

const RANGE = 2;

export default function Pagination({ className, totalPages }: PropsType) {
  const { currentValue, handler: onPageChange } = useUrl<number>({
    field: 'page',
    defaultValue: 1
  });
  const currentPage = Number(currentValue);

  function renderPagination() {
    let dotAfter = false;
    let dotBefore = false;

    function renderDotBefore(index: number) {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <button
            key={index}
            className="flex items-center justify-center px-3 h-8 leading-tight border"
          >
            ...
          </button>
        );
      }
      return null;
    }

    function renderDotAfter(index: number) {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <button
            key={index}
            className="flex items-center justify-center px-3 h-8 leading-tight border"
          >
            ...
          </button>
        );
      }
      return null;
    }

    return Array(totalPages)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;
        // TH1
        if (
          currentPage <= RANGE * 2 + 1 &&
          pageNumber > currentPage + RANGE &&
          pageNumber < totalPages - RANGE + 1
        ) {
          return renderDotAfter(index);
        }
        // TH2
        else if (
          currentPage > RANGE * 2 + 1 &&
          currentPage < totalPages - RANGE * 2
        ) {
          if (pageNumber < currentPage - RANGE && pageNumber > RANGE)
            return renderDotBefore(index);
          if (
            pageNumber > currentPage + RANGE &&
            pageNumber < totalPages - RANGE + 1
          )
            return renderDotAfter(index);
        }
        // TH3
        else if (
          currentPage >= totalPages - RANGE * 2 &&
          pageNumber < currentPage - RANGE &&
          pageNumber > RANGE
        )
          return renderDotBefore(index);

        return (
          <button
            key={index}
            disabled={currentPage === pageNumber}
            className={classNames(
              'flex items-center justify-center px-3 h-8 leading-tight border',
              {
                'bg-primary text-white border-primary':
                  currentPage === pageNumber,
                'bg-white hover:text-gray-700 border-gray-300 hover:bg-gray-100 text-gray-500':
                  currentPage !== pageNumber
              }
            )}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      });
  }

  return (
    <nav className={className}>
      <div className="flex items-center -space-x-px h-8 text-sm">
        {currentPage > 1 && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
          >
            <MdOutlineKeyboardArrowLeft />
          </button>
        )}
        {renderPagination()}
        {currentPage < totalPages && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <MdOutlineKeyboardArrowRight />
          </button>
        )}
      </div>
    </nav>
  );
}
