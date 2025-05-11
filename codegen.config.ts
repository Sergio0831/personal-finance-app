import { schema } from './src/graphql/schema';
import { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';

const config: CodegenConfig = {
  schema: printSchema(schema),
  documents: ['./src/graphql/queries.ts'],
  generates: {
    './src/generated/graphql/graphql-types.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
