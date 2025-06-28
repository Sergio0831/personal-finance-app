import { gql } from '@apollo/client';

export const GET_ALL_TRANSACTIONS = gql`
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
