import { gql } from '@apollo/client';

export const GET_ALL_POTS = gql`
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
