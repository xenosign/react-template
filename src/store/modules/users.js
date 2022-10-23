// 액션 타입(문자열)
const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';

// 액션 생성 함수
// payload -> 선택에 다른 결과 값 result 전달 필요
export function login(loginInfo) {
  return {
    type: LOGIN,
    payload: loginInfo,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

// 초기 상태 설정
const initState = {
  userEmail: '',
  isLogin: false,
};

// 리듀서
export default function users(state = initState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userEmail: action.payload.email,
        userNickName: action.payload.nickName,
        isLogin: true,
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
}
