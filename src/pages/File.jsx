import React from 'react';
import { useParams } from 'react-router-dom';

// KAKAO 로그인 용
// CLIENT_ID 로 REST API 키 사용 필요
const KAKAO_CLIENT_ID = '2be90ab71a1f36d735f12cd91b53a982';
const KAKAO_REDIRECT_URI = 'http://localhost:3000/oauth/callback/kakao';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

export default function File() {
  // 인풋에 파일이 올라오면 해당 파일을 formData 에 저장 후, 백엔드로 전송
  const changeHandler = async (e) => {
    // 리액트에서는 데이터 전송을 할 때, formData에 붙여서 전달 하는 방법이 국룰
    const formData = new FormData();
    formData.append('img', e.target.files[0]);

    // 파일 전송을 할 때는 headers 는 공란으로 보내야 함, body 에 formData 담아서 전달
    const res = await fetch('http://localhost:3500/file', {
      method: 'post',
      headers: {},
      body: formData,
    });

    if (res.status === 200) {
      console.log(res);
    } else {
      console.log('WTF');
    }
  };

  const { params } = useParams();
  console.log(params);
  if (params === 'jeju') {
    // 제주로 요청
  }

  return (
    <>
      <a href={KAKAO_AUTH_URL}> 11 {params} </a>
      <br />
      <input type="file" name="img" onChange={changeHandler} />
      <img src="http://localhost:3500/uploads/img_1666761620939" />
    </>
  );
}
