import { gql } from '@apollo/client';

export const GET_OVERVIEW_QUERY = gql`
    query GetOverview {
        pots {
            id
            name
            total
            theme
        }
        recentTransactions {
            id
            avatar
            name
            amount
            date
        }
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
        recurringBills {
            paidBills {
            total
            }
            dueSoon {
            total
            }
            totalUpcoming {
            total
            }
        }
    }
`;
