import { FilterMobile } from '@/assets/icons';
import type { TableProps } from '@/components/ui/data-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Category } from '@/generated/prisma';
import { useIsMobile } from '@/hooks/useIsMobile';
import SelectMobileTrigger from '../custom/mobile-select-trigger';
import type { Transaction } from '../transactions/Columns';
import { Label } from '../ui/label';

const categories: Category[] = Object.values(Category);
const TableFilterByCategory = ({ table }: TableProps<Transaction>) => {
  const isMobile = useIsMobile();

  const handleChange = (value: string) => {
    if (value === 'all') {
      table.getColumn('category')?.setFilterValue(undefined);
    } else {
      table.getColumn('category')?.setFilterValue(value);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Select
        onValueChange={handleChange}
        value={
          (table.getColumn('category')?.getFilterValue() as string) ?? 'all'
        }
      >
        {!isMobile && (
          <>
            <Label
              className="text-muted text-preset-4 max-sm:hidden"
              htmlFor="category"
            >
              Category
            </Label>
            <SelectTrigger
              className="relative data-[size=default]:h-[45px] max-sm:hidden"
              id="category"
            >
              <SelectValue placeholder="All Transactions" />
            </SelectTrigger>
          </>
        )}
        {isMobile && (
          <SelectMobileTrigger className="sm:hidden">
            <FilterMobile className="size-5" />
          </SelectMobileTrigger>
        )}
        <SelectContent>
          <SelectItem value="all">All Transactions</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TableFilterByCategory;
