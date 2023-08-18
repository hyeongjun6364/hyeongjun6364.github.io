// // src/components/units/login/index.tsx
// import React, { useState } from "react";
// import Link from "next/link";
// import { useRecoilState } from "recoil";
// import { userNameState, isLoginState } from "../../commons/recoilState";
// import axios from "axios";
// import {
//   ButtonWithMarginTop,
//   Footer,
//   StyledInput,
//   LoginWrapper,
//   LoginFormWrapper,
// } from "./logincss";
// import { useRouter } from "next/router";

// const Login = (): JSX.Element => {
//   const [userName, setUserName] = useRecoilState(userNameState);
//   const [isLogin, setIsLogin] = useRecoilState(isLoginState);
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const onSubmitLogin = async (
//     event: React.FormEvent<HTMLFormElement>
//   ): Promise<void> => {
//     event.preventDefault();

//     try {
//       // 로그인 통신에 성공하면
//       const response = await axios.post(
//         "http://localhost:4000/api/auth/login",
//         {
//           username: formData.username,
//           password: formData.password,
//         }
//       );

//       if (response.data) {
//         // 로그인에 성공하면
//         const user = response.data;
//         console.log("로그인 성공");
//         localStorage.setItem("isLoggedIn", "true");
//         // 로그인 상태를 로컬 스토리지에 저장
//         localStorage.setItem("username", user.username);
//         // 사용자 이름을 로컬 스토리지에 저장

//         setUserName(user.username);
//         // 사용자 이름을 Recoil 상태에 저장
//         setIsLogin(true);
//         // 로그인 상태를 Recoil 상태에 저장

//         console.log(isLogin);
//         console.log(user.username);

//         // 페이지를 리로드 -> 애니매이션 버그를 해결하기 위해(먼저 localStorage가 선행되어야함)
//         window.location.reload();
//       } else {
//         // 로그인에 실패하면
//         console.log("Login failed");
//       }
//     } catch (error) {
//       // 로그인 통신에 실패하면
//       console.error("Error logging in:", error);
//     }
//   };

//   const googleLogin = async (): Promise<void> => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8080/oauth2/authorization/google"
//       );

//       if (response.data) {
//         // Google 로그인 페이지로 리다이렉트
//         window.location.href = response.data;
//       }
//     } catch (error) {
//       console.error("Error during Google login:", error);
//     }
//   };
//   return (
//     <div style={{ display: "flex", justifyContent: "flex-end" }}>
//       <LoginWrapper>
//         <LoginFormWrapper>
//           <h3 style={{ marginBottom: "4px" }}>로그인</h3>
//           <form onSubmit={onSubmitLogin}>
//             <StyledInput
//               autoComplete="username"
//               name="username"
//               placeholder="id"
//               value={formData.username}
//               onChange={onChangeInput}
//             />
//             <StyledInput
//               autoComplete="current-password"
//               name="password"
//               placeholder="password"
//               type="password"
//               value={formData.password}
//               onChange={onChangeInput}
//             />
//             <ButtonWithMarginTop fullWidth type="submit">
//               로그인
//             </ButtonWithMarginTop>
//           </form>
//           <Footer>
//             <Link href="/Register">회원가입</Link>
//             <button onClick={googleLogin}>구글</button>
//           </Footer>
//         </LoginFormWrapper>
//       </LoginWrapper>
//     </div>
//   );
// };

// export default Login;

// 코드캠프 백엔드 연결
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRecoilState } from "recoil";
// import { userNameState, isLoginState } from "../../commons/recoilState";
// import axios from "axios";
// import {
//   ButtonWithMarginTop,
//   Footer,
//   StyledInput,
//   LoginWrapper,
//   LoginFormWrapper,
// } from "./logincss";
// import { useRouter } from "next/router";

// const Login = (): JSX.Element => {
//   const [userName, setUserName] = useRecoilState(userNameState);
//   const [isLogin, setIsLogin] = useRecoilState(isLoginState);
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   useEffect(() => {
//     const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
//     const storedUsername = localStorage.getItem("username");

//     if (storedIsLoggedIn === "true" && storedUsername) {
//       setUserName(storedUsername);
//       setIsLogin(true);
//     }
//   }, []); // 최초 로드 시에만 실행될 useEffect

//   const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const onSubmitLogin = async (
//     event: React.FormEvent<HTMLFormElement>
//   ): Promise<void> => {
//     event.preventDefault();

//     try {
//       // 로그인 통신에 성공하면
//       const response = await axios.post(
//         "http://backend-practice.codebootcamp.co.kr/graphql",
//         {
//           query: `
//             mutation {
//               loginUser(email: "${formData.username}", password: "${formData.password}") {
//                 accessToken
//               }
//             }
//           `,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.data.loginUser.accessToken) {
//         const accessToken = response.data.data.loginUser.accessToken;

//         const userResponse = await axios.post(
//           "http://backend-practice.codebootcamp.co.kr/graphql",
//           {
//             query: `
//               query {
//                 fetchUserLoggedIn {
//                   email
//                   name
//                 }
//               }
//             `,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );

//         if (userResponse.data.data.fetchUserLoggedIn) {
//           const userName = userResponse.data.data.fetchUserLoggedIn.name;

//           localStorage.setItem("isLoggedIn", "true");
//           localStorage.setItem("username", userName);
//           setUserName(userName);
//           setIsLogin(true);

//           // 페이지를 리로드 -> 애니메이션 버그를 해결하기 위해(먼저 localStorage가 선행되어야함)
//           window.location.reload();
//         } else {
//           console.log("User data fetch failed");
//         }
//       } else {
//         console.log("Login failed");
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
//     }
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "flex-end" }}>
//       <LoginWrapper>
//         <LoginFormWrapper>
//           <h3 style={{ marginBottom: "4px" }}>로그인</h3>
//           <form onSubmit={onSubmitLogin}>
//             <StyledInput
//               autoComplete="username"
//               name="username"
//               placeholder="id"
//               value={formData.username}
//               onChange={onChangeInput}
//             />
//             <StyledInput
//               autoComplete="current-password"
//               name="password"
//               placeholder="password"
//               type="password"
//               value={formData.password}
//               onChange={onChangeInput}
//             />
//             <ButtonWithMarginTop fullWidth type="submit">
//               로그인
//             </ButtonWithMarginTop>
//           </form>
//           <Footer>
//             <Link href="/Register">회원가입</Link>
//           </Footer>
//         </LoginFormWrapper>
//       </LoginWrapper>
//     </div>
//   );
// };

