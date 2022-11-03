import React from 'react';
import BackgroundLayout from '../BackgroundLayout';
import Header from '../Header';
import Profile from '../Profile';
import ContentsLayout from '../ContentsLayout';
import NavBar from '../NavBar';

type LayoutProps = {
  children: React.ReactNode;
};

function AppLayout({ children }: LayoutProps) {
  return (
    <BackgroundLayout>
      <div style={{ display: 'flex' }}>
        <div>
          <Header />
          <main style={{ display: 'flex' }}>
            <Profile />
            <ContentsLayout>{children}</ContentsLayout>
          </main>
        </div>
        <NavBar />
      </div>
    </BackgroundLayout>
  );
}

export default AppLayout;
