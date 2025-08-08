import { gql } from '@apollo/client';

export const CREATE_POT = gql`
   mutation CreateBudget($input: CreateBudgetInput!) {
    createBudget(input: $input) {
        id
    }
   }
`;