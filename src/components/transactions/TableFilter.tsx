import { useDebouncedCallback } from 'use-debounce';
import { Search } from '@/assets/icons';
import type { TableProps } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import type { Transaction } from './Columns';

const TableFilter = ({ table }: TableProps<Transaction>) => {
  const handleSearch = useDebouncedCallback((term: string) => {
    table.getColumn('name')?.setFilterValue(term);
  }, 100);

  return (
    <div className="relative w-full max-w-xs">
      <Input
        aria-label="Search transaction"
        className="pr-13"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search transaction"
        type="search"
        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
      />
      <span className="absolute inset-y-0 end-0 flex items-center pr-5">
        <Search className="size-4" />
      </span>
    </div>
  );
};

export default TableFilter;
