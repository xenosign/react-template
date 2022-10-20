// 액션 타입(문자열)
const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';
const REGISTER = 'user/RESISTER';

// 액션 생성 함수
// payload -> 선택에 다른 결과 값 result 전달 필요
export function login(result) {
  return {
    type: LOGIN,
    payload: { result },
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function register() {
  return {
    type: REGISTER,
  };
}

// 초기 상태 설정
const initState = {
  userEmail: '',
  userNickName: '',
  isLogin: false, // 0: 인트로 페이지, 1 ~ n: 선택 페이지, n+1: 결과 페이지
};

// 리듀서
export default function users(state = initState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
      };
    case LOGOUT:
      return {
        ...state,
        page: state.page + 1,
      };
    case REGISTER:
      return {
        ...state,
        page: 0,
        mbtiResult: '',
      };
    default:
      return state;
  }
}
