import { SortMobile } from '@/assets/icons';
import type { TableProps } from '@/components/ui/data-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useIsMobile } from '@/hooks/useIsMobile';
import SelectMobileTrigger from '../custom/MobileSelectTrigger';
import type { Transaction } from '../transactions/Columns';
import { Label } from '../ui/label';

const TableSorting = ({ table }: TableProps<Transaction>) => {
  const isMobile = useIsMobile();

  return (
    <div className="relative flex flex-wrap items-center justify-end gap-2">
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
        {!isMobile && (
          <>
            <Label htmlFor="sorting">Sort by</Label>
            <SelectTrigger
              className="data-[size=default]:h-[45px]"
              id="sorting"
            >
              <SelectValue placeholder="Latest" />
            </SelectTrigger>
          </>
        )}
        {isMobile && (
          <SelectMobileTrigger>
            <SortMobile className="size-5" />
          </SelectMobileTrigger>
        )}

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
