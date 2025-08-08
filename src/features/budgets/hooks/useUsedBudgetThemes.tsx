import {
  GetAllBudgetsDocument,
  type GetAllBudgetsQuery,
} from '@/graphql/generated/output';
import { useUsedThemes } from '@/hooks/useUsedThemes';

export function useUsedBudgetThemes(): string[] {
  return useUsedThemes<GetAllBudgetsQuery>(
    GetAllBudgetsDocument,
    (data) => data?.budgets.map((budget) => budget.theme) ?? []
  );
}
