import { schema } from './src/graphql/schema';
import { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';

const config: CodegenConfig = {
  schema: printSchema(schema),
  documents: ['./src/graphql/**/*.graphql'],
  generates: {
    './src/graphql/generated/output.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
    './src/graphql/generated/schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
