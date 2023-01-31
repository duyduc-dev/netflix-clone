import { constants } from '~/utils/constants/common';
import request from '~/utils/request';

export const getNetflixOriginals = async () => {
  try {
    const result = await request.GET(
      `${constants.BASE_URL}/discover/movie?api_key=${constants.API_KEY}&with_networks=213`
    );
    return result?.results;
  } catch (error) {
    console.log('🚀 ~ file: function.ts:5 ~ getNetflixOriginals ~ error', error);
  }
};
