import Image from 'next/image';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { Movie } from '~/interfaces/Movie';

import imgMoviePlaceholder from '~/assets/images/imgMoviePlaceholder.jpg';

import { modalVisibleState, movieDetailModalState } from '~/store/modalState';

interface MovieThumbnailProps {
  movie: Movie;
}

const MovieThumbnail: React.FC<MovieThumbnailProps> = props => {
  const { movie } = props;
  const [, setShowModal] = useRecoilState(modalVisibleState);
  const [, setCurrentMovie] = useRecoilState(movieDetailModalState);
  const [sourceImg, setSourceImg] = React.useState<any>(
    `https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`
  );

  const handleClickThumbnail = () => {
    setShowModal(true);
    setCurrentMovie(movie);
  };

  const handleImageError = () => setSourceImg(imgMoviePlaceholder);

  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition-transform duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={handleClickThumbnail}
    >
      <Image
        src={sourceImg}
        layout="fill"
        className="object-cover rounded-sm md:rounded"
        alt={movie.name || movie.title}
        onError={handleImageError}
      />
      <div className="absolute top-0 bottom-0 left-0 right-0 transition-all duration-200 hover:bg-[rgba(0,0,0,.7)] opacity-0 hover:opacity-100">
        <div>
          <p className="px-3 pt-5 text-platinum text-[18px] font-[500] multiline-ellipsis">
            {movie.name || movie.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieThumbnail;
