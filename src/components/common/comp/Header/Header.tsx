import classNames from 'classnames';
import { useScrollPosition } from 'hooks-react-custom';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { IconNetflix } from '~/components/icon';
import { privateRoutes } from '~/utils/constants/common';
import Search from './Search';
import Account from './Account';
import Navigate from './Navigate';

import styles from './header.module.scss';

function Header() {
  const position = useScrollPosition();
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-[999]">
      <div
        className={classNames(
          'md:px-[60px] px-[4%] md:h-[68px] h-[41px] transition-all duration-500',
          styles.headerBg,
          (position > 20 || router.pathname === privateRoutes.search) && 'bg-[rgb(20,20,20)]'
        )}
      >
        <div className="w-full h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center">
              <Link href={privateRoutes.browse} className="text-primaryRed mr-[25px]">
                <IconNetflix className="h-[20px] md:h-[30px] transition-all duration-300" />
              </Link>
              <Navigate />
            </div>
            <div className="flex items-center">
              <Search />
              <Account />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
