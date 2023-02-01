import { constants } from '~/utils/constants/common';

export const api = {
  trending: `${constants.BASE_URL}/trending/all/week?api_key=${constants.API_KEY}&language=en-US`,
  netflixOriginals: `${constants.BASE_URL}/discover/movie?api_key=${constants.API_KEY}&with_networks=213`,
  topRated: `${constants.BASE_URL}/movie/top_rated?api_key=${constants.API_KEY}&language=en-US`,
  actionMovies: `${constants.BASE_URL}/discover/movie?api_key=${constants.API_KEY}&language=en-US&with_genres=28`,
  comedyMovies: `${constants.BASE_URL}/discover/movie?api_key=${constants.API_KEY}&language=en-US&with_genres=35`,
  horrorMovies: `${constants.BASE_URL}/discover/movie?api_key=${constants.API_KEY}&language=en-US&with_genres=27`,
  romanceMovies: `${constants.BASE_URL}/discover/movie?api_key=${constants.API_KEY}&language=en-US&with_genres=10749`,
  documentaries: `${constants.BASE_URL}/discover/movie?api_key=${constants.API_KEY}&language=en-US&with_genres=99`,
};
