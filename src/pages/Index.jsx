import Header from '../components/Header';
import styled from 'styled-components';
import Footer from '../components/Footer';

const Main = styled.main`
  text-align: center;
`;

const MyImg = styled.img`
  width: 500px;
  margin-top: 2em;
`;

export default function Index() {
  return (
    <Main>
      <Header />
      <MyImg src="https://i1.sndcdn.com/avatars-uubmOX0QQigzrI2m-5wHwlA-t240x240.jpg" />
      <Footer />
    </Main>
  );
}
