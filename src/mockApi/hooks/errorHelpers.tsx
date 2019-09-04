import { GraphQLError, Source } from 'graphql';
import { ApolloError } from 'apollo-client';

export const createGraphQLErrors = (errors: { [field: string]: any } = {}) => {
  return Object.values(errors).map(
    message =>
      ({
        message,
        locations: [],
        path: [],
        nodes: [],
        source: ('' as unknown) as Source,
        positions: [],
        originalError: message,
        extensions: [],
        name: ''
      } as GraphQLError)
  );
};

export const createApolloError = (errors: { [field: string]: any } = {}) => {
  return {
    message: '',
    networkError: { message: '', name: '' },
    extraInfo: '',
    name: '',
    graphQLErrors: createGraphQLErrors(errors)
  } as ApolloError;
};
