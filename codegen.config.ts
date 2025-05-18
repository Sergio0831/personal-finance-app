import { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';

import { schema } from './src/gql/schema';

const config: CodegenConfig = {
	schema: printSchema(schema),
	documents: ['./src/gql/queries/**/*.ts', './src/gql/mutations/**/*.ts'],
	generates: {
		'./src/gql/generated/output.ts': {
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-react-apollo'
			]
		},
		'./src/gql/generated/schema.graphql': {
			plugins: ['schema-ast']
		}
	},
	ignoreNoDocuments: true
};

export default config;
