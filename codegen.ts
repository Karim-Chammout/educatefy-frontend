import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:9090/graphql/',
  documents: 'src/**/*.graphql',
  generates: {
    'src/generated/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false,
      },
      config: {
        addTypenameToSelectionSets: true,
        nonOptionalTypename: true,
      },
    },
  },
};

export default config;
