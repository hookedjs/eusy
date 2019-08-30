/**
 * THis is a mock replacement for { useQuery } from '@apollo/react-hooks';
 */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { OperationVariables, QueryResult } from '@apollo/react-common';
import { QueryHookOptions } from '@apollo/react-hooks';
import { gqlReturnType } from '../../../@types/graphql-tag';
import { MockOrm } from '../MockOrm';
import { createApolloError } from './errorHelpers';
import { ApolloError } from 'apollo-client';

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

  const stateDefault: {
    data: any;
    loading: boolean;
    error: ApolloError;
  } = {
    data: action === 'query' ? [] : {},
    loading: true,
    error: createApolloError()
  };
  const [state, setState] = useState(stateDefault);

  const refetch = async () => {
    // setState({
    //   data: state.data,
    //   loading: true,
    //   error: createApolloError(),
    // });
    const res = await ormHandler({ ...variableConstants, ...options.variables });
    setState({
      data: res.data,
      loading: false,
      error: createApolloError(res.errors)
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (options.pollInterval) {
      const interval = setInterval(refetch, options.pollInterval);
      return () => clearInterval(interval);
    }
  }, []);

  return {
    ...state,
    // @ts-ignore: refetch signature mismatch
    refetch,
    networkStatus: 1
  };
}
