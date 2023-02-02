import { privateRoutes, publicRoutes } from '~/utils/constants/common';

interface INavigate {
  title: string;
  href: string;
}

const rawNavigate: Array<INavigate> = [
  { title: 'Home', href: privateRoutes.browse },
  { title: 'My List', href: privateRoutes.myList },
];

export default rawNavigate;
