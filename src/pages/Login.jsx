import { Avatar, Grid, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Container } from '@mui/system';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { orange } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PopupDialog from '../components/PopupDialog';
import { useDispatch } from 'react-redux';
import { login } from '../store/modules/users';

export default function Login() {
  const [loginCondition, setLoginCondition] = useState({
    condition: false,
    msg: '회원 정보를 정확하게 입력하세요!',
  });
  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useDispatch();

  const userEmailInput = useRef();
  const userPasswordInput = useRef();

  async function loginUser() {
    setOpenDialog(false);

    const loginInfo = {
      email: userEmailInput.current.value,
      password: userPasswordInput.current.value,
    };

    if (
      userEmailInput.current.value !== '' &&
      userPasswordInput.current.value !== ''
    ) {
      const response = await fetch('http://localhost:3500/users/login ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });

      if (response.status === 200) {
        const result = await response.json();
        if (result.result) {
          dispatch(login(result));
        }

        setLoginCondition({
          condition: result.result,
          msg: result.msg,
        });

        setOpenDialog(true);
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
        main: '#f4a836',
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
                      userEmailInput.current.value = input.target.value;
                    }}
                    ref={userEmailInput}
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
                      userPasswordInput.current.value = input.target.value;
                    }}
                    ref={userPasswordInput}
                  />
                </Grid>
              </Grid>
              <LoadingButton
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  mb: 2,
                  height: '3.5em',
                  ':hover': {
                    bgcolor: 'secondary.main',
                    fontWeight: 'bold',
                  },
                }}
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
      {openDialog && (
        <PopupDialog
          msg={loginCondition.msg}
          open={true}
          move={loginCondition.condition}
          href="/"
        />
      )}
    </>
  );
}
