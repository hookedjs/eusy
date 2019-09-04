/**
 * THis is a mock replacement for { useMutation } from '@apollo/react-hooks';
 */
import * as React from 'react';
import { useState } from 'react';
import { OperationVariables } from '@apollo/react-common';
import { MutationHookOptions, MutationTuple } from '@apollo/react-hooks';
import { gqlReturnType } from '../../@types/graphql-tag';
import { MockOrm } from '../MockOrm';
import { ApolloError } from 'apollo-client';
import { createApolloError, createGraphQLErrors } from './errorHelpers';

export function useMutation<TData = any, TVariables = OperationVariables>(
  mutation: gqlReturnType,
  options?: MutationHookOptions<TData, TVariables>
): MutationTuple<TData, TVariables> {
  const mutationName = mutation.definitions[0].selectionSet.selections[0].name.value;

  const stateDefault: {
    data: any;
    loading: boolean;
    called: boolean;
    error: ApolloError;
  } = {
    data: null,
    loading: false,
    called: false,
    error: createApolloError()
  };
  const [state, setState] = useState(stateDefault);

  let variableConstants = {};
  mutation.definitions[0].selectionSet.selections[0].arguments.forEach(a => {
    if (a.name.value === 'where') {
      a.value.fields.forEach(f => {
        if (f.value.kind !== 'Variable') variableConstants[f.name.value] = f.value.value;
      });
    }
  });

  const model =
    (mutationName.startsWith('create') && mutationName.slice(6).toLowerCase() + 's') ||
    (mutationName.startsWith('update') && mutationName.slice(6).toLowerCase() + 's') ||
    (mutationName.startsWith('delete') && mutationName.slice(6).toLowerCase() + 's');

  const action =
    (mutationName.startsWith('create') && 'create') ||
    (mutationName.startsWith('update') && 'update') ||
    (mutationName.startsWith('delete') && 'delete');

  const ormHandler = MockOrm[model][action];

  return [
    async options => {
      setState({
        ...state,
        loading: true,
        called: true
      });
      const res = await ormHandler({ ...variableConstants, ...options.variables });
      setState({
        data: res.data,
        error: createApolloError(res.errors),
        loading: false,
        called: false
      });
      return {
        data: res.data,
        extensions: {},
        errors: createGraphQLErrors(res.errors)
      };
    },
    state
  ];
}
