import { atom } from 'recoil';
import { Movie } from '~/interfaces/Movie';

export const modalVisibleState = atom<boolean>({
  key: 'modalVisibleState',
  default: false,
});

export const movieDetailModalState = atom<Movie | null>({
  key: 'movieDetailModalState',
  default: null,
});
