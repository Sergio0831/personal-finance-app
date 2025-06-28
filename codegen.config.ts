import { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';

import { schema } from './src/graphql/schema';

const config: CodegenConfig = {
	schema: printSchema(schema),
	documents: ['./src/graphql/queries/*.ts', './src/graphql/mutations/*.ts'],
	generates: {
		'./src/graphql/generated/output.ts': {
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-react-apollo'
			],
			config: {
				scalars: {
					date: 'Date'
				}
			}
		},
		'./src/graphql/generated/schema.graphql': {
			plugins: ['schema-ast']
		}
	},
	ignoreNoDocuments: true
};

export default config;
