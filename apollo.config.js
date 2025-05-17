module.exports = {
  client: {
    name: 'my-app',
    service: {
      name: 'backend',
      localSchemaFile: './schema.graphql', // matches your codegen output
    },
    includes: ['src/graphql/**/*.graphql'], // matches your .graphql query/mutation files
  },
};
