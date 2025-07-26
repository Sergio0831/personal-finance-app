import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
};

export type AmountSummary = {
  __typename?: 'AmountSummary';
  count: Scalars['Int']['output'];
  total: Scalars['Float']['output'];
};

export enum Category {
  Bills = 'Bills',
  DiningOut = 'DiningOut',
  Education = 'Education',
  Entertainment = 'Entertainment',
  General = 'General',
  Groceries = 'Groceries',
  Lifestyle = 'Lifestyle',
  PersonalCare = 'PersonalCare',
  Shopping = 'Shopping',
  Transportation = 'Transportation'
}

export type CreatePotInput = {
  name: Scalars['String']['input'];
  target: Scalars['Float']['input'];
  theme: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToPot?: Maybe<Pot>;
  createPot?: Maybe<Pot>;
  deletePot?: Maybe<Pot>;
  updatePot?: Maybe<Pot>;
};


export type MutationAddToPotArgs = {
  amount: Scalars['Float']['input'];
  id: Scalars['String']['input'];
};


export type MutationCreatePotArgs = {
  input: CreatePotInput;
};


export type MutationDeletePotArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdatePotArgs = {
  id: Scalars['String']['input'];
  input: UpdatePotInput;
};

export type Pot = {
  __typename?: 'Pot';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  target: Scalars['Float']['output'];
  theme: Scalars['String']['output'];
  total: Scalars['Float']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Query = {
  __typename?: 'Query';
  pots: Array<Pot>;
  recentTransactions: Array<Transaction>;
  recurringBills: RecurringBills;
  transactions: Array<Transaction>;
  user?: Maybe<User>;
};

export type RecurringBills = {
  __typename?: 'RecurringBills';
  dueSoon: AmountSummary;
  paidBills: AmountSummary;
  recurringBills: Array<Transaction>;
  totalBills: Scalars['Float']['output'];
  totalUpcoming: AmountSummary;
};

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Float']['output'];
  avatar: Scalars['String']['output'];
  category: Category;
  date: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  recurring: Scalars['Boolean']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type UpdatePotInput = {
  name: Scalars['String']['input'];
  target: Scalars['Float']['input'];
  theme: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type CreatePotMutationVariables = Exact<{
  input: CreatePotInput;
}>;


export type CreatePotMutation = { __typename?: 'Mutation', createPot?: { __typename?: 'Pot', id: string } | null };

export type DeletePotMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeletePotMutation = { __typename?: 'Mutation', deletePot?: { __typename?: 'Pot', id: string } | null };

export type UpdatePotMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdatePotInput;
}>;


export type UpdatePotMutation = { __typename?: 'Mutation', updatePot?: { __typename?: 'Pot', id: string } | null };

export type AddToPotMutationVariables = Exact<{
  id: Scalars['String']['input'];
  amount: Scalars['Float']['input'];
}>;


export type AddToPotMutation = { __typename?: 'Mutation', addToPot?: { __typename?: 'Pot', id: string } | null };

export type GetAllPotsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPotsQuery = { __typename?: 'Query', pots: Array<{ __typename?: 'Pot', id: string, name: string, target: number, total: number, theme: string }> };

export type GetAllRecurringBillsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRecurringBillsQuery = { __typename?: 'Query', recurringBills: { __typename?: 'RecurringBills', totalBills: number, recurringBills: Array<{ __typename?: 'Transaction', id: string, avatar: string, name: string, date: any, amount: number }>, paidBills: { __typename?: 'AmountSummary', count: number, total: number }, totalUpcoming: { __typename?: 'AmountSummary', count: number, total: number }, dueSoon: { __typename?: 'AmountSummary', count: number, total: number } } };

export type GetAllTransactionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTransactionsQuery = { __typename?: 'Query', transactions: Array<{ __typename?: 'Transaction', id: string, name: string, avatar: string, amount: number, category: Category, date: any }> };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null, image?: string | null } | null };


