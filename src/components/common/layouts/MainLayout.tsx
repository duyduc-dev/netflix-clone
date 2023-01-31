import React from 'react';
import Header from '../comp/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout(props: MainLayoutProps) {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default MainLayout;
