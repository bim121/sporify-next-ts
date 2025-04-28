import React, {FC} from 'react';
import { AppProps } from 'next/app';
import { wrapper } from '@/store';

const WrapperApp: FC<AppProps> = ({Component, pageProps}) => (
    <div style={{ backgroundColor: 'rgba(48, 48, 48, 1)', minHeight: '100vh' }}>
      <Component {...pageProps} />
    </div>
);

export default wrapper.withRedux(WrapperApp);