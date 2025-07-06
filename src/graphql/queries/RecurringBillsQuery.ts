import { gql } from '@apollo/client';

export const GET_ALL_RECURRING_BILLS = gql`
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
