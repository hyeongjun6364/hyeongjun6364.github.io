// // src/components/units/login/KakaoCallback.tsx
// import React, { useEffect } from "react";

// const getKakaoUserInfo = async (accessToken: string) => {
//   try {
//     const response = await fetch("https://kapi.kakao.com/v2/user/me", {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       // Update the header with the user's name
//       const userName = data.kakao_account.profile.nickname;
//       document.getElementById("user-name")?.innerText = userName;
//     } else {
//       console.log("Failed to fetch user information");
//     }
//   } catch (error) {
//     console.log("Error fetching user profile", error);
//   }
// };

// const KakaoCallback = (): JSX.Element => {
//   useEffect(() => {
//     // Parse the URL to get the access token from the query string
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get("code");

//     // Use the obtained code to get the access token from your backend server
//     // ...

//     // Once you have the access token, call the function to get user info
//     const accessToken = "YOUR_ACCESS_TOKEN"; // Replace with the actual access token
//     getKakaoUserInfo(accessToken);
//   }, []);

//   return <div>Kakao Login Callback</div>;
// };

// export default KakaoCallback;

// // src/components/units/login/KakaoCallback.tsx
// import React, { useEffect } from "react";
// import axios from "axios";
// import { useRecoilState } from "recoil";
// import { userNameState } from "../../commons/layout/header/recoilState";

// const KakaoCallback = (): JSX.Element => {
//   const [, setUserName] = useRecoilState(userNameState);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get("code");

//     if (code) {
//       // 카카오로부터 받은 code를 이용하여 AccessToken 요청
//       axios
//         .post("http://localhost:4000/api/auth/kakao", { code })
//         .then((response) => {
//           const accessToken = response.data.accessToken;
//           const username = response.data.username;

//           if (accessToken && username) {
//             localStorage.setItem("isLoggedIn", "true");
//             setUserName(username);
//             window.location.href = "/"; // 홈 페이지로 리다이렉트
//           } else {
//             console.log("Kakao login failed");
//           }
//         })
//         .catch((error) => {
//           console.error("Kakao login error:", error);
//         });
//     }
//   }, [setUserName]);

//   return <div>Kakao Login Callback</div>;
// };

// export default KakaoCallback;

// src/components/units/login/KakaoCallback.tsx
import React, { useEffect, useState } from "react";

export const getKakaoUserInfo = async (
  accessToken: string,
  setUserName: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const response = await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const userName = data.kakao_account.profile.nickname;
      setUserName(userName); // Set the user name using the state setter
    } else {
      console.log("Failed to get user information");
    }
  } catch (error) {
    console.log("Error getting user information", error);
  }
};

const KakaoCallback = (): JSX.Element => {
  const [userName, setUserName] = useState(""); // Add username state
  const [accessToken, setAccessToken] = useState(""); // 추가

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetch("http://localhost:4000/api/auth/kakao/backend-token")
        .then((response) => response.json())
        .then((data) => {
          const receivedAccessToken = data.access_token;
          setAccessToken(receivedAccessToken);
          getKakaoUserInfo(receivedAccessToken, setUserName);
        })
        .catch((error) => {
          console.log("Failed to fetch access token", error);
        });
    }
  }, []);

  return (
    <div>
      Kakao Login Callback
      <p>User Name: {userName}</p>
      <p>Access Token: {accessToken}</p> {/* 추가: 토큰 표시 */}
    </div>
  );
};

export default KakaoCallback;
