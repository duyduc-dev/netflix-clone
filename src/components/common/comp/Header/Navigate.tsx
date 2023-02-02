import * as React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillCaretDown } from 'react-icons/ai';
import { useHover } from 'hooks-react-custom';

import Popup from '~/components/Popup';
import { privateRoutes } from '~/utils/constants/common';
import rawNavigate from '~/utils/constants/rawData/rawNavigate';

interface NavigateProps {}

const Navigate: React.FC<NavigateProps> = props => {
  const {} = props;

  const router = useRouter();
  const [anchorRef, isAnchorHover] = useHover<HTMLAnchorElement>();
  const [popupRef, isPopupHover] = useHover<HTMLDivElement>();

  const render = React.useCallback(
    () => (
      <div className="relative bg-[rgba(0,0,0,.9)] border border-[hsla(0,0%,100%,.15)] text-white text-[13px] leading-[21px]">
        <div className="bg-platinum h-[2px] absolute -top-[2px] left-0 right-0" />
        <div className="border-[7px] border-transparent border-b-platinum h-0 absolute -top-4 left-1/2 -translate-x-1/2" />
        <div>
          <ul>
            {rawNavigate.map((raw, i) => (
              <li
                key={`${raw.title}-${raw.href}-${i}`}
                className={classNames(
                  'text-[13px] h-[50px] flex items-center justify-center font-[500]',
                  router.pathname === raw.href ? 'text-white' : 'text-platinum'
                )}
              >
                <Link href={raw.href}> {raw.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
    [router.pathname]
  );

  return (
    <nav>
      {/* >= 768px */}
      <ul className="items-center hidden lg:flex">
        {rawNavigate.map((raw, i) => (
          <li
            key={`${raw.title}-${raw.href}-${i}`}
            className={classNames('text-[14px] ml-5', router.pathname === raw.href ? 'text-white' : 'text-platinum')}
          >
            <Link href={raw.href}> {raw.title}</Link>
          </li>
        ))}
      </ul>

      {/* < 768px */}
      <Popup
        visible={isAnchorHover || isPopupHover}
        popupRef={popupRef}
        render={render}
        className="block lg:hidden"
        popupClassName="w-[260px] left-1/2 -translate-x-1/2"
        placement={{
          bottom: 20,
        }}
      >
        <Link
          ref={anchorRef}
          href={privateRoutes.browse}
          className="ml-5 text-white md:text-[14px] text-[12px] font-[500] flex items-center gap-1"
        >
          Browse
          <AiFillCaretDown />
        </Link>
      </Popup>
    </nav>
  );
};

export default Navigate;
