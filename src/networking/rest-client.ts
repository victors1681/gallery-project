import axios from 'axios';

export enum NetworkStatus {
  INITIAL = 0,
  LOADING = 1,
  SUCCESS = 2,
  ERROR = 3,
}

const restClient = axios.create();

export const configureRestClient = (): void => {
  restClient.defaults.baseURL = '/';

  restClient.interceptors.request.use((config) => {
    const newConfig = { ...config };

    return newConfig;
  });
};

export const setBaseURLofRestClient = (baseURL?: string): void => {
  restClient.defaults.baseURL = baseURL;
};

export default restClient;
