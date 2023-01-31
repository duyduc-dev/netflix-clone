import { routesPath } from '~/utils/constants/common';

interface INavigate {
  title: string;
  href: string;
}

const rawNavigate: Array<INavigate> = [
  { title: 'Home', href: routesPath.browse },
  { title: 'TV Shows', href: routesPath.TVshows },
  { title: 'Movies', href: routesPath.movies },
  { title: 'New & Popular', href: routesPath.latest },
];

export default rawNavigate;
