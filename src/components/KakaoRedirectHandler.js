import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/modules/users';

const KakaoRedirectHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const CODE = new URL(window.location.href).searchParams.get('code');
    const GRANT_TYPE = 'authorization_code';
    // REST API 키를 입력 해야 합니다!
    const KAKAO_CLIENT_ID = '2be90ab71a1f36d735f12cd91b53a982';
    const KAKAO_REDIRECT_URI = 'http://localhost:3000/oauth/callback/kakao';

    console.log(CODE);

    // 주소에서 분리한 카카오 토큰을 액세스 토큰으로 전환
    async function loginFetch() {
      const tokenResponse = await fetch(
        `https://kauth.kakao.com/oauth/token?grant_type=${GRANT_TYPE}&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${CODE}`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      );

      // 통신 성공하면 다음 스탭으로 진행
      if (tokenResponse.status === 200) {
        const tokenData = await tokenResponse.json();

        console.log(tokenData);

        // 카카오에서 발행한 액세스 토큰을 유저 정보로 전환해 주는 api 에 발급받은
        // 토큰 전달해서 유저 데이터 받기
        const userResponese = await fetch(`https://kapi.kakao.com/v2/user/me`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        });

        if (userResponese.status === 200) {
          const userKaKaoInfo = await userResponese.json();

          // api 랑 통신 성공하면 유저 정보 받기
          // 해당 통신이 성공하면 카카오에서 제공하는 정보가 해당 객체에 담겨서 나옴
          // 여기 데이터를 회원 정보로 만들어서 JWT 토큰으로 만들어서 저장
          console.log(userKaKaoInfo);

          const userLoginInfo = {
            email: userKaKaoInfo.kakao_account.email,
            nickName: userKaKaoInfo.kakao_account.profile.nickname,
          };

          // 카카오 유저 정보로 회원 가입 처리해 버리기
          const registerResponse = await fetch(
            'http://13.125.189.105:3500/users/register',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                type: 'kakao',
                email: userKaKaoInfo.kakao_account.email,
                nickName: userKaKaoInfo.kakao_account.profile.nickname,
              }),
            }
          );

          if (registerResponse.status === 200) {
            dispatch(login(userLoginInfo));
            navigate('/');
          } else {
            alert('회원 등록 이상');
            navigate('/login');
          }
        } else {
          alert('카카오 로그인 회원 정보 획득 실패');
          navigate('/login');
        }
      } else {
        alert('카카오 로그인 토큰 발행 실패');
        navigate('/login');
      }
    }
    loginFetch();
  }, []);
};

export default KakaoRedirectHandler;
