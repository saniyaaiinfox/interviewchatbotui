'use client';
import { HeaderCell } from '@/components/ui/table';
import { Text, Checkbox, ActionIcon, Tooltip, Select } from 'rizzui';



type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (applicationId: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  handleSelectAll,
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  data,
  checkedItems,
  onChecked,
}: Columns) => [
  {
    title: (
      <div className="ps-3.5">
        <Checkbox
          title={'Select All'}
          onChange={handleSelectAll}
          checked={checkedItems.length === data.length}
          className="cursor-pointer"
        />
      </div>
    ),
    dataIndex: 'checked',
    key: 'checked',
    width: 30,
    render: (_: any, row: any) => (
      <div className="inline-flex ps-3.5">
        <Checkbox
          aria-label={'ID'}
          className="cursor-pointer"
          checked={checkedItems.includes(row.id)}
          {...(onChecked && { onChange: () => onChecked(row.id) })}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="Application Id" />,
    onHeaderCell: () => onHeaderCellClick('applicationId'),
    dataIndex: 'applicationId',
    key: 'applicationId',
    width: 130,
    render: (applicationId: string) => <Text>#{applicationId}</Text>,
  },
  {
    title: <HeaderCell title="Candidate Name" />,
    onHeaderCell: () => onHeaderCellClick('candidateName'),
    dataIndex: 'candidateName',
    key: 'candidateName',
    width: 150,
    render: (candidateName: string) => (
      <div>
        <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
          {candidateName}
        </Text>
      </div>
    ),
  },

  // {
  //   title: (
  //     <HeaderCell
  //       title={<span className="whitespace-nowrap">Date of Birth</span>}
  //     />
  //   ),
  //   dataIndex: 'dob',
  //   key: 'dob',
  //   width: 250,
  //   render: (dob: Date) => <DateCell date={dob} />,
  // },
  {
    title: (
      <HeaderCell
        title={<span className="whitespace-nowrap">Meeting Schedule</span>}
      />
    ),
    dataIndex: 'meetingSchedule',
    key: 'meetingSchedule',
    width: 130,
    render: (meetingSchedule: string) => (
      <div>
        <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
          {meetingSchedule}
        </Text>
      </div>
    ),
  },
 
];
