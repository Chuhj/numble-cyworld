import AppLayout from '../src/components/AppLayout';
import type { AppProps } from 'next/app';
import 'styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default MyApp;
