import Head from 'next/head';
import * as React from 'react';

import { SignUpLayout } from '~/components/common/layouts';

import device from '~/assets/images/devices.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { publicRoutes } from '~/utils/constants/common';

interface RegistrationProps {}

function Registration(props: RegistrationProps) {
  const {} = props;

  const router = useRouter();

  const handleClickNext = () => {
    router.push(publicRoutes.signUpRegForm);
  };

  return (
    <>
      <Head>
        <title>Netflix</title>
      </Head>
      <main>
        <div className="p-[20px_32px_55px]">
          <div className="max-w-[340px] mx-auto text-center text-dark_charcoal">
            <div className="mt-[100px] mb-5">
              <Image src={device} alt={device.src} className="h-[90px]" />
            </div>
            <p className="text-[13px]">
              STEP <b>1</b> OF <b>3</b>
            </p>
            <h1 className="text-[32px] block w-full font-[500] mb-1">Finish setting up your account</h1>
            <p className="text-[18px] block max-w-[300px] w-full mx-auto mb-3">
              Netflix is personalized for you. Create a password to watch on any device at any time.
            </p>
            <button
              onClick={handleClickNext}
              className="bg-primaryRed text-white w-full hover:bg-[#f6121d] rounded text-[24px] font-[400] min-h-[64px] px-12"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

Registration.Layout = SignUpLayout;

export default Registration;
