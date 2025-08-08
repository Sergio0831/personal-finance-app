import {
  GetAllPotsDocument,
  type GetAllPotsQuery,
} from '@/graphql/generated/output';
import { useUsedThemes } from '@/hooks/useUsedThemes';

export function useUsedPotThemes(): string[] {
  return useUsedThemes<GetAllPotsQuery>(
    GetAllPotsDocument,
    (data) => data?.pots.map((pot) => pot.theme) ?? []
  );
}
