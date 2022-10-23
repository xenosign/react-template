import React from 'react';
import Header from '../components/Header';
import Album from '../components/Album';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import Login from './Login';

export default function Item() {
  // 로그인 여부를 redux 로 부터 받아오고
  // 해당 페이지를 보여 줄지 말지 여부를 해당 값읕 통해서 처리 하기
  let isLogin = useSelector((state) => state.users.isLogin);

  return (
    <>
      <Header />
      {isLogin ? <Album /> : <Login />}
      <Footer />
    </>
  );
}