// export default Login;

// 코드캠프 백엔드 연결
// src/components/units/login/index.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { userNameState, isLoginState } from "../../commons/recoilState";
import axios from "axios";
import {
  ButtonWithMarginTop,
  Footer,
  StyledInput,
  LoginWrapper,
  LoginFormWrapper,
} from "./logincss";
import { useRouter } from "next/router";
// import { naverClientId, naverRedirectURL, naverSecret } from '../../utils/OAuth';
const Login = (): JSX.Element => {
  const [userName, setUserName] = useRecoilState(userNameState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const router = useRouter();

  const [isInputFilled, setIsInputFilled] = useState(false); // 입력값이 있는지 여부를 감지할 상태 추가

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    // 입력값이 있는지 여부를 감지하고 상태 업데이트
    setIsInputFilled(
      formData.username.trim() !== "" || formData.password.trim() !== ""
    );
  }, [formData.username, formData.password]);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    const storedAccessToken = localStorage.getItem("accessToken");

    if (storedIsLoggedIn === "true" && storedUsername) {
      setUserName(storedUsername);
      setIsLogin(true);

      // 엑세스 토큰이 존재하면 50분마다 갱신
      if (storedAccessToken) {
        const refreshTokenInterval = setInterval(() => {
          refreshToken();
        }, 50 * 60 * 1000); // 50분마다 실행 (단위: 밀리초)

        return () => clearInterval(refreshTokenInterval); // 컴포넌트 언마운트 시 인터벌 제거
      }
    }
  }, []);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const loginUser = async () => {
    try {
      const response = await axios.post(
        "http://backend-practice.codebootcamp.co.kr/graphql",
        {
          query: `
            mutation {
              loginUser(email: "${formData.username}", password: "${formData.password}") {
                accessToken
              }
            }
          `,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.data.loginUser.accessToken) {
        const accessToken = response.data.data.loginUser.accessToken;

        localStorage.setItem("accessToken", accessToken);
        getUserData(accessToken);
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post(
        "http://backend-practice.codebootcamp.co.kr/graphql",
        {
          query: `
            mutation {
              refreshToken {
                accessToken
              }
            }
          `,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.data.refreshToken.accessToken) {
        const accessToken = response.data.data.refreshToken.accessToken;
        localStorage.setItem("accessToken", accessToken);
      } else {
        console.log("Token refresh failed");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  const getUserData = async (accessToken: any) => {
    try {
      const userResponse = await axios.post(
        "http://backend-practice.codebootcamp.co.kr/graphql",
        {
          query: `
            query {
              fetchUserLoggedIn {
                email
                name
              }
            }
          `,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (userResponse.data.data.fetchUserLoggedIn) {
        const userName = userResponse.data.data.fetchUserLoggedIn.name;

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", userName);
        setUserName(userName);
        setIsLogin(true);

        // 페이지를 리로드 -> 애니메이션 버그를 해결하기 위해(먼저 localStorage가 선행되어야함)
        window.location.reload();
      } else {
        console.log("User data fetch failed");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const onSubmitLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (isInputFilled) {
      // isInputFilled 값이 true인 경우에만 로그인 시도
      loginUser();
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <LoginWrapper>
        <LoginFormWrapper>
          <h3 style={{ marginBottom: "4px" }}>로그인</h3>
          <form onSubmit={onSubmitLogin}>
            <StyledInput
              autoComplete="username"
              name="username"
              placeholder="id"
              value={formData.username}
              onChange={onChangeInput}
            />
            <StyledInput
              autoComplete="current-password"
              name="password"
              placeholder="password"
              type="password"
              value={formData.password}
              onChange={onChangeInput}
            />
            <ButtonWithMarginTop
              fullWidth
              type="submit"
              disabled={!isInputFilled} // isInputFilled 값에 따라 버튼 활성/비활성 설정
            >
              로그인
            </ButtonWithMarginTop>
          </form>
          <Footer>
            <Link href="/Register">회원가입</Link>
          </Footer>
        </LoginFormWrapper>
      </LoginWrapper>
    </div>
  );
};

export default Login;
