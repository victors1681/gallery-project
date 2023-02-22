import { AxiosError } from 'axios';

import client from 'src/networking/rest-client';
import { PexelsResponse } from 'src/networking/types.d';
// Guard Type
export function isErrorResponse(data: any): data is AxiosError<any> {
  return data?.status !== 200;
}

export interface ImagesApiProps {
  query: string;
  page: number;
}

export const getImagesApi = async <T>(
  props: ImagesApiProps
): Promise<PexelsResponse<T> | undefined | AxiosError> => {
  try {
    const response = await client.get<any, PexelsResponse<T>>(
      `/api/images/${props.query}/${props.page}`
    );
    return response;
  } catch (err) {
    console.error(err);
    return err as AxiosError;
  }
};
