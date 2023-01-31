/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames';
import * as React from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';

import { Movie } from '~/interfaces/Movie';
import { constants } from '~/utils/constants/common';

import styles from './browse.module.scss';

interface BannerProps {
  netflixOriginals: Movie[];
}

const Banner: React.FC<BannerProps> = props => {
  const { netflixOriginals } = props;

  const [movie, setMovie] = React.useState<Movie | null>(null);

  React.useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals?.length)]);
  }, [netflixOriginals]);

  return (
    <div className="relative top-0 left-0 right-0">
      <div className="absolute bg-black h-[56.25vw] w-full">
        <img
          src={`${constants.BASE_URL_IMAGE}${movie?.backdrop_path || movie?.poster_path}`}
          alt=""
          className={classNames(styles.Banner__img)}
        />
        <div className={styles.Banner__shadow}></div>
        <div className={styles.Banner__shadow1}></div>
        <div className="absolute top-0 bottom-0 left-0 right-0 text-white">
          <div className="absolute py-16 -translate-y-1/2 top-1/2 md:px-[60px] px-[4%] flex flex-col gap-3">
            <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
              {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl">{movie?.overview}</p>
            <div className="flex items-center gap-3">
              <button className="flex items-center cursor-not-allowed gap-x-2 rounded px-5 py-1.5 text-sm font-semibold transition hover:opacity-75 md:py-2.5 md:px-8 md:text-xl text-black bg-white">
                <FaPlay className="w-4 h-4 text-black md:h-7 md:w-7" />
                Play
              </button>
              <button className="cursor-pointer flex items-center gap-x-2 rounded px-5 py-1.5 text-sm font-semibold transition hover:opacity-75 md:py-2.5 md:px-8 md:text-xl bg-[gray]/70">
                More Info <AiFillInfoCircle className="w-5 h-5 md:h-8 md:w-8" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
