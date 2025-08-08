import {
  type DocumentNode,
  type Unmasked,
  useApolloClient,
} from '@apollo/client';

export function useUsedThemes<T>(
  query: DocumentNode,
  extractor: (data: Unmasked<T> | null) => string[]
): string[] {
  const client = useApolloClient();
  const data = client.readQuery<T>({ query });

  return extractor(data) ?? [];
}
