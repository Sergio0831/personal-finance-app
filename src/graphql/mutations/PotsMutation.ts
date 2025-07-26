import { gql } from '@apollo/client';

export const CREATE_POT = gql`
   mutation CreatePot($input: CreatePotInput!) {
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
    mutation UpdatePot($id: String!, $input: UpdatePotInput!) {
        updatePot(id: $id, input: $input) {
          id
        }
    }
`;

export const ADD_TO_POT = gql`
    mutation AddToPot($id: String!, $amount: Float!) {
        addToPot(id: $id, amount: $amount) {
          id,
        }
    }
`;
