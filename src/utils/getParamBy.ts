import get from 'lodash/get';
import Router from 'next/router';

interface Response {
  query: string;
  page: number;
}

export const getParamBy = (): Response => {
  const { router } = Router;

  return {
    query: get(router, `query.search`) || '',
    page: parseInt(get(router, `query.page`) || '1'),
  };
};
