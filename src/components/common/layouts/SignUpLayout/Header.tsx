import Link from 'next/link';
import * as React from 'react';
import { IconNetflix } from '~/components/icon';
import { publicRoutes } from '~/utils/constants/common';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = props => {
  const {} = props;

  return (
    <header>
      <div className="h-[90px] border-b border-platinum_e6 flex items-center px-[3%] justify-between">
        <Link href={publicRoutes.index} className="text-primaryRed">
          <IconNetflix height={45} />
        </Link>
        <div>
          <Link href={publicRoutes.login} className="text-dark_charcoal text-[19px] font-[500] ">
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
