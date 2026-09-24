import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

type PaginatedVariables = { first: number; offset: number };

type UsePaginatedQueryPropsType<TData> = {
  pageSize: number;
  selectTotalCount: (data: TData) => number;
};

const parsePage = (value: string | null): number => {
  const page = Number(value);

  return Number.isInteger(page) && page > 0 ? page : 1;
};

const usePaginatedQuery = <TData, TVariables extends PaginatedVariables>(
  document: TypedDocumentNode<TData, TVariables>,
  { pageSize, selectTotalCount }: UsePaginatedQueryPropsType<TData>,
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const requestedPage = parsePage(searchParams.get('page'));
  const offset = (requestedPage - 1) * pageSize;

  const { loading, error, data } = useQuery(document, {
    variables: { first: pageSize, offset } as TVariables,
  });

  const totalCount = data ? selectTotalCount(data as TData) : null;
  const pageCount =
    totalCount !== null ? Math.max(1, Math.ceil(totalCount / pageSize)) : requestedPage;
  const currentPage = Math.min(requestedPage, pageCount);

  useEffect(() => {
    if (totalCount !== null && currentPage !== requestedPage) {
      setSearchParams({ page: String(currentPage) });
    }
  }, [totalCount, currentPage, requestedPage, setSearchParams]);

  const onPageChange = (page: number) => {
    setSearchParams(page === 1 ? {} : { page: String(page) });
  };

  return {
    loading,
    error,
    currentPage,
    pageCount,
    onPageChange,
    data: data as TData | undefined,
  };
};

export default usePaginatedQuery;
