import { gql } from '@apollo/client';

export const CREATE_POT = gql`
   mutation CreatePot($input: PotInput!) {
        createPot(input: $input) {
            id
        }
   }
`;

export const DELETE_POT = gql`
    mutation DeletePot($id: String!) {
        deletePot(id: $id) {
             id 
        }
    } 
`;

export const UPDATE_POT = gql`
    mutation UpdatePot($id: String!, $input: PotInput!) {
        updatePot(id: $id, input: $input) {
          id
        }
    }
`;

export const ADD_TO_POT = gql`
    mutation AddToPot($id: String!, $amount: Float!) {
        addToPot(id: $id, amount: $amount) {
          id
        }
    }
`;

export const WITHDRAW_FROM_POT = gql`
    mutation WithdrawFromPot($id: String!, $amount: Float!) {
        withdrawFromPot(id: $id, amount: $amount) {
          id
        }
    }
`;
