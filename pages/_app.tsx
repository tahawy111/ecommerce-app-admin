import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import 'react-alert-confirm/lib/style.css';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { useEffect } from 'react';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (<Provider store={store}>
    <SessionProvider session={session}>
      <Toaster />
      <Component {...pageProps} />
    </SessionProvider>
  </Provider>);

}
