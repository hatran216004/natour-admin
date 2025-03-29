import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight
} from 'react-icons/md';
import useUrl from '../../hooks/useUrl';
import { JSX } from 'react';

type PropsType = {
  className?: string;
  totalPages: number;
};

/*
  Trường hợp 1: currentPage <= 3 (Trang gần đầu) [ 1, 2, 3, 4, 5, ..., 10 ]
  Trường hợp 2: currentPage >= totalPages - 2 (Trang gần cuối) [ 1, ..., 21, 22, 23, [24], 25 ]
  Trường hợp 3: 3 < currentPage < totalPages - 2 (Trang ở giữa) [ 1, ..., 9, [10], 11, ..., 20 ]
*/

export default function Pagination({ className, totalPages }: PropsType) {
  const { currentValue, handler: onPageChange } = useUrl<number>({
    field: 'page',
    defaultValue: 1
  });
  const currentPage = Number(currentValue);

  console.log({ currentValue });

  function addPage({
    pageNumber,
    isActive
  }: {
    pageNumber: number;
    isActive: boolean;
  }) {
    return (
      <button
        key={pageNumber}
        onClick={() => {
          console.log({ pageNumber });
          onPageChange(pageNumber);
        }}
        className={`${
          isActive
            ? 'bg-primary text-white border-primary'
            : 'bg-white hover:text-gray-700 border-gray-300 hover:bg-gray-100 text-gray-500'
        } flex items-center justify-center px-3 h-8 leading-tight border`}
      >
        {pageNumber}
      </button>
    );
  }

  function renderPagination() {
    const pageButtons: JSX.Element[] = [];

    // Luôn hiển thị trang đầu tiên
    pageButtons.push(addPage({ pageNumber: 1, isActive: currentPage === 1 }));

    // Thêm dấu ba chấm đầu tiên nếu cần
    if (currentPage > 3) {
      pageButtons.push(
        <button
          key="ellipsis-1"
          className="bg-white border-gray-300text-gray-500flex items-center justify-center px-3 h-8 leading-tight border"
        >
          ...
        </button>
      );
    }
    // Xác định phạm vi trang ở giữa, xác định khoảng trang sẽ hiển thị, giúp hiển thị các trang gần currentPage
    // TH1: Trang gần đầu
    let startPage, endPage;
    if (currentPage <= 3) {
      startPage = 2;
      endPage = Math.min(totalPages - 1, 5);
    }
    // TH2: Trang gần cuối
    else if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - 4);
      endPage = totalPages - 1;
    }
    // TH3: Trang giữa
    else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    // Thêm các trang giữa
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(addPage({ pageNumber: i, isActive: currentPage === i }));
    }

    // Cho trường hợp trang gần đầu và trang giữa
    if (currentPage < totalPages - 2)
      pageButtons.push(
        <button
          key="ellipsis-12"
          className="bg-white border-gray-300text-gray-500flex items-center justify-center px-3 h-8 leading-tight border"
        >
          ...
        </button>
      );

    // Luôn hiển thị trang cuối cùng nếu có nhiều hơn 1 trang
    if (totalPages > 1)
      pageButtons.push(
        addPage({
          pageNumber: totalPages,
          isActive: totalPages === currentPage
        })
      );

    return pageButtons;
  }

  return (
    <nav className={className}>
      <div className="flex items-center -space-x-px h-8 text-sm">
        <button className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ">
          <MdOutlineKeyboardArrowLeft />
        </button>
        {renderPagination()}
        <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>
    </nav>
  );
}

/*
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };
  
  // Tạo mảng chứa các nút trang sẽ hiển thị
  const renderPageButtons = () => {
    const pageButtons = [];
    
    // Luôn hiển thị trang đầu tiên
    pageButtons.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={currentPage === 1 ? 'active' : ''}
      >
        1
      </button>
    );
    
    // Thêm dấu ba chấm đầu tiên nếu cần
    if (currentPage > 3) {
      pageButtons.push(
        <span key="ellipsis-1" className="ellipsis">...</span>
      );
    }
    
    // Tính toán trang bắt đầu và kết thúc cho khối giữa
    let startPage, endPage;
    
    if (currentPage <= 3) {
      startPage = 2;
      endPage = Math.min(totalPages - 1, 5);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - 4);
      endPage = totalPages - 1;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }
    
    // Thêm các trang giữa
    for (let i = startPage; i <= endPage; i++) {
      if (i <= 1 || i >= totalPages) continue; // Bỏ qua trang đầu và cuối vì đã thêm riêng
      
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }
    
    // Thêm dấu ba chấm thứ hai nếu cần
    if (currentPage < totalPages - 2) {
      pageButtons.push(
        <span key="ellipsis-2" className="ellipsis">...</span>
      );
    }
    
    // Luôn hiển thị trang cuối cùng nếu có nhiều hơn 1 trang
    if (totalPages > 1) {
      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={currentPage === totalPages ? 'active' : ''}
        >
          {totalPages}
        </button>
      );
    }
    
    return pageButtons;
  };
*/
