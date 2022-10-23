import { Avatar, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { orange } from '@mui/material/colors';

export default function NotLogin() {
  const navigate = useNavigate();

  function moveLogin() {
    navigate('/login');
  }

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '60vh',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Avatar sx={{ m: 3, bgcolor: 'primary.main' }}>#</Avatar>
          <Typography component="h1" variant="h5">
            로그인이 필요한 서비스 입니다!
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <LoadingButton
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, height: '3.5em' }}
              onClick={() => moveLogin()}
            >
              로그인 페이지로 이동
            </LoadingButton>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
