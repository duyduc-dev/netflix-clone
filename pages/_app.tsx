import { RecoilRoot } from 'recoil';

import { EmptyLayout } from '~/components/common/layouts';
import { AppPropsWithLayout } from '~/interfaces/common';
import { AuthProvider } from '~/context/AuthContext';

import '../styles/splashPage.scss';
import '../styles/global.scss';
import { Toaster } from 'react-hot-toast';
import AuthProtected from '~/components/AuthProtected';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <RecoilRoot>
      <AuthProvider>
        <AuthProtected>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProtected>
        <Toaster position="top-center" />
      </AuthProvider>
    </RecoilRoot>
  );
}
