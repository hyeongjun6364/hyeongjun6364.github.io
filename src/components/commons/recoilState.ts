// // recoilState.ts

// import { atom } from "recoil";

// export const isLoginVisibleState = atom<boolean>({
//   key: "isLoginVisibleState",
//   default: false,
// });

// // 카카오 이름
// const getInitialUserName = (): string | null => {
//   // Check if localStorage is available (i.e., running in the browser)
//   if (typeof window !== "undefined") {
//     const userNameFromLocalStorage = localStorage.getItem("userName");
//     return userNameFromLocalStorage ?? null;
//   }

//   // If running on the server, return null as there's no localStorage
//   return null;
// };

// const initialUserName = getInitialUserName();

// export const userNameState = atom<string | null>({
//   key: "userNameState",
//   default: initialUserName,
// });

// src/components/recoilState.ts

import { atom } from "recoil";

export const isLoginVisibleState = atom<boolean>({
  key: "isLoginVisibleState",
  default: false,
});

export const isLoginTime = atom<string | null>({
  key: "isLoginTime",
  default: null,
});

export const isLoginState = atom<boolean>({
  key: "isLoginState",
  default: false,
});

export const userNameState = atom<string | null>({
  key: "userNameState",
  default: null,
});

// export const loginSelector = selector({
//   key: "loginSelector",
//   get: ({ get }) => {
//     const isLogin = get(isLoginState);
//     const userName = get(userNameState);
//     return isLogin && userName !== null;
//   },
// });
export const boardIdState = atom<string>({
  key: "boardIdState",
  default: "",
});
