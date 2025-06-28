import { gql } from '@apollo/client';

export const GET_ALL_TRANSACTIONS = gql`
	query GetAllTransactions {
		transactions {
			id
			avatar
			name
			category
			date
			amount
			userId
		}
	}
`;
