import { RecoilRoot } from 'recoil';
import { Toaster } from 'react-hot-toast';

import { EmptyLayout } from '~/components/common/layouts';
import { AppPropsWithLayout } from '~/interfaces/common';
import { AuthProvider } from '~/context/AuthContext';
import AuthProtected from '~/components/AuthProtected';

import '../styles/splashPage.scss';
import '../styles/global.scss';

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
