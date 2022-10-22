import { Avatar, Grid, TextField, Typography, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Container } from '@mui/system';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { lightBlue } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function Join() {
  const [resgiterCondition, setRegisterCondition] = useState({
    condition: false,
    msg: '회원 가입 정보를 정확하게 입력하세요!',
  });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleJoinMove = () => {
    setOpen(false);
    navigate('/login');
  };

  let userEmailInput = '';
  let userPasswordInput = '';
  let userPasswordConfirm = '';
  let userNickNameInput = '';

  async function resisterUser() {
    if (
      userEmailInput !== '' &&
      userPasswordInput !== '' &&
      userPasswordConfirm !== '' &&
      userNickNameInput !== ''
    ) {
      const response = await fetch('http://localhost:3500/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmailInput,
          password: userPasswordInput,
          nickName: userNickNameInput,
        }),
      });

      if (response.status === 200) {
        const result = await response.json();
        setRegisterCondition({
          condition: !result.duplicated,
          msg: result.msg,
        });
        setOpen(true);
      } else {
        throw new Error('회원 가입 실패');
      }
    } else {
    }
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
          <Avatar sx={{ m: 3, bgcolor: lightBlue[300] }}>#</Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
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
              <Grid item xs={12}>
                <TextField
                  name="validatePassword"
                  required
                  fullWidth
                  label="비밀번호 확인"
                  type="password"
                  onChange={(input) => {
                    userPasswordConfirm = input.target.value;
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="닉네임"
                  required
                  fullWidth
                  label="닉네임"
                  onChange={(input) => {
                    userNickNameInput = input.target.value;
                  }}
                />
              </Grid>
            </Grid>
            <LoadingButton
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: lightBlue[700], height: '3.5em' }}
              onClick={() => resisterUser()}
            >
              회원 가입
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">이미 계정이 있나요? 로그인으로 이동</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
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
            {resgiterCondition.msg}
          </DialogTitle>
          <DialogActions>
            {resgiterCondition.condition ? (
              <>
                <Button onClick={handleClose}>아니오</Button>
                <Button onClick={handleJoinMove} autoFocus>
                  로그인 페이지로 이동
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
