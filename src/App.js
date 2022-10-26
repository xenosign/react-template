import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import KakaoRedirectHandler from './components/KakaoRedirectHandler';
import Index from './pages/Index';
import Item from './pages/Item';
import Join from './pages/Join';
import Login from './pages/Login';
import Logout from './pages/Logout';
import NotLogin from './pages/NotLogin';
import File from './pages/File';
import List from './pages/List';

function App() {
  const isLogin = useSelector((state) => state.users.isLogin);

  return (
    // 각 주소에 따른 라우팅 처리
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/item" element={isLogin ? <Item /> : <NotLogin />} />
      <Route path="/join" element={<Join />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/file" element={<File />} />
      <Route path="/list/" element={<List />} />
      <Route path="/list/:where" element={<List />} />
      <Route path="/notLogin" element={<NotLogin />} />
      <Route path="/oauth/callback/kakao" element={<KakaoRedirectHandler />} />
    </Routes>
  );
}

export default App;
