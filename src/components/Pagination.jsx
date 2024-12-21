

import { Button } from "../components/ui/button";

// Pagination Component
const Pagination = ({ table }) => {
  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;

  const getPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i} active={currentPage === i}>
          <PaginationLink onClick={() => table.setPageIndex(i - 1)}>{i}</PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <div className="pagination-wrapper">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </PaginationPrevious>
        </PaginationItem>

        {getPaginationItems()}

        <PaginationItem>
          <PaginationNext
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </div>
  );
};

// Helper Components
const PaginationContent = ({ children }) => {
  return <div className="flex space-x-2">{children}</div>;
};

const PaginationItem = ({ children, active }) => {
  return (
   <div
   size="sm"
   className={`mr-2 rounded variant="secondary" ${
     active
       ? "bg-gray-400 text-white"
       : " text-black dark:text-gray-800"
   }`}
 >
      {children}
    </div>
  );
};

const PaginationLink = ({ children, onClick }) => {
  return (
    <Button variant="link" size="sm" onClick={onClick}>
      {children}
    </Button>
  );
};

const PaginationPrevious = ({ children, onClick, disabled }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className="mr-2"
    >
      {children}
    </Button>
  );
};

const PaginationNext = ({ children, onClick, disabled }) => {
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className="ml-2"
    >
      {children}
    </Button>
  );
};

export default Pagination;
