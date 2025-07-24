import { useApolloClient } from '@apollo/client';
import {
  GetAllPotsDocument,
  type GetAllPotsQuery,
} from '@/graphql/generated/output';

export function useUsedThemes(): string[] {
  const client = useApolloClient();
  const data = client.readQuery<GetAllPotsQuery>({
    query: GetAllPotsDocument,
  });

  return data?.pots.map((pot) => pot.theme) ?? [];
}
