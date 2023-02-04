import * as React from 'react';
import { Modal } from '@mui/material';
import ReactPlayer from 'react-player';
import { toast } from 'react-hot-toast';
import { HiThumbUp } from 'react-icons/hi';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAsync, useBoolean } from 'hooks-react-custom';
import { AiFillCheckCircle, AiFillPlayCircle, AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from 'react-icons/bs';

import { Genre } from '~/interfaces/Movie';
import { modalVisibleState, movieDetailModalState } from '~/store/modalState';
import { getMovieTrailerVsGenres } from '~/services/function';
import { addToMyList, deleteMovieInMyList } from '~/services/firebase';
import { useAuth } from '~/context/AuthContext';
import { useMyList } from '~/hooks/useMyList';

const toastStyle = {
  background: 'white',
  color: 'black',
  fontWeight: 'bold',
  fontSize: '1rem',
  padding: '15px',
  borderRadius: '9999px',
  maxWidth: '1000px',
};

const ModalDetailMovie = () => {
  const [isShowModal, setShowModal] = useRecoilState(modalVisibleState);
  const movie = useRecoilValue(movieDetailModalState);
  const [trailer, setTrailer] = React.useState<string | null>(null);
  const [genres, setGenres] = React.useState<Genre[]>([]);
  const [addedToList, setAddedToList] = React.useState<boolean>(false);
  const [muted, actionMuted] = useBoolean();
  const { user } = useAuth();
  const moviesInList = useMyList();

  const { execute, status, value, error } = useAsync(async () => movie && (await getMovieTrailerVsGenres(movie)));

  const handleCloseModal = () => setShowModal(false);

  const handleAddToList = async () => {
    if (addedToList && user && movie) {
      await deleteMovieInMyList(user.uid, movie.id.toString());
      toast(`${movie.title || movie.original_name} has been removed from your list`, {
        duration: 8000,
        style: toastStyle,
      });
    }
    if (!addedToList && user && movie) {
      await addToMyList(user.uid, movie.id.toString(), movie);
      toast(`${movie.title || movie.original_name} has been added to your list`, {
        duration: 8000,
        style: toastStyle,
      });
    }
  };

  React.useEffect(() => {
    switch (status) {
      case 'idle':
        execute();
        break;
      case 'success':
        setTrailer(value?.trailerKey || null);
        setGenres(value?.genres || []);
        break;
      case 'error':
        console.log('🚀 ~ file: ModalDetailMovie.tsx:27 ~ error', error);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  React.useEffect(() => {
    setAddedToList(moviesInList.findIndex(result => result.data().id === movie?.id) !== -1);
  }, [moviesInList]);

  return (
    <Modal
      open={isShowModal}
      onClose={handleCloseModal}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <div className="overflow-hidden bg-white rounded-md">
        <button
          onClick={handleCloseModal}
          className="modalButton absolute right-5 top-5 z-40 h-9 w-9 border-none text-white bg-[#181818] hover:bg-[#181818]"
        >
          <AiOutlineClose className="w-6 h-6" />
        </button>
        <div className="relative aspect-video">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0', zIndex: 10 }}
            playing
            muted={muted}
          />
          <div className="absolute flex items-center justify-between w-full px-10 bottom-10 z-[20]">
            <div className="flex space-x-3">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6] cursor-not-allowed">
                <AiFillPlayCircle className="text-black h-7 w-7" />
                Play
              </button>
              <button className="text-white modalButton" onClick={handleAddToList}>
                {addedToList ? <AiFillCheckCircle className="h-7 w-7" /> : <AiOutlinePlus className="h-7 w-7" />}
              </button>
              <button className="text-white cursor-not-allowed modalButton">
                <HiThumbUp className="h-7 w-7" />
              </button>
            </div>
            <button onClick={actionMuted.toggle} className="text-white">
              {muted ? <BsFillVolumeMuteFill className="w-6 h-6" /> : <BsFillVolumeUpFill className="w-6 h-6" />}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8 text-white">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {Math.round((movie?.vote_average || 0) * 10 * 100) / 100}% Match
              </p>
              <p className="font-light">{movie?.release_date || movie?.first_air_date}</p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col font-light gap-x-10 gap-y-4 md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map(genre => genre.name).join(', ')}
                </div>
                <div>
                  <span className="text-[gray]">Original language: </span>
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetailMovie;
