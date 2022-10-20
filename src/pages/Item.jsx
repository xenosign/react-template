import React from 'react';
import Header from '../components/Header';
import Album from '../components/Album';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import Login from './Login';

export default function Item() {
  let isLogin = useSelector((state) => state.users.isLogin);

  return (
    <>
      <Header />
      {isLogin ? <Album /> : <Login />}
      <Footer />
    </>
  );
}
