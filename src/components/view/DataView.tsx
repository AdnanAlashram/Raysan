import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { t } from "i18next";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Pagination } from "./Pagination";

type ViewType = "table" | "card";
type PaginationType = "numbered" | "scrolling" | "none";

type DataViewProps<T> = {
  viewType: ViewType;
  columns?: ColumnDef<T>[];
  queryFn: (page: number, perPage: number, queryParams?: any) => Promise<T[]>;
  queryKey: string;
  link?: string;
  addButtonLabel?: string;
  tableTitle?: string;
  paginationType?: PaginationType;
  renderCard?: (item: T, index: number) => React.ReactNode;
  className?: string;
  queryParams?: any;
  tableParams?: any;
  renderOptions?: (row: T) => React.ReactNode;
  modal?: React.ReactNode;
};

export const DataView = <T,>({
  viewType,
  queryFn,
  queryKey,
  link = "",
  addButtonLabel = "",
  tableTitle = "",
  modal,
  paginationType = "numbered",
  renderCard,
  className,
  queryParams = {},
 
}: DataViewProps<T>) => {

  const isScrollingPagination = paginationType === "scrolling";
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [dataItems, setDataItems] = useState<T[]>([]);


  const query = useQuery<T[], Error>({
    queryKey: [queryKey, pagination.pageIndex, pagination.pageSize, queryParams],
    queryFn: () => queryFn(pagination.pageIndex + 1, pagination.pageSize, queryParams),
    staleTime: 5000,
  });


  useEffect(() => {
    if (query.data && isScrollingPagination) {
      setDataItems(prev => {
        if (pagination.pageIndex === 0) return query.data!;

        const newItems = query.data!.filter(
          (newItem: any) => !prev.some((prevItem: any) => prevItem.id === newItem.id)
        );
        return [...prev, ...newItems];
      });
    }
  }, [query.data, isScrollingPagination, pagination.pageIndex]);



  const pageCount = query.data ? Math.ceil(20 / pagination.pageSize) : 1;

  const resolvedItems = useMemo(() => {
    if (isScrollingPagination) return dataItems;
    return Array.isArray(query.data) ? query.data : [];
  }, [query.data, isScrollingPagination, dataItems]);


  if (viewType === "card") {
    return (
      <>

        {(tableTitle || link || modal) && (
          <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-extrabold text-textMain">{t(tableTitle)}</h1>
            {modal ? modal : link && (
              <Link to={link} className="flex items-center gap-2 px-4 py-2 text-sm border rounded-xl border-textHighlight text-textHighlight hover:bg-textHighlight hover:text-white transition shadow-lg font-semibold">
                <Plus size={18} /> {t(addButtonLabel)}
              </Link>
            )}
          </div>
        )}


        {query.isLoading && !isScrollingPagination && (
          <div className="flex justify-center py-20 w-full">
            <Loader2 className="animate-spin" />
          </div>
        )}


        {!query.isLoading && resolvedItems.length === 0 && (
          <div className="text-center p-8 bg-gray-50 border rounded-2xl">{t("no data to show!")}</div>
        )}


        <div className={className || "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"}>
          {resolvedItems.map((item: any, index: number) =>
            renderCard ? <div key={item.id || index}>{renderCard(item, index)}</div> : null
          )}
        </div>


        {paginationType === "numbered" && (
          <div className="mt-8">
            <Pagination
              pageIndex={pagination.pageIndex}
              pageCount={pageCount}
              setPageIndex={(page) => setPagination(old => ({ ...old, pageIndex: page }))}
              isLoading={query.isLoading}
              showInfo
            />
          </div>
        )}
      </>
    );
  }


};