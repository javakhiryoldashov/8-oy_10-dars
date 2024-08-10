"use client";
import { Table } from "flowbite-react";
import { PaginationComponent } from "./Pagination";
import RenderAllData from "./RenderAllData";
import { useEffect, useState } from "react";
import { setData } from "@/store/dataSlice";
import { useDispatch, useSelector } from "react-redux";

const paginate = (countries, pageSize, currentPage) => {
  const startIndex = (currentPage - 1) * pageSize;
  return countries.slice(startIndex, startIndex + pageSize);
};

export default function TableSection() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const watchList = useSelector((state) => state.data.watchList);
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);
  const [pageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const sortedData = data.map((item) => {
          if (watchList.includes(item.cca2)) {
            return {
              ...item,
              id: item.cca2,
              isInMyWatchList: true,
            };
          } else {
            return {
              ...item,
              id: item.cca2,
              isInMyWatchList: false,
            };
          }
        });
        dispatch(setData(sortedData));
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / pageSize);
  const paginationData = paginate(data, pageSize, currentPage);

  return (
    <div className="max-w-[900px] mx-auto mt-24">
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="px-6 py-4 text-xl font-bold leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
            loading...
          </div>
        ) : (
          <>
            <Table>
              <Table.Head>
                <Table.HeadCell className="bg-[#2a303b] text-white">
                  Nomi
                </Table.HeadCell>
                <Table.HeadCell className="bg-[#2a303b] text-white">
                  Bayrog&#39;i
                </Table.HeadCell>
                <Table.HeadCell className="bg-[#2a303b] text-white">
                  Poytaxti
                </Table.HeadCell>
                <Table.HeadCell className="bg-[#2a303b] text-white">
                  Axolisi
                </Table.HeadCell>
                <Table.HeadCell className="bg-[#2a303b] text-white"></Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                <RenderAllData data={paginationData} />
              </Table.Body>
            </Table>
            <PaginationComponent
              currentPage={currentPage}
              onPageChange={onPageChange}
              totalPages={totalPages}
            />
          </>
        )}
      </div>
    </div>
  );
}
