import React from 'react';
import BackgroundLayout from '../BackgroundLayout';
import Header from '../Header';
import Profile from '../Profile';
import ContentsLayout from '../ContentsLayout';

type LayoutProps = {
  children: React.ReactNode;
};

function AppLayout({ children }: LayoutProps) {
  return (
    <BackgroundLayout>
      <Header />
      <main style={{ display: 'flex' }}>
        <Profile />
        <ContentsLayout>{children}</ContentsLayout>
      </main>
    </BackgroundLayout>
  );
}

export default AppLayout;
