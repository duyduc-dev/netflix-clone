import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

import { db } from '~/firebase';
import { Movie } from '~/interfaces/Movie';

export const createEmailUser = async (uid: string, email: string) => {
  try {
    await setDoc(doc(db, 'users', uid), {
      uid,
      email,
    });
  } catch (error) {
    console.log('🚀 ~ file: firebase.ts:5 ~ createEmailUser ~ error', error);
  }
};

export const isExistEmailUser = async (email: string) => {
  try {
    const collect = collection(db, 'users');
    const q = query(collect, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data();
  } catch (error) {
    console.log('🚀 ~ file: firebase.ts:20 ~ isExistEmailUser ~ error', error);
  }
};

export const addToMyList = async (uid: string, movieID: string, movie: Movie) => {
  try {
    const ref = doc(db, 'users', uid, 'myList', movieID.toString());
    await setDoc(ref, {
      ...movie,
    });
  } catch (error) {
    console.log('🚀 ~ file: firebase.ts:32 ~ addToMyList ~ error', error);
  }
};

export const deleteMovieInMyList = async (uid: string, movieID: string) => {
  try {
    await deleteDoc(doc(db, 'users', uid, 'myList', movieID.toString()));
  } catch (error) {
    console.log('🚀 ~ file: firebase.ts:42 ~ deleteMovieInMyList ~ error', error);
  }
};
