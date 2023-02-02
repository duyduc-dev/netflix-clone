import {
  useArray,
  useDebounce,
  useIsInViewport,
  useIsomorphicLayoutEffect,
  useScrollPosition,
} from 'hooks-react-custom';
import Head from 'next/head';
import * as React from 'react';
import { useRecoilValue } from 'recoil';

import { MainLayout } from '~/components/common/layouts';
import ModalDetailMovie from '~/components/modules/browse/ModalDetailMovie';
import { NotFoundMovie } from '~/components/modules/search';
import MovieThumbnail from '~/components/MovieThumbnail';
import { useAuth } from '~/context/AuthContext';
import { Movie } from '~/interfaces/Movie';
import { searchMovie } from '~/services/function';
import { modalVisibleState } from '~/store/modalState';
import { searchTextState } from '~/store/searchState';

interface SearchPageProps {}

const SearchPage = (props: SearchPageProps) => {
  const {} = props;

  const searchText = useRecoilValue(searchTextState);
  const isShowModal = useRecoilValue(modalVisibleState);
  const { debouncedValue } = useDebounce(searchText, 1000);
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const divRef = React.useRef<any>(null);
  const divIsInViewPort = useIsInViewport(divRef);
  const [page, setPage] = React.useState(1);

  useIsomorphicLayoutEffect(() => {
    searchMovie(debouncedValue, 1).then(res => {
      setMovies(res);
      setPage(1);
    });
  }, [debouncedValue]);

  React.useEffect(() => {
    searchMovie(debouncedValue, page).then(res => {
      res && setMovies(p => [...p, ...res]);
    });
  }, [page]);

  React.useEffect(() => {
    divIsInViewPort && setPage(n => ++n);
  }, [divIsInViewPort]);

  return (
    <>
      <Head>
        <title>Search - Netflix</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="md:px-[60px] px-[4%] min-h-[calc(100vh_-_346px)] bg-chinese_black pt-[100px]">
        <div className="flex flex-wrap justify-start gap-x-5 gap-y-10">
          {movies && movies?.length > 0 ? (
            movies?.map((movie, i) => <MovieThumbnail key={`${movie.id}-${i}`} movie={movie} />)
          ) : (
            <NotFoundMovie query={debouncedValue} />
          )}
          <div ref={divRef}></div>
        </div>
      </main>
      {isShowModal && <ModalDetailMovie />}
    </>
  );
};

SearchPage.Layout = MainLayout;

export default SearchPage;
