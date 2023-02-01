import React from 'react';
import Footer from '../comp/Footer';
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
      <Footer />
    </>
  );
}

export default MainLayout;
