import { action, makeObservable, observable, runInAction } from 'mobx';
import {
  getImagesApi,
  ImagesApiProps,
  isErrorResponse,
} from 'src/networking/endpoints';
import { PexelsData } from '@/networking/types';
import { NetworkStatus } from '@/networking/rest-client';

class GalleryModel {
  imageData?: PexelsData = undefined;
  imageStatus = NetworkStatus.INITIAL;

  constructor() {
    makeObservable(this, {
      imageData: observable,
      imageStatus: observable,
      getImages: action,
    });
  }

  getImages = async ({ query, page }: ImagesApiProps) => {
    this.imageStatus = NetworkStatus.LOADING;
    const response = await getImagesApi<PexelsData>({ query, page });

    if (!isErrorResponse(response)) {
      runInAction(() => {
        this.imageStatus = NetworkStatus.SUCCESS;
        this.imageData = response?.data;
        return true;
      });
    } else {
      this.imageStatus = NetworkStatus.ERROR;
    }
  };
}

export default GalleryModel;
