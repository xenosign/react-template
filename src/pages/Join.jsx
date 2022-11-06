import { Avatar, Grid, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Container } from '@mui/system';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { lightBlue } from '@mui/material/colors';
import PopupDialog from '../components/PopupDialog';

// 회원 가입용 컴포넌트
export default function Join() {
  // 회원 가입 상태에 따른 컴포넌트 처리를 위해 useState 사용
  const [resgiterCondition, setRegisterCondition] = useState({
    condition: false,
    msg: '회원 가입 정보를 정확하게 입력하세요!',
  });

  // 결과 Dialog 창을 컨트롤 하는 useState, true 값이 들어가면 Dialog가 팝업
  // 메세지는 회원 가입 상태의 msg(16번째 줄)를 출력한다
  const [openDialog, setOpenDialog] = useState(false);

  // 컴포넌트가 리랜더링이 되어도 입력 값이 초기화 되지 않도록 useRef 사용
  const userEmailInput = useRef();
  const userPasswordInput = useRef();
  const userPasswordConfirm = useRef();
  const userNickNameInput = useRef();

  // 회원 가입 요청 함수
  async function resisterUser() {
    // 해당 함수가 호출 되면 Dialog 가 팝업 되어야 하므로 일단 false 로 변경
    setOpenDialog(false);

    // 각 입력 값에 따른 Validation 필요, 일단 빈 값만 아니면 통과 되도록 설정
    if (
      userEmailInput.current.value !== '' &&
      userPasswordInput.current.value !== '' &&
      userPasswordConfirm.current.value !== '' &&
      userNickNameInput.current.value !== ''
    ) {
      // 백엔드 서버로 회원 가입 정보 전달
      const response = await fetch(
        'http://13.125.189.105:3500/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'local',
            email: userEmailInput.current.value,
            password: userPasswordInput.current.value,
            nickName: userNickNameInput.current.value,
          }),
        }
      );

      // 회원 가입 성공 여부에 따른 결과 처리
      if (response.status === 200) {
        const result = await response.json();
        // 팝업 Dialog 의 상태 및 메세지 세팅, 백엔드에서 결과 메시지를 받아서 출력
        setRegisterCondition({
          condition: !result.duplicated,
          msg: result.msg,
        });

        // Dialog 열기
        setOpenDialog(true);
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
                  // 인풋의 변화가 생기는 순간마다 useRef 값에 값을 저장
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
              <Grid item xs={12}>
                <TextField
                  name="validatePassword"
                  required
                  fullWidth
                  label="비밀번호 확인"
                  type="password"
                  onChange={(input) => {
                    userPasswordConfirm.current.value = input.target.value;
                  }}
                  ref={userPasswordConfirm}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="닉네임"
                  required
                  fullWidth
                  label="닉네임"
                  onChange={(input) => {
                    userNickNameInput.current.value = input.target.value;
                  }}
                  ref={userNickNameInput}
                />
              </Grid>
            </Grid>
            <LoadingButton
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: lightBlue[700], height: '3.5em' }}
              // 회원 가입 함수 호출
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
      {/* Dialog 의 State 에 따라 팝업을 조건부 렌더링 */}
      {openDialog && (
        <PopupDialog
          msg={resgiterCondition.msg}
          open={true}
          move={resgiterCondition.condition}
          href="/login"
        />
      )}
    </>
  );
}
