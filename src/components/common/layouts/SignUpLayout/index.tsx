import * as React from 'react';

import Header from './Header';

interface SignUpLayoutProps {
  children: React.ReactNode;
}

const SignUpLayout: React.FC<SignUpLayoutProps> = props => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default SignUpLayout;
