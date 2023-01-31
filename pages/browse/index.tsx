import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';

import { MainLayout } from '~/components/common/layouts';
import { Banner } from '~/components/modules/browse';
import { Movie } from '~/interfaces/Movie';
import { getNetflixOriginals } from '~/services/function';

interface BrowseProps {
  netflixOriginals: Movie[];
}

function Browse(props: BrowseProps) {
  const { netflixOriginals } = props;

  return (
    <>
      <Head>
        <title>Home - Netflix</title>
      </Head>
      <main>
        <Banner netflixOriginals={netflixOriginals} />
      </main>
    </>
  );
}

Browse.Layout = MainLayout;

export const getServerSideProps: GetServerSideProps<BrowseProps> = async () => {
  const [netflixOriginals] = await Promise.all([getNetflixOriginals()]);
  return {
    props: {
      netflixOriginals: netflixOriginals || [],
    },
  };
};

export default Browse;
