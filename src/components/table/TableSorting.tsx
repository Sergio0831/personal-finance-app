import { SortMobile } from '@/assets/icons';
import type { TableProps } from '@/components/ui/data-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Transaction } from '../transactions/Columns';
import SelectMobileTrigger from '../ui/select-mobile-trigger';

const TableSorting = ({ table }: TableProps<Transaction>) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-muted text-preset-4 max-sm:hidden">Sort by</span>
      <Select
        onValueChange={(value) => {
          const [id, dir] = value.split('-');
          table.setSorting([{ id, desc: dir === 'desc' }]);
        }}
        value={
          table.getState().sorting[0]
            ? `${table.getState().sorting[0].id}-${table.getState().sorting[0].desc ? 'desc' : 'asc'}`
            : 'date-desc'
        }
      >
        <SelectTrigger className="data-[size=default]:h-[45px] max-sm:hidden">
          <SelectValue placeholder="Latest" />
        </SelectTrigger>
        <SelectMobileTrigger className=" sm:hidden">
          <SortMobile className="size-5" />
        </SelectMobileTrigger>
        <SelectContent>
          <SelectItem value="date-desc">Latest</SelectItem>
          <SelectItem value="date-asc">Oldest</SelectItem>
          <SelectItem value="name-asc">A to Z</SelectItem>
          <SelectItem value="name-desc">Z to A</SelectItem>
          <SelectItem value="amount-desc">Highest</SelectItem>
          <SelectItem value="amount-asc">Lowest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TableSorting;