export const CreatePotDocument = gql`
    mutation CreatePot($input: CreatePotInput!) {
  createPot(input: $input) {
    id
  }
}
    `;
export type CreatePotMutationFn = Apollo.MutationFunction<CreatePotMutation, CreatePotMutationVariables>;

/**
 * __useCreatePotMutation__
 *
 * To run a mutation, you first call `useCreatePotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPotMutation, { data, loading, error }] = useCreatePotMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePotMutation(baseOptions?: Apollo.MutationHookOptions<CreatePotMutation, CreatePotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePotMutation, CreatePotMutationVariables>(CreatePotDocument, options);
      }
export type CreatePotMutationHookResult = ReturnType<typeof useCreatePotMutation>;
export type CreatePotMutationResult = Apollo.MutationResult<CreatePotMutation>;
export type CreatePotMutationOptions = Apollo.BaseMutationOptions<CreatePotMutation, CreatePotMutationVariables>;
export const DeletePotDocument = gql`
    mutation DeletePot($id: String!) {
  deletePot(id: $id) {
    id
  }
}
    `;
export type DeletePotMutationFn = Apollo.MutationFunction<DeletePotMutation, DeletePotMutationVariables>;

/**
 * __useDeletePotMutation__
 *
 * To run a mutation, you first call `useDeletePotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePotMutation, { data, loading, error }] = useDeletePotMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePotMutation(baseOptions?: Apollo.MutationHookOptions<DeletePotMutation, DeletePotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePotMutation, DeletePotMutationVariables>(DeletePotDocument, options);
      }
export type DeletePotMutationHookResult = ReturnType<typeof useDeletePotMutation>;
export type DeletePotMutationResult = Apollo.MutationResult<DeletePotMutation>;
export type DeletePotMutationOptions = Apollo.BaseMutationOptions<DeletePotMutation, DeletePotMutationVariables>;
export const UpdatePotDocument = gql`
    mutation UpdatePot($id: String!, $input: UpdatePotInput!) {
  updatePot(id: $id, input: $input) {
    id
  }
}
    `;
export type UpdatePotMutationFn = Apollo.MutationFunction<UpdatePotMutation, UpdatePotMutationVariables>;

/**
 * __useUpdatePotMutation__
 *
 * To run a mutation, you first call `useUpdatePotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePotMutation, { data, loading, error }] = useUpdatePotMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePotMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePotMutation, UpdatePotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePotMutation, UpdatePotMutationVariables>(UpdatePotDocument, options);
      }
export type UpdatePotMutationHookResult = ReturnType<typeof useUpdatePotMutation>;
export type UpdatePotMutationResult = Apollo.MutationResult<UpdatePotMutation>;
export type UpdatePotMutationOptions = Apollo.BaseMutationOptions<UpdatePotMutation, UpdatePotMutationVariables>;
export const AddToPotDocument = gql`
    mutation AddToPot($id: String!, $amount: Float!) {
  addToPot(id: $id, amount: $amount) {
    id
  }
}
    `;
export type AddToPotMutationFn = Apollo.MutationFunction<AddToPotMutation, AddToPotMutationVariables>;

/**
 * __useAddToPotMutation__
 *
 * To run a mutation, you first call `useAddToPotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToPotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToPotMutation, { data, loading, error }] = useAddToPotMutation({
 *   variables: {
 *      id: // value for 'id'
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useAddToPotMutation(baseOptions?: Apollo.MutationHookOptions<AddToPotMutation, AddToPotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToPotMutation, AddToPotMutationVariables>(AddToPotDocument, options);
      }
export type AddToPotMutationHookResult = ReturnType<typeof useAddToPotMutation>;
export type AddToPotMutationResult = Apollo.MutationResult<AddToPotMutation>;
export type AddToPotMutationOptions = Apollo.BaseMutationOptions<AddToPotMutation, AddToPotMutationVariables>;
export const GetAllPotsDocument = gql`
    query GetAllPots {
  pots {
    id
    name
    target
    total
    theme
  }
}
    `;

/**
 * __useGetAllPotsQuery__
 *
 * To run a query within a React component, call `useGetAllPotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPotsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPotsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPotsQuery, GetAllPotsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPotsQuery, GetAllPotsQueryVariables>(GetAllPotsDocument, options);
      }
export function useGetAllPotsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPotsQuery, GetAllPotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPotsQuery, GetAllPotsQueryVariables>(GetAllPotsDocument, options);
        }
export function useGetAllPotsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllPotsQuery, GetAllPotsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllPotsQuery, GetAllPotsQueryVariables>(GetAllPotsDocument, options);
        }
export type GetAllPotsQueryHookResult = ReturnType<typeof useGetAllPotsQuery>;
export type GetAllPotsLazyQueryHookResult = ReturnType<typeof useGetAllPotsLazyQuery>;
export type GetAllPotsSuspenseQueryHookResult = ReturnType<typeof useGetAllPotsSuspenseQuery>;
export type GetAllPotsQueryResult = Apollo.QueryResult<GetAllPotsQuery, GetAllPotsQueryVariables>;
export const GetAllRecurringBillsDocument = gql`
    query GetAllRecurringBills {
  recurringBills {
    recurringBills {
      id
      avatar
      name
      date
      amount
    }
    totalBills
    paidBills {
      count
      total
    }
    totalUpcoming {
      count
      total
    }
    dueSoon {
      count
      total
    }
  }
}
    `;

/**
 * __useGetAllRecurringBillsQuery__
 *
 * To run a query within a React component, call `useGetAllRecurringBillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRecurringBillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRecurringBillsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllRecurringBillsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRecurringBillsQuery, GetAllRecurringBillsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRecurringBillsQuery, GetAllRecurringBillsQueryVariables>(GetAllRecurringBillsDocument, options);
      }
export function useGetAllRecurringBillsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRecurringBillsQuery, GetAllRecurringBillsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRecurringBillsQuery, GetAllRecurringBillsQueryVariables>(GetAllRecurringBillsDocument, options);
        }
export function useGetAllRecurringBillsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllRecurringBillsQuery, GetAllRecurringBillsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllRecurringBillsQuery, GetAllRecurringBillsQueryVariables>(GetAllRecurringBillsDocument, options);
        }
export type GetAllRecurringBillsQueryHookResult = ReturnType<typeof useGetAllRecurringBillsQuery>;
export type GetAllRecurringBillsLazyQueryHookResult = ReturnType<typeof useGetAllRecurringBillsLazyQuery>;
export type GetAllRecurringBillsSuspenseQueryHookResult = ReturnType<typeof useGetAllRecurringBillsSuspenseQuery>;
export type GetAllRecurringBillsQueryResult = Apollo.QueryResult<GetAllRecurringBillsQuery, GetAllRecurringBillsQueryVariables>;
export const GetAllTransactionsDocument = gql`
    query GetAllTransactions {
  transactions {
    id
    name
    avatar
    amount
    category
    date
  }
}
    `;

/**
 * __useGetAllTransactionsQuery__
 *
 * To run a query within a React component, call `useGetAllTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTransactionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>(GetAllTransactionsDocument, options);
      }
export function useGetAllTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>(GetAllTransactionsDocument, options);
        }
export function useGetAllTransactionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>(GetAllTransactionsDocument, options);
        }
export type GetAllTransactionsQueryHookResult = ReturnType<typeof useGetAllTransactionsQuery>;
export type GetAllTransactionsLazyQueryHookResult = ReturnType<typeof useGetAllTransactionsLazyQuery>;
export type GetAllTransactionsSuspenseQueryHookResult = ReturnType<typeof useGetAllTransactionsSuspenseQuery>;
export type GetAllTransactionsQueryResult = Apollo.QueryResult<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>;
export const GetUserDocument = gql`
    query GetUser {
  user {
    id
    name
    email
    image
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;