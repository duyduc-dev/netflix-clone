import Head from 'next/head';
import * as React from 'react';
import { MainLayout } from '~/components/common/layouts';

interface SearchPageProps {}

const SearchPage = (props: SearchPageProps) => {
  const {} = props;

  return (
    <>
      <Head>
        <title>Search - Netflix</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="h-[10000px]">searchPage</div>
    </>
  );
};

SearchPage.Layout = MainLayout;

export default SearchPage;
