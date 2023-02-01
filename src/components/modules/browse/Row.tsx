import classNames from 'classnames';
import * as React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import MovieThumbnail from '~/components/MovieThumbnail';

import { Movie } from '~/interfaces/Movie';

export interface RowProps {
  movies: Movie[];
  title: string;
}

const Row: React.FC<RowProps> = props => {
  const { movies, title } = props;

  const rowRef = React.useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = React.useState(false);

  const handleClick = (direction: string): void => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-0.5 md:space-y-2 relative">
      <h2 className="w-56 text-[1.4vw] leading-[1.25vw] font-semibold transition-colors duration-200 cursor-pointer text-platinum hover:text-white z-[100]">
        {title}
      </h2>

      <div className="relative group md:-ml-2">
        <FiChevronLeft
          className={classNames(
            `absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 text-white`,
            !isMoved && 'hidden'
          )}
          onClick={() => handleClick('left')}
        />

        <div
          ref={rowRef}
          className="flex items-center scrollbar-hide space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2"
        >
          {movies?.map(movie => (
            <MovieThumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <FiChevronRight
          className="absolute top-0 bottom-0 z-40 m-auto text-white transition opacity-0 cursor-pointer right-2 h-9 w-9 hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  );
};

export default Row;
