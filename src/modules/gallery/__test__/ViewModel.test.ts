import ViewModel from '../ViewModel';
import Model from '../Model';
import { NetworkStatus } from '@/networking/rest-client';
import * as endpoints from 'src/networking/endpoints';
import MockResponse from './mock/response.json';

import Router from 'next/router';
jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: { variable: '' },
}));
jest.mock('next/router', () => ({ push: jest.fn() }));
jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('Testing Business Logic', () => {
  const data = {
    status: 200,
    data: MockResponse,
  };
  beforeAll(() => {
    jest
      .spyOn(endpoints, 'getImagesApi')
      .mockImplementation(() => Promise.resolve(data) as any);
  });

  const model = new Model();
  const viewModel = new ViewModel(model);

  it('Testing Initial Load ', async () => {
    await model.getImages({ query: '', page: 1 });
    expect(model.imageStatus).toBe(NetworkStatus.SUCCESS);
    expect(viewModel.images.length).toBe(10);
  });

  it('Search image with debounce', async () => {
    let spy = jest
      .spyOn(endpoints, 'getImagesApi')
      .mockImplementation(() => Promise.resolve(data) as any);
    const spyRouter = jest.spyOn(Router, 'push');

    viewModel.handleSearch({ target: { value: 'landscape' } } as any);
    expect(viewModel.searchValue).toBe('landscape');

    await jest.advanceTimersByTime(1000);
    expect(spy).toBeCalledWith({ page: 1, query: 'landscape' });
    expect(spyRouter).toBeCalledWith({
      query: { page: 1, search: 'landscape' },
    });
  });

  it('Search and enter', async () => {
    let spy = jest
      .spyOn(endpoints, 'getImagesApi')
      .mockImplementation(() => Promise.resolve(data) as any);
    const spyRouter = jest.spyOn(Router, 'push');

    viewModel.handleSearch({ target: { value: 'space' } } as any);
    expect(viewModel.searchValue).toBe('space');

    viewModel.handleEnter({ key: 'Enter' } as any);

    expect(spy).toBeCalledWith({ page: 1, query: 'space' });
    expect(spyRouter).toBeCalledWith({ query: { page: 1, search: 'space' } });
  });

  it('Testing Pagination', async () => {
    //changing page record
    data.data.page = 2;
    let spy = jest
      .spyOn(endpoints, 'getImagesApi')
      .mockImplementation(() => Promise.resolve(data) as any);
    const spyRouter = jest.spyOn(Router, 'push');

    viewModel.handleSearch({ target: { value: 'space' } } as any);
    expect(viewModel.searchValue).toBe('space');

    viewModel.handleEnter({ key: 'Enter' } as any);

    expect(spy).toBeCalledWith({ page: 1, query: 'space' });

    viewModel.handlePagination({} as any, 2);

    expect(spy).toBeCalledWith({ page: 2, query: 'space' });

    expect(viewModel.pagination.count).toBe(800);
  });
});
