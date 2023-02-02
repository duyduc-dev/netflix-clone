import { collection, DocumentData, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { useAuth } from '~/context/AuthContext';
import { db } from '~/firebase';
import { Movie } from '~/interfaces/Movie';
import { movieDetailModalState } from '~/store/modalState';

export const useMyList = () => {
  const { user } = useAuth();
  const movie = useRecoilValue(movieDetailModalState);
  const [moviesInList, setMoviesInList] = useState<DocumentData[] | Movie[]>([]);
  useEffect(() => {
    if (user) {
      return onSnapshot(collection(db, 'users', user.uid, 'myList'), snapshot => setMoviesInList(snapshot.docs));
    }
  }, [db, movie?.id]);

  return moviesInList;
};
