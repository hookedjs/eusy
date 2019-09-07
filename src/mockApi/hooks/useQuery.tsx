/**
 * THis is a mock replacement for { useQuery } from '@apollo/react-hooks';
 */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ApolloError } from 'apollo-client';
import { OperationVariables, QueryResult } from '@apollo/react-common';
import { QueryHookOptions } from '@apollo/react-hooks';
import { diff } from 'deep-object-diff';
import { gqlReturnType } from '../../@types/graphql-tag';
import { MockOrm } from '../MockOrm';
import { createApolloError } from './errorHelpers';

export function useQuery<TData = any, TVariables = OperationVariables>(
  query: gqlReturnType,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> {
  const queryName = query.definitions[0].selectionSet.selections[0].name.value;
  const isMounted = React.useRef(true); // used to avoid change state on unmounted

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
  const [result, setResult] = useState(resultDefault);

  const refetch = async () => {
    const res = await ormHandler({ ...variableConstants, ...options.variables });
    const nextState = {
      data: res.data,
      loading: false,
      error: createApolloError(res.errors)
    };
    if (
      isMounted.current &&
      (result.loading || (nextState.data && Object.keys(diff(result.data, nextState.data)).length))
    )
      setResult(nextState);
  };

  useEffect(() => {
    refetch();
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    if (options.pollInterval) {
      const interval = setInterval(refetch, options.pollInterval * 10);
      return () => {
        isMounted.current = false;
        clearInterval(interval);
      };
    }
  }, []);

  return {
    ...result,
    // @ts-ignore: refetch signature mismatch
    refetch,
    networkStatus: 1
  };
}
