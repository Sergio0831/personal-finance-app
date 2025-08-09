import { gql } from '@apollo/client';

export const CREATE_BUDGET = gql`
   mutation CreateBudget($input: BudgetInput!) {
        createBudget(input: $input) {
            id
        }
   }
`;

export const DELETE_BUDGET = gql`
    mutation DeleteBudget($id: String!) {
        deleteBudget(id: $id) {
            id 
        }
    } 
`;

export const UPDATE_BUDGET = gql`
    mutation UpdateBudget($id: String!, $input: BudgetInput!) {
        updateBudget(id: $id, input: $input) {
          id
        }
    }
`;
