// components/VirtualizedDataGrid.tsx
import React, { useCallback, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useInfiniteQuery } from '@tanstack/react-query';

interface DataGridProps<T> {
  fetchData: (page: number) => Promise<T[]>;
  rowHeight: number;
  columns: {
    key: keyof T;
    header: string;
    width: number;
    render?: (value: T[keyof T], item: T) => React.ReactNode;
  }[];
}

export function VirtualizedDataGrid<T extends { id: string | number }>({
  fetchData,
  rowHeight,
  columns,
}: DataGridProps<T>) {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['virtualizedData'],
    queryFn: ({ pageParam = 0 }) => fetchData(pageParam),
    getNextPageParam: (_, pages) => pages.length,
  });

  const flatData = useMemo(() => 
    data?.pages.flatMap((page) => page) ?? [], 
    [data]
  );

  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? flatData.length + 1 : flatData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => rowHeight, [rowHeight]),
    overscan: 5,
  });

  const items = rowVirtualizer.getVirtualItems();

  React.useEffect(() => {
    const lastItem = items[items.length - 1];
    if (!lastItem) return;

    if (
      lastItem.index >= flatData.length - 1 &&
      hasNextPage &&
      !isLoading
    ) {
      fetchNextPage();
    }
  }, [items, hasNextPage, fetchNextPage, isLoading, flatData.length]);

  return (
    <div
      ref={parentRef}
      className="h-[500px] overflow-auto border border-gray-200 rounded-lg"
    >
      <div
        className="relative w-full"
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        <div
          className="absolute top-0 left-0 w-full"
          style={{
            transform: `translateY(${items[0]?.start ?? 0}px)`,
          }}
        >
          {items.map((virtualRow) => {
            const item = flatData[virtualRow.index];
            if (!item) {
              return hasNextPage ? (
                <div
                  key={`loader-${virtualRow.index}`}
                  style={{ height: `${rowHeight}px` }}
                  className="flex items-center justify-center"
                >
                  Loading more...
                </div>
              ) : null;
            }

            return (
              <div
                key={item.id}
                className="flex border-b border-gray-100"
                style={{ height: `${rowHeight}px` }}
              >
                {columns.map((column) => (
                  <div
                    key={String(column.key)}
                    style={{ width: column.width }}
                    className="px-4 py-2 truncate"
                  >
                    {column.render
                      ? column.render(item[column.key], item)
                      : String(item[column.key])}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Usage example:
const Example = () => {
  const columns = [
    { key: 'id', header: 'ID', width: 100 },
    { key: 'name', header: 'Name', width: 200 },
    { 
      key: 'status',
      header: 'Status',
      width: 150,
      render: (value) => (
        <span className={`status-${value}`}>{value}</span>
      ),
    },
  ];

  const fetchData = async (page: number) => {
    const response = await fetch(`/api/data?page=${page}`);
    return response.json();
  };

  return (
    <VirtualizedDataGrid
      fetchData={fetchData}
      rowHeight={48}
      columns={columns}
    />
  );
};