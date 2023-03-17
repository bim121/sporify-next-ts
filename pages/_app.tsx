import React, {FC} from 'react';
import { AppProps } from 'next/app';
import { wrapper } from '@/store';

const WrapperApp: FC<AppProps> = ({Component, pageProps}) => (
    <Component {...pageProps} />
);

export default wrapper.withRedux(WrapperApp);