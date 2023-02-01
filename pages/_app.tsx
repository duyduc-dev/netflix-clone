import { RecoilRoot } from 'recoil';

import { EmptyLayout } from '~/components/common/layouts';
import { AppPropsWithLayout } from '~/interfaces/common';

import '../styles/splashPage.scss';
import '../styles/global.scss';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}
