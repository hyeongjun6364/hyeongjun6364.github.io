// // src/components/units/login/KakaoLoginButton.tsx
// import { useState } from "react";
// import KakaoLoginSuccess from "./KakaoLoginSuccess";

// const SocialKakao = (): JSX.Element => {
//   const [buttonClick, setButtonClick] = useState(false);
//   const Rest_api_key = "3b62bda98fa4d574567bf210e76c794d"; // REST API KEY
//   const redirect_uri = "http://localhost:3000/"; // Redirect URI
//   // oauth 요청 URL
//   const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
//   const handleLogin = (): void => {
//     window.location.href = kakaoURL;
//     setButtonClick(true);
//   };
//   return (
//     <>
//       <button onClick={handleLogin}>카카오 로그인</button>
//       {buttonClick && <KakaoLoginSuccess buttonClick={buttonClick} />}
//     </>
//   );
// };

// export default SocialKakao;

// src / components / units / login / KakaoLoginButton.tsx;
// import React from "react";
// import axios from "axios";

// const SocialKakao = (): JSX.Element => {
//   const Rest_api_key = "3b62bda98fa4d574567bf210e76c794d"; // 카카오 개발자 사이트에서 발급 받은 REST API KEY
//   const redirect_uri = "http://localhost:3000/kakao-callback"; // Redirect URI

//   const handleLogin = (): void => {
//     window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
//   };

//   return <button onClick={handleLogin}>카카오 로그인</button>;
// };

// export default SocialKakao;

// src/components/units/login/KakaoLoginButton.tsx
// import React from "react";
// import axios from "axios";

// const KakaoLoginButton = (): JSX.Element => {
//   const Rest_api_key = "3b62bda98fa4d574567bf210e76c794d";
//   const KAKAO_REDIRECT_URI = "http://localhost:3000/kakao-callback";

//   const handleLogin = async (): Promise<void> => {
//     try {
//       const response = await axios.get(
//         `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${KAKAO_REDIRECT_URI}/kakao/callback&response_type=code`
//       );

//       if (response.data && response.data.code) {
//         window.location.href = response.data.code;
//       }
//     } catch (error) {
//       console.error("Kakao login error:", error);
//     }
//   };

//   return <button onClick={handleLogin}>카카오 로그인</button>;
// };

// export default KakaoLoginButton;

// src/components/units/login/KakaoLoginButton.tsx
import { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
// import { userNameState } from "../../../commons/layout/header/recoilState";
// import KakaoLoginSuccess from "./KakaoLoginSuccess";

const KakaoLoginButton = (): JSX.Element => {
  const [buttonClick, setButtonClick] = useState(false);
  // const [, setUserName] = useRecoilState(userNameState);

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/auth/kakao/login"
      );

      if (response.data) {
        const user = response.data;
        console.log("Kakao 로그인 성공");
        localStorage.setItem("isLoggedIn", "true");
        // setUserName(user.username);
        console.log(user.username);
      } else {
        console.log("Kakao 로그인 실패");
      }
    } catch (error) {
      console.error("Kakao로 로그인하는 도중 오류 발생:", error);
    }
    setButtonClick(true);
  };
  return (
    <>
      <button onClick={handleLogin}>카카오 로그인</button>
      {/* {buttonClick && <KakaoLoginSuccess buttonClick={buttonClick} />} */}
    </>
  );
};

export default KakaoLoginButton;
