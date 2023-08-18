// // src/components/register/registerfunc.tsx;
// import {
//   AuthFormBlock,
//   AuthTemplateBlock,
//   ButtonWithMarinTop,
//   StyledInput,
//   WhiteBox,
// } from "./registercss";
// import { useState } from "react";

// export const registerForm = (): JSX.Element => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     passwordConfirm: "",
//   });

//   const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const onSignUp = (event: React.FormEvent<HTMLFormElement>): void => {
//     // event.preventDefault();
//     console.log("Simulating sign-up:", formData);
//   };

//   return (
//     <AuthTemplateBlock>
//       <WhiteBox>
//         <AuthFormBlock>
//           <h3>회원가입</h3>
//           <form onSubmit={onSignUp}>
//             {/* autocomplete 속성 >> 인풋에 자동완성하는 속성
//                  username 은 사용자 이름 , new-password 는 보통 비밀번호 자동완성 막기 위해서 새로운 비밀번호나 비밀번호 확인란에 들어간다는뎅 ㅎ..
//                  머 일단 책은 이렇고 나는 나중에 보고 current-password 가 더 맞을거 같아서 임의로 바꿨음. */}
//             <StyledInput
//               autoComplete="username"
//               name="username"
//               placeholder="아이디"
//               value={formData.username}
//               onChange={onChangeInput}
//             />
//             <StyledInput
//               autoComplete="current-password"
//               name="password"
//               placeholder="비밀번호"
//               type="password"
//               value={formData.password}
//               onChange={onChangeInput}
//             />
//             <StyledInput
//               autoComplete="new-password"
//               name="passwordConfirm"
//               placeholder="비밀번호 확인"
//               type="password"
//               value={formData.passwordConfirm}
//               onChange={onChangeInput}
//             />
//             <ButtonWithMarinTop type="submit">회원가입</ButtonWithMarinTop>
//           </form>
//         </AuthFormBlock>
//       </WhiteBox>
//     </AuthTemplateBlock>
//   );
// };

// 백엔드 이어보기
// src/components/register/registerfunc.tsx
// import axios from "axios";
// import {
//   AuthFormBlock,
//   AuthTemplateBlock,
//   ButtonWithMarinTop,
//   StyledInput,
//   WhiteBox,
// } from "./registercss";
// import { useState } from "react";
// import { useRouter } from "next/router"; // Import the useRouter hook

// export const registerForm = (): JSX.Element => {
//   const router = useRouter(); // Initialize the router
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     passwordConfirm: "",
//   });

//   const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const onSignUp = async (
//     event: React.FormEvent<HTMLFormElement>
//   ): Promise<void> => {
//     event.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/auth/register",
//         {
//           username: formData.username,
//           password: formData.password,
//         }
//       );

//       if (response.data) {
//         console.log("Registration successful");
//         // Display an alert
//         alert("회원가입에 성공했습니다.");
//         // Redirect to the index page
//         router.push("/");
//       } else {
//         console.log("Registration failed");
//       }
//     } catch (error) {
//       console.error("Error registering:", error);
//     }
//   };
//   return (
//     <AuthTemplateBlock>
//       <WhiteBox>
//         <AuthFormBlock>
//           <h3>회원가입</h3>
//           <form onSubmit={onSignUp}>
//             {/* autocomplete 속성 >> 인풋에 자동완성하는 속성
//                  username 은 사용자 이름 , new-password 는 보통 비밀번호 자동완성 막기 위해서 새로운 비밀번호나 비밀번호 확인란에 들어간다는뎅 ㅎ..
//                  머 일단 책은 이렇고 나는 나중에 보고 current-password 가 더 맞을거 같아서 임의로 바꿨음. */}
//             <StyledInput
//               autoComplete="username"
//               name="username"
//               placeholder="아이디"
//               value={formData.username}
//               onChange={onChangeInput}
//             />
//             <StyledInput
//               autoComplete="current-password"
//               name="password"
//               placeholder="비밀번호"
//               type="password"
//               value={formData.password}
//               onChange={onChangeInput}
//             />
//             <StyledInput
//               autoComplete="new-password"
//               name="passwordConfirm"
//               placeholder="비밀번호 확인"
//               type="password"
//               value={formData.passwordConfirm}
//               onChange={onChangeInput}
//             />
//             <ButtonWithMarinTop type="submit">회원가입</ButtonWithMarinTop>
//           </form>
//         </AuthFormBlock>
//       </WhiteBox>
//     </AuthTemplateBlock>
//   );
// };

// 코드캠프 백엔드 회원가입
import React, { useState } from "react";
import axios from "axios";
import {
  AuthFormBlock,
  AuthTemplateBlock,
  ButtonWithMarinTop,
  StyledInput,
  WhiteBox,
} from "./registercss";
import { useRouter } from "next/router"; // Import the useRouter hook

const RegisterForm = (): JSX.Element => {
  const router = useRouter(); // Initialize the router
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
  });

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSignUp = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://backend-practice.codebootcamp.co.kr/graphql",
        {
          query: `
            mutation {
              createUser(createUserInput: {
                email: "${formData.username}",
                password: "${formData.password}",
                name: "${formData.nickname}"
              }) {
                _id
                email
                name
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

      if (response.data.data.createUser) {
        console.log("Registration successful");
        // Display an alert
        alert(`${formData.nickname}님 회원가입을 축하합니다.`);
        // Redirect to the index page
        router.push("/");
      } else {
        console.log("회원가입 실패");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <AuthFormBlock>
          <h3>회원가입</h3>
          <form onSubmit={onSignUp}>
            {/* 인풋 필드들 */}
            <StyledInput
              autoComplete="username"
              name="username"
              placeholder="아이디"
              value={formData.username}
              onChange={onChangeInput}
            />
            <StyledInput
              autoComplete="new-password"
              name="password"
              placeholder="비밀번호"
              type="password"
              value={formData.password}
              onChange={onChangeInput}
            />
            <StyledInput
              autoComplete="new-password"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              type="password"
              value={formData.passwordConfirm}
              onChange={onChangeInput}
            />
            <StyledInput
              autoComplete="nickname"
              name="nickname"
              placeholder="닉네임"
              value={formData.nickname}
              onChange={onChangeInput}
            />
            <ButtonWithMarinTop type="submit">회원가입</ButtonWithMarinTop>
          </form>
        </AuthFormBlock>
      </WhiteBox>
    </AuthTemplateBlock>
  );
};

export default RegisterForm;
