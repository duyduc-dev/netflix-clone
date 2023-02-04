import * as React from 'react';
import { useRecoilValue } from 'recoil';

import { MainLayout } from '~/components/common/layouts';
import ModalDetailMovie from '~/components/modules/browse/ModalDetailMovie';
import MovieThumbnail from '~/components/MovieThumbnail';
import { useMyList } from '~/hooks/useMyList';
import { modalVisibleState } from '~/store/modalState';

function MyListPage() {
  const isShowModal = useRecoilValue(modalVisibleState);
  const movieInList = useMyList();

  return (
    <>
      <main className="md:px-[60px] px-[4%] min-h-[calc(100vh_-_346px)] bg-chinese_black pt-[100px]">
        <div className="flex flex-wrap justify-start gap-x-3 gap-y-10">
          {movieInList &&
            movieInList?.length > 0 &&
            movieInList?.map((movie, i) => <MovieThumbnail key={`${movie.id}-${i}`} movie={movie.data()} />)}
        </div>
      </main>
      {isShowModal && <ModalDetailMovie />}
    </>
  );
}

MyListPage.Layout = MainLayout;

export default MyListPage;
