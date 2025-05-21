import React, {FC} from 'react';
import { AppProps } from 'next/app';
import { wrapper } from '@/store';
import '../styles/global.css';
import Providers from '@/component/Providers';

const WrapperApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Providers>
    <Component {...pageProps} />
  </Providers>
);
export default wrapper.withRedux(WrapperApp);