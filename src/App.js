import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Item from './pages/Item';
import Join from './pages/Join';
import Login from './pages/Login';
import Logout from './pages/Logout';
import NotLogin from './pages/NotLogin';

function App() {
  const isLogin = useSelector((state) => state.users.isLogin);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/item" element={isLogin ? <Item /> : <NotLogin />} />
      <Route path="/join" element={<Join />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/notLogin" element={<NotLogin />} />
    </Routes>
  );
}

export default App;
