'use client';

import WidgetCard from '@/components/cards/widget-card';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from './columns';
import ModalButton from '@/app/shared/modal-button';
import CreateApplication from './create-application';
import { useQuery } from '@tanstack/react-query';
export const applicationQueryKey = 'candidate-application-data';
export default function MyApplicationsTable({
  className,
}: {
  className?: string;
}) {
  const [pageSize, setPageSize] = useState(7);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((applicationId: string) => {
    handleDelete(applicationId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  type applicationData = { id: string; candidateFiles: string; 
    "applicationId" : string;
    "candidateName": string;
    "meetingSchedule": string}

    const { data } = useQuery<applicationData[]>({
      queryKey: [applicationQueryKey],
      queryFn: async () => {
        const response = await fetch(
          'http://127.0.0.1:5000/upload_application_data',
          { method: 'GET' }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json() as unknown as applicationData[];
      },
      // initialData: [],
      staleTime: Infinity,
    });
    console.log(data,"xggvx")
  // {
  //   "Id": 1,
  //   "applicationId": "41072784-075d-4fa6-91cf-9325d48c66d3",
  //   "candidateFiles": "C:\\Users\\Sanya\\Downloads\\Flask_Bot1\\Flask_Bot/tmp\\muskan12_3.pdf",
  //   "candidateName": "Muskan arora",
  //   "meetingSchedule": "11 april,24 6:00PM"
  // },
  const {
    isLoading,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    sortConfig,
    handleSort,
    selectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
  } = useTable(data??[], pageSize);

  const columns = useMemo(
    () =>
      getColumns({
        data: data??[],
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  const { visibleColumns } = useColumn(columns);
  return (
    <WidgetCard
      className={className}
      headerClassName="mb-6 items-start flex-col @[57rem]:flex-row @[57rem]:items-center"
      actionClassName="grow @[57rem]:ps-11 ps-0 items-center w-full @[42rem]:w-full @[57rem]:w-auto "
      title="Candidates"
      titleClassName="whitespace-nowrap"
      action={
        <div className="mt-2 flex justify-end">
          <ModalButton
            label="Add New Candidate"
            view={<CreateApplication />}
            customSize="600px"
            className="mt-0"
          />
        </div>
      }
    >
      <ControlledTable
        variant="modern"
        data={tableData}
        isLoading={isLoading}
        showLoadingText={true}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        className="-mx-5 lg:-mx-7"
      />
    </WidgetCard>
  );
}
