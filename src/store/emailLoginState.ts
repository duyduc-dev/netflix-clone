import { atom } from 'recoil';

export const emailLoginState = atom<string>({
  key: 'emailLoginState',
  default: '',
});
