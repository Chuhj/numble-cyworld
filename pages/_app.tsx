import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import client from '../src/apollo-client';
import AppLayout from '../src/components/AppLayout';
import 'styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ApolloProvider>
  );
}

export default MyApp;
