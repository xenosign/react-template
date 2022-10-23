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

// 로그인 용 컴포넌트
export default function Login() {
  // 회원 가입과 비슷하게 로그인 상태에 따라 컴포넌트 및 Dialog 처리
  const [loginCondition, setLoginCondition] = useState({
    condition: false,
    msg: '회원 정보를 정확하게 입력하세요!',
  });

  // Dialog 를 띄워주는 state
  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useDispatch();

  const userEmailInput = useRef();
  const userPasswordInput = useRef();

  // 로그인 호출 함수
  async function loginUser() {
    setOpenDialog(false);

    // 유저 input 으로 받은 정보를 백엔드 서버에 전달 하기 위해 임의의 객체 생성
    const loginInfo = {
      email: userEmailInput.current.value,
      password: userPasswordInput.current.value,
    };

    // 여기도 Validation 추가 필요, 일단 빈 값만 아니면 작동하도록 설정
    if (
      userEmailInput.current.value !== '' &&
      userPasswordInput.current.value !== ''
    ) {
      // 입력 받은 값을 백엔드 서버로 전달
      const response = await fetch('http://localhost:3500/users/login ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });

      // 백 엔드 서버의 응답에 따라 처리
      if (response.status === 200) {
        const result = await response.json();
        if (result.result) {
          // 백엔드에서 결과가 true(= 로그인 성공) 가 오면 Redux 의 login 함수를 호출하여
          // 로그인 처리
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
