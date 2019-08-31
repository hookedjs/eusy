/**
 * THis is a mock replacement for { useQuery } from '@apollo/react-hooks';
 */
import * as React from 'react';
import { useEffect } from 'react';
import { ApolloError } from 'apollo-client';
import { OperationVariables, QueryResult } from '@apollo/react-common';
import { QueryHookOptions } from '@apollo/react-hooks';
import { diff } from 'deep-object-diff';
import { gqlReturnType } from '../../../@types/graphql-tag';
import { MockOrm } from '../MockOrm';
import { createApolloError } from './errorHelpers';
import { useLocalStore } from 'mobx-react-lite';

export function useQuery<TData = any, TVariables = OperationVariables>(
  query: gqlReturnType,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> {
  const queryName = query.definitions[0].selectionSet.selections[0].name.value;

  let variableConstants = {};
  query.definitions[0].selectionSet.selections[0].arguments.forEach(a => {
    if (a.name.value === 'where') {
      a.value.fields.forEach(f => {
        if (f.value.kind !== 'Variable') variableConstants[f.name.value] = f.value.value;
      });
    }
  });

  let model = queryName.toLowerCase();
  if (!model.endsWith('s')) model += 's';

  const action = (queryName.endsWith('s') && 'query') || 'read';

  const ormHandler = MockOrm[model][action];

  const resultDefault: {
    data: any;
    loading: boolean;
    error: ApolloError;
  } = {
    data: action === 'query' ? [] : {},
    loading: true,
    error: createApolloError()
  };
  const state = useLocalStore(() => ({
    result: resultDefault,
    refetch: async () => {
      // setState({
      //   data: state.data,
      //   loading: true,
      //   error: createApolloError(),
      // });
      const res = await ormHandler({ ...variableConstants, ...options.variables });
      const nextState = {
        data: res.data,
        loading: false,
        error: createApolloError(res.errors)
      };
      if (Object.keys(diff(state.result.data, nextState.data)).length) state.result = nextState;
    }
  }));

  useEffect(() => {
    state.refetch();
  }, []);

  useEffect(() => {
    if (options.pollInterval) {
      const interval = setInterval(state.refetch, options.pollInterval * 10);
      return () => clearInterval(interval);
    }
  }, []);

  return {
    ...state.result,
    // @ts-ignore: refetch signature mismatch
    refetch: state.refetch,
    networkStatus: 1
  };
}
