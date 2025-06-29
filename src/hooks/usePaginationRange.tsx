import { Table } from '@tanstack/react-table';
import { useMemo } from 'react';

export const ELLIPSIS = '...';

export function usePaginationRange<TData>(table: Table<TData>) {
	const pageCount = table.getPageCount();
	const currentPage = table.getState().pagination.pageIndex + 1; // 1-based

	return useMemo<(number | typeof ELLIPSIS)[]>(() => {
		if (pageCount <= 4) {
			return Array.from({ length: pageCount }, (_, i) => i + 1);
		}

		if (currentPage <= 2) {
			return [1, 2, ELLIPSIS, pageCount];
		}

		if (currentPage === 3) {
			return [1, 3, 4, pageCount];
		}

		if (currentPage >= pageCount - 1) {
			return [1, ELLIPSIS, pageCount - 1, pageCount];
		}

		return [1, ELLIPSIS, currentPage, pageCount];
	}, [pageCount, currentPage]);
}
