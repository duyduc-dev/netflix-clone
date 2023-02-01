import classNames from 'classnames';
import { useHover } from 'hooks-react-custom';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';

import accountImg from '~/assets/images/account.png';
import { IconUser } from '~/components/icon';
import Popup from '~/components/Popup';

interface AccountProps {}

const Account = (props: AccountProps) => {
  const {} = props;

  const [buttonRef, isHover] = useHover<HTMLButtonElement>();
  const [popupDivRef, isHoverPopup] = useHover<HTMLDivElement>();
  const router = useRouter();

  const handleClickSignOut = () => {
    router.push('/');
  };

  const render = React.useCallback(
    () => (
      <div className="w-[220px] pt-2 bg-[rgba(0,0,0,.9)] border border-[hsla(0,0%,100%,.15)] text-white text-[13px] leading-[21px]">
        <div className="flex items-center gap-2 p-3 cursor-pointer hover:underline">
          <div>
            <IconUser />
          </div>
          <div className="leading-[16px] text-[13px]">Account</div>
        </div>
        <div
          onClick={handleClickSignOut}
          className="py-[10px] border-0 border-t border-[hsla(0,0%,100%,.25)] cursor-pointer text-center hover:underline"
        >
          <span>Sign out of Netflix</span>
        </div>
      </div>
    ),
    []
  );

  return (
    <Popup
      visible={isHover || isHoverPopup}
      render={render}
      popupRef={popupDivRef}
      placement={{
        bottom: 20,
      }}
    >
      <button ref={buttonRef} className="flex items-center">
        <div>
          <Image src={accountImg} alt="" className="rounded-[4px]" priority />
        </div>
        <div
          className={classNames(
            'hidden md:block ml-[10px] border-[#fff_transparent_transparent] border-t-[5px] border-x-[5px] h-0 w-0 transition-all duration-300',
            (isHover || isHoverPopup) && 'rotate-180'
          )}
        ></div>
      </button>
    </Popup>
  );
};

export default Account;
