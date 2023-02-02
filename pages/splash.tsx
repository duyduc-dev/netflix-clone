import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

import { privateRoutes } from '~/utils/constants/common';
import { useAuth } from '~/context/AuthContext';

const IntroNetflix = dynamic?.(() => import('~/components/IntroNetflix'), { ssr: false });

interface splashProps {}

function Splash(props: splashProps) {
  const {} = props;
  const router = useRouter();

  useEffect(() => {
    const id = setTimeout(() => {
      router.push(privateRoutes.browse);
    }, 4500);

    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Netflix Splash</title>
      </Head>
      <IntroNetflix />
    </>
  );
}

export default Splash;
