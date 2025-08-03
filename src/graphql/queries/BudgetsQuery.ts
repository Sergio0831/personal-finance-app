import { gql } from '@apollo/client';

export const GET_ALL_BUDGETS = gql`
    query GetAllBudgets {
        budgets {
            id
            category
            maximum
            theme
            lastTransactions {
                id
                avatar
                name
                amount
                date
            }
        }
    }
`;
