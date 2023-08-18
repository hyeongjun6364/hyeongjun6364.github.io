// // // src/components/units/login/KakaoLoginSuccess.tsx
// // import React, { useEffect, useState } from "react";
// // import LayoutHeader from "./../../commons/layout/header/index";
// // import { useRecoilState } from "recoil";
// // import { userNameState } from "../../commons/layout/header/recoilState";

// // const fakeFetchUserProfile = () => {
// //   return "김승찬";
// // };

// // const KakaoLoginSuccess = ({ buttonClick }): JSX.Element => {
// //   const [isKakaoResponseHandled, setIsKakaoResponseHandled] = useState(false);
// //   const [userName, setUserName] = useRecoilState(userNameState); // Use the Recoil state for userName

// //   useEffect(() => {
// //     const handleKakaoResponse = async () => {
// //       if (buttonClick && !isKakaoResponseHandled) {
// //         setIsKakaoResponseHandled(true);
// //         const userProfile = fakeFetchUserProfile();
// //         setUserName(userProfile);
// //         localStorage.setItem("userName", userProfile); // Store the userName in LocalStorage
// //         console.log("userName after setting:", userProfile);
// //       }
// //     };

// //     handleKakaoResponse();
// //   }, [buttonClick, isKakaoResponseHandled, setUserName]);

// //   return (
// //     <>
// //       <LayoutHeader userName={userName} />
// //     </>
// //   );
// // };

// // export default KakaoLoginSuccess;

// // src/components/units/login/KakaoLoginSuccess.tsx
// // import React, { useEffect, useState } from "react";
// // import LayoutHeader from "./../../commons/layout/header/index";
// // import { useRecoilState } from "recoil";
// // import { userNameState } from "../../commons/layout/header/recoilState";

// // const KakaoLoginSuccess = ({ buttonClick }): JSX.Element => {
// //   const [isKakaoResponseHandled, setIsKakaoResponseHandled] = useState(false);
// //   const [userName, setUserName] = useRecoilState(userNameState);

// //   useEffect(() => {
// //     const handleKakaoResponse = async () => {
// //       if (buttonClick && !isKakaoResponseHandled) {
// //         setIsKakaoResponseHandled(true);

// //         const userProfile = fakeFetchUserProfile();
// //         setUserName(userProfile);
// //         localStorage.setItem("userName", userProfile);

// //         const loginTime = new Date(localStorage.getItem("loginTime"));
// //         const logoutTime = new Date(localStorage.getItem("logoutTime"));

// //         // 로그아웃 시간이 있는 경우에만 활동 기록을 추가
// //         if (logoutTime) {
// //           const activityTimeInSeconds = Math.floor(
// //             (logoutTime - loginTime) / 1000
// //           );

// //           const activityHours = Math.floor(activityTimeInSeconds / 3600);
// //           const activityMinutes = Math.floor(
// //             (activityTimeInSeconds % 3600) / 60
// //           );
// //           const activitySeconds = activityTimeInSeconds % 60;

// //           const newActivityLog = {
// //             id: new Date().getTime(),
// //             hours: activityHours,
// //             minutes: activityMinutes,
// //             seconds: activitySeconds,
// //           };

// //           // 기존 활동 기록을 가져와서 추가
// //           const storedActivityLogs = JSON.parse(
// //             localStorage.getItem("activityLogs")
// //           );
// //           const updatedActivityLogs = storedActivityLogs
// //             ? [...storedActivityLogs, newActivityLog]
// //             : [newActivityLog];

// //           localStorage.setItem(
// //             "activityLogs",
// //             JSON.stringify(updatedActivityLogs)
// //           );
// //         }
// //       }
// //     };

// //     handleKakaoResponse();
// //   }, [buttonClick, isKakaoResponseHandled, setUserName]);

// //   return (
// //     <>
// //       <LayoutHeader userName={userName} />
// //     </>
// //   );
// // };

// // src/components/units/login/KakaoLoginSuccess.tsx
// import React, { useEffect, useState } from "react";
// import LayoutHeader from "../../../commons/layout/header/index";
// import { useRecoilState } from "recoil";
// import { userNameState } from "../../../commons/layout/header/recoilState";
// import { getKakaoUserInfo } from "./KakaoCalllback"; // 이 부분 추가

// const KakaoLoginSuccess = ({ buttonClick, accessToken }) => {
//   const [isKakaoResponseHandled, setIsKakaoResponseHandled] = useState(false);
//   const [userName, setUserName] = useRecoilState(userNameState);

//   useEffect(() => {
//     const handleKakaoResponse = async () => {
//       if (buttonClick && !isKakaoResponseHandled) {
//         setIsKakaoResponseHandled(true);
//         // 액세스 토큰을 이용하여 사용자 정보 가져오는 로직을 구현하세요.
//         const userProfile = await getKakaoUserInfo(accessToken, setUserName); // setUserName 추가
//         setUserName(userProfile);
//         localStorage.setItem("userName", userProfile);
//         console.log("사용자 이름 설정 후:", userProfile);
//       }
//     };

//     handleKakaoResponse();
//   }, [buttonClick, isKakaoResponseHandled, setUserName]);

//   return (
//     <>
//       <LayoutHeader userName={userName} />
//     </>
//   );
// };

// export default KakaoLoginSuccess;
