import { Avatar, Grid, TextField, Typography, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Container } from '@mui/system';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { orange } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { login } from '../store/modules/users';

export default function Login() {
  const [loginCondition, setLoginCondition] = useState({
    condition: false,
    msg: '회원 정보를 정확하게 입력하세요!',
  });

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoginMove = () => {
    setOpen(false);
    dispatch(login());
    navigate('/');
  };

  let userEmailInput = '';
  let userPasswordInput = '';

  async function loginUser() {
    const loginInfo = {
      email: userEmailInput,
      password: userPasswordInput,
    };

    if (userEmailInput !== '' && userPasswordInput !== '') {
      const response = await fetch('http://localhost:3500/users/login ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });

      if (response.status === 200) {
        const result = await response.json();
        setLoginCondition({
          condition: result.result,
          msg: result.msg,
        });
        setOpen(true);
      } else {
        throw new Error('로그인 실패');
      }
    } else {
    }
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: orange[300],
      },
      secondary: {
        main: '#f44336',
      },
    },
  });
  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '60vh',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Avatar sx={{ m: 3, bgcolor: orange[300] }}>#</Avatar>
            <Typography component="h1" variant="h5">
              로그인
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    required
                    fullWidth
                    label="이메일"
                    autoFocus
                    autoComplete="off"
                    onChange={(input) => {
                      userEmailInput = input.target.value;
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    required
                    fullWidth
                    label="비밀번호"
                    type="password"
                    onChange={(input) => {
                      userPasswordInput = input.target.value;
                    }}
                  />
                </Grid>
              </Grid>
              <LoadingButton
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, height: '3.5em' }}
                onClick={() => loginUser()}
              >
                로그인
              </LoadingButton>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login">
                    회원 가입이 필요하나요? 회원가입 페이지로 이동
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </ThemeProvider>
      </Container>
      <Footer />

      {/* Dialog 파트 */}
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {loginCondition.msg}
          </DialogTitle>
          <DialogActions>
            {loginCondition.condition ? (
              <>
                <Button onClick={handleClose}>아니오</Button>
                <Button
                  onClick={handleLoginMove(userEmailInput, userPasswordInput)}
                  autoFocus
                >
                  메인 페이지로 이동
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleClose}>확인</Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
