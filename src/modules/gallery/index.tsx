import { observer } from 'mobx-react-lite';
import React from 'react';

import Model from './Model';
import View from './Gallery';
import ViewModel from './ViewModel';
import { getParamBy } from 'src/utils/getParamBy';
import { useRouter } from 'next/router';
const TransactionDetail = (): JSX.Element => {
  const router = useRouter();

  const model = React.useMemo(() => new Model(), []);
  const viewModel = React.useMemo(() => new ViewModel(model), [model]);

  React.useEffect(() => {
    const { query, page } = getParamBy();
    model.getImages({ query, page });
    viewModel.setQueryParams(query, page);
  }, [model, viewModel, router.isReady]);

  return <View viewModel={viewModel} />;
};

export default observer(TransactionDetail);
