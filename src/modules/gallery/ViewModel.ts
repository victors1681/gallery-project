import { action, computed, makeObservable, observable } from 'mobx';
import GalleryModel from './Model';
import Router from 'next/router';
import { NetworkStatus } from '@/networking/rest-client';

class ViewModel {
  private maxImage = 10;
  private model: GalleryModel;
  private debounce?: NodeJS.Timeout = undefined;
  searchValue = '';
  private currentPage = 1;

  constructor(model: GalleryModel) {
    this.model = model;
    makeObservable<ViewModel, 'currentPage'>(this, {
      images: computed,
      handleSearch: action,
      searchValue: observable,
      currentPage: observable,
      setQueryParams: action,
      pagination: computed,
      updatePage: action,
    });
  }

  get isLoading() {
    return this.model.imageStatus === NetworkStatus.LOADING;
  }

  get images() {
    return this.model.imageData?.photos || [];
  }

  setQueryParams = (query: string, page: number) => {
    this.searchValue = query;
    this.currentPage = page;
  };

  /**
   * Allow the searchbar to perform the request without wait for the debounce
   * @param event
   */
  handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    this.debounce && clearTimeout(this.debounce);

    if (event.key === 'Enter') {
      this.updateRoute(1, this.searchValue);
      this.model.getImages({ query: this.searchValue, page: 1 });
    }
  };

  /**
   *
   * @param event
   * @returns
   */
  handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.searchValue = value;

    //auto search only if there's more than three characters
    if (value.length < 3) {
      return;
    }

    this.debounce && clearTimeout(this.debounce);

    this.debounce = setTimeout(() => {
      this.updateRoute(1, value);
      this.model.getImages({ query: value, page: 1 });
    }, 1000);
  };

  updateRoute = (page: number, query?: string) => {
    Router.push({ query: { search: query ? query : this.searchValue, page } });
  };

  handlePagination = (event: React.ChangeEvent<unknown>, page: number) => {
    this.model.getImages({ query: this.searchValue, page });
    this.updateRoute(page);
  };

  updatePage = (page: number | undefined) => {
    this.currentPage = page || 1;
  };

  /**
   * Update the pagination controller
   */
  get pagination() {
    const { total_results, page } = this.model.imageData || {
      total_results: 0,
    };

    const pages = Math.floor(total_results / this.maxImage);

    this.updatePage(page);
    return {
      defaultPage: this.currentPage,
      page: this.currentPage,
      count: pages,
      onChange: this.handlePagination,
    };
  }
}

export default ViewModel;
