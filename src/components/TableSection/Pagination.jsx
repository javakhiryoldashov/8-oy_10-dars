"use client";

import { Pagination } from "flowbite-react";
// import { useState } from "react";

export function PaginationComponent({ currentPage, onPageChange, totalPages }) {
  //   const [currentPage, setCurrentPage] = useState(1);

  //   console.log(currentPage);
  //   const onPageChange = (page) => setCurrentPage(page);

  return (
    <div className="w-full flex overflow-x-auto sm:justify-center">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showIcons
      />
    </div>
  );
}
