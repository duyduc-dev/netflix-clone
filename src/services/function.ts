import { Element, Movie } from '~/interfaces/Movie';
import { constants } from '~/utils/constants/common';
import request from '~/utils/request';
import { api } from './api';

export const getNetflixOriginals = async () => {
  try {
    const result = await request.GET(api.netflixOriginals);
    return result?.results;
  } catch (error) {
    console.log('🚀 ~ file: function.ts:5 ~ getNetflixOriginals ~ error', error);
  }
};

export const getMovieTrailerVsGenres = async (movie: Movie) => {
  let result = {
    trailerKey: null,
    genres: null,
  };
  try {
    const data = await request.GET(
      `${constants.BASE_URL}/${movie?.media_type === 'tv' ? 'tv' : 'movie'}/${movie?.id}?api_key=${
        constants.API_KEY
      }&language=en-US&append_to_response=videos`
    );
    if (data?.videos) {
      const index = data.videos.results.findIndex((element: Element) => element.type === 'Trailer');
      result.trailerKey = data.videos?.results[index]?.key;
    }
    if (data?.genres) {
      result.genres = data.genres;
    }
  } catch (error) {
    console.log('🚀 ~ file: function.ts:19 ~ getMovieTrailerVsGenres ~ error', error);
  }
  return result;
};

export const getTrending = async () => {
  try {
    const result = await request.GET(api.trending);
    return result?.results;
  } catch (error) {
    console.log('🚀 ~ file: function.ts:45 ~ getTrending ~ error', error);
  }
};

export const getTopRated = async () => {
  try {
    const result = await request.GET(api.topRated);
    return result?.results;
  } catch (error) {
    console.log('🚀 ~ file: function.ts:58 ~ getTopRated ~ error', error);
  }
};

export const getActionMovies = async () => {
  try {
    const result = await request.GET(api.actionMovies);
    return result?.results;
  } catch (error) {
    console.log('🚀 ~ file: function.ts:70 ~ getActionMovies ~ error', error);
  }
};

export const getComedyMovies = async () => {
  try {
    const result = await request.GET(api.comedyMovies);
    return result?.results;
  } catch (error) {
    console.log('🚀 ~ file: function.ts:72 ~ getComedyMovies ~ error', error);
  }
};

export const getHorrorMovies = async () => {
  try {
    const result = await request.GET(api.horrorMovies);
    return result?.results;
  } catch (error) {
    console.log('🚀 ~ file: function.ts:81 ~ getHorrorMovies ~ error', error);
  }
};

export const getRomanceMovies = async () => {
  try {
    const result = await request.GET(api.romanceMovies);
    return result?.results;
  } catch (error) {
    console.log('🚀 ~ file: function.ts:90 ~ getRomanceMovies ~ error', error);
  }
};

export const getDocumentaries = async () => {
  try {
    const result = await request.GET(api.documentaries);
    return result?.results;
  } catch (error) {
    console.log('🚀 ~ file: function.ts:99 ~ getDocumentaries ~ error', error);
  }
};

export const searchMovie = async (query: string, page: number = 1) => {
  try {
    const result = await request.GET(
      `${constants.BASE_URL}/search/movie?api_key=${constants.API_KEY}&language=en-US&query=${query}&page=${page}`
    );
    return result?.results;
  } catch (error) {
    console.log('🚀 ~ file: function.ts:108 ~ searchMovie ~ error', error);
  }
};
