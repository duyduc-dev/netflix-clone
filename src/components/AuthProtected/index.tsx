import { useIsomorphicLayoutEffect } from 'hooks-react-custom';
import { useRouter } from 'next/router';
import * as React from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '~/context/AuthContext';
import { publicRoutes } from '~/utils/constants/common';

interface AuthProtectedProps {
  children: React.ReactNode;
}

const AuthProtected: React.FC<AuthProtectedProps> = props => {
  const { children } = props;

  const { user } = useAuth();
  const router = useRouter();
  useIsomorphicLayoutEffect(() => {
    if (!Object.values(publicRoutes).includes(router.pathname) && !user) {
      router.push(publicRoutes.index);
      toast.error('You must be login to continue!');
    }
  }, [user, router.pathname]);

  return <>{children}</>;
};

export default AuthProtected;
