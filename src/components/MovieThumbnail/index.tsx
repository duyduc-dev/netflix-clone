import classNames from 'classnames';
import { useHover } from 'hooks-react-custom';
import Image from 'next/image';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { Movie } from '~/interfaces/Movie';

import { modalVisibleState, movieDetailModalState } from '~/store/modalState';

interface MovieThumbnailProps {
  movie: Movie;
}

const MovieThumbnail: React.FC<MovieThumbnailProps> = props => {
  const { movie } = props;
  const [, setShowModal] = useRecoilState(modalVisibleState);
  const [, setCurrentMovie] = useRecoilState(movieDetailModalState);

  const handleClickThumbnail = () => {
    setShowModal(true);
    setCurrentMovie(movie);
  };

  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition-transform duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={handleClickThumbnail}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
        layout="fill"
        className="object-cover rounded-sm md:rounded"
        alt={movie.name}
      />
    </div>
  );
};

export default MovieThumbnail;
