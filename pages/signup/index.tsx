import * as React from 'react';
import { SignUpLayout } from '~/components/common/layouts';

import checkmark from '~/assets/images/checkmark.png';
import Image from 'next/image';
import { IconCheckmark } from '~/components/icon';
import { useRouter } from 'next/router';
import { privateRoutes } from '~/utils/constants/common';

interface SignUpPageProps {}

function SignUpPage(props: SignUpPageProps) {
  const {} = props;
  const router = useRouter();
  const handleClickNext = () => {
    router.push(privateRoutes.splash);
  };

  return (
    <main>
      <div className="p-[20px_32px_55px]">
        <div className="max-w-[340px] mx-auto text-center text-dark_charcoal">
          <div className="mt-[100px] mb-5">
            <Image src={checkmark} alt={checkmark.src} width={50} className="mx-auto" />
          </div>
          <p className="text-[13px]">
            STEP <b>2</b> OF <b>3</b>
          </p>
          <h1 className="text-[32px] block w-full font-[500] mb-1">Choose your plan.</h1>
          <p className="text-[18px] mx-auto mb-3 flex text-left">
            <IconCheckmark className="text-[#e50914] min-w-[26px]" width={26} />
            <span className="ml-[10px]">No commitments, cancel anytime.</span>
          </p>
          <p className="text-[18px] mx-auto mb-3 flex text-left">
            <IconCheckmark className="text-[#e50914] min-w-[26px]" width={26} />
            <span className="ml-[10px]">Everything on Netflix for one low price.</span>
          </p>
          <p className="text-[18px] mx-auto mb-3 flex text-left">
            <IconCheckmark className="text-[#e50914] min-w-[26px]" width={26} />
            <span className="ml-[10px]">No ads and no extra fees. Ever.</span>
          </p>
          <button
            onClick={handleClickNext}
            className="mt-5 bg-primaryRed text-white w-full hover:bg-[#f6121d] rounded text-[24px] font-[400] min-h-[64px] px-12"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}

SignUpPage.Layout = SignUpLayout;

export default SignUpPage;
