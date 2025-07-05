import type { TableProps } from '@/components/ui/data-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Category } from '@/generated/prisma';

import type { Transaction } from './Columns';

// Consider deriving from schema or making configurable
const categories: Category[] = Object.values(Category);
const TableFilterByCategory = ({ table }: TableProps<Transaction>) => {
  const handleChange = (value: string) => {
    if (value === 'all') {
      table.getColumn('category')?.setFilterValue(undefined);
    } else {
      table.getColumn('category')?.setFilterValue(value);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-muted text-preset-4">Category</span>
      <Select
        onValueChange={handleChange}
        value={
          (table.getColumn('category')?.getFilterValue() as string) ?? 'all'
        }
      >
        <SelectTrigger className="data-[size=default]:h-[45px]">
          <SelectValue placeholder="All Transactions" />
        </SelectTrigger>
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
