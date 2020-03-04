import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import Launch from './launch';
import Launches from './launches';
import Cart from './cart';
import Profile from './profile';
import { Footer, PageContainer } from '../components';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Pages() {
  return (
    <>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Launches path="/" />
          <Launch path="launch/:launchId" />
          <Cart path="cart" />
          <Profile path="profile" />
        </Router>
      </PageContainer>
      <Footer />
    </>
  );
}
